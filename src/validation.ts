import { z } from "zod";
import { CommitHistoryDirection, DiffStatus, EntityType } from "./ogm-types.js";

// Git commit hash validation (40 character hex string)
const GitSHA1Schema = z
    .string()
    .regex(/^[a-f0-9]{40}$/i, "Invalid commit hash format");

// CommitScope enum removed - replaced by direction + include_updates in CommitRange

// Commit history direction enum - map to OGM enum
const CommitHistoryDirectionSchema = z
    .enum(["FORWARD", "BACKWARD"])
    .transform((val) => {
        switch (val) {
            case "FORWARD":
                return CommitHistoryDirection.Forward;
            case "BACKWARD":
                return CommitHistoryDirection.Backward;
            // No default case needed; enum validation ensures only valid values.
        }
    });

// Entity type enum - map to OGM enum
const EntityTypeSchema = z
    .enum(["FILESYSTEM", "REGISTRY", "STRUCT", "SYMBOL"])
    .transform((val) => {
        switch (val) {
            case "FILESYSTEM":
                return EntityType.Filesystem;
            case "REGISTRY":
                return EntityType.Registry;
            case "STRUCT":
                return EntityType.Struct;
            case "SYMBOL":
                return EntityType.Symbol;
            // No default case needed; enum validation ensures only valid values.
        }
    });

// Ref can be commit hash or branch name
const CommitRefSchema = z.string().min(1).max(255);

// Commit range validation
export const CommitRangeSchema = z.object({
    startRef: CommitRefSchema,
    direction: CommitHistoryDirectionSchema.default(
        CommitHistoryDirection.Backward,
    ),
    include_updates: z.boolean().default(false),
    branch: z.string().min(1).max(255).optional().nullable(),
    endRef: CommitRefSchema.optional().nullable(),
});

// Search input validation
export const SearchInputSchema = z.object({
    commit_range: CommitRangeSchema,
    search_term: z
        .string()
        .min(1, "Search term cannot be empty")
        .max(500, "Search term too long (max 500 characters)"),
    entity_types: z.array(EntityTypeSchema).optional(),
    case_sensitive: z.boolean().optional().default(false),
});

// Fetch commit history arguments
export const FetchCommitHistoryArgsSchema = z.object({
    commit_hash: GitSHA1Schema,
    direction: CommitHistoryDirectionSchema.optional(),
});

// Traverse path arguments
export const TraversePathArgsSchema = z.object({
    parent_label: z.enum(["Tree", "Blob", "WinRegKey"]),
    tree_hash: GitSHA1Schema,
    path: z
        .string()
        .min(1, "Path cannot be empty")
        .max(4096, "Path too long")
        .startsWith("/", "Path must be absolute"),
});

// Diff nodes arguments
export const DiffNodesArgsSchema = z.object({
    parent_label: z.enum(["Tree", "Blob", "WinRegKey", "Struct"]),
    base_node_hash: GitSHA1Schema,
    diffee_node_hash: GitSHA1Schema,
    at_path: z.string().startsWith("/", "Path must be absolute"),
    max_depth: z.number().int().min(-1).max(100).nullable().optional(),
    filter: z.array(z.string()).default([]),
    with_intermediates: z.boolean().default(false),
    options: z
        .object({
            limit: z.number().int().positive().max(10000).optional(),
            offset: z.number().int().nonnegative().optional(),
            status_filter: z.array(z.nativeEnum(DiffStatus)).optional(),
        })
        .nullable()
        .optional(),
});

// Get commit capabilities arguments
export const GetCommitCapabilitiesArgsSchema = z.object({
    commit_hash: GitSHA1Schema,
});

// Blob hash validation (SHA-1 format, same as commits)
export const BlobHashParamSchema = z.object({
    hash: GitSHA1Schema,
});

// Blob download arguments (GET /blob/:hash)
export const BlobDownloadArgsSchema = BlobHashParamSchema;

// Blob upload arguments (PUT /blob/:hash)
export const BlobUploadArgsSchema = z.object({
    hash: GitSHA1Schema,
    // Future fields for upload metadata
    // contentType: z.string().optional(),
    // size: z.number().int().positive().optional(),
});
