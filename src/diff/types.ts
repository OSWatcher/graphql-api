export enum NodeType {
    Blob = "Blob",
    Tree = "Tree",
}

export const RECURSABLE_LABELS = new Set(NodeType.Tree)

export enum DiffStatus {
    NEW,
    MOD,
    DEL,
}

export type DiffResult = {
    newitems: DiffRecord[];
    delitems: DiffRecord[];
    moditems: DiffRecord[];
};

export interface DiffRecord {
    status: DiffStatus;
    type: NodeType;
    path: string;
    old_props?: NodeProps;
    new_props?: NodeProps;
}

type NodeProps = Record<string, string>;

interface NodeData {
    props: NodeProps;
    label: string;
}

export interface DiffMap {
    [parentHash: string]: {
        [name: string]: NodeData;
    }
}

export interface DiffQueryResult {
    parent_hash: string;
    name: string;
    child: NodeData;
}

export interface RecursiveQueryResult {
    path_parts: string[];
    child: NodeData;
}
