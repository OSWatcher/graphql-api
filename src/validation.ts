import { z } from "zod";
import { CommitScope } from "./ogm-types.js";

// Git commit hash validation (40 character hex string)
const GitSHA1Schema = z
    .string()
    .regex(/^[a-f0-9]{40}$/i, "Invalid commit hash format");

// Commit scope enum - map to OGM enum
const CommitScopeSchema = z
    .enum(["SINGLE", "HISTORY", "HISTORY_WITH_UPDATES", "RANGE"])
    .transform((val) => {
        switch (val) {
            case "SINGLE":
                return CommitScope.Single;
            case "HISTORY":
                return CommitScope.History;
            case "HISTORY_WITH_UPDATES":
                return CommitScope.HistoryWithUpdates;
            case "RANGE":
                return CommitScope.Range;
            default:
                return val;
        }
    });

// Commit range validation
export const CommitRangeSchema = z
    .object({
        startCommit: GitSHA1Schema,
        scope: CommitScopeSchema,
        endCommit: GitSHA1Schema.optional().nullable(),
    })
    .refine(
        (data) => {
            // If scope is RANGE, endCommit must be provided
            if (data.scope === CommitScope.Range && !data.endCommit) {
                return false;
            }
            return true;
        },
        {
            message: "endCommit is required when scope is RANGE",
            path: ["endCommit"],
        },
    );

// Search arguments validation
export const SearchArgsSchema = z.object({
    commit_range: CommitRangeSchema,
    search_term: z
        .string()
        .min(1, "Search term cannot be empty")
        .max(500, "Search term too long (max 500 characters)"),
});

// Fetch commit history arguments
export const FetchCommitHistoryArgsSchema = z.object({
    commit_hash: GitSHA1Schema,
    direction: z.enum(["FORWARD", "BACKWARD"]).optional(),
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
    parent_label: z.enum(["Tree", "Blob"]),
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
        })
        .nullable()
        .optional(),
});

// Symbol options
export const SymbolOptionsSchema = z.object({
    offset: z.number().int().nonnegative().default(0),
    limit: z.number().int().positive().max(1000).default(100),
});

// Fetch symbols arguments
export const FetchSymbolsArgsSchema = z.object({
    blob_hash: GitSHA1Schema,
    options: SymbolOptionsSchema,
});

// Win struct options
export const WinStructOptionsSchema = z.object({
    offset: z.number().int().nonnegative().default(0),
    limit: z.number().int().positive().max(1000).default(100),
});

// Fetch structs arguments
export const FetchStructsArgsSchema = z.object({
    blob_hash: GitSHA1Schema,
    options: WinStructOptionsSchema,
});

// Get commit capabilities arguments
export const GetCommitCapabilitiesArgsSchema = z.object({
    commit_hash: GitSHA1Schema,
});
