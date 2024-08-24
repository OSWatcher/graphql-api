import path from "path";
import { NodeType, DiffRecord } from "./types.js";

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
