# Neo4j Query Optimization: CALL {} Subquery Pattern

This document explains a critical performance optimization used in the registry search query and provides guidance for similar scenarios.

## The Problem: NodeHashJoin with Variable-Length Paths

When a Cypher query contains **two or more variable-length path traversals** (`*`), Neo4j's query planner may choose a `NodeHashJoin` strategy to combine the results. This can cause catastrophic performance degradation.

### Example: Registry Search Query

The registry search needs to:
1. Traverse the filesystem tree to find blobs: `(Tree)-[:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(Blob)`
2. Traverse the registry tree within each blob: `(WinRegKey)-[:HAS_CHILD*]->(WinRegValue)`

**Original query (slow):**
```cypher
MATCH (c:Commit {hash: $hash})-[:OWNS_FILESYSTEM]->(root:Tree)
      -[fs_rels:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(b:Blob)
      -[:HAS_WINREG]->(reg_root:WinRegKey)
      -[reg_rels:HAS_CHILD*]->(v:WinRegValue)
WHERE entity_path CONTAINS $search_expr
RETURN ...
```

### What Goes Wrong: EXPLAIN Analysis

Running `EXPLAIN` on the original query reveals the problem:

```
+-----------------------------------+---------------------+
| Operator                          | Estimated Rows      |
+-----------------------------------+---------------------+
| +NodeHashJoin                     | 9223372036854775807 |  ← MAX_LONG!
| |\                                |                     |
| | +VarLengthExpand (registry)     | 1318192873387342848 |  ← 1.3 quintillion
| | |                               |                     |
| | +VarLengthExpand (filesystem)   |      32646917576426 |  ← 32 trillion
+-----------------------------------+---------------------+
```

The planner:
1. Expands ALL filesystem paths (32 trillion combinations)
2. Expands ALL registry paths (1.3 quintillion combinations)
3. Hash-joins them on the `Blob` node
4. Results in `MAX_LONG` estimated rows → 450+ second execution

### Why This Happens

Neo4j's cost-based planner sees two independent `*` expansions and decides to:
- Materialize both expansions fully
- Join them using a hash table

This is optimal for certain graph shapes but disastrous when both paths have high cardinality.

## The Solution: CALL {} Subquery Isolation

The `CALL {}` subquery creates a **planning boundary** that prevents the optimizer from combining the two traversals.

**Optimized query (fast):**
```cypher
MATCH (c:Commit {hash: $hash})-[:OWNS_FILESYSTEM]->(root:Tree)
      -[fs_rels:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(b:Blob)
      -[hive:HAS_WINREG]->(reg_root:WinRegKey)
WITH c, b, fs_rels, reg_root

CALL {
  WITH reg_root
  MATCH (reg_root)-[r:HAS_CHILD*]->(v:WinRegValue)
  WITH v, apoc.text.join([rel IN r | rel.name], '/') AS full_path
  WHERE full_path CONTAINS $search_expr
  RETURN full_path, v.hash AS node_hash
}

RETURN c.name AS commit_name, c.hash AS commit_hash, ...
```

### How CALL {} Helps

1. **Outer query** finds all blobs with registry hives (~12K rows)
2. **CALL {}** executes the registry traversal **per-hive**, not as a global join
3. Results are combined row-by-row, not via hash join

**EXPLAIN with CALL {}:**
```
+------------------------+------------------+
| Operator               | Estimated Rows   |
+------------------------+------------------+
| +VarLengthExpand       |           110319 |  ← filesystem only
| +Apply                 |                  |  ← processes per-row
|   +VarLengthExpand     |          ~50/hive|  ← registry per-hive
+------------------------+------------------+
```

Execution time: **~4 seconds** (vs 450+ seconds)

## When to Apply This Pattern

Use `CALL {}` subquery isolation when:

1. **Multiple `*` traversals** in the same query
2. **High cardinality** on at least one path (millions+ of paths)
3. **Independent traversals** that don't need global optimization
4. **EXPLAIN shows NodeHashJoin** with large estimated rows

### Pattern Template

```cypher
// First traversal (outer scope)
MATCH (start)-[*]->(intermediate)
WITH start, intermediate

// Second traversal (isolated in CALL)
CALL {
  WITH intermediate
  MATCH (intermediate)-[*]->(target)
  WHERE <filter condition>
  RETURN target
}

RETURN ...
```

## Related Neo4j Features

- **Query hints**: `USING JOIN ON` or `USING SCAN` can sometimes help, but `CALL {}` is more reliable
- **LIMIT early**: Adding `LIMIT` can force linear execution, but changes semantics
- **apoc.cypher.run**: Similar isolation effect but with more overhead

## References

- [Neo4j CALL {} Documentation](https://neo4j.com/docs/cypher-manual/current/subqueries/call-subquery/)
- [Neo4j Query Tuning](https://neo4j.com/docs/cypher-manual/current/query-tuning/)
