import { QueryResult, RecordShape } from "neo4j-driver";
import { DiffMap, DiffStatus, NodeType, DiffQueryResult, DiffRecord, RecursiveQueryResult } from "./types.js";
import path from "path";

function getNodeTypeFromLabel(label: string): NodeType {
    const nodeType = NodeType[label as keyof typeof NodeType];
    if (nodeType === undefined) {
        console.assert(false, `Unknown NodeType label: "${label}"`);
        throw new Error(`Unknown NodeType label: "${label}"`);
    }
    return nodeType;
}

export async function parseDiffQueryResult(
    result: QueryResult<RecordShape>
): Promise<DiffMap> {
    const diff_map: DiffMap = {}

    // Note: if the parent_hash has no children
    // map_records[parent_hash] will be undefined
    for await (const record of result.records) {
        const result = record.toObject() as DiffQueryResult;
        const { parent_hash, name, child } = result;

        if (!diff_map[parent_hash]) {
            diff_map[parent_hash] = {};
        }

        diff_map[parent_hash][name] = child
    }
    return diff_map;
}

export function* computeDiffTreeGen(
    map_records: DiffMap,
    base_hash: string | null,
    diffee_hash: string | null
): Generator<DiffRecord> {
    // Initialize `map_base` as an empty object if `base_hash` is null or if `map_records` does not have an entry for `base_hash`.
    const map_base =
        base_hash ? map_records[base_hash] || {} : {};
    const map_diffee =
        diffee_hash ? map_records[diffee_hash] || {} : {};

    const base_set = new Set(Object.keys(map_base));
    const diffee_set = new Set(Object.keys(map_diffee));

    // find added Nodes
    for (const name of diffee_set) {
        if (!base_set.has(name)) {
            yield {
                status: DiffStatus.NEW,
                type: getNodeTypeFromLabel(map_diffee[name].label),
                path: name,
                new_props: map_diffee[name].props,
            }
        }
    }

    // find remove Nodes
    for (const name of base_set) {
        if (!diffee_set.has(name)) {
            yield {
                status: DiffStatus.DEL,
                type: getNodeTypeFromLabel(map_base[name].label),
                path: name,
                old_props: map_base[name].props,
            }
        }
    }

    // find modified Nodes
    const intersect = new Set([...base_set].filter(x => diffee_set.has(x)));
    for (const name of intersect) {
        // only compare hash here
        if (map_base[name]["props"]["hash"] != map_diffee[name]["props"]["hash"]) {
            yield {
                status: DiffStatus.MOD,
                type: getNodeTypeFromLabel(map_base[name].label),
                path: name,
                old_props: map_base[name].props,
                new_props: map_diffee[name].props,
            }
        } else {
            // same name
            // same hash
            // different label ? (type change)
            // TODO
        }
    }
}

export function determineVarLength(max_depth: number | null): string {
    if (max_depth === null) return "*";
    if (max_depth <= 0) return "*1..1";
    return `*1..${max_depth}`;
}

export async function parseFetchRecursiveNodesResults(
    cursor: QueryResult<RecordShape>,
    parent_filename: string,
    status: DiffStatus
): Promise<DiffRecord[]> {
    return cursor.records.map((current) => {
        const result = current.toObject() as RecursiveQueryResult;
        const { path_parts, child } = result;
        return {
            status: status,
            path: path.join(parent_filename, ...path_parts),
            type: NodeType[child.label as keyof typeof NodeType]!,
            old_props: status === DiffStatus.DEL ? child.props : undefined,
            new_props: status === DiffStatus.NEW ? child.props : undefined,
        };
    });
}
