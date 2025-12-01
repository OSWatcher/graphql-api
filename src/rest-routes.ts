import { Router, Request, Response } from "express";
import { Driver } from "neo4j-driver";
import { BlobHashParamSchema } from "./validation.js";
import axios from "axios";
import { ZodError } from "zod";
import { isBlobRestricted } from "./blob-authorization.js";

export const createRestRouter = (
    driver: Driver,
    objectStorageUri: string,
    restrictedBranchName: string,
) => {
    const router = Router();

    // GET /blob/:hash - Download a blob
    router.get("/:hash", async (req: Request, res: Response) => {
        try {
            // Validate hash parameter
            const { hash } = BlobHashParamSchema.parse(req.params);

            console.log(`Blob download requested: ${hash}`);

            // Check authorization: deny access to restricted blobs
            const restricted = await isBlobRestricted(
                driver,
                hash,
                restrictedBranchName,
            );
            if (restricted) {
                return res.status(403).json({
                    error: "Forbidden",
                    message: "This blob is restricted",
                });
            }

            // Construct S3/MinIO URL: {base_url}/objects/{hash}
            const objectUrl = `${objectStorageUri}/objects/${hash}`;

            // Forward the request to S3/MinIO and stream response
            const response = await axios({
                method: "GET",
                url: objectUrl,
                responseType: "stream", // Stream the response
                validateStatus: (status) => status < 500, // Don't throw on 4xx
            });

            // Forward status code and headers
            res.status(response.status);

            // Forward relevant headers (Content-Type, Content-Length, etc.)
            const headersToForward = [
                "content-type",
                "content-length",
                "content-disposition",
                "etag",
                "last-modified",
                "cache-control",
            ];

            headersToForward.forEach((header) => {
                const value = response.headers[header];
                if (value) {
                    res.setHeader(header, value);
                }
            });

            // Stream the content to the client
            response.data.pipe(res);
        } catch (error) {
            console.error("Error in blob download:", error);

            // Return validation errors
            if (error instanceof ZodError) {
                return res.status(400).json({
                    error: "Bad Request",
                    message: "Invalid blob hash format",
                });
            }

            // Handle axios errors
            if (axios.isAxiosError(error)) {
                // If object storage returned an error, forward it
                const status = error.response?.status || 502;
                return res.status(status).json({
                    error: "Storage Error",
                    message:
                        status === 404
                            ? "Blob not found in storage"
                            : "Error accessing object storage",
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
