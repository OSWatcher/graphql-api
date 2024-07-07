import { Driver } from "neo4j-driver";
import { Commit } from "./ogm-types.js";

async function* fetch_commit_history(
    driver: Driver,
    branch_name: string
): AsyncGenerator<Commit> {
    // search the filesystem in Neo4j, reconstructing the full path to Blob nodes
    // to search for search_term
    // returns an iterator
    const session = driver.session();

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
            const commitNode = record.get("c");
            const commitProps = commitNode.properties;
            const commit: Commit = {
                hash: commitProps.hash,
                name: commitProps.name,
                description: commitProps.description,
                date: commitProps.date,
                previousConnection: commitProps.previousConnection,
                filesystem: commitProps.filesystem,
                filesystemConnection: commitProps.filesystemConnection,
            };
            yield commit;
        }
    } catch (error) {
        console.error("Error searching filesystem by full path:", error);
        throw error;
    } finally {
        await session.close();
    }
}

async function get_commit_capabilities(
    driver: Driver,
    commit_hash: string
): Promise<string[]> {
    const session = driver.session();

    try {
        // get all labels of the commit node
        // also prevent the commit from traversing the other commits through HAS_PREVIOUS
        const query = `
            MATCH path=(c:Commit {hash: $commit_hash})-[*]->(n)
            WHERE NONE(rel IN relationships(path) WHERE type(rel) = 'HAS_PREVIOUS')
            WITH n, labels(n) AS labels_list
            UNWIND labels_list AS label
            RETURN COLLECT(DISTINCT label) AS uniqueLabels
        `;

        const result = await session.executeRead((tx) =>
            tx.run(query, { commit_hash })
        );

        // return list of string (labels)
        return result.records[0].get("uniqueLabels");
    } catch (error) {
        console.error("Error searching filesystem by full path:", error);
        throw error;
    } finally {
        await session.close();
    }
}

export { fetch_commit_history, get_commit_capabilities };
