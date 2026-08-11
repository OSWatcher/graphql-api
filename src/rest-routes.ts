import { Router, Request, Response } from "express";
import { Driver } from "neo4j-driver";
import { BlobHashParamSchema } from "./validation.js";
import { ZodError } from "zod";
// Blob download restriction is disabled by default for the open-source
// release -- see the commented-out block below and
// docs/reference/access-restrictions.md. Uncomment to re-enable
// branch-based blocking of Windows-exclusive binaries.
// import { isBlobRestricted } from "./blob-authorization.js";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export const createRestRouter = (
    driver: Driver,
    objectStorageUri: string,
    _restrictedBranchName: string,
    minioAccessKey: string,
    minioSecretKey: string,
    minioObjectsBucketName: string,
) => {
    const router = Router();

    // Create S3 client for authenticated MinIO access
    const s3Client = new S3Client({
        endpoint: objectStorageUri, // MinIO endpoint
        region: "us-east-1", // Default for MinIO (doesn't matter)
        credentials: {
            accessKeyId: minioAccessKey,
            secretAccessKey: minioSecretKey,
        },
        forcePathStyle: true, // Required for MinIO compatibility
    });

    // GET /blob/:hash - Download a blob
    router.get("/:hash", async (req: Request, res: Response) => {
        try {
            // Validate hash parameter
            const { hash } = BlobHashParamSchema.parse(req.params);

            console.log(`Blob download requested: ${hash}`);

            // Blob download restriction (branch-based blocking of
            // Windows-exclusive binaries, per Microsoft redistribution
            // licensing) is disabled by default for the open-source
            // release. Uncomment to re-enable -- see
            // docs/reference/access-restrictions.md.
            //
            // req.auth is populated by express-oauth2-jwt-bearer middleware
            // const permissions = (req as any).auth?.payload?.permissions as
            //     | string[]
            //     | undefined;
            // const hasRestrictedAccess =
            //     permissions?.includes("download:restricted") ?? false;
            //
            // if (!hasRestrictedAccess) {
            //     const restricted = await isBlobRestricted(
            //         driver,
            //         hash,
            //         restrictedBranchName,
            //     );
            //     if (restricted) {
            //         return res.status(403).json({
            //             error: "Forbidden",
            //             message: "This blob is restricted",
            //         });
            //     }
            // }

            // Fetch blob from MinIO using S3 SDK
            const command = new GetObjectCommand({
                Bucket: minioObjectsBucketName,
                Key: hash, // blob hash is the S3 object key
            });

            const s3Response = await s3Client.send(command);

            // Set response headers from S3 metadata
            res.setHeader(
                "Content-Type",
                s3Response.ContentType || "application/octet-stream",
            );
            if (s3Response.ContentLength) {
                res.setHeader(
                    "Content-Length",
                    s3Response.ContentLength.toString(),
                );
            }

            // Forward additional S3 metadata headers if present
            if (s3Response.ContentDisposition) {
                res.setHeader(
                    "Content-Disposition",
                    s3Response.ContentDisposition,
                );
            }
            if (s3Response.ETag) {
                res.setHeader("ETag", s3Response.ETag);
            }
            if (s3Response.LastModified) {
                res.setHeader(
                    "Last-Modified",
                    s3Response.LastModified.toUTCString(),
                );
            }
            if (s3Response.CacheControl) {
                res.setHeader("Cache-Control", s3Response.CacheControl);
            }

            // Stream S3 body to HTTP response
            if (s3Response.Body) {
                // @ts-ignore - Body is a Readable stream in Node.js
                s3Response.Body.pipe(res);
            } else {
                return res.status(500).json({
                    error: "Internal Server Error",
                    message: "Empty response from storage",
                });
            }
        } catch (error: any) {
            console.error("Error in blob download:", error);

            // Return validation errors
            if (error instanceof ZodError) {
                return res.status(400).json({
                    error: "Bad Request",
                    message: "Invalid blob hash format",
                });
            }

            // Handle S3-specific errors
            if (error.name === "NoSuchKey") {
                return res.status(404).json({
                    error: "Not Found",
                    message: "Blob not found in storage",
                });
            }

            // Handle other S3 errors
            if (error.$metadata) {
                return res.status(502).json({
                    error: "Storage Error",
                    message: "Error accessing object storage",
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
