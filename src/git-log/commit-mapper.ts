import { Node } from "neo4j-driver";
import { Commit } from "../ogm-types.js";

/**
 * Creates an empty connection structure for relationships.
 * Returns a fresh object each time to avoid mutation issues.
 */
function createEmptyConnection() {
    return {
        edges: [] as any[],
        totalCount: 0,
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
    };
}

/**
 * Maps a Neo4j commit node to a GraphQL Commit type.
 * Creates a minimal Commit object suitable for git log operations.
 *
 * This function is pure - it takes a Neo4j node and returns a Commit object
 * without any side effects.
 *
 * @param commitNode - Neo4j node with commit properties
 * @returns Commit object with empty connection fields
 */
export function mapNodeToCommit(commitNode: Node): Commit {
    const props = commitNode.properties as Record<string, unknown>;

    return {
        hash: props.hash as string,
        name: props.name as string,
        description: props.description as string | undefined,
        date: props.date as string,
        next: [],
        previous: null,
        nextConnection: createEmptyConnection(),
        previousConnection: createEmptyConnection(),
        filesystemConnection: createEmptyConnection(),
    };
}

/**
 * Maps raw commit properties (from a Neo4j record) to a GraphQL Commit type.
 * Use this when you have already extracted properties from a node.
 *
 * @param props - Object containing commit properties (hash, name, date, etc.)
 * @returns Commit object with empty connection fields
 */
export function mapPropsToCommit(
    props: Record<string, unknown>,
): Commit {
    return {
        hash: props.hash as string,
        name: props.name as string,
        description: props.description as string | undefined,
        date: props.date as string,
        next: [],
        previous: null,
        nextConnection: createEmptyConnection(),
        previousConnection: createEmptyConnection(),
        filesystemConnection: createEmptyConnection(),
    };
}
