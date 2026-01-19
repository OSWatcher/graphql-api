import { CommitHistoryDirection } from "./ogm-types.js";

// diff
export const NODES_DIFF_QUERY = `
CALL example.diffTreesRecursive($parentLabel, $base, $diffee, $basePath, $filter, $maxDepth, $withIntermediates, $statusFilter)
YIELD status, type, path, old_props, new_props
RETURN status, type, path, old_props, new_props
`;

// get commits in range (DEPRECATED - replaced by buildCommitRangeQuery)
export const getCommitsInRangeQuery = `
MATCH (start:Commit {hash: $startCommit})
OPTIONAL MATCH (end:Commit {hash: $endCommit})

// Single commit mode
OPTIONAL MATCH (single:Commit)
WHERE $scope = "SINGLE" AND single = start

// History mode (backwards only)
OPTIONAL MATCH (start)-[:HAS_PREVIOUS*0..]->(history:Commit)
WHERE $scope = "HISTORY"

// History with updates mode (bidirectional)
OPTIONAL MATCH (start)-[:HAS_PREVIOUS*0..]-(historyWithUpdates:Commit)
WHERE $scope = "HISTORY_WITH_UPDATES"

// Range mode
OPTIONAL MATCH (start)-[:HAS_PREVIOUS*0..]->(range:Commit)
WHERE $scope = "RANGE" AND (range = end OR (range)-[:HAS_PREVIOUS*0..]->(end))

// Collect all non-null results
WITH coalesce(single, history, historyWithUpdates, range) AS commit
WHERE commit IS NOT NULL
RETURN commit
`;

// Resolve branch name to commit hash
export const RESOLVE_BRANCH_REF_QUERY = `
MATCH (b:Branch {name: $branchName})-[:TRACKS_COMMIT]->(c:Commit)
RETURN c.hash as hash
`;

/**
 * Build Cypher query for fetching commits based on CommitRange parameters
 * Replaces the old scope-based getCommitsInRangeQuery
 *
 * @param direction - FORWARD or BACKWARD traversal
 * @param include_updates - Whether to include update/patch branches
 * @param branch - Optional branch name to filter commits
 * @param hasEndRef - Whether an endRef was provided (for range queries)
 */
export function buildCommitRangeQuery(
    direction: CommitHistoryDirection,
    include_updates: boolean,
    branch: string | null,
    hasEndRef: boolean,
): string {
    // Determine relationship pattern
    let relationshipPattern: string;

    if (direction === CommitHistoryDirection.Backward) {
        // BACKWARD: follow HAS_PREVIOUS forward
        relationshipPattern = include_updates
            ? "-[:HAS_PREVIOUS*0..]-(c)" // Undirected (includes update branches)
            : "-[:HAS_PREVIOUS*0..]->(c)"; // Directed (releases only)
    } else {
        // FORWARD: follow HAS_PREVIOUS backward
        relationshipPattern = include_updates
            ? "-[:HAS_PREVIOUS*0..]-(c)" // Undirected
            : "<-[:HAS_PREVIOUS*0..]-(c)"; // Reverse directed
    }

    // Build query
    let query = `
MATCH (start:Commit {hash: $startHash})`;

    // Add end ref for range queries
    if (hasEndRef) {
        query += `
MATCH (end:Commit {hash: $endHash})`;
    }

    // Add traversal pattern
    query += `
MATCH (start)${relationshipPattern}`;

    // Add WHERE clauses
    const whereClauses: string[] = [];

    if (branch) {
        whereClauses.push(
            "EXISTS { MATCH (:Branch {name: $branch})-[:TRACKS_COMMIT]->(c) }",
        );
    }

    if (hasEndRef) {
        // Range query: ensure c is between start and end
        if (direction === CommitHistoryDirection.Backward) {
            whereClauses.push("(c = end OR (c)-[:HAS_PREVIOUS*0..]->(end))");
        } else {
            whereClauses.push("(c = end OR (end)-[:HAS_PREVIOUS*0..]->(c))");
        }
    }

    if (whereClauses.length > 0) {
        query += `
WHERE ${whereClauses.join(" AND ")}`;
    }

    query += `
RETURN c as commit`;

    return query;
}

// search within specific commits
export const searchFSInCommitsQuery = `
UNWIND $commit_hashes AS commit_hash
MATCH (c:Commit {hash: commit_hash})-[:OWNS_FILESYSTEM]->(root:Tree)-[r:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(b:Blob)
WITH c.name as commit_name, c.hash as commit_hash, b, [rel in r | rel.name] AS path_parts
WITH commit_name, commit_hash, b.hash AS blob_hash, apoc.text.join(path_parts, '/') AS full_path
WHERE CASE
  WHEN $case_sensitive THEN full_path CONTAINS $search_expr
  ELSE toLower(full_path) CONTAINS toLower($search_expr)
END
RETURN commit_name, commit_hash, blob_hash, full_path
`;

// Registry search query - uses CALL {} subquery for performance optimization
//
// IMPORTANT: Without CALL {}, Neo4j's query planner uses NodeHashJoin to combine
// the two variable-length path traversals (filesystem and registry), resulting in
// cardinality explosion (32+ trillion estimated rows → 450+ second queries).
//
// The CALL {} subquery isolates the registry traversal, forcing a linear
// execution plan that processes registry paths one hive at a time (4s execution).
//
// See: docs/explanation/query-optimization.md for full analysis
export const searchRegistryInCommitsQuery = `
UNWIND $commit_hashes AS commit_hash
MATCH (c:Commit {hash: commit_hash})-[:OWNS_FILESYSTEM]->(root:Tree)
      -[fs_rels:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(b:Blob)
      -[hive:HAS_WINREG]->(reg_root:WinRegKey)
WITH c, b, fs_rels, hive, reg_root

CALL {
  WITH reg_root
  MATCH (reg_root)-[r:HAS_CHILD*]->(v:WinRegValue)
  WITH v, [rel IN r | rel.name] AS path_parts
  WITH v, apoc.text.join(path_parts, '/') AS full_path
  WHERE CASE
    WHEN $case_sensitive THEN full_path CONTAINS $search_expr
    ELSE toLower(full_path) CONTAINS toLower($search_expr)
  END
  RETURN full_path, v.hash AS node_hash
}

RETURN c.name AS commit_name, c.hash AS commit_hash,
       b.hash AS blob_hash,
       '/' + apoc.text.join([rel in fs_rels | rel.name], '/') AS blob_path,
       '/' + hive.name + '/' + full_path AS entity_path, node_hash
`;

// Symbol search query - searches PDB symbols by name
// Note: No CALL {} subquery needed here - symbol search has only one variable-length
// traversal (filesystem), unlike registry which has two. The HAS_SYMBOL relationship
// is a direct connection from Blob to Symbol, not a variable-length path.
export const searchSymbolInCommitsQuery = `
UNWIND $commit_hashes AS commit_hash
MATCH (c:Commit {hash: commit_hash})-[:OWNS_FILESYSTEM]->(root:Tree)
      -[fs_rels:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(b:Blob)
      -[sym_rel:HAS_SYMBOL]->(s:Symbol)
WITH c, b, fs_rels, sym_rel, s
WHERE CASE
  WHEN $case_sensitive THEN sym_rel.name CONTAINS $search_expr
  ELSE toLower(sym_rel.name) CONTAINS toLower($search_expr)
END
RETURN c.name AS commit_name, c.hash AS commit_hash,
       b.hash AS blob_hash,
       '/' + apoc.text.join([rel in fs_rels | rel.name], '/') AS blob_path,
       sym_rel.name AS symbol_name,
       s.hash AS node_hash
`;

// Struct search query - searches struct/field paths
// Traverses to StructField and builds full path: /<struct_name>/<field_name>
// Searches within that path, so both struct names and field names match.
// Example: "EPROCESS" matches "/_EPROCESS/ImageFileName"
// Note: No CALL {} subquery needed - same reasoning as symbol search.
export const searchStructInCommitsQuery = `
UNWIND $commit_hashes AS commit_hash
MATCH (c:Commit {hash: commit_hash})-[:OWNS_FILESYSTEM]->(root:Tree)
      -[fs_rels:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(b:Blob)
      -[struct_rel:HAS_STRUCT]->(s:Struct)
      -[field_rel:HAS_FIELD]->(f:StructField)
WITH c, b, fs_rels, struct_rel, field_rel, f,
     struct_rel.name + '/' + field_rel.name AS struct_path
WHERE CASE
  WHEN $case_sensitive THEN struct_path CONTAINS $search_expr
  ELSE toLower(struct_path) CONTAINS toLower($search_expr)
END
RETURN c.name AS commit_name, c.hash AS commit_hash,
       b.hash AS blob_hash,
       '/' + apoc.text.join([rel in fs_rels | rel.name], '/') AS blob_path,
       '/' + struct_path AS entity_path,
       f.hash AS node_hash
`;

// search (legacy - all commits)
export const searchFSFullPathQuery = `
MATCH (c:Commit)-[:OWNS_FILESYSTEM]->(root:Tree)-[r:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(b:Blob)
WITH c.name as commit_name, c.hash as commit_hash, b, [rel in r | rel.name] AS path_parts
WITH commit_name, commit_hash, b.hash AS blob_hash, apoc.text.join(path_parts, '/') AS full_path
WHERE full_path CONTAINS $search_expr
RETURN commit_name, commit_hash, blob_hash, full_path
`;

// filesystem
// Type-safe label mapping to prevent injection and info disclosure
const LABEL_MAP: Record<string, string> = {
    Tree: "Tree",
    Blob: "Blob",
    WinRegKey: "WinRegKey",
    Struct: "Struct",
} as const;

export const GET_CHILD_NODE = (label: string) => {
    // Validate label against whitelist to prevent Cypher injection
    const safeLabel = LABEL_MAP[label];
    if (!safeLabel) {
        // Don't leak user input in error message
        throw new Error("Invalid label type");
    }

    return `
MATCH (p:${safeLabel})-[r]->(c)
WHERE p.hash = $parent_hash AND r.name = $filename
RETURN c, labels(c) as child_labels
`;
};

export const GET_NODE_COMMIT_DATES = (label: string) => {
    // Validate label against whitelist to prevent Cypher injection
    const safeLabel = LABEL_MAP[label];
    if (!safeLabel) {
        throw new Error(`Invalid label type for commit lookup: ${label}`);
    }

    // Single query pattern that works for all node types:
    // - Traverses up from node through any relationships (including zero-length for root Trees)
    // - Finds root Tree nodes (those with OWNS_FILESYSTEM relationship)
    // - Follows OWNS_FILESYSTEM to get parent Commits
    // - Returns ALL commit dates since node can appear in multiple commits
    return `
MATCH (n:${safeLabel} {hash: $node_hash})<-[*]-(root:Tree)<-[:OWNS_FILESYSTEM]-(c:Commit)
RETURN c.date as date
ORDER BY c.date DESC
`;
};

// constraints
const CONSTRAINT_LABELS = {
    Blob: "Blob",
    Tree: "Tree",
    Commit: "Commit",
} as const;

export const createConstraintQuery = (label: string) => {
    const safeLabel =
        CONSTRAINT_LABELS[label as keyof typeof CONSTRAINT_LABELS];
    if (!safeLabel) {
        throw new Error("Invalid constraint label");
    }
    return `
CREATE CONSTRAINT ${safeLabel.toLowerCase()}_hash_unique IF NOT EXISTS
FOR (n:${safeLabel})
REQUIRE n.hash IS UNIQUE
`;
};

// commit
export const FETCH_COMMIT_HISTORY_BACKWARD_QUERY = `
MATCH (start:Commit {hash: $commit_hash})-[:HAS_PREVIOUS*0..]->(c:Commit)
OPTIONAL MATCH (c)-[:HAS_PREVIOUS]->(previous:Commit)
OPTIONAL MATCH (c)<-[:HAS_PREVIOUS]-(next:Commit)
RETURN c, previous, COLLECT(next) AS nextCommits
`;

export const FETCH_COMMIT_HISTORY_FORWARD_QUERY = `
MATCH (start:Commit {hash: $commit_hash})<-[:HAS_PREVIOUS*0..]-(c:Commit)
OPTIONAL MATCH (c)-[:HAS_PREVIOUS]->(previous:Commit)
OPTIONAL MATCH (c)<-[:HAS_PREVIOUS]-(next:Commit)
RETURN c, previous, COLLECT(next) AS nextCommits
`;

// get all labels of the commit node
// also prevent the commit from traversing the other commits through HAS_PREVIOUS
export const GET_COMMIT_CAPABILITIES_QUERY = `
    MATCH path=(c:Commit {hash: $commit_hash})-[*]->(n)
    WHERE NONE(rel IN relationships(path) WHERE type(rel) = 'HAS_PREVIOUS')
    WITH n, labels(n) AS labels_list
    UNWIND labels_list AS label
    RETURN COLLECT(DISTINCT label) AS uniqueLabels
`;

// fetch symbols
export const FETCH_SYMBOLS_QUERY = `
    MATCH (b:Blob)-[r:HAS_SYMBOL]->(s:Symbol)
    WHERE b.hash = $blob_hash
    WITH r.name as symbol_name, s.address as symbol_address
    ORDER BY symbol_name ASC
    SKIP toInteger($skip_count)
    LIMIT toInteger($limit_count)
    RETURN symbol_name, symbol_address
`;

// fetch structs
export const FETCH_STRUCTS_QUERY = `
MATCH (b:Blob)-[rs:HAS_STRUCT]->(s:Struct)-[rf:HAS_FIELD]->(f:StructField)
WHERE b.hash = $blob_hash
WITH rs.name as struct_name, s, collect({field_name: rf.name, field: properties(f)}) as fields
ORDER BY struct_name ASC
SKIP toInteger($skip_count)
LIMIT toInteger($limit_count)
RETURN struct_name, properties(s) as struct_props, fields
`;

// blob authorization
export const CHECK_BLOB_RESTRICTED_QUERY = `
MATCH (b:Blob)
WHERE b.hash = $blob_hash
WITH b
MATCH (b)<-[:HAS_CHILD_BLOB]-(t:Tree)<-[:HAS_CHILD_TREE|OWNS_FILESYSTEM*]-(c:Commit)
WITH collect(c) as commit_list_where_hash
MATCH (br:Branch)-[:TRACKS_COMMIT|HAS_PREVIOUS*]-(c:Commit)
WHERE br.name = $branch_name
WITH commit_list_where_hash, collect(c) as branch_reachable_commit_list
RETURN all(c IN commit_list_where_hash WHERE c IN branch_reachable_commit_list) as is_restricted
`;
