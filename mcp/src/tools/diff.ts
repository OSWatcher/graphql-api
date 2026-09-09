import { z } from "zod";
import { DiffStatus } from "../graphql/generated/sdk.js";
import { resolveCommitRef } from "../resolve.js";
import { defineTool } from "../types.js";
import type { GraphqlSdk } from "../graphql/client.js";

export interface DiffVersionsResultItem {
    status: DiffStatus;
    path: string;
    type: string;
    old_props: {
        hash: string;
        properties: unknown;
    } | null;
    new_props: {
        hash: string;
        properties: unknown;
    } | null;
}

export interface DiffVersionsResult {
    base_commit_hash: string;
    diffee_commit_hash: string;
    total_count: number;
    items: DiffVersionsResultItem[];
}

interface DiffVersionsParams {
    sdk: GraphqlSdk;
    base_ref: string;
    diffee_ref: string;
    path: string;
    max_depth?: number;
    limit?: number;
    offset?: number;
    status_filter?: string[];
    with_intermediates?: boolean;
}

function mapStatusFilter(
    statusFilter?: string[],
): DiffStatus[] | null | undefined {
    if (!statusFilter || statusFilter.length === 0) {
        return undefined;
    }

    const mapping: Record<string, DiffStatus> = {
        NEW: DiffStatus.New,
        MOD: DiffStatus.Mod,
        DEL: DiffStatus.Del,
        UNCHANGED: DiffStatus.Unchanged,
    };

    return statusFilter.map((status) => {
        const upper = status.toUpperCase();
        const mapped = mapping[upper];
        if (!mapped) {
            throw new Error(
                `Invalid diff status "${status}". Valid statuses: NEW, MOD, DEL, UNCHANGED`,
            );
        }
        return mapped;
    });
}

export async function diffVersions(
    params: DiffVersionsParams,
): Promise<DiffVersionsResult> {
    const { sdk } = params;
    const [base, diffee] = await Promise.all([
        resolveCommitRef(sdk, params.base_ref),
        resolveCommitRef(sdk, params.diffee_ref),
    ]);

    const response = await sdk.DiffNodesAt({
        parentLabel: "Tree",
        baseNodeHash: base.filesystemHash,
        diffeeNodeHash: diffee.filesystemHash,
        atPath: params.path,
        maxDepth: params.max_depth,
        withIntermediates: params.with_intermediates ?? false,
        filter: ["Tree", "Blob"],
        options:
            params.limit !== undefined ||
            params.offset !== undefined ||
            params.status_filter?.length
                ? {
                      limit: params.limit,
                      offset: params.offset,
                      status_filter: mapStatusFilter(params.status_filter),
                  }
                : undefined,
    });

    return {
        base_commit_hash: base.commitHash,
        diffee_commit_hash: diffee.commitHash,
        total_count: response.diffNodesAt.total_count,
        items: response.diffNodesAt.items.map((item) => ({
            status: item.status,
            path: item.path,
            type: item.type,
            old_props: item.old_props
                ? {
                      hash: item.old_props.hash,
                      properties: item.old_props.properties,
                  }
                : null,
            new_props: item.new_props
                ? {
                      hash: item.new_props.hash,
                      properties: item.new_props.properties,
                  }
                : null,
        })),
    };
}

export default defineTool({
    name: "diff_versions",
    description:
        "Compute a filesystem diff between two commits or branches at a specific path",
    schema: {
        base_ref: z
            .string()
            .min(1)
            .describe(
                "Older side of the comparison: commit hash or branch name",
            ),
        diffee_ref: z
            .string()
            .min(1)
            .describe(
                "Newer side of the comparison: commit hash or branch name",
            ),
        path: z
            .string()
            .startsWith("/")
            .describe(
                "Absolute filesystem path to diff, e.g. '/' or '/Windows/System32'",
            ),
        max_depth: z
            .number()
            .int()
            .min(0)
            .max(100)
            .optional()
            .describe(
                "Depth of child traversal. If omitted, GraphQL applies its own default and auth rules.",
            ),
        limit: z
            .number()
            .int()
            .positive()
            .max(10000)
            .optional()
            .describe("Maximum number of diff items to return"),
        offset: z
            .number()
            .int()
            .nonnegative()
            .optional()
            .describe("Number of diff items to skip before returning results"),
        status_filter: z
            .array(z.enum(["NEW", "MOD", "DEL", "UNCHANGED"]))
            .optional()
            .describe("Optional diff statuses to include"),
        with_intermediates: z
            .boolean()
            .optional()
            .describe(
                "Include intermediary directory nodes in recursive diffs",
            ),
    },
    handler: (sdk, params) => diffVersions({ ...params, sdk }),
});
