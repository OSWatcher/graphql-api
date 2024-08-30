import { QueryResult, RecordShape } from "neo4j-driver";
import { DiffStatus, NodeType, DiffRecord, RecursiveQueryResult } from "./types.js";
import path from "path";

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
