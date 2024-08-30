import { Driver, QueryResult, RecordShape } from "neo4j-driver";
import { NODES_DIFF_QUERY } from "../queries.js";
import { DiffRecord, DiffQueryResult } from "./types.js";
import { getNodeTypeFromLabel, getDiffStatusFromString } from "./utils.js";

// we need one session per transaction
// otherwise: Neo4jError: You cannot begin a transaction on a session with an open transaction;
// either run from within the transaction or use a different session
export async function* diffTreesIterative(
    driver: Driver,
    parent_label: string,
    base_path: string,
    base_hash: string | null,
    diffee_hash: string | null,
    max_depth: number,
    filter: Array<string> | null = null
): AsyncGenerator<DiffRecord, void, void> {
    if (base_hash == null && diffee_hash == null) {
        throw new Error("At least one of the hashes should be not null");
    }

    const session = driver.session();
    try {
        const result: QueryResult<RecordShape> = await session.executeRead(async (tx) => {
            return tx.run(NODES_DIFF_QUERY, { parentLabel: parent_label, base: base_hash, diffee: diffee_hash, basePath: base_path, maxDepth: max_depth, filter })
        });

        for await (const record of result.records) {
            const diff_row = record.toObject() as DiffQueryResult;
            yield {
                status: getDiffStatusFromString(diff_row.status),
                type: getNodeTypeFromLabel(diff_row.type),
                path: diff_row.path,
                old_props: diff_row.old_props,
                new_props: diff_row.new_props
            }
        }
    } finally {
        await session.close();
    }
}
