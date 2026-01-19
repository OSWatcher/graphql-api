import { Driver } from "neo4j-driver";
import {
    buildCommitRangeQuery,
    searchFSInCommitsQuery,
    searchRegistryInCommitsQuery,
    searchSymbolInCommitsQuery,
    searchStructInCommitsQuery,
} from "./queries.js";
import {
    CommitRange,
    EntityType,
    CommitHistoryDirection,
} from "./ogm-types.js";
import { resolveRef } from "./commits.js";

// Merge multiple async generators, yielding results as they arrive from any source
async function* mergeAsyncGenerators<T>(
    ...generators: AsyncGenerator<T>[]
): AsyncGenerator<T> {
    const queue: T[] = [];
    let activeCount = generators.length;
    let resolve: (() => void) | null = null;

    // Start consuming all generators in parallel
    const consumers = generators.map(async (gen) => {
        for await (const value of gen) {
            queue.push(value);
            if (resolve) {
                resolve();
                resolve = null;
            }
        }
        activeCount--;
        if (resolve) {
            resolve();
            resolve = null;
        }
    });

    // Yield from queue as values arrive
    while (activeCount > 0 || queue.length > 0) {
        if (queue.length > 0) {
            yield queue.shift()!;
        } else if (activeCount > 0) {
            await new Promise<void>((r) => {
                resolve = r;
            });
        }
    }

    await Promise.all(consumers);
}

// Unified search result type (internal)
type OmniSearchResult = {
    type: EntityType;
    commit_name: string;
    commit_hash: string;
    blob_path: string;
    blob_hash: string;
    entity_path: string | null;
    node_hash: string;
};

// Input for search (internal)
type OmniSearchInput = {
    commit_range: CommitRange;
    search_term: string;
    entity_types?: EntityType[];
    case_sensitive?: boolean;
};

async function* search_fs_fullpath(
    driver: Driver,
    search_expr: string,
    commit_range: CommitRange,
    case_sensitive: boolean = false,
): AsyncGenerator<OmniSearchResult> {
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

    const session = driver.session();
    const tx = session.beginTransaction();

    try {
        // First, get the commits in the specified range
        const commitsResult = await tx.run(query, {
            startHash,
            endHash,
            branch: commit_range.branch,
        });

        const commit_hashes = commitsResult.records.map(
            (record) => record.get("commit").properties.hash,
        );

        // Then search within those commits - using async iteration for streaming
        const result = tx.run(searchFSInCommitsQuery, {
            commit_hashes,
            search_expr,
            case_sensitive,
        });

        // Stream results as they arrive from Neo4j
        for await (const record of result) {
            const full_path = "/" + record.get("full_path");
            const blob_hash = record.get("blob_hash");
            yield {
                type: EntityType.Filesystem,
                commit_name: record.get("commit_name"),
                commit_hash: record.get("commit_hash"),
                blob_path: full_path,
                blob_hash: blob_hash,
                entity_path: null,
                node_hash: blob_hash, // For filesystem, node_hash = blob_hash
            };
        }

        await tx.commit();
    } catch (error) {
        console.error("Error searching filesystem by full path:", error);
        await tx.rollback();
        throw error;
    } finally {
        await session.close();
    }
}

async function* search_registry(
    driver: Driver,
    search_expr: string,
    commit_range: CommitRange,
    case_sensitive: boolean = false,
): AsyncGenerator<OmniSearchResult> {
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

    const session = driver.session();
    const tx = session.beginTransaction();

    try {
        // First, get the commits in the specified range
        const commitsResult = await tx.run(query, {
            startHash,
            endHash,
            branch: commit_range.branch,
        });

        const commit_hashes = commitsResult.records.map(
            (record) => record.get("commit").properties.hash,
        );

        // Then search within those commits - using async iteration for streaming
        const result = tx.run(searchRegistryInCommitsQuery, {
            commit_hashes,
            search_expr,
            case_sensitive,
        });

        // Stream results as they arrive from Neo4j
        for await (const record of result) {
            yield {
                type: EntityType.Registry,
                commit_name: record.get("commit_name"),
                commit_hash: record.get("commit_hash"),
                blob_path: record.get("blob_path"),
                blob_hash: record.get("blob_hash"),
                entity_path: record.get("entity_path"),
                node_hash: record.get("node_hash"),
            };
        }

        await tx.commit();
    } catch (error) {
        console.error("Error searching registry:", error);
        await tx.rollback();
        throw error;
    } finally {
        await session.close();
    }
}

async function* search_symbol(
    driver: Driver,
    search_expr: string,
    commit_range: CommitRange,
    case_sensitive: boolean = false,
): AsyncGenerator<OmniSearchResult> {
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

    const session = driver.session();
    const tx = session.beginTransaction();

    try {
        // First, get the commits in the specified range
        const commitsResult = await tx.run(query, {
            startHash,
            endHash,
            branch: commit_range.branch,
        });

        const commit_hashes = commitsResult.records.map(
            (record) => record.get("commit").properties.hash,
        );

        // Then search symbols within those commits - using async iteration for streaming
        const result = tx.run(searchSymbolInCommitsQuery, {
            commit_hashes,
            search_expr,
            case_sensitive,
        });

        // Stream results as they arrive from Neo4j
        for await (const record of result) {
            yield {
                type: EntityType.Symbol,
                commit_name: record.get("commit_name"),
                commit_hash: record.get("commit_hash"),
                blob_path: record.get("blob_path"),
                blob_hash: record.get("blob_hash"),
                entity_path: record.get("symbol_name"),
                node_hash: record.get("node_hash"),
            };
        }

        await tx.commit();
    } catch (error) {
        console.error("Error searching symbols:", error);
        await tx.rollback();
        throw error;
    } finally {
        await session.close();
    }
}

async function* search_struct(
    driver: Driver,
    search_expr: string,
    commit_range: CommitRange,
    case_sensitive: boolean = false,
): AsyncGenerator<OmniSearchResult> {
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

    const session = driver.session();
    const tx = session.beginTransaction();

    try {
        // First, get the commits in the specified range
        const commitsResult = await tx.run(query, {
            startHash,
            endHash,
            branch: commit_range.branch,
        });

        const commit_hashes = commitsResult.records.map(
            (record) => record.get("commit").properties.hash,
        );

        // Then search structs within those commits - using async iteration for streaming
        const result = tx.run(searchStructInCommitsQuery, {
            commit_hashes,
            search_expr,
            case_sensitive,
        });

        // Stream results as they arrive from Neo4j
        for await (const record of result) {
            yield {
                type: EntityType.Struct,
                commit_name: record.get("commit_name"),
                commit_hash: record.get("commit_hash"),
                blob_path: record.get("blob_path"),
                blob_hash: record.get("blob_hash"),
                entity_path: record.get("entity_path"),
                node_hash: record.get("node_hash"),
            };
        }

        await tx.commit();
    } catch (error) {
        console.error("Error searching structs:", error);
        await tx.rollback();
        throw error;
    } finally {
        await session.close();
    }
}

async function* search(
    driver: Driver,
    input: OmniSearchInput,
): AsyncGenerator<OmniSearchResult> {
    const entityTypes = input.entity_types ?? [
        EntityType.Filesystem,
        EntityType.Registry,
        EntityType.Symbol,
        EntityType.Struct,
    ];
    const caseSensitive = input.case_sensitive ?? false;

    // Build array of generators to run in parallel
    const generators: AsyncGenerator<OmniSearchResult>[] = [];

    for (const entityType of entityTypes) {
        if (entityType === EntityType.Filesystem) {
            generators.push(
                search_fs_fullpath(
                    driver,
                    input.search_term,
                    input.commit_range,
                    caseSensitive,
                ),
            );
        } else if (entityType === EntityType.Registry) {
            generators.push(
                search_registry(
                    driver,
                    input.search_term,
                    input.commit_range,
                    caseSensitive,
                ),
            );
        } else if (entityType === EntityType.Symbol) {
            generators.push(
                search_symbol(
                    driver,
                    input.search_term,
                    input.commit_range,
                    caseSensitive,
                ),
            );
        } else if (entityType === EntityType.Struct) {
            generators.push(
                search_struct(
                    driver,
                    input.search_term,
                    input.commit_range,
                    caseSensitive,
                ),
            );
        }
    }

    // Merge and yield results as they arrive from any source
    yield* mergeAsyncGenerators(...generators);
}

export { search };
