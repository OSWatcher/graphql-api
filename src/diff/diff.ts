import { Driver, QueryResult, RecordShape } from "neo4j-driver";
import { NODES_DIFF_QUERY, RECURSIVE_NODES_QUERY } from "../queries.js";
import { DiffRecord, DiffStatus, RECURSABLE_LABELS, DiffQueryResult } from "./types.js";
import { updateAndYieldDiffs, getNodeTypeFromLabel, getDiffStatusFromString } from "./utils.js";
import { determineVarLength, parseFetchRecursiveNodesResults } from "./core.js";
import path from "path";

export async function fetchRecursiveNodes(
    driver: Driver,
    parent_label: string,
    parent_tree_hash: string,
    parent_filename: string,
    status: DiffStatus,
    max_depth: number | null = null,
    filter: Array<string> | null
): Promise<DiffRecord[]> {
    if (max_depth != null) {
        if (max_depth == 0) {
            // 0 = current level only
            // however for Cypher we need to traverse at least one relationship
            max_depth = 1;
        } else if (max_depth < 0) {
            return [];
        }
    }
    const var_length = determineVarLength(max_depth);
    const query = RECURSIVE_NODES_QUERY(parent_label, var_length, filter);
    const session = driver.session();
    try {
        const result = await session.executeRead((tx) => {
            return tx.run(query, {
                parent_hash: parent_tree_hash,
                filter
            });
        });
        return parseFetchRecursiveNodesResults(result, parent_filename, status);
    } finally {
        await session.close();
    }
}

async function* diffNodes(
    driver: Driver,
    base_hash: string | null,
    diffee_hash: string | null,
    parent_label: string,
    filter: Array<string> | null
): AsyncGenerator<DiffRecord> {
    // assert that at least one of the hashes is not null
    if (base_hash == null && diffee_hash == null) {
        throw new Error("At least one of the hashes should be not null");
    }

    const session = driver.session();
    try {
        const query = NODES_DIFF_QUERY(parent_label, filter);
        const result: QueryResult<RecordShape> = await session.executeRead(async (tx) => {
            return tx.run(query, { base: base_hash, diffee: diffee_hash, filter });
        });

        for await (const record of result.records) {
            const result = record.get('diff') as DiffQueryResult
            yield {
                status: getDiffStatusFromString(result.status),
                type: getNodeTypeFromLabel(result.type),
                path: result.path,
                old_props: result.old_props,
                new_props: result.new_props
            }
        }
    } finally {
        await session.close();
    }
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
    max_depth: number | null = null,
    filter: Array<string> | null = null
): AsyncGenerator<DiffRecord, void, void> {
    const stack = [
        {
            hash_diff: {
                base: base_hash,
                diffee: diffee_hash,
                path: base_path,
            },
            depth: 0,
        },
    ];

    while (stack.length > 0) {
        const { hash_diff, depth } = stack.pop()!;

        if (max_depth != null && depth < 0) {
            // max depth reached
            return;
        }

        const diff_trees = new Map<DiffStatus, DiffRecord[]>([
            [DiffStatus.NEW, []],
            [DiffStatus.MOD, []],
            [DiffStatus.DEL, []],
        ]);

        for await (const diff_obj of diffNodes(
            driver,
            hash_diff.base,
            hash_diff.diffee,
            parent_label,
            filter
        )) {
            if (RECURSABLE_LABELS.has(diff_obj.type)) {
                // "container" recurse
                diff_trees.get(diff_obj.status)!.push(diff_obj);
            } else {
                // "blob"
                diff_obj.path = path.join(hash_diff.path!, diff_obj.path);
                yield diff_obj;
                continue
            }
        }

        // reached max depth ?
        if (max_depth != null && depth >= max_depth) {
            // yield trees as is
            yield* updateAndYieldDiffs(
                diff_trees.get(DiffStatus.NEW)!,
                hash_diff.path!
            );
            yield* updateAndYieldDiffs(
                diff_trees.get(DiffStatus.DEL)!,
                hash_diff.path!
            );
            yield* updateAndYieldDiffs(
                diff_trees.get(DiffStatus.MOD)!,
                hash_diff.path!
            );
        } else {
            // NEW
            const new_subblobs_arr: DiffRecord[][] = await Promise.all(
                diff_trees
                    .get(DiffStatus.NEW)!
                    .map((diff_obj) =>
                        fetchRecursiveNodes(
                            driver,
                            parent_label,
                            diff_obj.new_props!["hash"],
                            diff_obj.path,
                            DiffStatus.NEW,
                            max_depth != null ? max_depth - depth : null,
                            filter
                        )
                    )
            );
            for (const arr of new_subblobs_arr) {
                yield* updateAndYieldDiffs(arr, hash_diff.path!);
            }
            // DEL
            const del_subblobs_arr: DiffRecord[][] = await Promise.all(
                diff_trees
                    .get(DiffStatus.DEL)!
                    .map((diff_obj) =>
                        fetchRecursiveNodes(
                            driver,
                            parent_label,
                            diff_obj.old_props!["hash"],
                            diff_obj.path,
                            DiffStatus.DEL,
                            max_depth != null ? max_depth - depth : null,
                            filter
                        )
                    )
            );
            for (const arr of del_subblobs_arr) {
                yield* updateAndYieldDiffs(arr, hash_diff.path!);
            }
            // MOD
            // stack push
            for (const diff_obj of diff_trees.get(DiffStatus.MOD)!) {
                stack.push({
                    hash_diff: {
                        base: diff_obj.old_props!["hash"],
                        diffee: diff_obj.new_props!["hash"],
                        path: path.join(hash_diff.path!, diff_obj.path),
                    },
                    depth: depth + 1,
                });
            }
        }
    }
}
