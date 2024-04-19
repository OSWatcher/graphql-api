import { Driver, Integer } from "neo4j-driver";
import { Commit } from "./ogm-types.js";

async function* fetch_commit_history(
    driver: Driver,
    ogm,
    branch_name: string
): AsyncGenerator<Commit> {
    // search the filesystem in Neo4j, reconstructing the full path to Blob nodes
    // to search for search_term
    // returns an iterator
    const session = driver.session();
    const Commit = ogm.model("Commit");

    try {
        const query = `
            MATCH (b:Branch)-[r:TRACKS_COMMIT|HAS_PREVIOUS*0..]->(c:Commit)
            WHERE b.name = $branch_name
            RETURN c
            LIMIT 100
        `;

        const result = await session.executeRead((tx) =>
            tx.run(query, { branch_name })
        );

        for (const record of result.records) {
            const commitNode = record.get('c');
            const commitProps = commitNode.properties;
            const commit: Commit = {
                hash: commitProps.hash,
                name: commitProps.name,
                date: commitProps.date,
                previousConnection: commitProps.previousConnection,
                filesystem: commitProps.filesystem,
                filesystemConnection: commitProps.filesystemConnection,
            }
            yield commit
        }
    } catch (error) {
        console.error("Error searching filesystem by full path:", error);
        throw error;
    } finally {
        await session.close();
    }
}

export { fetch_commit_history };
