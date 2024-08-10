import { Driver } from "neo4j-driver";
import path from "path";

type DiffObj = {
    // status of the diff (NEW / MOD / DEL)
    status: DiffStatus;
    type: NodeType;
    // object path. If relative the it refer to the filename only
    path: string;
    // old and new hash values, defined depending on the DiffStatus
    // depends on status
    // NEW: new_hash is defined
    // DEL: old_hash is defined
    // MOD: both hashes are defined
    old_hash: null | string;
    new_hash: null | string;
};

// type HashDiff = {
//     base: string | null;
//     diffee: string | null;
//     path: string | null;
// };

enum NodeType {
    Blob = "BLOB",
    Tree = "TREE",
}

enum DiffStatus {
    NEW = "NEW",
    MOD = "MOD",
    DEL = "DEL",
}

type DiffResult = {
    newitems: DiffObj[];
    delitems: DiffObj[];
    moditems: DiffObj[];
}

// helpers
function getNodeTypeFromRel(relationship: string): NodeType {
    switch (relationship) {
        case "HAS_CHILD_BLOB":
            return NodeType.Blob;
        case "HAS_CHILD_TREE":
            return NodeType.Tree;
        default:
            throw Error(`Unexpected relationship ${relationship}`);
    }
}

type ComputeDiffMapType = Record<string, Record<string, NodeType | string>>;

function* computeDifferences(
    mapA: ComputeDiffMapType,
    mapB: ComputeDiffMapType,
    status: DiffStatus
): Generator<DiffObj> {
    if (status == DiffStatus.MOD) {
        for (const [key, value] of Object.entries(mapA)) {
            if (key in mapB) {
                // check != hashes
                if (value["hash"] != mapB[key]["hash"]) {
                    const diff_obj: DiffObj = {
                        status: status,
                        type: value["type"] as NodeType,
                        path: key,
                        old_hash: mapA[key]["hash"] as string,
                        new_hash: mapB[key]["hash"] as string,
                    };
                    yield diff_obj;
                }
            }
        }
    } else {
        for (const [key, value] of Object.entries(mapA)) {
            if (!(key in mapB)) {
                // build DiffObj
                const diff_obj: DiffObj = {
                    status: status,
                    type: value["type"] as NodeType,
                    path: key as string,
                    old_hash:
                        status == DiffStatus.DEL
                            ? (value["hash"] as string)
                            : null,
                    new_hash:
                        status == DiffStatus.NEW
                            ? (value["hash"] as string)
                            : null,
                };
                yield diff_obj;
            }
        }
    }
}

// Note: return a list instead of a map of parent_hash -> child_hash
// since Cypher doesn't support dynamic keys in map projections
const DIFF_QUERY = `
MATCH (t:Tree)-[r:HAS_CHILD_BLOB|HAS_CHILD_TREE]->(c)
WHERE t.hash = $base
    OR t.hash = $diffee
RETURN t.hash as parent_hash, type(r) as type, r.name as name, c.hash as child_hash
`;

// const DIFF_PARALLEL_QUERY = `
// CALL apoc.cypher.mapParallel(
//     'MATCH (t:Tree)-[r:HAS_CHILD_BLOB|HAS_CHILD_TREE]->(c)
//     WHERE t.hash IN [_.base, _.diffee]
//     WITH _, t.hash as parent_hash, collect({type: type(r), name: r.name, hash: c.hash}) as children
//     RETURN collect({parent_hash: parent_hash, children: children}) as result, _.base as base_hash, _.diffee as diffee_hash, _.path as base_path',
//     {},
//     $hash_list
// ) YIELD value
// RETURN value
// `;

async function fetchRecusiveBlobs(
    driver: Driver,
    parent_tree_hash: string,
    parent_filename: string,
    status: DiffStatus,
    max_depth: number | null = null
): Promise<DiffObj[]> {
    if (max_depth != null) {
        if (max_depth == 0) {
            // 0 = current level only
            // however for Cypher we need to traverse at least one relationship
            max_depth = 1;
        } else if (max_depth < 0) {
            return [];
        }
    }
    const var_length = max_depth != null ? `*1..${max_depth}` : "*";
    // recursive query to fetch all sub blobs under a given Tree
    // *1..n -> between 1 and n iterations
    const RECURSIVE_BLOBS_QUERY = `
MATCH path = (t:Tree)-[:HAS_CHILD_BLOB|HAS_CHILD_TREE${var_length}]->(b:Blob)
WHERE t.hash = $parent_hash
RETURN [r IN relationships(path) | r.name] as path_parts, b.hash as blob_hash
`;
    const session = driver.session();
    try {
        const result = await session.executeRead((tx) => {
            return tx.run(RECURSIVE_BLOBS_QUERY, {
                parent_hash: parent_tree_hash,
            });
        });
        /*
        results looks like this:
            path_parts	                                        blob_hash
        1   ["src", "main", "resources", "Unlicense"]           f6067df486cbdbb0aac026b799b26261c92734a3
        2   ["src", "main", "resources", "BSD License"]         d50f85b2ba155047d15ba915158350a18e76b710
 
        return [
            {
                'rel_path': 'src/main/resources/Unlicense',
                'hash': 'f6067df486cbdbb0aac026b799b26261c92734a3'
            }
        ]
        */
        return result.records.map((current) => {
            const path_parts: Array<string> = current.get("path_parts");
            const blob_hash: string = current.get("blob_hash");
            const diff_obj: DiffObj = {
                status: status,
                path: path.join(parent_filename, ...path_parts),
                type: NodeType.Blob,
                old_hash: status == DiffStatus.DEL ? blob_hash : null,
                new_hash: status == DiffStatus.NEW ? blob_hash : null,
            };
            return diff_obj;
        });
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

function* computeDiffTreeGen(
    map_records: Record<string, ComputeDiffMapType>,
    base_hash: string | null,
    diffee_hash: string | null
): Generator<DiffObj> {
    // Initialize `map_base` as an empty object if `base_hash` is null or if `map_records` does not have an entry for `base_hash`.
    const map_base: ComputeDiffMapType =
        base_hash !== null ? map_records[base_hash] || {} : {};
    const map_diffee: ComputeDiffMapType =
        diffee_hash !== null ? map_records[diffee_hash] || {} : {};

    const new_iter = computeDifferences(map_diffee, map_base, DiffStatus.NEW);
    yield* new_iter;
    const del_iter = computeDifferences(map_base, map_diffee, DiffStatus.DEL);
    yield* del_iter;
    const mod_iter = computeDifferences(map_base, map_diffee, DiffStatus.MOD);
    yield* mod_iter;
}

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

async function* diffTrees(
    driver: Driver,
    base_hash: string | null,
    diffee_hash: string | null
): AsyncGenerator<DiffObj> {
    // assert that at least one of the hashes is not null
    if (base_hash == null && diffee_hash == null) {
        throw new Error("At least one of the hashes should be not null");
    }

    const session = driver.session();
    try {
        const cursor = await session.executeRead(async (tx) => {
            return tx.run(DIFF_QUERY, { base: base_hash, diffee: diffee_hash });
        });

        // reduce records into a map
        // {
        //      base_hash: {
        //          filename1: {
        //              'type': ''HAS_CHILD_BLOB' | 'HASH_CHILD_TREE'
        //              'hash': d86xxxxx
        //            },
        //      },
        //      diffee_hash: {
        //      }
        //
        // }
        const map_records: Record<string, ComputeDiffMapType> = {};

        // Note: if the parent_hash has no children
        // map_records[parent_hash] will be undefined
        for await (const record of cursor.records) {
            const parent_hash = record.get("parent_hash");
            const name = record.get("name");
            const rel = record.get("type");
            const child_hash = record.get("child_hash");

            // Initialize the parent_hash entry if it doesn't exist
            if (!map_records[parent_hash]) {
                map_records[parent_hash] = {};
            }

            map_records[parent_hash][name] = {
                type: getNodeTypeFromRel(rel),
                hash: child_hash,
            };
        }
        yield* computeDiffTreeGen(map_records, base_hash, diffee_hash);
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

function* updateAndYieldDiffs(
    diffs: DiffObj[],
    base_path: string
): Generator<DiffObj, void, void> {
    for (const diff_obj of diffs) {
        diff_obj.path = path.join(base_path, diff_obj.path);
        yield diff_obj;
    }
}

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

async function* diffTreesIterative(
    driver: Driver,
    base_path: string,
    base_hash: string | null,
    diffee_hash: string | null,
    max_depth: number | null = null
): AsyncGenerator<DiffObj, void, void> {
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

        const diff_trees = new Map<DiffStatus, DiffObj[]>([
            [DiffStatus.NEW, []],
            [DiffStatus.MOD, []],
            [DiffStatus.DEL, []],
        ]);

        for await (const diff_obj of diffTrees(
            driver,
            hash_diff.base,
            hash_diff.diffee
        )) {
            // blob ?
            if (diff_obj.type == NodeType.Blob) {
                diff_obj.path = path.join(hash_diff.path!, diff_obj.path);
                yield diff_obj;
                continue;
            }
            // tree
            diff_trees.get(diff_obj.status)!.push(diff_obj);
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
            const new_subblobs_arr: DiffObj[][] = await Promise.all(
                diff_trees.get(DiffStatus.NEW)!.map((diff_obj) =>
                    fetchRecusiveBlobs(
                        driver,
                        diff_obj.new_hash!,
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
            const del_subblobs_arr: DiffObj[][] = await Promise.all(
                diff_trees.get(DiffStatus.DEL)!.map((diff_obj) =>
                    fetchRecusiveBlobs(
                        driver,
                        diff_obj.old_hash!,
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
                        base: diff_obj.old_hash,
                        diffee: diff_obj.new_hash,
                        path: path.join(hash_diff.path!, diff_obj.path),
                    },
                    depth: depth + 1,
                });
            }
        }
    }
}

export { diffTreesIterative, DiffObj, NodeType, DiffStatus, DiffResult };
