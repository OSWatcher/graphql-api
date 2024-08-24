import { Driver, QueryResult, RecordShape } from "neo4j-driver";
import { NODES_DIFF_QUERY, RECURSIVE_NODES_QUERY } from "../queries.js";
import { DiffRecord, DiffStatus, RECURSABLE_LABELS } from "./types.js";
import { updateAndYieldDiffs } from "./utils.js";
import { computeDiffTreeGen, determineVarLength, parseFetchRecursiveNodesResults, parseDiffQueryResult } from "./core.js";
import path from "path";

export async function fetchRecursiveNodes(
    driver: Driver,
    parent_label: string,
    parent_tree_hash: string,
    parent_filename: string,
    status: DiffStatus,
    max_depth: number | null = null
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
    const query = RECURSIVE_NODES_QUERY(parent_label, var_length);
    const session = driver.session();
    try {
        const result = await session.executeRead((tx) => {
            return tx.run(query, {
                parent_hash: parent_tree_hash,
            });
        });
        return parseFetchRecursiveNodesResults(result, parent_filename, status);
    } finally {
        await session.close();
    }
}

// function fromDiffTreeRecordIntoMapFilename(
//     record: any
// ): Record<string, ComputeDiffMapType> {
//     /*
//         record is a Neo4j Record object like this

//         {
//         "result": [
//             {
//             "parent_hash": "095576280551474ac1cb6b534360b99c2124e014",
//             "children": [
//                 {
//                 "hash": "f7e8a7d41ffeb840851ac36f2933a28374311ce3",
//                 "name": "System Volume Information",
//                 "type": "HAS_CHILD_TREE"
//                 },
//     */
//     //    output should be like this
//     // {
//     //      base_hash: {
//     //          filename1: {
//     //              'type': ''HAS_CHILD_BLOB' | 'HASH_CHILD_TREE'
//     //              'hash': d86xxxxx
//     //            },
//     //      },
//     //      diffee_hash: {
//     //      }
//     //
//     // }
//     const map_records: Record<string, ComputeDiffMapType> = {};
//     const value = record.get("value");
//     for (const result of value["result"]) {
//         const parent_hash = result["parent_hash"];
//         const children = result["children"];
//         // Initialize the parent_hash entry if it doesn't exist
//         if (!map_records[parent_hash]) {
//             map_records[parent_hash] = {};
//         }
//         for (const child of children) {
//             map_records[parent_hash][child["name"]] = {
//                 type: getNodeTypeFromRel(child["type"]),
//                 hash: child["hash"],
//             };
//         }
//     }
//     return map_records;
// }



// async function* diffTreesParallel(
//     driver: Driver,
//     diff_hash_list: Array<HashDiff>
// ): AsyncGenerator<[HashDiff, Map<DiffStatus, DiffObj[]>], void, void> {
//     const session = driver.session();
//     try {
//         const cursor = await session.executeRead(async (tx) => {
//             return tx.run(DIFF_PARALLEL_QUERY, { hash_list: diff_hash_list });
//         });

//         for await (const record of cursor.records) {
//             const map_records = fromDiffTreeRecordIntoMapFilename(record);
//             const base_hash = record.get("value")["base_hash"];
//             const diffee_hash = record.get("value")["diffee_hash"];
//             const base_path = record.get("value")["base_path"];
//             const diff = new Map<DiffStatus, DiffObj[]>([
//                 [DiffStatus.NEW, []],
//                 [DiffStatus.MOD, []],
//                 [DiffStatus.DEL, []],
//             ]);
//             for (const diff_obj of computeDiffTreeGen(
//                 map_records,
//                 base_hash,
//                 diffee_hash
//             )) {
//                 diff.get(diff_obj.status)!.push(diff_obj);
//             }
//             const hashdiff = {
//                 base: base_hash,
//                 diffee: diffee_hash,
//                 path: base_path,
//             };
//             yield [hashdiff, diff];
//         }
//     } finally {
//         await session.close();
//     }
// }

async function* diffNodes(
    driver: Driver,
    base_hash: string | null,
    diffee_hash: string | null,
    parent_label: string
): AsyncGenerator<DiffRecord> {
    // assert that at least one of the hashes is not null
    if (base_hash == null && diffee_hash == null) {
        throw new Error("At least one of the hashes should be not null");
    }

    const session = driver.session();
    try {
        const query = NODES_DIFF_QUERY(parent_label);
        const result: QueryResult<RecordShape> = await session.executeRead(async (tx) => {
            return tx.run(query, { base: base_hash, diffee: diffee_hash });
        });

        const diff_map = await parseDiffQueryResult(result);
        yield* computeDiffTreeGen(diff_map, base_hash, diffee_hash);
    } finally {
        await session.close();
    }
}

// function partition_blobs(diff_result: DiffObj[]): [DiffObj[], DiffObj[]] {
//     return diff_result.reduce(
//         (acc: [DiffObj[], DiffObj[]], current: DiffObj) => {
//             // push into array index 0 or 1 based on type
//             acc[current.type == NodeType.Blob ? 0 : 1].push(current);
//             return acc;
//         },
//         // initial value
//         [[], []]
//     );
// }

// async function* diffTreesIterativeParallel(
//     driver: Driver,
//     base_path: string,
//     base_hash: string | null,
//     diffee_hash: string | null,
//     max_depth: number | null = null
// ): AsyncGenerator<DiffObj, void, void> {
//     const diff_hash_list: Array<HashDiff> = [
//         { base: base_hash, diffee: diffee_hash, path: base_path },
//     ];

//     // stack of all the mod trees to process at a given depth
//     const stack = [{ diff_hash_list, depth: 0 }];

//     while (stack.length > 0) {
//         const { diff_hash_list, depth } = stack.pop()!;
//         // console.log("stack pop: ", diff_hash_list, "depth", depth)

//         if (max_depth != null && depth < 0) {
//             // max depth reached
//             return;
//         }

//         for await (const [hashdiff, diff_result] of diffTreesParallel(
//             driver,
//             diff_hash_list
//         )) {
//             // console.log("hashdiff: ", hashdiff, "diff_result: ", diff_result)
//             // partition trees and blobs
//             const [new_diff_blobs, new_diff_trees] = partition_blobs(
//                 diff_result.get(DiffStatus.NEW)!
//             );
//             const [del_diff_blobs, del_diff_trees] = partition_blobs(
//                 diff_result.get(DiffStatus.DEL)!
//             );
//             const [mod_diff_blobs, mod_diff_trees] = partition_blobs(
//                 diff_result.get(DiffStatus.MOD)!
//             );

//             // yield current blobs
//             yield* updateAndYieldDiffs(new_diff_blobs, hashdiff.path!);
//             yield* updateAndYieldDiffs(del_diff_blobs, hashdiff.path!);
//             yield* updateAndYieldDiffs(mod_diff_blobs, hashdiff.path!);

//             // reached max depth ?
//             if (max_depth != null && depth >= max_depth) {
//                 // yield trees as is
//                 yield* updateAndYieldDiffs(new_diff_trees, hashdiff.path!);
//                 yield* updateAndYieldDiffs(del_diff_trees, hashdiff.path!);
//                 yield* updateAndYieldDiffs(mod_diff_trees, hashdiff.path!);
//             } else {
//                 // NEW
//                 const new_subblobs_arr: DiffObj[][] = await Promise.all(
//                     new_diff_trees.map((diff_obj) =>
//                         fetchRecusiveBlobs(
//                             driver,
//                             diff_obj.new_hash!,
//                             diff_obj.path,
//                             DiffStatus.NEW,
//                             max_depth != null ? max_depth - 1 : null
//                         )
//                     )
//                 );
//                 for (const arr of new_subblobs_arr) {
//                     yield* updateAndYieldDiffs(arr, hashdiff.path!);
//                 }
//                 // DEL
//                 const del_subblobs_arr: DiffObj[][] = await Promise.all(
//                     del_diff_trees.map((diff_obj) =>
//                         fetchRecusiveBlobs(
//                             driver,
//                             diff_obj.old_hash!,
//                             diff_obj.path,
//                             DiffStatus.DEL,
//                             max_depth != null ? max_depth - 1 : null
//                         )
//                     )
//                 );
//                 for (const arr of del_subblobs_arr) {
//                     yield* updateAndYieldDiffs(arr, hashdiff.path!);
//                 }
//                 // MOD
//                 // stack push
//                 const mod_diff_hash_list: Array<HashDiff> = mod_diff_trees.map(
//                     (diff_obj) => {
//                         return {
//                             base: diff_obj.old_hash,
//                             diffee: diff_obj.new_hash,
//                             path: path.join(hashdiff.path!, diff_obj.path),
//                         };
//                     }
//                 );
//                 stack.push({
//                     diff_hash_list: mod_diff_hash_list,
//                     depth: depth + 1,
//                 });
//             }
//         }
//     }
// }

// we need one session per transaction
// otherwise: Neo4jError: You cannot begin a transaction on a session with an open transaction;
// either run from within the transaction or use a different session
export async function* diffTreesIterative(
    driver: Driver,
    parent_label: string,
    base_path: string,
    base_hash: string | null,
    diffee_hash: string | null,
    max_depth: number | null = null
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
            parent_label
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
                            max_depth != null ? max_depth - depth : null
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
                            max_depth != null ? max_depth - depth : null
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
