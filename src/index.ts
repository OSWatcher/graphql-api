import { Neo4jGraphQL } from "@neo4j/graphql";
import pkg from "@neo4j/graphql-ogm";
const { OGM } = pkg;
import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import neo4j from "neo4j-driver";
import * as dotenv from "dotenv";
import { createConstraintsIfNotExists } from "./constraints.js";
import { resolvers } from "./resolvers.js";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

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

const POSTHOG_HOST = "https://us.i.posthog.com";
const POSTHOG_PROJECT_API_KEY =
    "phc_LVf2RSEzYw7WlDJJFiUeEW4KxX2ncOFLn2k3WCTof5G";
const isProduction = process.env.NODE_ENV === "production";

async function main() {
    const instanciatedResolvers = resolvers(driver, ogm);
    const neoSchema = new Neo4jGraphQL({
        typeDefs,
        driver,
        resolvers: instanciatedResolvers,
    });

    const server = new ApolloServer({
        schema: await neoSchema.getSchema(),
    });

    // Create Express app
    const app = express();

    // Start Apollo Server
    await server.start();

    // PostHog events endpoint - only in production
    if (isProduction) {
        app.post("/events/*", express.json(), async (req, res) => {
            try {
                const response = await axios.post(
                    `${POSTHOG_HOST}/capture/`,
                    req.body,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${POSTHOG_PROJECT_API_KEY}`,
                        },
                    }
                );
                res.status(response.status).json(response.data);
            } catch (error: unknown) {
                console.error("Error proxying PostHog event:", error);
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "Unknown error occurred";
                res.status(500).json({
                    status: "error",
                    message: errorMessage,
                });
            }
        });
        console.log(`📊 PostHog events endpoint enabled in production`);
    }

    // Apply middleware
    app.use(
        "/graphql",
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ req }),
        })
    );

    // Start the server
    app.listen(4000, () => {
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
        if (isProduction) {
            console.log(
                `📊 PostHog events endpoint ready at http://localhost:4000/events`
            );
        }
    });
}

main();
