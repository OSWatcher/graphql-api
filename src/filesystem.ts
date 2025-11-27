import { Driver } from "neo4j-driver";
import { GET_CHILD_NODE } from "./queries.js";

export async function get_path_entry(
    driver: Driver,
    parent_label: string,
    root_fs_hash: string,
    path: string,
): Promise<string | null> {
    // path should be absolute
    if (!path.startsWith("/")) {
        throw new Error("Path should be absolute");
    }
    if (path === "/") {
        return root_fs_hash;
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
            const query = GET_CHILD_NODE(parent_label);

            // Traverse through the path parts to find the final Tree or Blob
            for (let i = 0; i < pathParts.length - 1; i++) {
                const part = pathParts[i];
                const result = await tx.run(query, {
                    parent_hash: currentParentHash,
                    filename: part,
                });
                const [node] = result.records.map((record) => record.get("c"));

                if (!node) {
                    return null;
                }
                currentParentHash = node.properties.hash;
            }

            // The last part of the path, could be a Tree or Blob
            const lastPart = pathParts[pathParts.length - 1];
            const finalResult = await tx.run(query, {
                parent_hash: currentParentHash,
                filename: lastPart,
            });
            // retrieve the hash and throw an error if no node found
            const [node] = finalResult.records.map((record) => record.get("c"));
            if (!node) {
                return null;
            }

            return node.properties.hash;
        });
    } catch (error) {
        console.error("Error fetching path entry:", error);
        throw error;
    } finally {
        await session.close();
    }
}
