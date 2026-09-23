import { z } from "zod";
import { GraphqlSdk } from "../graphql/client.js";
import { DiffStatus } from "../graphql/generated/sdk.js";
import { defineTool } from "../types.js";

export interface DiffNodesResultItem {
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

export interface DiffNodesResult {
    total_count: number;
    items: DiffNodesResultItem[];
}

interface DiffNodesParams {
    sdk: GraphqlSdk;
    base_node_hash: string;
    diffee_node_hash: string;
    parent_label: string;
    filter: string[];
    at_path?: string;
    max_depth?: number;
    limit?: number;
    offset?: number;
    status_filter?: string[];
    with_intermediates?: boolean;
}

function mapStatusFilter(statusFilter?: string[]): DiffStatus[] | undefined {
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

export async function diffNodes(
    params: DiffNodesParams,
): Promise<DiffNodesResult> {
    const { sdk } = params;

    const response = await sdk.DiffNodesAt({
        parentLabel: params.parent_label,
        baseNodeHash: params.base_node_hash,
        diffeeNodeHash: params.diffee_node_hash,
        atPath: params.at_path ?? "/",
        maxDepth: params.max_depth,
        withIntermediates: params.with_intermediates ?? false,
        filter: params.filter,
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
    name: "diff_nodes",
    description: `Lower-level diff operating on raw node hashes: any entity type (filesystem Tree/Blob, registry WinRegKey, symbols, structs).

Unlike diff_versions (which resolves refs and is filesystem-only), this tool accepts raw node hashes and an explicit parent_label + filter.

parent_label and filter combinations:
  Entity        | parent_label  | filter                          | max_depth
  --------------|---------------|---------------------------------|----------
  Filesystem    | Tree          | ["Tree", "Blob"]                | (omit)
  Registry      | WinRegKey     | ["WinRegKey", "WinRegValue"]    | (omit)
  Symbols       | Blob          | ["Symbol"]                      | 1 (required)
  Structs list  | Blob          | ["Struct"]                      | 1 (required)
  Struct fields | Blob          | ["StructField"]                 | 1 (required)

IMPORTANT: Always pass an explicit filter (an empty filter silently drops leaf nodes).

IMPORTANT: max_depth=1 is required for Symbol, Struct, and StructField diffs. Without it
the procedure recurses into children looking for the same label type and returns nothing
(Symbol/Struct/StructField nodes have no children of the same label).

For struct field diffs scoped to a specific struct, pass at_path with the struct name:
  at_path="/_EPROCESS"  (note the leading slash)

Struct field status_filter guidance:
- Omit status_filter (or use ["NEW","MOD","DEL"]) for delta-only: what changed
- Pass status_filter=["NEW","MOD","DEL","UNCHANGED"] to reconstruct the full C type layout

Prefer get_struct / list_tree / list_registry_key / list_symbols unless you need raw hash access.`,
    schema: {
        base_node_hash: z
            .string()
            .min(1)
            .describe(
                "Base side node hash (from traverse_path or get_blobs_with_symbols)",
            ),
        diffee_node_hash: z
            .string()
            .min(1)
            .describe(
                "Diffee side node hash (from traverse_path or get_blobs_with_symbols)",
            ),
        parent_label: z
            .string()
            .min(1)
            .describe("Node label of the root: 'Tree', 'WinRegKey', or 'Blob'"),
        filter: z
            .array(z.string())
            .min(1)
            .describe("Node labels to include in results (must not be empty)"),
        at_path: z
            .string()
            .optional()
            .describe(
                "Scope diff to a sub-path (default: '/'). For struct fields use e.g. '/_EPROCESS'",
            ),
        max_depth: z
            .number()
            .int()
            .min(0)
            .max(100)
            .optional()
            .describe("Depth of child traversal"),
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
            .describe("Number of diff items to skip"),
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
    handler: (sdk, params) => diffNodes({ ...params, sdk }),
});
