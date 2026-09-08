import { GraphqlSdk } from "../graphql/client.js";
import { DiffStatus } from "../graphql/generated/sdk.js";
import { resolveCommitRef } from "./resolve-ref.js";

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
