import { Neo4jGraphQL } from "@neo4j/graphql";
import pkg from "@neo4j/graphql-ogm";
const { OGM } = pkg;
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { readFileSync } from "fs";
import neo4j from "neo4j-driver";
import * as dotenv from "dotenv";
import { cleanEnv, str, url } from "envalid";
import { createConstraintsIfNotExists } from "./constraints.js";
import { resolvers } from "./resolvers.js";
import { createRestRouter } from "./rest-routes.js";
import { filterSensitiveRegistryValues } from "./registry-response-filter.js";
import express, { Request, Response } from "express";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import axios from "axios";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { auth } from "express-oauth2-jwt-bearer";

dotenv.config();

// Validate required environment variables
const env = cleanEnv(process.env, {
    NEO4J_URI: url({ desc: "Neo4j connection URI" }),
    NEO4J_USER: str({ desc: "Neo4j username" }),
    NEO4J_PASSWORD: str({ desc: "Neo4j password" }),
    AUTH0_DOMAIN_URI: url({ desc: "Auth0 domain URI" }),
    AUTH0_AUDIENCE: str({ desc: "Auth0 API audience" }),
    OBJECT_STORAGE_URI: url({ desc: "S3/MinIO object storage endpoint" }),
    RESTRICTED_BRANCH_NAME: str({ desc: "Branch name for restricted blobs" }),
    // Optional environment variables
    POSTHOG_HOST: url({
        default: "https://us.i.posthog.com",
        desc: "PostHog analytics host",
    }),
    POSTHOG_PROJECT_API_KEY: str({
        desc: "PostHog project API key",
    }),
    NODE_ENV: str({
        choices: ["development", "production", "test"],
        default: "development",
        desc: "Node environment",
    }),
    ALLOWED_ORIGINS: str({
        default: "https://oswatcher.github.io,http://127.0.0.1:8080",
        desc: "Comma-separated list of allowed CORS origins",
    }),
    SENSITIVE_REGISTRY_VALUES: str({
        default: "",
        desc: "Comma-separated list of sensitive registry value names to redact",
    }),
});

const checkJwt = auth({
    audience: env.AUTH0_AUDIENCE,
    issuerBaseURL: `${env.AUTH0_DOMAIN_URI}/`,
    authRequired: false, // Allow requests without JWT tokens
});

// Neo4j driver instance
const driver = neo4j.driver(
    env.NEO4J_URI,
    neo4j.auth.basic(env.NEO4J_USER, env.NEO4J_PASSWORD),
);

// ensure Neo4j constraints are applied
console.log("Ensure Neo4j constraints are effective");
await createConstraintsIfNotExists(driver);

// we must convert the file Buffer to a UTF-8 string
const typeDefs = readFileSync("./type-defs.graphql").toString("utf-8");

// OGM instance
const ogm = new OGM({ typeDefs, driver });
await ogm.init();

const isProduction = env.NODE_ENV === "production";

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
            features: {
                authorization: {
                    key: {
                        url: `${env.AUTH0_DOMAIN_URI}/.well-known/jwks.json`,
                    },
                },
            },
            driver,
            resolvers: instanciatedResolvers,
        });

        // Get Neo4j GraphQL schema (supports both queries and subscriptions)
        const schema = await neoSchema.getSchema();

        // Create Express app and HTTP server
        const app = express();
        const httpServer = createServer(app);

        // Track WebSocket connections per IP for rate limiting
        const wsConnections = new Map<string, number>();
        const MAX_WS_CONNECTIONS_PER_IP = 5;

        // Create WebSocket server for subscriptions with security limits
        const wsServer = new WebSocketServer({
            server: httpServer,
            path: "/graphql",
            maxPayload: 100 * 1024, // 100KB max message size
            perMessageDeflate: false, // Prevent compression bombs
        });

        // Set up WebSocket subscription handler with security
        const serverCleanup = useServer(
            {
                schema,
                context: async (_ctx) => {
                    return {};
                },
                onConnect: async (ctx) => {
                    // Rate limit connections per IP
                    const ip =
                        ctx.extra.request.socket.remoteAddress || "unknown";
                    const currentConnections = wsConnections.get(ip) || 0;

                    if (currentConnections >= MAX_WS_CONNECTIONS_PER_IP) {
                        console.warn(
                            `WebSocket connection limit exceeded for IP: ${ip}`,
                        );
                        return false; // Reject connection
                    }

                    wsConnections.set(ip, currentConnections + 1);
                    console.log(
                        `WebSocket connected from ${ip} (${currentConnections + 1}/${MAX_WS_CONNECTIONS_PER_IP})`,
                    );
                    return true;
                },
                onDisconnect: async (ctx) => {
                    // Clean up connection tracking
                    const ip =
                        ctx.extra.request.socket.remoteAddress || "unknown";
                    const currentConnections = wsConnections.get(ip) || 1;
                    if (currentConnections <= 1) {
                        wsConnections.delete(ip);
                    } else {
                        wsConnections.set(ip, currentConnections - 1);
                    }
                    console.log(
                        `WebSocket disconnected from ${ip} (${currentConnections - 1} remaining)`,
                    );
                },
                onError: (ctx, message, errors) => {
                    console.error("WebSocket error:", message, errors);
                },
            },
            wsServer,
        );

        const server = new ApolloServer({
            schema,
            plugins: [
                // Plugin to filter branches based on authentication
                {
                    async requestDidStart() {
                        return {
                            async willSendResponse({
                                response,
                                contextValue,
                            }: any) {
                                // Only filter branches query responses
                                if (
                                    response?.body?.kind === "single" &&
                                    response.body.singleResult?.data?.branches
                                ) {
                                    const isAuthenticated =
                                        contextValue.jwt?.payload?.sub;

                                    // If unauthenticated, filter to free tier branches (ubuntu only)
                                    if (!isAuthenticated) {
                                        response.body.singleResult.data.branches =
                                            response.body.singleResult.data.branches.filter(
                                                (branch: any) =>
                                                    branch.name
                                                        .toLowerCase()
                                                        .includes("ubuntu"),
                                            );
                                    }
                                }
                            },
                        };
                    },
                },
                // Filter sensitive registry values from responses
                {
                    async requestDidStart() {
                        return {
                            async willSendResponse({ response }: any) {
                                if (
                                    response?.body?.kind === "single" &&
                                    response.body.singleResult?.data
                                ) {
                                    try {
                                        filterSensitiveRegistryValues(
                                            response.body.singleResult.data,
                                        );
                                    } catch (error) {
                                        console.error(
                                            "Registry filter error:",
                                            error,
                                        );
                                        // Fail-open: don't break API if filtering fails
                                    }
                                }
                            },
                        };
                    },
                },
                ApolloServerPluginDrainHttpServer({ httpServer }),
                {
                    async serverWillStart() {
                        return {
                            async drainServer() {
                                await serverCleanup.dispose();
                            },
                        };
                    },
                },
            ],
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
                // Log full error details for debugging (server-side only)
                console.error("GraphQL Error:", {
                    message: err.message,
                    path: err.path,
                    extensions: err.extensions,
                });

                // Sanitize error messages to prevent information disclosure
                const isSensitiveError =
                    err.message.includes("Neo4j") ||
                    err.message.includes("Cypher") ||
                    err.message.includes("database") ||
                    err.message.includes("driver") ||
                    err.message.includes("session") ||
                    err.message.includes("transaction");

                if (isSensitiveError) {
                    // Return generic error, hide internal details
                    return {
                        message: "An internal error occurred",
                        extensions: {
                            code:
                                err.extensions?.code || "INTERNAL_SERVER_ERROR",
                        },
                    };
                }

                // For validation errors (from Zod), return helpful messages
                if (err.extensions?.code === "BAD_USER_INPUT") {
                    return {
                        message: err.message,
                        extensions: {
                            code: "BAD_USER_INPUT",
                            // Don't include stack traces or internal details
                        },
                    };
                }

                // In production, always hide stack traces
                if (isProduction) {
                    return {
                        message: err.message,
                        extensions: {
                            code:
                                err.extensions?.code || "INTERNAL_SERVER_ERROR",
                        },
                    };
                }

                // In development, return error but still sanitize stack traces
                return {
                    message: err.message,
                    extensions: {
                        code: err.extensions?.code,
                        // Stack traces only in development logs, not to client
                    },
                };
            },
        });

        // Start Apollo Server
        await server.start();

        // PostHog events endpoint - only in production
        if (isProduction && env.POSTHOG_PROJECT_API_KEY) {
            app.use(
                "/events",
                cors({
                    origin: env.ALLOWED_ORIGINS.split(","),
                    credentials: true,
                }),
                express.raw({ type: "*/*", limit: "10mb" }),
                async (req: Request, res: Response) => {
                    try {
                        const posthogPath = req.originalUrl.replace(
                            "/events",
                            "",
                        );
                        const fullUrl = `${env.POSTHOG_HOST}${posthogPath}`;

                        // Forward the request exactly as received
                        const response = await axios({
                            method: req.method,
                            url: fullUrl,
                            data: req.body,
                            headers: {
                                ...req.headers,
                                host: new URL(env.POSTHOG_HOST).host,
                                Authorization: `Bearer ${env.POSTHOG_PROJECT_API_KEY}`,
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

        // Blob REST API - mounted before GraphQL
        app.use(
            "/blob",
            cors({
                origin: env.ALLOWED_ORIGINS.split(","),
                credentials: true,
            }),
            createRateLimit(100, 60000), // 100 requests per minute
            express.json({ limit: "1mb" }),
            // Auth0 middleware: validates token, adds req.auth
            checkJwt,
            createRestRouter(
                driver,
                env.OBJECT_STORAGE_URI,
                env.RESTRICTED_BRANCH_NAME,
            ),
        );

        // Apply middleware
        app.use(
            "/graphql",
            cors({
                origin: env.ALLOWED_ORIGINS.split(","),
                credentials: true,
            }),
            createRateLimit(100, 60000), // 100 requests per minute
            express.json({ limit: "1mb" }),
            // Auth0 middleware: validates token, adds req.auth
            checkJwt,
            expressMiddleware(server, {
                context: async ({ req }: { req: Request }) => ({
                    req,
                    jwt: req.auth,
                    permissions: req.auth?.payload.permissions,
                }),
            }),
        );

        // Start the server (using httpServer to support both HTTP and WebSocket)
        httpServer.listen(4000, () => {
            console.log(`🚀 Server ready at http://localhost:4000/graphql`);
            console.log(`🔌 WebSocket ready at ws://localhost:4000/graphql`);
            console.log(`📦 Blob API ready at http://localhost:4000/blob`);
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
