/**
 * Pure path-parsing functions for git log entity types.
 * No Neo4j dependency — all functions are testable in isolation.
 */

/**
 * Parsed path for struct/symbol entity types.
 * Separates the exact blob path (used for root resolution) from the entity path within.
 */
export type ParsedEntityPath = {
    /** Full filesystem blob path, e.g., "/Windows/System32/ntoskrnl.exe" */
    blob_path: string;
    /** Entity name (struct or symbol name), e.g., "_KPROCESS" or "NtCreateFile" */
    entity_name: string;
    /** Remaining sub-path after entity root (e.g., field name for structs, empty for symbols) */
    remaining_path: string;
};

/**
 * Parse a struct path: {blob_path}::{struct_name} or {blob_path}::{struct_name}/{field_name}
 *
 * Examples:
 *   "/Windows/System32/ntoskrnl.exe::_KPROCESS" -> { blob_path: "/Windows/System32/ntoskrnl.exe", entity_name: "_KPROCESS", remaining_path: "" }
 *   "/Windows/System32/ntoskrnl.exe::_PEB_LDR_DATA/InMemoryOrderModuleList" -> { blob_path: "/Windows/System32/ntoskrnl.exe", entity_name: "_PEB_LDR_DATA", remaining_path: "InMemoryOrderModuleList" }
 */
export function parseStructPath(path: string): ParsedEntityPath {
    const separatorIndex = path.indexOf("::");
    if (separatorIndex <= 0) {
        throw new Error(
            `Invalid struct path "${path}": expected /{blob_path}::{struct_name}[/{field_path}]`,
        );
    }

    const blob_path = path.slice(0, separatorIndex);
    const entityPath = path.slice(separatorIndex + 2);
    const parts = entityPath.split("/").filter(Boolean);

    if (!blob_path.startsWith("/") || parts.length < 1) {
        throw new Error(
            `Invalid struct path "${path}": expected /{blob_path}::{struct_name}[/{field_path}]`,
        );
    }

    return {
        blob_path,
        entity_name: parts[0],
        remaining_path: parts.slice(1).join("/"),
    };
}

/**
 * Parse a symbol path: {blob_path}::{symbol_name}
 * Symbols are leaf nodes, so no remaining path is expected.
 *
 * Examples:
 *   "/Windows/System32/ntoskrnl.exe::NtCreateFile" -> { blob_path: "/Windows/System32/ntoskrnl.exe", entity_name: "NtCreateFile", remaining_path: "" }
 */
export function parseSymbolPath(path: string): ParsedEntityPath {
    const separatorIndex = path.indexOf("::");
    if (separatorIndex <= 0) {
        throw new Error(
            `Invalid symbol path "${path}": expected /{blob_path}::{symbol_name}`,
        );
    }

    const blob_path = path.slice(0, separatorIndex);
    const entityPath = path.slice(separatorIndex + 2);
    const parts = entityPath.split("/").filter(Boolean);

    if (!blob_path.startsWith("/") || parts.length !== 1) {
        throw new Error(
            `Invalid symbol path "${path}": expected /{blob_path}::{symbol_name}`,
        );
    }

    return {
        blob_path,
        entity_name: parts[0],
        remaining_path: "",
    };
}
