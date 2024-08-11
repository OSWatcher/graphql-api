import { QueryResult, RecordShape } from "neo4j-driver";
import { DiffMap, DiffObj, DiffStatus, NodeType, DirectoryContentsMap, DiffQueryResult } from "./types.js";
import { getNodeTypeFromRel } from "./utils.js";
import path from "path";

export async function parseDiffQueryResultAsDiffMap(
    base_hash: string | null,
    diffee_hash: string | null,
    cursor: QueryResult<RecordShape>
): Promise<DiffMap> {
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
    const map_records: DiffMap = {}
    if (base_hash !== null) {
        map_records[base_hash] = {};
    }
    if (diffee_hash !== null) {
        map_records[diffee_hash] = {};
    }

    // Note: if the parent_hash has no children
    // map_records[parent_hash] will be undefined
    for await (const record of cursor.records) {
        const result = record.toObject() as DiffQueryResult;
        const { parent_hash, name, type: rel, child_hash } = result;

        map_records[parent_hash][name] = {
            type: getNodeTypeFromRel(rel),
            hash: child_hash,
        };
    }
    return map_records;
}

function* computeDifferences(
    mapA: DirectoryContentsMap,
    mapB: DirectoryContentsMap,
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

export function* computeDiffTreeGen(
    map_records: DiffMap,
    base_hash: string | null,
    diffee_hash: string | null
): Generator<DiffObj> {
    // Initialize `map_base` as an empty object if `base_hash` is null or if `map_records` does not have an entry for `base_hash`.
    const map_base: DirectoryContentsMap =
        base_hash !== null ? map_records[base_hash] || {} : {};
    const map_diffee: DirectoryContentsMap =
        diffee_hash !== null ? map_records[diffee_hash] || {} : {};

    const new_iter = computeDifferences(map_diffee, map_base, DiffStatus.NEW);
    yield* new_iter;
    const del_iter = computeDifferences(map_base, map_diffee, DiffStatus.DEL);
    yield* del_iter;
    const mod_iter = computeDifferences(map_base, map_diffee, DiffStatus.MOD);
    yield* mod_iter;
}

export function determineVarLength(max_depth: number | null): string {
    if (max_depth === null) return "*";
    if (max_depth <= 0) return "*1..1";
    return `*1..${max_depth}`;
}

export function parseFetchRecursiveBlobsResults(
    cursor: QueryResult<RecordShape>,
    parent_filename: string,
    status: DiffStatus
): DiffObj[] {
    return cursor.records.map((current) => {
        const path_parts: Array<string> = current.get("path_parts");
        const blob_hash: string = current.get("blob_hash");
        return {
            status: status,
            path: path.join(parent_filename, ...path_parts),
            type: NodeType.Blob,
            old_hash: status === DiffStatus.DEL ? blob_hash : null,
            new_hash: status === DiffStatus.NEW ? blob_hash : null,
        };
    });
}