/**
 * Pure path-parsing functions for git log entity types.
 * No Neo4j dependency — all functions are testable in isolation.
 */

/**
 * Parsed path for struct/symbol entity types.
 * Separates the PE filename (used for root resolution) from the entity path within.
 */
export type ParsedEntityPath = {
    /** PE filename, e.g., "ntoskrnl.exe" */
    pe_filename: string;
    /** Entity name (struct or symbol name), e.g., "_KPROCESS" or "NtCreateFile" */
    entity_name: string;
    /** Remaining sub-path after entity root (e.g., field name for structs, empty for symbols) */
    remaining_path: string;
};

/**
 * Parse a struct path: {pe_filename}/{struct_name} or {pe_filename}/{struct_name}/{field_name}
 *
 * Examples:
 *   "/ntoskrnl.exe/_KPROCESS" -> { pe_filename: "ntoskrnl.exe", entity_name: "_KPROCESS", remaining_path: "" }
 *   "/ntoskrnl.exe/_PEB_LDR_DATA/InMemoryOrderModuleList" -> { pe_filename: "ntoskrnl.exe", entity_name: "_PEB_LDR_DATA", remaining_path: "InMemoryOrderModuleList" }
 */
export function parseStructPath(path: string): ParsedEntityPath {
    const parts = path.split("/").filter(Boolean);
    if (parts.length < 2) {
        throw new Error(
            `Invalid struct path "${path}": expected at least {pe_filename}/{struct_name}`,
        );
    }
    return {
        pe_filename: parts[0],
        entity_name: parts[1],
        remaining_path: parts.slice(2).join("/"),
    };
}

/**
 * Parse a symbol path: {pe_filename}/{symbol_name}
 * Symbols are leaf nodes, so no remaining path is expected.
 *
 * Examples:
 *   "/ntoskrnl.exe/NtCreateFile" -> { pe_filename: "ntoskrnl.exe", entity_name: "NtCreateFile", remaining_path: "" }
 */
export function parseSymbolPath(path: string): ParsedEntityPath {
    const parts = path.split("/").filter(Boolean);
    if (parts.length !== 2) {
        throw new Error(
            `Invalid symbol path "${path}": expected exactly {pe_filename}/{symbol_name}`,
        );
    }
    return {
        pe_filename: parts[0],
        entity_name: parts[1],
        remaining_path: "",
    };
}
