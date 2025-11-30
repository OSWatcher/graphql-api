import { Router, Request, Response } from "express";
import { Driver } from "neo4j-driver";
import { BlobHashParamSchema } from "./validation.js";

export const createBlobRouter = (driver: Driver) => {
    const router = Router();

    // GET /blob/:hash - Download a blob
    router.get("/:hash", async (req: Request, res: Response) => {
        try {
            // Validate hash parameter
            const { hash } = BlobHashParamSchema.parse(req.params);

            // Access JWT context (populated by Auth0 middleware)
            const jwt = req.auth;
            const isAuthenticated = jwt?.payload?.sub;

            // TODO: Implement authorization logic using Neo4j
            // 1. Query Neo4j to find commits connected to this blob
            // 2. Determine OS type from commit names/capabilities
            // 3. Apply authorization rules:
            //    - Allow if any commit is Ubuntu/Linux
            //    - Deny if all commits are Windows-only
            //    - Deny if no commits found

            // TODO: Implement S3 download
            // 1. Get blob from S3/MinIO using hash
            // 2. Stream content to client with appropriate headers

            console.log(`Blob download requested: ${hash}`);
            console.log(`Authenticated: ${isAuthenticated}`);
            console.log(`Driver available: ${!!driver}`);

            res.status(501).json({
                error: "Not Implemented",
                message: "Blob download endpoint is not yet implemented",
                hash,
            });
        } catch (error) {
            console.error("Error in blob download:", error);

            // Return validation errors
            if (error instanceof Error && error.name === "ZodError") {
                return res.status(400).json({
                    error: "Bad Request",
                    message: "Invalid blob hash format",
                });
            }

            res.status(500).json({
                error: "Internal Server Error",
                message: "An error occurred while processing the request",
            });
        }
    });

    return router;
};
