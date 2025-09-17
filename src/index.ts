import { Neo4jGraphQL } from "@neo4j/graphql";
import pkg from "@neo4j/graphql-ogm";
const { OGM } = pkg;
import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";
import neo4j from "neo4j-driver";
import * as dotenv from "dotenv";
import { createConstraintsIfNotExists } from "./constraints.js";
import { resolvers } from "./resolvers.js";
import express, { Request, Response } from "express";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
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
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
);

// ensure Neo4j constraints are applied
console.log("Ensure Neo4j constraints are effective");
await createConstraintsIfNotExists(driver);

// we must convert the file Buffer to a UTF-8 string
const typeDefs = readFileSync("./type-defs.graphql").toString("utf-8");

// OGM instance
const ogm = new OGM({ typeDefs, driver });
await ogm.init();

const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.i.posthog.com";
const POSTHOG_PROJECT_API_KEY = process.env.POSTHOG_PROJECT_API_KEY;
const isProduction = process.env.NODE_ENV === "production";

// Simple in-memory rate limiter
const rateLimiter = new Map<string, { count: number; resetTime: number }>();

const createRateLimit = (maxRequests: number, windowMs: number) => {
    return (req: Request, res: Response, next: Function) => {
        const clientId = req.ip || req.headers["x-forwarded-for"] || "unknown";
        const now = Date.now();
        const key = String(clientId);

        const clientData = rateLimiter.get(key);

        // Reset window if expired
        if (!clientData || now > clientData.resetTime) {
            rateLimiter.set(key, { count: 1, resetTime: now + windowMs });
            return next();
        }

        // Check if limit exceeded
        if (clientData.count >= maxRequests) {
            return res.status(429).json({
                error: "Too many requests. Please try again later.",
                retryAfter: Math.ceil((clientData.resetTime - now) / 1000),
            });
        }

        // Increment count
        clientData.count++;
        next();
    };
};

async function main() {
    try {
        const instanciatedResolvers = resolvers(driver, ogm);
        const neoSchema = new Neo4jGraphQL({
            typeDefs,
            driver,
            resolvers: instanciatedResolvers,
        });

        const server = new ApolloServer({
            schema: await neoSchema.getSchema(),
            validationRules: [
                // Prevent complex queries by limiting field count
                (context: any) => {
                    let fieldCount = 0;
                    return {
                        Field() {
                            fieldCount++;
                            if (fieldCount > 100) {
                                // Max 100 fields per query
                                context.reportError(
                                    new Error(
                                        "Query complexity exceeded: too many fields requested",
                                    ),
                                );
                            }
                        },
                    };
                },
            ],
            formatError: (err) => {
                // Log full error details for debugging
                console.error("GraphQL Error:", err);

                // In production, hide sensitive error details
                if (isProduction) {
                    // Only return generic error for unknown errors
                    if (
                        err.message.includes("Neo4j") ||
                        err.message.includes("Cypher") ||
                        err.message.includes("database") ||
                        err.message.includes("driver")
                    ) {
                        return new Error("Internal server error");
                    }
                }

                return err;
            },
        });

        // Create Express app
        const app = express();

        // Start Apollo Server
        await server.start();

        // PostHog events endpoint - only in production
        if (isProduction && POSTHOG_PROJECT_API_KEY) {
            app.use(
                "/events",
                cors({
                    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
                        "https://oswatcher.github.io",
                    ],
                    credentials: true,
                }),
                express.raw({ type: "*/*", limit: "10mb" }),
                async (req: Request, res: Response) => {
                    try {
                        const posthogPath = req.originalUrl.replace(
                            "/events",
                            "",
                        );
                        const fullUrl = `${POSTHOG_HOST}${posthogPath}`;

                        // Forward the request exactly as received
                        const response = await axios({
                            method: req.method,
                            url: fullUrl,
                            data: req.body,
                            headers: {
                                ...req.headers,
                                host: new URL(POSTHOG_HOST).host,
                                Authorization: `Bearer ${POSTHOG_PROJECT_API_KEY}`,
                            },
                            decompress: false,
                        });

                        // Forward the response exactly as received
                        res.status(response.status);
                        Object.entries(response.headers).forEach(
                            ([key, value]) => {
                                res.setHeader(key, value);
                            },
                        );
                        res.send(response.data);
                    } catch (error: unknown) {
                        // Log full error for debugging but don't expose details
                        console.error("Error proxying PostHog event:", error);
                        res.status(502).json({
                            error: "Service temporarily unavailable",
                        });
                    }
                },
            );
            console.log(`📊 PostHog events endpoint enabled in production`);
        }

        // Apply middleware
        app.use(
            "/graphql",
            cors({
                origin: process.env.ALLOWED_ORIGINS?.split(",") || [
                    "https://oswatcher.github.io",
                    "http://127.0.0.1:8080",
                ],
                credentials: true,
            }),
            createRateLimit(100, 60000), // 100 requests per minute
            express.json({ limit: "1mb" }),
            expressMiddleware(server, {
                context: async ({ req }: { req: Request }) => ({ req }),
            }),
        );

        // Start the server
        app.listen(4000, () => {
            console.log(`🚀 Server ready at http://localhost:4000/graphql`);
            if (isProduction) {
                console.log(
                    `📊 PostHog events endpoint ready at http://localhost:4000/events`,
                );
            }
        });
    } catch (error) {
        console.error("❌ Server startup failed:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        process.exit(1);
    }
}

main().catch((error) => {
    console.error("❌ Unhandled error in main():", error);
    process.exit(1);
});
