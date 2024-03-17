// CREATE CONSTRAINT FOR syntax requires Neo4j 4.4+
// https://neo4j.com/docs/cypher-manual/current/deprecations-additions-removals-compatibility/#cypher-deprecations-additions-removals-4.4

import { Driver } from "neo4j-driver";

async function createConstraintsIfNotExists(driver: Driver) {
    const session = driver.session();
    try {
        await session.writeTransaction(async (tx) => {
            const label_array = ["Blob", "Tree", "Commit"];
            const promises = label_array.map((label) =>
                tx.run(`
                CREATE CONSTRAINT ${label.toLowerCase()}_hash_unique IF NOT EXISTS
                FOR (n:${label})
                REQUIRE n.hash IS UNIQUE
            `)
            );
            await Promise.all(promises);
        });
    } catch (error) {
        console.log(error);
    } finally {
        session.close();
    }
}

export { createConstraintsIfNotExists };
