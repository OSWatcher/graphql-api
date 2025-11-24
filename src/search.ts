import { Driver } from "neo4j-driver";
import { getCommitsInRangeQuery, searchFSInCommitsQuery } from "./queries.js";
import { CommitRange } from "./ogm-types.js";

// Define the structure of the object that each yield will return
type FSSearchResult = {
    commit_name: string;
    commit_hash: string;
    blob_hash: string;
    full_path: string;
};

async function* search_fs_fullpath(
    driver: Driver,
    search_expr: string,
    commit_range: CommitRange,
): AsyncGenerator<FSSearchResult> {
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
            yield {
                commit_name: record.get("commit_name"),
                commit_hash: record.get("commit_hash"),
                blob_hash: record.get("blob_hash"),
                // return absolute path
                full_path: "/" + record.get("full_path"),
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

export { search_fs_fullpath, FSSearchResult };
