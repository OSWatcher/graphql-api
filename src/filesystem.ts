import { Driver } from "neo4j-driver";
import { GET_CHILD_NODE } from "./queries.js";

export type PathEntryResult = {
    hash: string;
    label: string;
} | null;

export async function get_path_entry(
    driver: Driver,
    parent_label: string,
    root_fs_hash: string,
    path: string,
): Promise<PathEntryResult> {
    // path should be absolute
    if (!path.startsWith("/")) {
        throw new Error("Path should be absolute");
    }
    if (path === "/") {
        return { hash: root_fs_hash, label: parent_label };
    }
    // given a node hash and a label, find the child node with the given filename
    const session = driver.session();
    try {
        // Use a transaction to ensure consistency
        return await session.executeRead(async (tx) => {
            // Normalize the path and split into components
            // Split the path by slash and filter out any empty strings
            const pathParts = path.split("/").filter(Boolean);

            let currentParentHash = root_fs_hash;
            let currentQuery = GET_CHILD_NODE(parent_label);

            // Traverse through the path parts to find the final Tree or Blob
            for (let i = 0; i < pathParts.length - 1; i++) {
                const part = pathParts[i];
                const result = await tx.run(currentQuery, {
                    parent_hash: currentParentHash,
                    filename: part,
                });

                if (result.records.length === 0) {
                    return null;
                }

                const record = result.records[0];
                const node = record.get("c");
                const childLabels = record.get("child_labels") as string[];

                if (!node) {
                    return null;
                }

                currentParentHash = node.properties.hash;

                // Use the first label from the child's labels
                const detectedLabel = childLabels[0];

                // Build next query using the detected label
                currentQuery = GET_CHILD_NODE(detectedLabel);
            }

            // The last part of the path, could be a Tree or Blob
            const lastPart = pathParts[pathParts.length - 1];
            const finalResult = await tx.run(currentQuery, {
                parent_hash: currentParentHash,
                filename: lastPart,
            });

            if (finalResult.records.length === 0) {
                return null;
            }

            const finalRecord = finalResult.records[0];
            const finalNode = finalRecord.get("c");
            const finalLabels = finalRecord.get("child_labels") as string[];

            if (!finalNode) {
                return null;
            }

            const finalHash = finalNode.properties.hash;
            const finalLabel = finalLabels[0];

            return { hash: finalHash, label: finalLabel };
        });
    } catch (error) {
        console.error("Error fetching path entry:", error);
        throw error;
    } finally {
        await session.close();
    }
}
