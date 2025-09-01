// diff
export const NODES_DIFF_QUERY = `
CALL example.diffTreesRecursive($parentLabel, $base, $diffee, $basePath, $filter, $maxDepth, $withIntermediates)
YIELD status, type, path, old_props, new_props
RETURN status, type, path, old_props, new_props
`;

// get commits in range
export const getCommitsInRangeQuery = `
MATCH (start:Commit {hash: $startCommit})
OPTIONAL MATCH (end:Commit {hash: $endCommit})

// Single commit mode
OPTIONAL MATCH (single:Commit)
WHERE $scope = "SINGLE" AND single = start

// History mode
OPTIONAL MATCH (start)-[:HAS_PREVIOUS*0..]->(history:Commit)
WHERE $scope = "HISTORY"

// Range mode
OPTIONAL MATCH (start)-[:HAS_PREVIOUS*0..]->(range:Commit)
WHERE $scope = "RANGE" AND (range = end OR (range)-[:HAS_PREVIOUS*0..]->(end))

// Collect all non-null results
WITH coalesce(single, history, range) AS commit
WHERE commit IS NOT NULL
RETURN commit
`;

// search within specific commits
export const searchFSInCommitsQuery = `
UNWIND $commit_hashes AS commit_hash
MATCH (c:Commit {hash: commit_hash})-[:OWNS_FILESYSTEM]->(root:Tree)-[r:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(b:Blob)
WITH c.name as commit_name, c.hash as commit_hash, b, [rel in r | rel.name] AS path_parts
WITH commit_name, commit_hash, b.hash AS blob_hash, apoc.text.join(path_parts, '/') AS full_path
WHERE full_path CONTAINS $search_expr
RETURN commit_name, commit_hash, blob_hash, full_path
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
const ALLOWED_TRAVERSAL_LABELS = ["Tree", "Blob", "WinRegKey"] as const;

export const GET_CHILD_NODE = (label: string) => {
    // Validate label against whitelist to prevent Cypher injection
    if (!ALLOWED_TRAVERSAL_LABELS.includes(label as any)) {
        throw new Error(
            `Invalid parent label: ${label}. Only Tree and Blob traversal allowed.`,
        );
    }

    return `
MATCH (p:${label})-[r]->(c)
WHERE p.hash = $parent_hash AND r.name = $filename
RETURN c
`;
};

// constraints
export const createConstraintQuery = (label: string) => `
CREATE CONSTRAINT ${label.toLowerCase()}_hash_unique IF NOT EXISTS
FOR (n:${label})
REQUIRE n.hash IS UNIQUE
`;

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
MATCH (b:Blob)-[rs:HAS_STRUCT]->(s:WinStruct)-[rf:HAS_FIELD]->(f:WinStructField)
WHERE b.hash = $blob_hash
WITH rs.name as struct_name, s, collect({field_name: rf.name, field: properties(f)}) as fields
ORDER BY struct_name ASC
SKIP toInteger($skip_count)
LIMIT toInteger($limit_count)
RETURN struct_name, properties(s) as struct_props, fields
`;
