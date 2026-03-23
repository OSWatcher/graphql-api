import { Driver, Session, ManagedTransaction } from "neo4j-driver";
import { EntityType } from "../ogm-types.js";
import { EntityRootResult } from "./types.js";
import {
    GET_FILESYSTEM_ROOT_QUERY,
    GET_REGISTRY_ROOT_QUERY,
    GET_STRUCT_ROOT_QUERY,
    GET_SYMBOL_ROOT_QUERY,
} from "../queries.js";
import { parseStructPath, parseSymbolPath } from "./path-parser.js";

/**
 * Resolves the entity root for a given commit, entity type, and path.
 * Returns the root node to start traversal from and the remaining path.
 *
 * @param driver Neo4j driver instance
 * @param commit_hash The commit hash to resolve within
 * @param entity_type The type of entity (FILESYSTEM, REGISTRY, STRUCT, SYMBOL)
 * @param path The full entity path
 * @returns EntityRootResult with root node info and remaining path
 */
export async function get_entity_root(
    driver: Driver,
    commit_hash: string,
    entity_type: EntityType,
    path: string,
): Promise<EntityRootResult> {
    const session = driver.session();

    try {
        switch (entity_type) {
            case EntityType.Filesystem:
                return await get_filesystem_root(session, commit_hash, path);

            case EntityType.Registry:
                return await get_registry_root(session, commit_hash, path);

            case EntityType.Struct:
                return await get_struct_root(session, commit_hash, path);

            case EntityType.Symbol:
                return await get_symbol_root(session, commit_hash, path);

            default:
                throw new Error(`Unknown entity type: ${entity_type}`);
        }
    } finally {
        await session.close();
    }
}

/**
 * Get filesystem root for a commit.
 * Returns the root Tree node and the full path (minus leading slash) as remaining path.
 */
async function get_filesystem_root(
    session: Session,
    commit_hash: string,
    path: string,
): Promise<EntityRootResult> {
    const result = await session.executeRead((tx: ManagedTransaction) =>
        tx.run(GET_FILESYSTEM_ROOT_QUERY, { commit_hash }),
    );

    if (result.records.length === 0) {
        // Filesystem doesn't exist in this commit
        return null;
    }

    const root_hash = result.records[0].get("root_hash");

    // Remove leading slash from path for traversal
    const remaining_path = path.startsWith("/") ? path.slice(1) : path;

    return {
        root_hash,
        root_label: "Tree",
        remaining_path,
    };
}

/**
 * Get registry root for a commit.
 * Finds the registry hive blob and returns the WinRegKey root node.
 * Path format: /SYSTEM/CurrentControlSet/Services/... where SYSTEM is the hive name.
 */
async function get_registry_root(
    session: Session,
    commit_hash: string,
    path: string,
): Promise<EntityRootResult> {
    // Parse hive name from first path component
    const pathParts = path.split("/").filter(Boolean);
    if (pathParts.length === 0) {
        throw new Error("Registry path cannot be empty");
    }

    const hiveName = pathParts[0]; // e.g., "SYSTEM", "SOFTWARE"
    const remainingPath = pathParts.slice(1).join("/");

    const result = await session.executeRead((tx: ManagedTransaction) =>
        tx.run(GET_REGISTRY_ROOT_QUERY, { commit_hash, hiveName }),
    );

    if (result.records.length === 0) {
        // Hive doesn't exist in this commit - return null to indicate absence
        // This allows git log to properly show NEW/DEL status across commits
        return null;
    }

    const root_hash = result.records[0].get("root_hash");

    return {
        root_hash,
        root_label: "WinRegKey",
        remaining_path: remainingPath,
    };
}

/**
 * Get struct root for a commit.
 * Finds the PE blob and returns the Struct node.
 * Path format: /ntoskrnl.exe/_KPROCESS or /ntoskrnl.exe/_PEB_LDR_DATA/InMemoryOrderModuleList
 */
async function get_struct_root(
    session: Session,
    commit_hash: string,
    path: string,
): Promise<EntityRootResult> {
    const parsed = parseStructPath(path);

    const result = await session.executeRead((tx: ManagedTransaction) =>
        tx.run(GET_STRUCT_ROOT_QUERY, {
            commit_hash,
            pe_filename: parsed.pe_filename,
            struct_name: parsed.entity_name,
        }),
    );

    if (result.records.length === 0) {
        // Struct doesn't exist in this commit
        return null;
    }

    const root_hash = result.records[0].get("root_hash");

    return {
        root_hash,
        root_label: "Struct",
        remaining_path: parsed.remaining_path,
    };
}

/**
 * Get symbol root for a commit.
 * Finds the PE blob and returns the Symbol node.
 * Path format: /ntoskrnl.exe/NtCreateFile
 * Symbols are leaf nodes — remaining_path is always empty.
 */
async function get_symbol_root(
    session: Session,
    commit_hash: string,
    path: string,
): Promise<EntityRootResult> {
    const parsed = parseSymbolPath(path);

    const result = await session.executeRead((tx: ManagedTransaction) =>
        tx.run(GET_SYMBOL_ROOT_QUERY, {
            commit_hash,
            pe_filename: parsed.pe_filename,
            symbol_name: parsed.entity_name,
        }),
    );

    if (result.records.length === 0) {
        // Symbol doesn't exist in this commit
        return null;
    }

    const root_hash = result.records[0].get("root_hash");

    return {
        root_hash,
        root_label: "Symbol",
        remaining_path: "",
    };
}
