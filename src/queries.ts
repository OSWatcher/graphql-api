// diff

// export const NODES_DIFF_QUERY = (
//     parent_label: string,
//     filter: Array<string> | null
// ) => `
// MATCH (t:${parent_label})-[r]->(c)
// WHERE t.hash IN [$base, $diffee]
// ${
//     filter
//         ? `AND (any(label IN labels(c) WHERE label IN $filter) OR '${parent_label}' IN labels(c))`
//         : ""
// }
// RETURN t.hash as parent_hash, r.name as name, {props: properties(c), label: labels(c)[0]} as child
// `;

export const NODES_DIFF_QUERY = (
    parent_label: string,
    filter: Array<string> | null
) => {
    let allowed_labels = "";
    if (filter) {
        allowed_labels = `:${parent_label}|${filter[0]}`;
    }
    return `
MATCH (base:${parent_label} {hash: $base})
MATCH (diffee:${parent_label} {hash: $diffee})

// NEW nodes
OPTIONAL MATCH (diffee)-[r_new]->(c_new${allowed_labels})
WHERE NOT EXISTS((base)-[{name: r_new.name}]->())
WITH base, diffee, 
     COLLECT(CASE WHEN c_new IS NOT NULL
             THEN {status: 'NEW', type: labels(c_new)[0], path: r_new.name, new_props: properties(c_new)}
             ELSE NULL
             END
    ) AS new_nodes

// DEL nodes
OPTIONAL MATCH (base)-[r_del]->(c_del${allowed_labels})
WHERE NOT EXISTS((diffee)-[{name: r_del.name}]->())
WITH base, diffee, new_nodes, 
     COLLECT(CASE WHEN c_del IS NOT NULL
             THEN {status: 'DEL', type: labels(c_del)[0], path: r_del.name, old_props: properties(c_del)}
             ELSE NULL
             END
    ) AS del_nodes

// MOD nodes
OPTIONAL MATCH (base)-[r_mod]->(c_mod${allowed_labels})
OPTIONAL MATCH (diffee)-[r_diffee {name: r_mod.name}]->(c_diffee${allowed_labels})
WHERE c_mod.hash <> c_diffee.hash
WITH new_nodes, del_nodes,
     COLLECT(CASE WHEN c_mod IS NOT NULL AND c_diffee IS NOT NULL
     THEN {
       status: 'MOD', 
       type: labels(c_mod)[0], 
       path: r_mod.name, 
       old_props: properties(c_mod), 
       new_props: properties(c_diffee)
     }
     ELSE NULL
     END
     ) AS mod_nodes

// combine all results into single list and unwind individual rows
UNWIND new_nodes + del_nodes + mod_nodes AS diff
RETURN diff
`;
};

export const RECURSIVE_NODES_QUERY = (
    parent_label: string,
    var_length: string,
    filter: Array<string> | null
) => `
MATCH path = (t:${parent_label})-[${var_length}]->(b)
WHERE t.hash = $parent_hash
${filter ? "AND any(label IN labels(b) WHERE label IN $filter)" : ""}
RETURN [r IN relationships(path) | r.name] as path_parts, {props: properties(b), label: labels(b)[0]} as child
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
export const GET_CHILD_NODE = (label: string) => `
MATCH (p:${label})-[r]->(c)
WHERE p.hash = $parent_hash AND r.name = $filename
RETURN c
`;

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
