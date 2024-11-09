import { NodeType } from "./types.js";
import { DiffStatus } from "../ogm-types.js"

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
            return DiffStatus.New
        case "MOD":
            return DiffStatus.Mod
        case "DEL":
            return DiffStatus.Del
        default:
            throw Error(`Unexpected status string: ${status_str}`)
    }
}
