import { Driver } from "neo4j-driver";
import {
    getCommitsInRangeQuery,
    searchFSInCommitsQuery,
    searchRegistryInCommitsQuery,
} from "./queries.js";
import { CommitRange, SearchEntityType } from "./ogm-types.js";

// Unified search result type (internal)
type OmniSearchResult = {
    type: SearchEntityType;
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
    entity_types?: SearchEntityType[];
};

async function* search_fs_fullpath(
    driver: Driver,
    search_expr: string,
    commit_range: CommitRange,
): AsyncGenerator<OmniSearchResult> {
    const session = driver.session();
    const tx = session.beginTransaction();

    try {
        // First, get the commits in the specified range
        const commitsResult = await tx.run(getCommitsInRangeQuery, {
            startCommit: commit_range.startCommit,
            scope: commit_range.scope,
            endCommit: commit_range.endCommit,
        });

        const commit_hashes = commitsResult.records.map(
            (record) => record.get("commit").properties.hash,
        );

        // Then search within those commits - using async iteration for streaming
        const result = tx.run(searchFSInCommitsQuery, {
            commit_hashes,
            search_expr,
        });

        // Stream results as they arrive from Neo4j
        for await (const record of result) {
            const full_path = "/" + record.get("full_path");
            const blob_hash = record.get("blob_hash");
            yield {
                type: SearchEntityType.Filesystem,
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
): AsyncGenerator<OmniSearchResult> {
    const session = driver.session();
    const tx = session.beginTransaction();

    try {
        // First, get the commits in the specified range
        const commitsResult = await tx.run(getCommitsInRangeQuery, {
            startCommit: commit_range.startCommit,
            scope: commit_range.scope,
            endCommit: commit_range.endCommit,
        });

        const commit_hashes = commitsResult.records.map(
            (record) => record.get("commit").properties.hash,
        );

        // Then search within those commits - using async iteration for streaming
        const result = tx.run(searchRegistryInCommitsQuery, {
            commit_hashes,
            search_expr,
        });

        // Stream results as they arrive from Neo4j
        for await (const record of result) {
            yield {
                type: SearchEntityType.Registry,
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

async function* search(
    driver: Driver,
    input: OmniSearchInput,
): AsyncGenerator<OmniSearchResult> {
    // Determine which entity types to search
    const entityTypes = input.entity_types ?? [
        SearchEntityType.Filesystem,
        SearchEntityType.Registry,
    ];

    // Search each entity type and yield results
    for (const entityType of entityTypes) {
        if (entityType === SearchEntityType.Filesystem) {
            yield* search_fs_fullpath(
                driver,
                input.search_term,
                input.commit_range,
            );
        } else if (entityType === SearchEntityType.Registry) {
            yield* search_registry(
                driver,
                input.search_term,
                input.commit_range,
            );
        }
    }
}

export { search };
