import { Driver } from "neo4j-driver";
import { searchFSFullPathQuery } from "./queries.js";

// Define the structure of the object that each yield will return
type FSSearchResult = {
    commit_name: string;
    commit_hash: string;
    blob_hash: string;
    full_path: string;
};

async function* search_fs_fullpath(
    driver: Driver,
    search_expr: string
): AsyncGenerator<FSSearchResult> {
    // search the filesystem in Neo4j, reconstructing the full path to Blob nodes
    // to search for search_term
    // returns an iterator
    const session = driver.session();

    try {
        const result = await session.executeRead((tx) =>
            tx.run(searchFSFullPathQuery, { search_expr })
        );

        for (const record of result.records) {
            yield {
                commit_name: record.get("commit_name"),
                commit_hash: record.get("commit_hash"),
                blob_hash: record.get("blob_hash"),
                // return absolute path
                full_path: "/" + record.get("full_path"),
            };
        }
    } catch (error) {
        console.error("Error searching filesystem by full path:", error);
        throw error;
    } finally {
        await session.close();
    }
}

export { search_fs_fullpath, FSSearchResult };
