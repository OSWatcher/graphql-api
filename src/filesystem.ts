import { Driver } from "neo4j-driver";

async function get_path_entry(
    driver: Driver,
    root_fs_hash: string,
    path: string
) {
    // given a commit hash and a path, return the Tree or Blob at that path
    // if it exists
    const session = driver.session();
    try {
        // Normalize the path and split into components
        const pathParts = path.split("/");

        let currentParentHash = root_fs_hash;

        // Traverse through the path parts to find the final Tree or Blob
        for (let i = 0; i < pathParts.length - 1; i++) {
            const part = pathParts[i];
            const query = `
            MATCH (p:Tree)-[r:HAS_CHILD_TREE]->(c:Tree)
            WHERE  p.hash = $parent_hash AND r.name = $filename
            RETURN c
            `;
            const result = await session.run(query, {
                parent_hash: currentParentHash,
                filename: part,
            });
            const [node] = result.records.map((record) => record.get("c"));

            if (!node) {
                throw new Error("FileNotFoundError: No such directory " + part);
            }
            currentParentHash = node.properties.hash;
        }

        // The last part of the path, could be a Tree or Blob
        const lastPart = pathParts[pathParts.length - 1];
        const finalQuery = `
        MATCH (p:Tree)-[r:HAS_CHILD_TREE|HAS_CHILD_BLOB]->(c)
        WHERE p.hash = $parent_hash AND r.name = $filename
        RETURN labels(c) AS labels, c.hash AS hash
      `;
        const finalResult = await session.run(finalQuery, {
            parent_hash: currentParentHash,
            filename: lastPart,
        });
        const [finalNode] = finalResult.records.map((record) => ({
            label: record.get("labels")[0],
            hash: record.get("hash"),
        }));

        if (!finalNode) {
            throw new Error(
                "FileNotFoundError: No such file or directory " + lastPart
            );
        }

        return finalNode; // Return the properties of the node
    } catch (error) {
        console.error("Error fetching path entry:", error);
        throw error;
    } finally {
        await session.close();
    }
}

export { get_path_entry };
