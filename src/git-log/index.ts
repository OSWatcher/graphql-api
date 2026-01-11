import { Driver } from "neo4j-driver";
import {
    CommitRange,
    EntityType,
    GitLogResult,
    Commit,
    CommitHistoryDirection,
    DiffItem,
} from "../ogm-types.js";
import { buildCommitRangeQuery } from "../queries.js";
import { resolveRef } from "../commits.js";
import { diffNodesAtInternal } from "../diff/diff.js";
import { get_entity_root } from "./path-resolvers.js";
import { GitLogEntry, GitLogOptions, EntityRootResult } from "./types.js";
import { mapNodeToCommit } from "./commit-mapper.js";
import { PaginationTracker } from "./pagination.js";

/**
 * Internal type for tracking commits with their resolved entity roots.
 */
type CommitWithRoot = {
    commit: Commit;
    root: NonNullable<EntityRootResult>;
};

/**
 * Fetches commits in the specified range from Neo4j.
 *
 * @param driver Neo4j driver instance
 * @param startHash Starting commit hash
 * @param endHash Ending commit hash (or null for open-ended)
 * @param commit_range Commit range parameters
 * @returns Array of Commit objects in query order (newest to oldest for BACKWARD)
 */
async function fetchCommitsInRange(
    driver: Driver,
    startHash: string,
    endHash: string | null,
    commit_range: CommitRange,
): Promise<Commit[]> {
    const query = buildCommitRangeQuery(
        commit_range.direction ?? CommitHistoryDirection.Backward,
        commit_range.include_updates ?? false,
        commit_range.branch ?? null,
        endHash !== null,
    );

    const session = driver.session();
    try {
        const result = await session.executeRead((tx) =>
            tx.run(query, {
                startHash,
                endHash,
                branch: commit_range.branch,
            }),
        );

        return result.records.map((record) => mapNodeToCommit(record.get("commit")));
    } finally {
        await session.close();
    }
}

/**
 * Process a pair of commits to find differences at the specified path.
 *
 * @param driver Neo4j driver instance
 * @param prev Previous commit with its entity root
 * @param current Current commit with its entity root
 * @param path Original entity path (for output)
 * @param status_filter Filter for diff statuses
 * @returns DiffItem if changes were found, null otherwise
 */
async function processCommitPair(
    driver: Driver,
    prev: CommitWithRoot,
    current: CommitWithRoot,
    path: string,
    status_filter: string[],
): Promise<DiffItem | null> {
    const at_path = prev.root.remaining_path
        ? "/" + prev.root.remaining_path
        : "/";

    const diffResult = await diffNodesAtInternal(driver, {
        parent_label: prev.root.root_label,
        base_node_hash: prev.root.root_hash,
        diffee_node_hash: current.root.root_hash,
        at_path,
        max_depth: 0,
        filter: [],
        with_intermediates: false,
        options: { status_filter },
    });

    if (diffResult.items.length === 0) {
        return null;
    }

    // Return the diff item with the original path
    return {
        ...diffResult.items[0],
        path,
    };
}

/**
 * Async generator that yields git log entries for an entity across commit history.
 * Tracks changes to a specific entity path across multiple commits.
 *
 * Uses a sliding window approach for streaming - yields results as soon as
 * we have a valid pair, without waiting for all entity root resolutions.
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
    const [startHash, endHash] = await Promise.all([
        resolveRef(driver, commit_range.startRef),
        commit_range.endRef
            ? resolveRef(driver, commit_range.endRef)
            : Promise.resolve(null),
    ]);

    // Fetch commits in range
    const commits = await fetchCommitsInRange(driver, startHash, endHash, commit_range);

    if (commits.length < 2) {
        // Not enough commits to compare
        return;
    }

    // Handle direction: commits from query are in newest→oldest order
    // For FORWARD direction, reverse the array to get oldest→newest order
    const direction = options?.direction ?? CommitHistoryDirection.Backward;
    if (direction === CommitHistoryDirection.Forward) {
        commits.reverse();
    }

    // Initialize pagination and filters
    const pagination = new PaginationTracker(
        options?.offset ?? 0,
        options?.limit ?? 50,
    );
    const status_filter = options?.status_filter?.map((s) => String(s)) ?? [];

    // Sliding window processing
    let prevCommitWithRoot: CommitWithRoot | null = null;

    for (const commit of commits) {
        // Resolve entity root for this commit
        const root = await get_entity_root(driver, commit.hash, entity_type, path);
        if (!root) {
            // Entity doesn't exist in this commit (e.g., hive not extracted)
            continue;
        }

        const currentCommitWithRoot: CommitWithRoot = { commit, root };

        // If we have a previous valid commit, we can diff and yield
        if (prevCommitWithRoot) {
            const diff = await processCommitPair(
                driver,
                prevCommitWithRoot,
                currentCommitWithRoot,
                path,
                status_filter,
            );

            if (diff) {
                const action = pagination.process();

                if (action === "yield" || action === "stop") {
                    yield {
                        base_commit: prevCommitWithRoot.commit,
                        diffee_commit: currentCommitWithRoot.commit,
                        diff,
                    };

                    if (action === "stop") {
                        return;
                    }
                }
                // "skip" - continue to next iteration without yielding
            }
        }

        // Slide the window forward
        prevCommitWithRoot = currentCommitWithRoot;
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
    const limit = options?.limit ?? 50;

    // Request one extra entry to determine if more results exist
    const internalOptions: GitLogOptions = {
        ...options,
        limit: limit + 1,
    };

    for await (const entry of git_log_stream(
        driver,
        path,
        entity_type,
        commit_range,
        internalOptions,
    )) {
        entries.push(entry);
    }

    // If we got more than the requested limit, there are more results
    const has_more = entries.length > limit;

    // Trim to the requested limit
    const trimmedEntries = entries.slice(0, limit);

    return {
        total_count: trimmedEntries.length,
        entries: trimmedEntries,
        has_more,
    };
}
