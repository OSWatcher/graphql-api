import { Driver, Node } from "neo4j-driver";
import { Commit, CommitHistoryDirection } from "./ogm-types.js";
import {
    FETCH_COMMIT_HISTORY_BACKWARD_QUERY,
    FETCH_COMMIT_HISTORY_FORWARD_QUERY,
    GET_COMMIT_CAPABILITIES_QUERY,
} from "./queries.js";

async function* fetch_commit_history(
    driver: Driver,
    commit_hash: string,
    direction: CommitHistoryDirection = CommitHistoryDirection.Backward,
): AsyncGenerator<Commit> {
    const session = driver.session();

    try {
        const query =
            direction === CommitHistoryDirection.Forward
                ? FETCH_COMMIT_HISTORY_FORWARD_QUERY
                : FETCH_COMMIT_HISTORY_BACKWARD_QUERY;

        const result = await session.executeRead((tx) =>
            tx.run(query, { commit_hash }),
        );

        for (const record of result.records) {
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
    } catch (error) {
        console.error("Error fetching commit history:", error);
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
        return result.records[0].get("uniqueLabels");
    } catch (error) {
        console.error("Error searching filesystem by full path:", error);
        throw error;
    } finally {
        await session.close();
    }
}

export { fetch_commit_history, get_commit_capabilities };
