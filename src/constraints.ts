// CREATE CONSTRAINT FOR syntax requires Neo4j 4.4+
// https://neo4j.com/docs/cypher-manual/current/deprecations-additions-removals-compatibility/#cypher-deprecations-additions-removals-4.4

import { Driver } from "neo4j-driver";
import { createConstraintQuery } from "./queries.js";

async function createConstraintsIfNotExists(driver: Driver) {
    const session = driver.session();
    try {
        await session.executeWrite(async (tx) => {
            const label_array = ["Blob", "Tree", "Commit"];
            const promises = label_array.map((label) =>
                tx.run(createConstraintQuery(label)),
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
