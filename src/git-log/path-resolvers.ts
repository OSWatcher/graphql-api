import { Driver } from "neo4j-driver";
import { EntityType } from "../ogm-types.js";
import { EntityRootResult } from "./types.js";

/**
 * Query to get the filesystem root for a commit
 */
const GET_FS_ROOT_QUERY = `
MATCH (c:Commit {hash: $commit_hash})-[:OWNS_FILESYSTEM]->(root:Tree)
RETURN root.hash as root_hash
`;

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
                // TODO: Implement struct root resolution
                // - Parse struct name from path (e.g., "_EPROCESS")
                // - Query: Find struct in /Windows/System32/ntoskrnl.exe
                // - Return Struct node + field name as remaining path (if any)
                throw new Error("Struct entity type not yet implemented");

            case EntityType.Symbol:
                // TODO: Implement symbol root resolution
                // - Parse symbol name from path
                // - Query: Find symbol in /Windows/System32/ntoskrnl.exe
                // - Return Symbol node + empty remaining path
                throw new Error("Symbol entity type not yet implemented");

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
    session: any,
    commit_hash: string,
    path: string,
): Promise<EntityRootResult> {
    const result = await session.executeRead((tx: any) =>
        tx.run(GET_FS_ROOT_QUERY, { commit_hash }),
    );

    if (result.records.length === 0) {
        throw new Error(`No filesystem root found for commit ${commit_hash}`);
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
 * Path format: SYSTEM/CurrentControlSet/Services/... where SYSTEM is the hive name.
 */
async function get_registry_root(
    session: any,
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

    // Query: filesystem → hive blob → registry root
    const GET_REGISTRY_ROOT_QUERY = `
        MATCH (c:Commit {hash: $commit_hash})-[:OWNS_FILESYSTEM]->(fsRoot:Tree)
              -[:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(hive:Blob)
              -[:HAS_WINREG]->(regRoot:WinRegKey)
        WHERE hive.name = $hiveName
        RETURN regRoot.hash as root_hash
    `;

    const result = await session.executeRead((tx: any) =>
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
