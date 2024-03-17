import { Neo4jGraphQL } from "@neo4j/graphql";
import pkg from '@neo4j/graphql-ogm';
const { OGM } = pkg;
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from "fs";
import neo4j from "neo4j-driver";
import * as dotenv from "dotenv";
import { createConstraintsIfNotExists } from "./constraints.js";
import { diffTreesRecursive } from "./diff.js";

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
createConstraintsIfNotExists(driver);

// we must convert the file Buffer to a UTF-8 string
const typeDefs = readFileSync("./type-defs.graphql").toString("utf-8");

// OGM instance
const ogm = new OGM({ typeDefs, driver });

const resolvers = {
    Query: {
        async diffCommits(_source, { base_commit_hash, diffee_commit_hash }) {
            // find Commits based on hash
            const Commit = ogm.model("Commit");
            try {
                const arr_commit = await Promise.all(
                    [base_commit_hash, diffee_commit_hash].map(async (hash) => {
                        // select filesystem relationship and get the root Tree hash
                        const selectionSet = `
                        {
                        hash
                        filesystem {
                            hash
                        }
                        }`;
                        return Commit.find({
                            selectionSet,
                            where: {
                                hash,
                            },
                        }).then((result) => {
                            if (!result) {
                                throw new Error(
                                    `Commit hash ${hash} doesn't exists !`
                                );
                            }
                            return result[0];
                        });
                    })
                );
                // get root trees hash
                const [base_root_hash, diffee_root_hash] = arr_commit.map(
                    (com) => com["filesystem"]["hash"]
                );
                // TODO: diff them recursively
                const diff_result = await diffTreesRecursive(
                    driver,
                    "/",
                    base_root_hash,
                    diffee_root_hash
                );

                return {
                    newitems: diff_result["newitems_path"],
                    delitems: diff_result["delitems_path"],
                    moditems: diff_result["moditems_path"],
                };
            } catch (error) {
                console.error("Error in diffCommits: ", error);
                throw new Error(
                    "An error occurred while processing the request."
                );
            }
        },
    },
    Mutation: {
        async mergeTree(_source, { input }) {
            const session = driver.session();
            const prom = session.writeTransaction((tx) => {
                // merge parent tree
                tx.run("MERGE (parent:Tree {hash: $hash})", {
                    hash: input["hash"],
                });
                if ("child_blobs" in input) {
                    // merge blobs with relationships
                    tx.run(
                        `
                        MATCH (p:Tree {hash: $parent_hash})
                        WITH p
                        UNWIND $unwind_param as rel
                        MERGE (c:Blob {hash: rel.node.hash})
                        MERGE (p)-[:HAS_CHILD_BLOB {name: rel.edge.name}]->(c)
                    `,
                        {
                            parent_hash: input["hash"],
                            unwind_param: input["child_blobs"]["create"],
                        }
                    );
                }
                if ("child_trees" in input) {
                    // merge trees with relationships
                    tx.run(
                        `
                        MATCH (p:Tree {hash: $parent_hash})
                        WITH p
                        UNWIND $unwind_param as rel
                        MERGE (c:Tree {hash: rel.node.hash})
                        MERGE (p)-[:HAS_CHILD_TREE {name: rel.edge.name}]->(c)
                    `,
                        {
                            parent_hash: input["hash"],
                            unwind_param: input["child_trees"]["create"],
                        }
                    );
                }
            });
            try {
                await prom;
            } catch (error) {
                console.log(error);
            } finally {
                session.close();
            }
            return "hello";
        },
    },
};

const neoSchema = new Neo4jGraphQL({ typeDefs, driver, resolvers });

const server = new ApolloServer({
    schema: await neoSchema.getSchema(),
});

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ req }),
    listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
