import path from "path";
import { NodeType, DiffRecord, DiffStatus } from "./types.js";

export function getNodeTypeFromRel(relationship: string): NodeType {
    switch (relationship) {
        case "HAS_CHILD_BLOB":
            return NodeType.Blob;
        case "HAS_CHILD_TREE":
            return NodeType.Tree;
        default:
            throw Error(`Unexpected relationship ${relationship}`);
    }
}



export function* updateAndYieldDiffs(
    diffs: DiffRecord[],
    base_path: string
): Generator<DiffRecord, void, void> {
    for (const diff_obj of diffs) {
        diff_obj.path = path.join(base_path, diff_obj.path);
        yield diff_obj;
    }
}


export function getNodeTypeFromLabel(label: string): NodeType {
    const nodeType = NodeType[label as keyof typeof NodeType];
    if (nodeType === undefined) {
        console.assert(false, `Unknown NodeType label: "${label}"`);
        throw new Error(`Unknown NodeType label: "${label}"`);
    }
    return nodeType;
}

export function getDiffStatusFromString(status_str: string): DiffStatus {
    switch (status_str) {
        case "NEW":
            return DiffStatus.NEW
        case "MOD":
            return DiffStatus.MOD
        case "DEL":
            return DiffStatus.DEL
        default:
            throw Error(`Unexpected status string: ${status_str}`)
    }
}
