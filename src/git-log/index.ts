import { Driver } from "neo4j-driver";
import {
    CommitRange,
    EntityType,
    GitLogResult,
    Commit,
    CommitHistoryDirection,
} from "../ogm-types.js";
import { buildCommitRangeQuery } from "../queries.js";
import { resolveRef } from "../commits.js";
import { diffNodesAtInternal } from "../diff/diff.js";
import { get_entity_root } from "./path-resolvers.js";
import { GitLogEntry, GitLogOptions, EntityRootResult } from "./types.js";

/**
 * Async generator that yields git log entries for an entity across commit history.
 * Tracks changes to a specific entity path across multiple commits.
 *
 * @param driver Neo4j driver instance
 * @param path Entity path to track
 * @param entity_type Type of entity (FILESYSTEM, REGISTRY, etc.)
 * @param commit_range Commit range to search within
 * @param options Optional filtering and pagination options
 */
export async function* git_log_stream(
    driver: Driver,
    path: string,
    entity_type: EntityType,
    commit_range: CommitRange,
    options?: GitLogOptions | null,
): AsyncGenerator<GitLogEntry> {
    // Resolve refs to commit hashes
    const startHash = await resolveRef(driver, commit_range.startRef);
    const endHash = commit_range.endRef
        ? await resolveRef(driver, commit_range.endRef)
        : null;

    // Build commit range query
    const query = buildCommitRangeQuery(
        commit_range.direction ?? CommitHistoryDirection.Backward,
        commit_range.include_updates ?? false,
        commit_range.branch ?? null,
        endHash !== null,
    );

    // Get commits in range
    const session = driver.session();
    const tx = session.beginTransaction();

    try {
        const commitsResult = await tx.run(query, {
            startHash,
            endHash,
            branch: commit_range.branch,
        });

        const commits = commitsResult.records.map((record) => {
            const commitNode = record.get("commit");
            const commitProps = commitNode.properties;

            // Construct a minimal Commit object with required connection fields
            const commit: Commit = {
                ...commitProps,
                next: [],
                previous: null,
                nextConnection: {
                    edges: [],
                    totalCount: 0,
                    pageInfo: { hasNextPage: false, hasPreviousPage: false },
                },
                previousConnection: {
                    edges: [],
                    totalCount: 0,
                    pageInfo: { hasNextPage: false, hasPreviousPage: false },
                },
                filesystemConnection: {
                    edges: [],
                    totalCount: 0,
                    pageInfo: { hasNextPage: false, hasPreviousPage: false },
                },
            };

            return commit;
        });

        await tx.commit();

        if (commits.length < 2) {
            // Not enough commits to compare
            return;
        }

        // Handle direction: commits from query are in newest→oldest order
        const direction = options?.direction ?? CommitHistoryDirection.Backward;

        // For FORWARD direction, reverse the array to get oldest→newest order
        if (direction === CommitHistoryDirection.Forward) {
            commits.reverse();
        }

        // Process commits with a sliding window approach for streaming
        // This yields results as soon as we have a valid pair, without waiting
        // for all get_entity_root() calls to complete first
        type CommitWithRoot = {
            commit: Commit;
            root: NonNullable<EntityRootResult>;
        };

        let entriesYielded = 0;
        const offset = options?.offset ?? 0;
        const limit = options?.limit ?? 50;
        const status_filter =
            options?.status_filter?.map((s) => String(s)) ?? [];

        let prevCommitWithRoot: CommitWithRoot | null = null;

        for (const commit of commits) {
            // Resolve entity root for this commit
            let root: EntityRootResult;
            try {
                root = await get_entity_root(driver, commit.hash, entity_type, path);
                if (!root) {
                    // Entity doesn't exist in this commit (e.g., hive not extracted)
                    continue;
                }
            } catch (error) {
                console.error(
                    `Error resolving entity root for commit ${commit.hash}:`,
                    error,
                );
                continue;
            }

            const currentCommitWithRoot: CommitWithRoot = { commit, root };

            // If we have a previous valid commit, we can diff and yield
            if (prevCommitWithRoot) {
                try {
                    const base_commit = prevCommitWithRoot.commit;
                    const base_root = prevCommitWithRoot.root;
                    const diffee_commit = currentCommitWithRoot.commit;
                    const diffee_root = currentCommitWithRoot.root;

                    const at_path = base_root.remaining_path
                        ? "/" + base_root.remaining_path
                        : "/";

                    const diffResult = await diffNodesAtInternal(driver, {
                        parent_label: base_root.root_label,
                        base_node_hash: base_root.root_hash,
                        diffee_node_hash: diffee_root.root_hash,
                        at_path,
                        max_depth: 0,
                        filter: [],
                        with_intermediates: false,
                        options: { status_filter },
                    });

                    // If diff found changes, yield the entry
                    if (diffResult.items.length > 0) {
                        // Apply offset
                        if (entriesYielded < offset) {
                            entriesYielded++;
                        } else if (entriesYielded < offset + limit) {
                            const diff_item = diffResult.items[0];
                            yield {
                                base_commit,
                                diffee_commit,
                                diff: {
                                    ...diff_item,
                                    path,
                                },
                            };
                            entriesYielded++;
                        }

                        // Check if we've reached the limit
                        if (entriesYielded >= offset + limit) {
                            return;
                        }
                    }
                } catch (error) {
                    console.error(
                        `Error processing commits ${prevCommitWithRoot.commit.hash} -> ${commit.hash}:`,
                        error,
                    );
                }
            }

            // Slide the window forward
            prevCommitWithRoot = currentCommitWithRoot;
        }
    } catch (error) {
        await tx.rollback();
        throw error;
    } finally {
        await session.close();
    }
}

/**
 * Main git log function that returns all results.
 * Collects all entries from the stream and returns a GitLogResult.
 *
 * @param driver Neo4j driver instance
 * @param path Entity path to track
 * @param entity_type Type of entity (FILESYSTEM, REGISTRY, etc.)
 * @param commit_range Commit range to search within
 * @param options Optional filtering and pagination options
 */
export async function git_log(
    driver: Driver,
    path: string,
    entity_type: EntityType,
    commit_range: CommitRange,
    options?: GitLogOptions | null,
): Promise<GitLogResult> {
    const entries: GitLogEntry[] = [];

    for await (const entry of git_log_stream(
        driver,
        path,
        entity_type,
        commit_range,
        options,
    )) {
        entries.push(entry);
    }

    const limit = options?.limit ?? 50;
    const has_more = entries.length >= limit;

    return {
        total_count: entries.length,
        entries,
        has_more,
    };
}
