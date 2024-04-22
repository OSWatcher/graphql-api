import { Neo4jGraphQL } from "@neo4j/graphql";
import pkg from "@neo4j/graphql-ogm";
const { OGM } = pkg;
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import neo4j from "neo4j-driver";
import * as dotenv from "dotenv";
import { createConstraintsIfNotExists } from "./constraints.js";
import { resolvers } from "./resolvers.js";

dotenv.config();

if (
    process.env.NEO4J_URI == undefined ||
    process.env.NEO4J_USER == undefined ||
    process.env.NEO4J_PASSWORD == undefined
) {
    throw Error("Invalid env configuration");
}

// Neo4j driver instance
const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

// ensure Neo4j constraints are applied
console.log("Ensure Neo4j constraints are effective");
await createConstraintsIfNotExists(driver);

// we must convert the file Buffer to a UTF-8 string
const typeDefs = readFileSync("./type-defs.graphql").toString("utf-8");

// OGM instance
const ogm = new OGM({ typeDefs, driver });
await ogm.init();

async function main() {
    const neoSchema = new Neo4jGraphQL({ typeDefs, driver, resolvers });

    const server = new ApolloServer({
        schema: await neoSchema.getSchema(),
    });

    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => ({ req }),
        listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at ${url}`);
}

main();

export { driver, ogm };
