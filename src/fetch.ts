// various functions to fetch data from Neo4j
// when the GraphQL generated API is not enough

import { Driver } from "neo4j-driver";
import { SymbolFetchResult, SymbolOptions } from "./ogm-types.js";
import { FETCH_SYMBOLS_QUERY } from "./queries.js";

export async function fetch_symbols(
    driver: Driver,
    blob_hash: string,
    options: SymbolOptions
): Promise<SymbolFetchResult[]> {
    const session = driver.session();
    try {
        const result = await session.executeRead((tx) =>
            tx.run(FETCH_SYMBOLS_QUERY, {
                blob_hash,
                skip_count: options.offset,
                limit_count: options.limit,
            })
        );

        return result.records.map((record) => {
            return {
                name: record.get("symbol_name"),
                address: record.get("symbol_address"),
            };
        });
    } catch (error) {
        console.error("Error fetching symbols:", error);
        throw error;
    } finally {
        await session.close();
    }
}
