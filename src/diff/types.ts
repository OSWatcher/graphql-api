export enum NodeType {
    Blob = "Blob",
    Tree = "Tree",
    WinRegValue = "WinRegValue",
    WinRegKey = "WinRegKey",
    Symbol = "Symbol",
}

export enum DiffStatus {
    NEW,
    MOD,
    DEL,
}

export interface DiffRecord {
    status: DiffStatus;
    type: NodeType;
    path: string;
    old_props?: NodeProps;
    new_props?: NodeProps;
}

type NodeProps = Record<string, string>;

export interface DiffQueryResult {
    status: string
    type: string
    path: string,
    old_props?: NodeProps
    new_props?: NodeProps
}
