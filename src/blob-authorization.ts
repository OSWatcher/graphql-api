import { Driver } from "neo4j-driver";
import { CHECK_BLOB_RESTRICTED_QUERY } from "./queries.js";

/**
 * Check if a blob is restricted (only belongs to commits in restricted branches)
 *
 * @param driver Neo4j driver instance
 * @param blobHash SHA-1 hash of the blob to check
 * @param restrictedBranchName Name of the branch containing restricted commits (e.g., "windows-10")
 * @returns true if blob is restricted (belongs ONLY to restricted commits), false if available for download
 */
export async function isBlobRestricted(
    driver: Driver,
    blobHash: string,
    restrictedBranchName: string,
): Promise<boolean> {
    const session = driver.session();

    try {
        const result = await session.executeRead(async (tx) => {
            return tx.run(CHECK_BLOB_RESTRICTED_QUERY, {
                blob_hash: blobHash,
                branch_name: restrictedBranchName,
            });
        });

        const isRestricted = result.records[0].get("is_restricted");
        return isRestricted === true;
    } catch (error) {
        console.error("Error checking blob authorization:", error);
        // Fail safe: on error, treat as restricted
        return true;
    } finally {
        await session.close();
    }
}
