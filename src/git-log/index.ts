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

        // Filter commits to only those where the entity exists
        // This allows skipping commits without the hive and comparing only valid commits
        type CommitWithRoot = {
            commit: Commit;
            root: NonNullable<EntityRootResult>;
        };
        const commitsWithEntity: CommitWithRoot[] = [];

        for (const commit of commits) {
            try {
                const root = await get_entity_root(
                    driver,
                    commit.hash,
                    entity_type,
                    path,
                );
                if (root) {
                    commitsWithEntity.push({ commit, root });
                }
                // If root is null (e.g., hive not extracted), skip this commit
            } catch (error) {
                // Log error but continue processing other commits
                console.error(
                    `Error resolving entity root for commit ${commit.hash}:`,
                    error,
                );
            }
        }

        if (commitsWithEntity.length < 2) {
            // Not enough valid commits to compare
            return;
        }

        // Process consecutive commit pairs based on direction:
        // BACKWARD (default): commits[0]=newest, base=current(newer), diffee=next(older)
        // FORWARD: commits[0]=oldest, base=current(older), diffee=next(newer)
        let entriesYielded = 0;
        const offset = options?.offset ?? 0;
        const limit = options?.limit ?? 50;

        for (let i = 0; i < commitsWithEntity.length - 1; i++) {
            const { commit: base_commit, root: base_root } =
                commitsWithEntity[i];
            const { commit: diffee_commit, root: diffee_root } =
                commitsWithEntity[i + 1];

            try {
                // Build the at_path for diffNodesAtInternal
                // Use remaining_path from base (they should be the same for the same entity path)
                const at_path = base_root.remaining_path
                    ? "/" + base_root.remaining_path
                    : "/";

                // Convert status filter to strings for the stored procedure
                const status_filter =
                    options?.status_filter?.map((s) => String(s)) ?? [];

                // Call diffNodesAtInternal which handles path resolution and diffing
                const diffResult = await diffNodesAtInternal(driver, {
                    parent_label: base_root.root_label,
                    base_node_hash: base_root.root_hash,
                    diffee_node_hash: diffee_root.root_hash,
                    at_path,
                    max_depth: 0, // Non-recursive, just this node
                    filter: [],
                    with_intermediates: false,
                    options: {
                        status_filter,
                    },
                });

                // If no diff items, the node didn't change
                if (diffResult.items.length === 0) {
                    continue;
                }

                // Apply offset
                if (entriesYielded < offset) {
                    entriesYielded++;
                    continue;
                }

                // Apply limit
                if (entriesYielded >= offset + limit) {
                    return;
                }

                // Yield entry with the diff item from the stored procedure
                // (includes proper old_props/new_props)
                const diff_item = diffResult.items[0];

                yield {
                    base_commit,
                    diffee_commit,
                    diff: {
                        ...diff_item,
                        path, // Use the original full path
                    },
                };

                entriesYielded++;
            } catch (error) {
                // Log error but continue processing other commits
                console.error(
                    `Error processing commits ${diffee_commit.hash} -> ${base_commit.hash}:`,
                    error,
                );
                continue;
            }
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
