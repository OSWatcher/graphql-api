import { Commit, DiffItem, CommitHistoryDirection } from "../ogm-types.js";

/**
 * Result of resolving an entity root for a given commit and entity type.
 * The root node is the starting point for path traversal.
 */
export type EntityRootResult = {
    /** Hash of the root node to start traversal from */
    root_hash: string;
    /** Label/type of the root node (e.g., "Tree", "WinRegKey", "Struct", "Symbol") */
    root_label: string;
    /** Remaining path to traverse from the root node */
    remaining_path: string;
};

/**
 * Internal type for git log entries during processing.
 * Maps to GraphQL GitLogEntry type.
 */
export type GitLogEntry = {
    /** Older commit (null for first appearance in history) */
    base_commit: Commit | null;
    /** Newer commit where change is visible */
    diffee_commit: Commit;
    /** The change details */
    diff: DiffItem;
};

/**
 * Options for git log query
 */
export type GitLogOptions = {
    /** Maximum number of entries to return */
    limit?: number;
    /** Number of entries to skip */
    offset?: number;
    /** Filter to specific change types */
    status_filter?: string[];
    /** Direction of traversal (BACKWARD = newest to oldest, FORWARD = oldest to newest) */
    direction?: CommitHistoryDirection;
};
