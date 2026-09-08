# Diff System: Behavior and Known Gotchas

## Overview

The diff system computes changes between two filesystem snapshots. It spans three layers:

1. **GraphQL resolver** (`src/resolvers.ts` → `diffNodesAt`): validates input with a zod schema
2. **TypeScript diff logic** (`src/diff/diff.ts` → `diffNodesAtInternal`, `diffTreesIterative`): resolves paths, calls the Neo4j procedure
3. **Java Neo4j procedure** (`oswatcher-procedures` → `example.diffTreesRecursive`): recursive graph traversal

## `max_depth` Semantics

| Value | Behavior |
|-------|----------|
| `0` | Compare the root node only (no children). Returns a single MOD/NEW/DEL entry. |
| `1` | Immediate children only. No recursion into subdirectories. |
| `N > 1` | Children + N-1 levels of descendants. |
| `-1` (or omitted) | Unlimited recursive diff. Returns all changed leaf nodes. |

Note: the Java procedure's `canRecurse` logic is **shifted by 1**: `max_depth=1` means "children only, no recursion", not "recurse one level deep".

## `max_depth` Is Unrestricted

`diffNodesAt` applies no authorization to `max_depth`. Every value, including
the unlimited default, is allowed. There is no authentication model in this API
at all. `src/auth/` was removed on 2026-09-08 along with Auth0.

The `filter` and `max_depth=1` gotchas below are **not** auth rules. They are
behaviours of the Java procedure `example.diffTreesRecursive`, and they apply
identically to every caller.

## `with_intermediates` and `status_filter`

- `with_intermediates=false` (default): only leaf nodes (Blobs, WinRegValues, etc.) are returned. Intermediate directory nodes are not emitted even if they changed.
- `with_intermediates=true`: emit intermediate Tree/WinRegKey nodes as MOD/NEW/DEL in addition to their leaves.
- `status_filter`: restrict results to `NEW`, `MOD`, `DEL`, or `UNCHANGED`. Empty = all except UNCHANGED (UNCHANGED requires explicit opt-in).

## The `filter` Parameter and the Blob Gotcha

The `filter` parameter controls which child node labels are collected at each level of the recursive traversal (in `collectNodeInfo` in the Java procedure).

**Critical behavior**: if `filter=[]` (empty), the Java procedure adds `parentLabel` (e.g. `"Tree"`) to it automatically:

```java
effectiveFilter.add(parentLabel);  // always adds "Tree" for filesystem diffs
```

This means without an explicit filter, only `Tree` children are collected, and `Blob` nodes are silently skipped.

**Consequence**:
- `max_depth=1`: works fine (no recursion occurs), Tree children are returned as MOD/DEL/NEW directly
- `max_depth=-1`: returns **0 results** (recursion only visits Tree→Tree chains, Blob leaves are never collected, and with `with_intermediates=false` nothing is emitted)

**Fix**: always pass `filter: ["Tree", "Blob"]` for filesystem diffs. The MCP's `DiffNodesAt` query does this by default (see `mcp/src/tools/diff.ts`).

For non-filesystem diffs (registry, symbols, structs), use the appropriate labels:
- Registry: `["WinRegKey", "WinRegValue"]`
- Symbols: `["Symbol"]`
- Structs (list): `["Struct"]`
- Struct fields: `["StructField"]`

## `max_depth=1` Rule for Leaf-Node Types

**Always pass `max_depth=1` for Symbol, Struct, and StructField diffs.** Without it, diffs return 0 results.

Root cause: the Java procedure adds `parentLabel` to `effectiveFilter` and uses `isRecursableLabel` to decide whether to recurse into a node. `Struct` and `Symbol` are recursable, so the procedure recurses into them looking for children of the same label type. But Struct children are `StructField`, not `Struct`; Symbol nodes have no children of the same type. Without `max_depth=1`, the procedure exhausts all recursion levels and emits nothing.

With `max_depth=1`, recursion is cut off after the immediate children, exactly what is needed for flat lists of Symbols/Structs/StructFields.

| Entity | `parent_label` | `filter` | `max_depth` |
|--------|---------------|----------|-------------|
| Filesystem | `Tree` | `["Tree", "Blob"]` | omit (-1) |
| Registry | `WinRegKey` | `["WinRegKey", "WinRegValue"]` | omit (-1) |
| Symbols | `Blob` | `["Symbol"]` | **1 (required)** |
| Structs list | `Blob` | `["Struct"]` | **1 (required)** |
| Struct fields | `Blob` | `["StructField"]` | **1 (required)** |

## Reconstructing Full C Type Layout

Struct field diffs with `status_filter` omitted (or `["NEW","MOD","DEL"]`) return only delta fields. To reconstruct the complete C type layout, pass `status_filter: ["NEW", "MOD", "DEL", "UNCHANGED"]`.

Example: `_EPROCESS` between win11-24h2 and win11-25h2 (5 changed fields vs 261 total fields).

## Path Resolution

Before calling the Java procedure, `diffNodesAtInternal` resolves the `at_path` argument by traversing from the filesystem root hash to the target node using `get_path_entry()`. If the path doesn't exist in either tree, the function returns early with `total_count: 0, items: []`. This is normal (e.g. a path that only exists in one version).

## MCP vs Frontend

The MCP's `diff_versions` tool (`mcp/src/tools/diff.ts`) hardcodes
`parentLabel="Tree"` and `filter=["Tree", "Blob"]`, which is correct for
filesystem diffs. `diff_nodes` (`mcp/src/tools/diff-nodes.ts`) takes both from
the caller, which is what makes it usable for registry, symbol and struct diffs.

The frontend passes the `filter` parameter explicitly depending on the view (filesystem, registry, symbols, structs). Do not change the MCP defaults without verifying the filter handles all relevant child label types.
