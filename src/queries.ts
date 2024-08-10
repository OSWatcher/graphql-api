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
