// diff

// Note: return a list instead of a map of parent_hash -> child_hash
// since Cypher doesn't support dynamic keys in map projections
export const DIFF_QUERY = `
MATCH (t:Tree)-[r:HAS_CHILD_BLOB|HAS_CHILD_TREE]->(c)
WHERE t.hash = $base
    OR t.hash = $diffee
RETURN t.hash as parent_hash, type(r) as type, r.name as name, c.hash as child_hash
`;

export const RECURSIVE_BLOBS_QUERY = (var_length: string) => `
MATCH path = (t:Tree)-[:HAS_CHILD_BLOB|HAS_CHILD_TREE${var_length}]->(b:Blob)
WHERE t.hash = $parent_hash
RETURN [r IN relationships(path) | r.name] as path_parts, b.hash as blob_hash
`;

// const DIFF_PARALLEL_QUERY = `
// CALL apoc.cypher.mapParallel(
//     'MATCH (t:Tree)-[r:HAS_CHILD_BLOB|HAS_CHILD_TREE]->(c)
//     WHERE t.hash IN [_.base, _.diffee]
//     WITH _, t.hash as parent_hash, collect({type: type(r), name: r.name, hash: c.hash}) as children
//     RETURN collect({parent_hash: parent_hash, children: children}) as result, _.base as base_hash, _.diffee as diffee_hash, _.path as base_path',
//     {},
//     $hash_list
// ) YIELD value
// RETURN value
// `;

// search
export const searchFSFullPathQuery = `
MATCH (c:Commit)-[:OWNS_FILESYSTEM]->(root:Tree)-[r:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(b:Blob)
WITH c.name as commit_name, c.hash as commit_hash, b, [rel in r | rel.name] AS path_parts
WITH commit_name, commit_hash, b.hash AS blob_hash, apoc.text.join(path_parts, '/') AS full_path
WHERE full_path CONTAINS $search_expr
RETURN commit_name, commit_hash, blob_hash, full_path
`;

// filesystem
export const GET_CHILD_NODE = `
MATCH (p)-[r]->(c)
WHERE p.hash = $parent_hash AND r.name = $filename
RETURN c
`;

export const GET_FINAL_NODE = GET_CHILD_NODE;

// constraints
export const createConstraintQuery = (label: string) => `
CREATE CONSTRAINT ${label.toLowerCase()}_hash_unique IF NOT EXISTS
FOR (n:${label})
REQUIRE n.hash IS UNIQUE
`;

// commit
export const FETCH_COMMIT_HISTORY_QUERY = `
    MATCH (b:Branch)-[r:TRACKS_COMMIT|HAS_PREVIOUS*0..]->(c:Commit)
    WHERE b.name = $branch_name
    RETURN c
    LIMIT 100
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
