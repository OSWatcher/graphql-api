import path from "path";
import { Driver, QueryResult, RecordShape } from "neo4j-driver";
import { NODES_DIFF_QUERY } from "../queries.js";
import { getNodeTypeFromLabel, getDiffStatusFromString } from "./utils.js";
import { DiffItem, DiffNodesAtResult } from "../ogm-types.js";
import { get_path_entry } from "../filesystem.js";

/**
 * Parameters for diffNodesAtInternal
 */
export interface DiffNodesAtParams {
    parent_label: string;
    base_node_hash: string | null;
    diffee_node_hash: string | null;
    at_path: string;
    max_depth: number; // -1 for unlimited, 0 for single level
    filter: string[];
    with_intermediates: boolean;
    options?: {
        limit?: number;
        offset?: number;
        status_filter?: string[]; // Already converted to strings
    } | null;
}

/**
 * Core diff logic extracted from diffNodesAt resolver.
 * Handles path resolution and calls the stored procedure for diffing.
 *
 * @param driver Neo4j driver instance
 * @param params Diff parameters
 * @returns DiffNodesAtResult with items and total_count
 */
export async function diffNodesAtInternal(
    driver: Driver,
    params: DiffNodesAtParams,
): Promise<DiffNodesAtResult> {
    const {
        parent_label,
        base_node_hash,
        diffee_node_hash,
        at_path,
        max_depth,
        filter,
        with_intermediates,
        options,
    } = params;

    // Traverse the given path on both sides with get_path_entry()
    const [base_entry_result, diffee_entry_result] = await Promise.all([
        base_node_hash
            ? get_path_entry(driver, parent_label, base_node_hash, at_path)
            : Promise.resolve(null),
        diffee_node_hash
            ? get_path_entry(driver, parent_label, diffee_node_hash, at_path)
            : Promise.resolve(null),
    ]);

    // Extract hashes
    const base_entry_at = base_entry_result?.hash ?? null;
    const diffee_entry_at = diffee_entry_result?.hash ?? null;

    // Determine the actual label to use for diffing
    // Use the label from whichever node exists (prefer base if both exist)
    const actualLabel =
        base_entry_result?.label ??
        diffee_entry_result?.label ??
        parent_label;

    const diff_nodes_at_result: DiffNodesAtResult = {
        total_count: 0,
        items: [],
    };
    let skipped = 0;
    let added = 0;
    const limit = options?.limit ?? Infinity;
    const offset = options?.offset ?? 0;
    const status_filter = options?.status_filter ?? [];

    for await (const diff_obj of diffTreesIterative(
        driver,
        actualLabel,
        at_path,
        base_entry_at,
        diffee_entry_at,
        max_depth,
        filter,
        with_intermediates,
        status_filter,
    )) {
        if (skipped < offset) {
            skipped++;
            diff_nodes_at_result.total_count++;
            continue;
        }

        if (added < limit) {
            diff_nodes_at_result.items.push({
                ...diff_obj,
                path: path.relative(at_path, diff_obj.path),
            });
            added++;
        }
        diff_nodes_at_result.total_count++;
    }

    return diff_nodes_at_result;
}

// we need one session per transaction
// otherwise: Neo4jError: You cannot begin a transaction on a session with an open transaction;
// either run from within the transaction or use a different session
export async function* diffTreesIterative(
    driver: Driver,
    parent_label: string,
    base_path: string,
    base_hash: string | null,
    diffee_hash: string | null,
    max_depth: number,
    filter: Array<string>,
    with_intermediates: boolean,
    status_filter: Array<string>
): AsyncGenerator<DiffItem, void, void> {
    if (base_hash == null && diffee_hash == null) {
        throw new Error("At least one of the hashes should be not null");
    }

    const session = driver.session();
    try {
        const result: QueryResult<RecordShape> = await session.executeRead(async (tx) => {
            return tx.run(NODES_DIFF_QUERY, {
                parentLabel: parent_label,
                base: base_hash,
                diffee: diffee_hash,
                basePath: base_path,
                maxDepth: max_depth,
                filter,
                withIntermediates: with_intermediates,
                statusFilter: status_filter
            })
        });

        for await (const record of result.records) {
            const diff_row = record.toObject();
            yield {
                status: getDiffStatusFromString(diff_row.status),
                type: getNodeTypeFromLabel(diff_row.type),
                path: diff_row.path,
                old_props: diff_row.old_props,
                new_props: diff_row.new_props
            }
        }
    } finally {
        await session.close();
    }
}
