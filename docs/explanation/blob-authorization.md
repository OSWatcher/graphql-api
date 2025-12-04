# Blob Authorization: How It Works

## Background

### The Problem

OSWatcher analyzes and stores operating system snapshots, including:
- **Linux distributions** (Ubuntu, Debian, etc.) - Open source, freely redistributable
- **Windows systems** (Windows 10, Windows 11) - Proprietary, licensing restrictions apply

Windows binaries (`.exe`, `.dll`, `.sys` files) are stored as blobs in object storage. Microsoft's licensing terms prohibit redistribution of Windows binaries without proper licensing.

### Why Not Just Hide the Hashes?

The initial consideration was to remove blob hashes from GraphQL responses entirely. However, this proved problematic because:

1. **Registry Viewer Dependency**: The Windows registry viewer feature requires blob hashes to display registry hives
2. **UX Impact**: Users need to see file hashes for exploration and verification
3. **API Complexity**: Filtering responses in GraphQL requires complex plugin logic

### The Solution

Instead of hiding hashes, we:
1. **Keep GraphQL unchanged** - Blob hashes remain visible for exploration
2. **Control downloads** - A separate REST API endpoint enforces restrictions
3. **Branch-based logic** - Restrictions tied to branch ancestry, not OS detection

## Authorization Architecture

### Two-Tier Access Control

```
┌─────────────────────────────────────────────────────────┐
│              GraphQL API (Exploration)                  │
│  - Returns blob hashes freely                           │
│  - No restrictions on queries                           │
│  - Used for: browsing, searching, diffing               │
└─────────────────────────────────────────────────────────┘
                         │
                         │ User wants to download
                         ↓
┌─────────────────────────────────────────────────────────┐
│              REST API (Download Control)                │
│  GET /blob/:hash                                        │
│  1. Validate hash format                                │
│  2. Check authorization → Neo4j query                   │
│  3. Proxy to S3/MinIO (if allowed)                      │
│  4. Stream content to client                            │
└─────────────────────────────────────────────────────────┘
```

### Authorization Flow

```
User clicks download → REST API receives request
                              │
                              ↓
                    Validate SHA-1 hash format
                              │
                              ↓
                    Query Neo4j: isBlobRestricted(hash, branch)
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ↓                   ↓
              true (restricted)    false (allowed)
                    │                   │
                    ↓                   ↓
              403 Forbidden        Proxy to S3
                                        │
                                        ↓
                                  Stream to client
```

## The Cypher Query

### Query Logic

```cypher
MATCH (b:Blob)
WHERE b.hash = $blob_hash
WITH b

-- Find all commits containing this blob
MATCH (b)<-[:HAS_CHILD_BLOB]-(t:Tree)<-[:HAS_CHILD_TREE|OWNS_FILESYSTEM*]-(c:Commit)
WITH collect(c) as commit_list_where_hash

-- Find all commits reachable from restricted branch
MATCH (br:Branch)-[:TRACKS_COMMIT|HAS_PREVIOUS*]-(c:Commit)
WHERE br.name = $branch_name
WITH commit_list_where_hash, collect(c) as branch_reachable_commit_list

-- Check if ALL blob commits are in restricted branch
RETURN all(c IN commit_list_where_hash WHERE c IN branch_reachable_commit_list) as is_restricted
```

### How It Works

1. **Step 1**: Find the blob node by hash
2. **Step 2**: Traverse up the filesystem tree to find all commits containing this blob
   - `Blob ← Tree ← Tree ← ... ← Commit`
3. **Step 3**: Find all commits reachable from the restricted branch
   - `Branch → Commit → Commit → ...` (via `TRACKS_COMMIT` and `HAS_PREVIOUS`)
4. **Step 4**: Check if **every** commit containing the blob is in the restricted branch
   - If yes → blob is exclusive to restricted branch → **BLOCK**
   - If no → blob exists in non-restricted commits → **ALLOW**

### Example Scenarios

#### Scenario 1: Blob Exclusive to Windows

```
Branch: windows-10
  → Commit A (contains blob X)
  → Commit B (contains blob X)

Branch: ubuntu-server
  → Commit C
  → Commit D

Result: isBlobRestricted(X, "windows-10") = true
Reason: All commits with blob X are in windows-10 branch
```

#### Scenario 2: Blob in Multiple Branches

```
Branch: windows-10
  → Commit A (contains blob Y)

Branch: ubuntu-server
  → Commit B (contains blob Y)  ← Same blob!

Result: isBlobRestricted(Y, "windows-10") = false
Reason: Blob Y exists in ubuntu-server (not restricted)
```

#### Scenario 3: Shared Library File

```
Branch: windows-10
  → Commit A (contains blob Z - a .dll)

Branch: windows-11
  → Commit B (contains blob Z - same .dll)

Branch: ubuntu-server
  → Commit C (different files)

Result: isBlobRestricted(Z, "windows-10") = false
Reason: Blob Z also exists in windows-11 (not all commits are in windows-10)

Note: If we checked windows-11 instead:
Result: isBlobRestricted(Z, "windows-11") = false (also in windows-10)

This means blobs shared between restricted branches are ALLOWED!
```

## Design Decisions

### Why Branch-Based Instead of OS Detection?

**Initial Idea**: Detect Windows commits by checking for Windows-specific node labels (`WinRegKey`, `Symbol`, etc.)

**Problems**:
- Complex logic to identify Windows vs Linux
- PDB symbols (Windows debugging info) CAN be redistributed
- Registry hives' legal status is unclear
- Need to differentiate blob types (filesystem vs registry vs symbols)

**Better Solution**: Branch-based restrictions
- Simple: "Is this blob only in the restricted branch?"
- Flexible: Works for any restricted content (not just Windows)
- Clear: Admin explicitly configures which branch is restricted

### Why Allow Blobs in Multiple Branches?

**Reasoning**: If a blob appears in both restricted and non-restricted branches, it's likely:
1. A shared file (e.g., common system library)
2. Accidentally duplicated data
3. Content that was re-imported into a non-restricted branch

In all cases, the conservative approach is to **allow download** since it exists in an unrestricted context.

**Alternative considered**: Block if blob appears in ANY restricted branch
- Rejected because it would block legitimate shared content

### Why No Caching?

**Current**: Each download request queries Neo4j

**Pros**:
- Always accurate (no stale cache)
- Simple implementation
- No cache invalidation complexity

**Cons**:
- Higher database load
- Slower response time

**Future consideration**: Add Redis cache with short TTL (1-5 minutes)

### Fail-Safe Principle

**Rule**: When in doubt, block access

**Implementation**:
```typescript
try {
  const result = await session.executeRead(/* query */);
  return result.records[0].get('is_restricted');
} catch (error) {
  console.error('Authorization error:', error);
  return true; // Treat as restricted on error
}
```

**Rationale**: Better to accidentally block access than accidentally allow restricted content

## Performance Characteristics

### Query Complexity

- **Time**: O(n) where n = total commits in graph
- **Space**: O(n) for collecting commit lists
- **Bottleneck**: `HAS_PREVIOUS*` traversal (can be long in commit history)

### Optimization Opportunities

1. **Index on Blob.hash**: Already exists (unique constraint)
2. **Index on Branch.name**: Should add if querying many branches
3. **Query plan**: Neo4j query planner should optimize path traversals
4. **Limit traversal depth**: Could add max depth to prevent runaway queries

### Scaling Considerations

**Current load**: Acceptable for moderate download traffic (< 100 req/min per blob)

**High load scenarios**:
- Many concurrent downloads of same blob → add caching
- Large commit graphs (> 100k commits) → optimize query with depth limits
- Multiple restricted branches → refactor to batch check all at once

## Security Considerations

### Attack Vectors

1. **Direct S3 access**: Mitigated by S3 bucket policy (only allow API server IP)
2. **Hash enumeration**: Hashes visible in GraphQL, but download is controlled
3. **Authorization bypass**: Fail-safe default blocks on errors
4. **Race conditions**: Neo4j transactions are atomic (no race condition)

### Threat Model

**Assumed threats**:
- Unauthorized users attempting to download Windows binaries
- Automated scripts scraping blob hashes and downloading

**Not defended against**:
- Authenticated users with legitimate Windows licenses
- Users who already have local copies of Windows files
- Reverse engineering the authorization logic (it's open source)

### Compliance

**Goal**: Prevent accidental redistribution of Windows binaries

**Non-goal**: DRM or preventing determined attackers

**Legal disclaimer**: This system provides technical controls but does not constitute legal advice. Consult with legal counsel regarding software licensing compliance.

## Future Enhancements

### 1. Fine-Grained Blob Types

Differentiate between:
- Filesystem blobs (exe, dll, sys) → BLOCK
- Registry blobs (hive data) → TBD based on legal research
- Symbol blobs (PDB data) → ALLOW

Implementation:
```cypher
// Check blob type by relationship
MATCH (b:Blob {hash: $hash})
OPTIONAL MATCH (b)<-[:HAS_CHILD_BLOB]-(tree:Tree)
OPTIONAL MATCH (b)-[:HAS_WINREG]->(reg:WinRegKey)
OPTIONAL MATCH (b)-[:HAS_SYMBOL]->(sym:Symbol)

RETURN
  tree IS NOT NULL as is_filesystem_blob,
  reg IS NOT NULL as is_registry_blob,
  sym IS NOT NULL as is_symbol_blob
```

### 2. Role-Based Access

Allow Windows downloads for users with specific permissions:

```typescript
const hasWindowsLicense = req.auth?.payload?.permissions?.includes('download:windows');
if (!hasWindowsLicense) {
  // Check restrictions
}
```

### 3. Audit Logging

Track all download attempts:

```typescript
await logDownload({
  blobHash: hash,
  userId: req.auth?.payload?.sub,
  timestamp: new Date(),
  allowed: !restricted,
  ipAddress: req.ip
});
```

### 4. Rate Limiting Per User

Currently: 100 req/min per IP
Future: Different limits for authenticated vs unauthenticated users

### 5. Temporary Access Tokens

Generate time-limited download URLs:

```typescript
const token = generateToken(blobHash, expiresIn: '1h');
const url = `/blob/${hash}?token=${token}`;
```

## Related Documentation

- [Blob API Reference](../reference/blob-api.md) - API specification
- [Configuration Guide](../how-to/configure-blob-restrictions.md) - Setup instructions
- [Frontend Integration](../how-to/integrate-blob-api.md) - Client implementation
