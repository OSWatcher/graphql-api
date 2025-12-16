// various functions to fetch data from Neo4j
// when the GraphQL generated API is not enough

import { Driver } from "neo4j-driver";
import {
    SymbolFetchResult,
    SymbolOptions,
    StructFetchResult,
    StructOptions,
} from "./ogm-types.js";
import { FETCH_SYMBOLS_QUERY, FETCH_STRUCTS_QUERY } from "./queries.js";

export async function fetch_symbols(
    driver: Driver,
    blob_hash: string,
    options: SymbolOptions,
): Promise<SymbolFetchResult[]> {
    const session = driver.session();
    try {
        const result = await session.executeRead((tx) =>
            tx.run(FETCH_SYMBOLS_QUERY, {
                blob_hash,
                skip_count: options.offset,
                limit_count: options.limit,
            }),
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

export async function fetch_structs(
    driver: Driver,
    blob_hash: string,
    options: StructOptions,
): Promise<StructFetchResult[]> {
    const session = driver.session();
    try {
        const result = await session.executeRead((tx) =>
            tx.run(FETCH_STRUCTS_QUERY, {
                blob_hash,
                skip_count: options.offset,
                limit_count: options.limit,
            }),
        );

        return result.records.map((record) => {
            const structProps = record.get("struct_props") as Record<
                string,
                unknown
            >;

            // Validate struct properties
            if (
                typeof structProps.size !== "number" ||
                typeof structProps.kind !== "string"
            ) {
                throw new Error("Invalid struct properties format");
            }

            return {
                name: record.get("struct_name"),
                size: structProps.size,
                kind: structProps.kind,
                fields: record
                    .get("fields")
                    .map(
                        (field: {
                            field_name: string;
                            field: Record<string, unknown>;
                        }) => {
                            // Safe JSON parsing with error handling
                            let dataType: unknown;
                            try {
                                const dataTypeStr = field["field"][
                                    "data_type"
                                ] as string;
                                dataType = JSON.parse(dataTypeStr);
                            } catch (parseError) {
                                console.error(
                                    "Failed to parse data_type JSON:",
                                    parseError,
                                );
                                dataType = null;
                            }

                            return {
                                name: field["field_name"],
                                offset: field["field"]["offset"] as number,
                                data_type: dataType,
                            };
                        },
                    ),
            };
        });
    } catch (error) {
        console.error("Error fetching structs:", error);
        throw error;
    } finally {
        await session.close();
    }
}
