// CREATE CONSTRAINT FOR syntax requires Neo4j 4.4+
// https://neo4j.com/docs/cypher-manual/current/deprecations-additions-removals-compatibility/#cypher-deprecations-additions-removals-4.4

async function createConstraintsIfNotExists(driver) {
    let session = driver.session();
    let prom = session.writeTransaction(tx => {
        let label_array = ["Blob", "Tree", "Commit"];
        for (let label of label_array) {
            tx.run(`
                CREATE CONSTRAINT ${label.toLowerCase()}_hash_unique IF NOT EXISTS
                FOR (n:${label})
                REQUIRE n.hash IS UNIQUE
                `
            );
        }
    })
    try {
        const result = await prom;
    } catch(error) {
        console.log(error);
    } finally {
        session.close();
    }
}

export { createConstraintsIfNotExists };