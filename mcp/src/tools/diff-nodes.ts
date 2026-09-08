import { GraphqlSdk } from "../graphql/client.js";
import { DiffStatus } from "../graphql/generated/sdk.js";

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
