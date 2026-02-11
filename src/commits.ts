import { Driver, Node } from "neo4j-driver";
import { Commit, CommitHistoryDirection } from "./ogm-types.js";
import {
    FETCH_COMMIT_HISTORY_BACKWARD_QUERY,
    FETCH_COMMIT_HISTORY_FORWARD_QUERY,
    GET_COMMIT_CAPABILITIES_QUERY,
    GET_BLOBS_WITH_SYMBOLS_QUERY,
    RESOLVE_BRANCH_REF_QUERY,
} from "./queries.js";

async function* fetch_commit_history(
    driver: Driver,
    commit_hash: string,
    direction: CommitHistoryDirection = CommitHistoryDirection.Backward,
): AsyncGenerator<Commit> {
    const session = driver.session();
    const tx = session.beginTransaction();

    try {
        const query =
            direction === CommitHistoryDirection.Forward
                ? FETCH_COMMIT_HISTORY_FORWARD_QUERY
                : FETCH_COMMIT_HISTORY_BACKWARD_QUERY;

        // Use async iteration for true streaming from Neo4j
        const result = tx.run(query, { commit_hash });

        for await (const record of result) {
            const commitNode = record.get("c");
            const nextCommits = record.get("nextCommits");
            const previous = record.get("previous");

            // Note: filesystem relationship is not populated in fetchCommitHistory
            // for performance reasons. It will be resolved by GraphQL when requested.
            const commit: Commit = {
                ...commitNode.properties,
                next: nextCommits.map(
                    (nextCommit: Node) => nextCommit.properties,
                ),
                previous: previous ? previous.properties : null,
                nextConnection: {
                    edges: nextCommits.map((nextCommit: Node) => ({
                        cursor: btoa(nextCommit.properties.hash),
                        node: nextCommit.properties,
                    })),
                    totalCount: nextCommits.length,
                    pageInfo: { hasNextPage: false, hasPreviousPage: false },
                },
                previousConnection: previous
                    ? {
                          edges: [
                              {
                                  cursor: btoa(previous.properties.hash),
                                  node: previous.properties,
                              },
                          ],
                          totalCount: 1,
                          pageInfo: {
                              hasNextPage: false,
                              hasPreviousPage: false,
                          },
                      }
                    : {
                          edges: [],
                          totalCount: 0,
                          pageInfo: {
                              hasNextPage: false,
                              hasPreviousPage: false,
                          },
                      },
                filesystemConnection: {
                    edges: [],
                    totalCount: 0,
                    pageInfo: { hasNextPage: false, hasPreviousPage: false },
                },
            };
            yield commit;
        }

        await tx.commit();
    } catch (error) {
        console.error("Error fetching commit history:", error);
        await tx.rollback();
        throw error;
    } finally {
        await session.close();
    }
}

async function get_commit_capabilities(
    driver: Driver,
    commit_hash: string,
): Promise<string[]> {
    const session = driver.session();

    try {
        const result = await session.executeRead((tx) =>
            tx.run(GET_COMMIT_CAPABILITIES_QUERY, { commit_hash }),
        );

        // return list of string (labels)
        if (result.records.length === 0) {
            return [];
        }
        return result.records[0].get("uniqueLabels");
    } catch (error) {
        console.error("Error fetching commit capabilities:", error);
        throw error;
    } finally {
        await session.close();
    }
}

/**
 * Resolve a ref (commit hash or branch name) to a commit hash
 * @param driver - Neo4j driver instance
 * @param ref - Either a 40-character hex commit hash or a branch name
 * @returns The resolved commit hash
 * @throws Error if the ref is neither a valid commit hash nor an existing branch
 */
async function resolveRef(driver: Driver, ref: string): Promise<string> {
    // Check if it's a commit hash (40 hex chars)
    if (/^[a-f0-9]{40}$/i.test(ref)) {
        return ref;
    }

    // Otherwise treat as branch name
    const session = driver.session();
    try {
        const result = await session.executeRead(async (tx) => {
            return tx.run(RESOLVE_BRANCH_REF_QUERY, { branchName: ref });
        });

        if (result.records.length === 0) {
            throw new Error(`Branch or commit not found: ${ref}`);
        }

        return result.records[0].get("hash");
    } finally {
        await session.close();
    }
}

interface BlobWithSymbols {
    blob_hash: string;
    blob_path: string;
}

async function get_blobs_with_symbols(
    driver: Driver,
    commit_hash: string,
): Promise<BlobWithSymbols[]> {
    const session = driver.session();

    try {
        const result = await session.executeRead((tx) =>
            tx.run(GET_BLOBS_WITH_SYMBOLS_QUERY, { commit_hash }),
        );

        return result.records.map((record) => ({
            blob_hash: record.get("blob_hash"),
            blob_path: record.get("blob_path"),
        }));
    } catch (error) {
        console.error("Error fetching blobs with symbols:", error);
        throw error;
    } finally {
        await session.close();
    }
}

export {
    fetch_commit_history,
    get_commit_capabilities,
    get_blobs_with_symbols,
    resolveRef,
};
