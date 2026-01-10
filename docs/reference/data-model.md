# Data Model Reference

## Overview

OSWatcher uses a **Git-inspired merkle tree** data model to efficiently store and track operating system snapshots across versions. This document describes the core graph structure in Neo4j.

## Core Principle: Content-Addressable Storage

Like Git, OSWatcher separates **content** (stored in nodes) from **names** (stored in relationships).

**CRITICAL**: Blobs and Trees do NOT have a `name` property. Filenames are stored in the **relationship properties** between nodes.

```cypher
// ❌ WRONG - Blob has no .name property
WHERE blob.name = "SOFTWARE"

// ✅ CORRECT - Name is in the relationship
WHERE last(rels).name = "SOFTWARE"
```

---

## Filesystem Structure

### Graph Pattern

```
(Commit)-[:OWNS_FILESYSTEM]->(Tree)  [root directory]
    -[:HAS_CHILD_TREE {name: "Windows"}]->(Tree)
    -[:HAS_CHILD_BLOB {name: "ntoskrnl.exe"}]->(Blob)
```

### Node Types

**Commit**
- `hash`: String (commit SHA-1)
- `name`: String (commit name, e.g., "win10-21h1")
- `description`: String (optional)
- `date`: DateTime

**Tree** (directories)
- `hash`: String (content hash)
- NO `name` property - name is in parent relationship!

**Blob** (files)
- `hash`: String (content hash)
- NO `name` property - name is in parent relationship!

### Relationships

**:OWNS_FILESYSTEM**
- From: Commit
- To: Tree (root directory)
- Properties: none

**:HAS_CHILD_TREE**
- From: Tree
- To: Tree (subdirectory)
- Properties: `HasFilenameRel { name: String }`

**:HAS_CHILD_BLOB**
- From: Tree
- To: Blob (file)
- Properties: `HasFilenameRel { name: String }`

### Path Resolution Example

To find `/Windows/System32/ntoskrnl.exe`:

```cypher
MATCH (c:Commit)-[:OWNS_FILESYSTEM]->(root:Tree)
      -[r1:HAS_CHILD_TREE]->(windows:Tree)
      -[r2:HAS_CHILD_TREE]->(system32:Tree)
      -[r3:HAS_CHILD_BLOB]->(kernel:Blob)
WHERE r1.name = "Windows"
  AND r2.name = "System32"
  AND r3.name = "ntoskrnl.exe"
RETURN kernel
```

Building the path from relationships:
```cypher
MATCH path = (root:Tree)-[rels:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(node)
RETURN '/' + apoc.text.join([rel IN rels | rel.name], '/') AS full_path
```

---

## Registry Structure

### Graph Pattern

```
(Commit)-[:OWNS_FILESYSTEM]->(Tree)
    -[:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(Blob)  [hive file]
        -[:HAS_WINREG]->(WinRegKey)  [hive root]
            -[:HAS_CHILD {name: "Microsoft"}]->(WinRegKey)
                -[:HAS_CHILD {name: "MSDTC"}]->(WinRegKey)
                    -[:HAS_CHILD {name: "AllowOnlySecureRpcCalls"}]->(WinRegValue)
```

### Node Types

**WinRegKey** (registry keys)
- `hash`: String (content hash)
- NO `name` property - name is in parent relationship!

**WinRegValue** (registry values)
- `hash`: String (content hash)
- `type`: String (REG_SZ, REG_DWORD, etc.)
- `value`: String (serialized value)
- NO `name` property - name is in parent relationship!

### Relationships

**:HAS_WINREG**
- From: Blob (hive file like SOFTWARE, SYSTEM)
- To: WinRegKey (hive root)
- Properties: none

**:HAS_CHILD**
- From: WinRegKey
- To: WinRegKey or WinRegValue
- Properties: `HasFilenameRel { name: String }`

### Registry Path Format

OSWatcher uses **forward slashes** for consistency, not backslashes:

```
SOFTWARE/Microsoft/Windows NT/CurrentVersion
```

Components:
1. **Hive name** (e.g., `SOFTWARE`) - Name of the blob file in the filesystem
2. **Registry path** (e.g., `Microsoft/Windows NT/CurrentVersion`) - Path through WinRegKey nodes

### Finding a Registry Hive

To find the SOFTWARE hive:

```cypher
MATCH (c:Commit)-[:OWNS_FILESYSTEM]->(root:Tree)
      -[fs_rels:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(hive:Blob)
      -[:HAS_WINREG]->(regRoot:WinRegKey)
WHERE last(fs_rels).name = "SOFTWARE"  // ← Name in relationship!
RETURN regRoot
```

Common mistake:
```cypher
WHERE hive.name = "SOFTWARE"  // ❌ WRONG - Blob has no .name property!
```

---

## Symbols and Structs Structure

### Graph Pattern

```
(Commit)-[:OWNS_FILESYSTEM]->(Tree)
    -[:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(Blob)  [e.g., ntoskrnl.exe]
        -[:HAS_SYMBOL {name: "NtCreateFile"}]->(Symbol)
        -[:HAS_STRUCT {name: "_EPROCESS"}]->(Struct)
            -[:HAS_FIELD {name: "UniqueProcessId"}]->(StructField)
```

### Node Types

**Symbol** (exported functions)
- `hash`: String (content hash)
- `address`: String (virtual address)
- NO `name` property - name is in relationship!

**Struct** (data structures)
- `hash`: String (content hash)
- NO `name` property - name is in relationship!

**StructField** (struct members)
- `hash`: String (content hash)
- `offset`: Int (byte offset in struct)
- `type`: String (field type)
- NO `name` property - name is in relationship!

### Relationships

**:HAS_SYMBOL**
- From: Blob
- To: Symbol
- Properties: `HasNameRel { name: String }`

**:HAS_STRUCT**
- From: Blob
- To: Struct
- Properties: `HasNameRel { name: String }`

**:HAS_FIELD**
- From: Struct
- To: StructField
- Properties: `HasNameRel { name: String }`

---

## Commit History

### Graph Pattern

```
(Branch)-[:TRACKS_COMMIT]->(HEAD:Commit)
    -[:HAS_PREVIOUS]->(Commit)
        -[:HAS_PREVIOUS]->(Commit)
            -[:HAS_PREVIOUS]->...
```

### Relationships

**:TRACKS_COMMIT**
- From: Branch
- To: Commit (branch HEAD)
- Properties: none

**:HAS_PREVIOUS**
- From: Commit (newer)
- To: Commit (older)
- Properties: none

### Direction Semantics

- **FORWARD**: Old → New (follow `:HAS_PREVIOUS` in reverse)
- **BACKWARD**: New → Old (follow `:HAS_PREVIOUS` forward)

---

## Common Patterns

### 1. Building Full Paths

Always build paths from relationship names:

```cypher
MATCH (root)-[rels:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(node)
WITH [rel IN rels | rel.name] AS path_parts
RETURN '/' + apoc.text.join(path_parts, '/') AS full_path
```

### 2. Finding Files by Name

Use relationship properties, not node properties:

```cypher
MATCH (tree)-[rel:HAS_CHILD_BLOB]->(blob)
WHERE rel.name = "ntoskrnl.exe"
RETURN blob
```

### 3. Traversing Variable-Length Paths

Use relationship name filters:

```cypher
MATCH path = (root)-[rels:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(target)
WHERE all(i IN range(0, size(rels)-1) WHERE rels[i].name = path_parts[i])
```

---

## Performance Considerations

### Variable-Length Path Explosion

When combining multiple `*` traversals (e.g., filesystem + registry), use `CALL {}` to prevent cardinality explosion:

```cypher
// ❌ BAD - NodeHashJoin explosion
MATCH (c:Commit)-[:OWNS_FILESYSTEM]->(root:Tree)
      -[:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(blob:Blob)
      -[:HAS_WINREG]->(regRoot:WinRegKey)
      -[:HAS_CHILD*]->(value:WinRegValue)

// ✅ GOOD - Use CALL {} subquery
MATCH (c:Commit)-[:OWNS_FILESYSTEM]->(root:Tree)
      -[fs_rels:HAS_CHILD_TREE|HAS_CHILD_BLOB*]->(blob:Blob)
      -[:HAS_WINREG]->(regRoot:WinRegKey)
WITH c, blob, regRoot
CALL {
  WITH regRoot
  MATCH (regRoot)-[:HAS_CHILD*]->(value:WinRegValue)
  RETURN value
}
```

See [Query Optimization](../explanation/query-optimization.md) for details.

---

## Schema Enforcement

### Type-Safe Label Mapping

When building dynamic queries, use whitelisted labels to prevent injection:

```typescript
const LABEL_MAP: Record<string, string> = {
    Tree: "Tree",
    Blob: "Blob",
    WinRegKey: "WinRegKey",
    Struct: "Struct",
};

// ✅ Safe
const safeLabel = LABEL_MAP[userInput];
if (!safeLabel) throw new Error("Invalid label type");
```

### Relationship Property Schema

All filename/name relationships use these interfaces:

```graphql
type HasFilenameRel @relationshipProperties {
    name: String!
}

type HasNameRel @relationshipProperties {
    name: String!
}
```

---

## Key Takeaways

1. **Blobs, Trees, WinRegKeys, Symbols, Structs have NO `name` property**
2. **Names are stored in relationship properties** (`HasFilenameRel.name`, `HasNameRel.name`)
3. **Use `last(rels).name`** to get the filename of a blob/tree
4. **Build paths from relationships**, not from node properties
5. **Use CALL {} subqueries** when combining multiple variable-length traversals

---

## Related Documentation

- [Query Optimization](../explanation/query-optimization.md) - CALL {} subquery pattern
- [GraphQL Schema](../../type-defs.graphql) - Full type definitions
- [CLAUDE.md](../../CLAUDE.md) - Development patterns

## Additional Resources

- [Neo4j Property Graph Model](https://neo4j.com/docs/getting-started/current/graphdb-concepts/)
- [Git Internals - Objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects)
