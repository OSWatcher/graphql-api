import { ComputeDiffMapType, DiffObj, DiffStatus, NodeType } from "./types.js";

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

export function* computeDiffTreeGen(
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
