# Access Restrictions Reference

This document catalogs all access control and data filtering mechanisms implemented in the OSWatcher GraphQL API. Use this as a reference when implementing new restrictions or understanding existing security controls.

## Overview

The API implements multiple layers of access control to protect sensitive data and prevent abuse:

1. **Blob Download Authorization** - Prevents redistribution of restricted content (e.g., Windows binaries)
2. **Windows Registry Value Filtering** - Redacts sensitive product keys and identifiers from responses

## 1. Blob Download Authorization

### Purpose

Prevents unauthorized downloading of blobs that belong exclusively to restricted branches, primarily to comply with Microsoft Windows licensing restrictions.

### Scope

- **Applies to:** REST API endpoint `GET /blob/:hash`
- **Does NOT apply to:** GraphQL queries (blob hashes remain visible for exploration)

### Implementation

**File:** `src/blob-authorization.ts`

**Function:** `isBlobRestricted(driver, blobHash, restrictedBranchName)`

**Logic:**
1. Query Neo4j to find all commits containing the blob
2. Query Neo4j to find all commits reachable from the restricted branch
3. Check if **ALL** commits containing the blob are in the restricted branch
4. If yes → blob is restricted (403 Forbidden)
5. If no → blob is allowed (download proceeds)

**Cypher Query:** `CHECK_BLOB_RESTRICTED_QUERY` in `src/queries.ts`

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

### Configuration

**Environment Variable:** `RESTRICTED_BRANCH_NAME`

**Example:**
```bash
RESTRICTED_BRANCH_NAME=windows-10
```

### Behavior

| Scenario | Result | HTTP Status |
|----------|--------|-------------|
| Blob exists only in restricted branch | Blocked | 403 Forbidden |
| Blob exists in restricted + non-restricted branches | Allowed | 200 OK |
| Blob not found in database | Allowed | (proceeds to S3 check) |
| Neo4j query error | Blocked (fail-safe) | 403 Forbidden |
| Blob not found in S3 storage | Error | 404 Not Found |

### Fail-Safe Principle

**Rule:** When in doubt, block access

```typescript
try {
  const result = await session.executeRead(/* query */);
  return result.records[0].get('is_restricted');
} catch (error) {
  console.error('Authorization error:', error);
  return true; // Treat as restricted on error
}
```

### Example Scenarios

#### Scenario 1: Exclusive to Restricted Branch
```
Branch: windows-10
  → Commit A (contains blob X)
  → Commit B (contains blob X)

Branch: ubuntu-server
  → Commit C
  → Commit D

Result: isBlobRestricted(X, "windows-10") = true → 403 Forbidden
```

#### Scenario 2: Shared Between Branches
```
Branch: windows-10
  → Commit A (contains blob Y)

Branch: ubuntu-server
  → Commit B (contains blob Y)  ← Same blob!

Result: isBlobRestricted(Y, "windows-10") = false → 200 OK
```

### Related Documentation

- **Detailed Explanation:** [Blob Authorization Deep Dive](../explanation/blob-authorization.md)
- **Configuration Guide:** [Configure Blob Restrictions](../how-to/configure-blob-restrictions.md)
- **API Specification:** [Blob Download API](./blob-api.md)

---

## 2. Windows Registry Value Filtering

### Purpose

Prevents exposure of sensitive Windows product keys and license identifiers in API responses while allowing registry structure exploration.

### Scope

- **Applies to:** All GraphQL responses containing Windows registry values
- **Enforced at:** Response time (after query execution, before sending to client)
- **Implementation:** Apollo Server plugin with `willSendResponse` hook

### Implementation

**Files:**
- `src/registry-response-filter.ts` - Filtering logic
- `src/registry-filter-config.ts` - Configuration and sensitive value list

**Function:** `filterSensitiveRegistryValues(responseData)`

**Hook Location:** `src/index.ts` Apollo Server plugin

```typescript
{
  async requestDidStart() {
    return {
      async willSendResponse({ response }: any) {
        if (response?.body?.kind === 'single' && response.body.singleResult?.data) {
          try {
            filterSensitiveRegistryValues(response.body.singleResult.data);
          } catch (error) {
            console.error('Registry filter error:', error);
            // Fail-open: don't break API if filtering fails
          }
        }
      }
    };
  }
}
```

### Configuration

**Environment Variable:** `SENSITIVE_REGISTRY_VALUES`

**Default Values:**
- `DigitalProductId`
- `DigitalProductId4`
- `ProductId`

**Custom Configuration:**
```bash
# Override defaults with comma-separated list
SENSITIVE_REGISTRY_VALUES=DigitalProductId,ProductId,MyCustomKey
```

**Empty Configuration:**
```bash
# Disable filtering (use defaults)
SENSITIVE_REGISTRY_VALUES=

# Or omit the variable entirely
```

### Filtering Logic

The filter recursively traverses the response object and handles two response patterns:

#### Pattern 1: Connection-Style Responses

**GraphQL Query:**
```graphql
query {
  winRegKey(hash: "abc123") {
    child_valuesConnection {
      edges {
        node {
          value  # ← Will be redacted if sensitive
        }
        properties {
          name  # ← Used to check if sensitive
        }
      }
    }
  }
}
```

**Detection Logic:**
```typescript
if (obj.node && obj.properties?.name) {
  if (isSensitiveValueName(obj.properties.name) && obj.node.value !== undefined) {
    obj.node.value = REDACTED_VALUE;  // "[REDACTED]"
  }
}
```

#### Pattern 2: Diff-Style Responses

**GraphQL Query:**
```graphql
query {
  diffNodesAt(commit1: "abc", commit2: "def", path: "/") {
    items {
      type  # e.g., "WinRegValue"
      path  # e.g., "/HKLM/Software/Microsoft/Windows/CurrentVersion/ProductId"
      old_props {
        properties {
          value  # ← Will be redacted if sensitive
        }
      }
      new_props {
        properties {
          value  # ← Will be redacted if sensitive
        }
      }
    }
  }
}
```

**Detection Logic:**
```typescript
if (obj.type === 'WinRegValue' && obj.path) {
  const pathParts = obj.path.split('/').filter(Boolean);
  const valueName = pathParts[pathParts.length - 1];  // Extract last path component

  if (isSensitiveValueName(valueName)) {
    if (obj.old_props?.properties?.value !== undefined) {
      obj.old_props.properties.value = REDACTED_VALUE;
    }
    if (obj.new_props?.properties?.value !== undefined) {
      obj.new_props.properties.value = REDACTED_VALUE;
    }
  }
}
```

### Matching Rules

**Case-Insensitive:** Registry value names are matched case-insensitively
```typescript
// All match "DigitalProductId"
digitalproductid
DIGITALPRODUCTID
DigitalProductId
```

**Exact Match:** Full value name must match (no substring matching)
```typescript
// Matches
ProductId

// Does NOT match
ProductIdBackup
MyProductId
```

**Performance:** O(1) lookup using pre-computed `Set` of lowercase names

### Redaction Format

**Original Response:**
```json
{
  "node": {
    "value": "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
  }
}
```

**Filtered Response:**
```json
{
  "node": {
    "value": "[REDACTED]"
  }
}
```

### Error Handling

**Fail-Open Approach:** If filtering encounters an error, the API still returns the response

```typescript
try {
  filterSensitiveRegistryValues(response.body.singleResult.data);
} catch (error) {
  console.error('Registry filter error:', error);
  // Fail-open: don't break API if filtering fails
}
```

**Rationale:**
- Prevents API downtime due to filtering bugs
- Logs errors for debugging
- Trade-off: Potential temporary data leak vs. service availability

### Testing Filtering

**Check if filtering is active:**
```graphql
query {
  winRegKey(hash: "your-registry-hash") {
    child_valuesConnection {
      edges {
        node {
          value
        }
        properties {
          name
        }
      }
    }
  }
}
```

Look for values with `name: "ProductId"` or `name: "DigitalProductId"`. The `value` field should show `"[REDACTED]"`.

---

## Design Patterns for Future Restrictions

When implementing new access restrictions, follow these established patterns:

### 1. Choose the Right Layer

| Layer | Use Case | Example |
|-------|----------|---------|
| **GraphQL Schema** | Prevent queries entirely | `@mutation(operations: [])` to disable mutations |
| **Resolver Level** | Context-based access control | Check `jwt.permissions` in custom resolvers |
| **Response Filter** | Data redaction/masking | Registry value filtering |
| **REST Endpoint** | Resource-level authorization | Blob download restrictions |

### 2. Fail-Safe Principle

**Always default to the most restrictive behavior on errors:**

```typescript
// Good: Default to restricted
try {
  return checkPermission();
} catch (error) {
  console.error('Permission check failed:', error);
  return false;  // Deny access
}

// Bad: Default to permissive
try {
  return checkPermission();
} catch (error) {
  return true;  // Allow access - DANGEROUS!
}
```

### 3. Configuration Pattern

**Use environment variables for restriction configuration:**

```typescript
// 1. Define in cleanEnv() validation
const env = cleanEnv(process.env, {
  MY_RESTRICTION_ENABLED: bool({ default: true }),
  MY_RESTRICTION_LIST: str({ default: "item1,item2,item3" }),
});

// 2. Parse configuration
const restrictedItems = env.MY_RESTRICTION_LIST.split(',').map(s => s.trim());

// 3. Document in README.md
```

### 4. Logging Pattern

**Log all access control decisions:**

```typescript
if (isRestricted) {
  console.warn(`Access denied: ${resource} for ${userId || 'anonymous'}`);
  return 403;
}

console.log(`Access granted: ${resource} for ${userId || 'anonymous'}`);
```

### 5. Documentation Pattern

**Document restrictions in multiple places:**

1. **Code comments** - Implementation details
2. **docs/reference/** - Technical specifications (this document)
3. **docs/explanation/** - Design rationale and deep dives
4. **docs/how-to/** - Configuration and troubleshooting
5. **README.md** - Environment variables

### 6. Testing Pattern

**Test both positive and negative cases:**

```typescript
describe('Access Restriction', () => {
  it('should block restricted resources', async () => {
    const result = await checkAccess(restrictedResource);
    expect(result).toBe(false);
  });

  it('should allow unrestricted resources', async () => {
    const result = await checkAccess(allowedResource);
    expect(result).toBe(true);
  });

  it('should default to restricted on error', async () => {
    mockDatabase.mockRejectedValue(new Error('DB error'));
    const result = await checkAccess(anyResource);
    expect(result).toBe(false);  // Fail-safe
  });
});
```

---

## Future Considerations

### Potential Future Restrictions

1. **Symbol Blob Access Control**
   - Allow PDB symbols (debugging info) separately from executables
   - Different restrictions for filesystem vs. symbol blobs

2. **Role-Based Access Control (RBAC)**
   - Use Auth0 permissions for fine-grained access
   - Example: `download:windows` permission for licensed users

3. **Rate Limiting Per User**
   - Higher limits for authenticated users
   - Track usage in database for quota management

4. **Audit Logging**
   - Log all download attempts with user ID, timestamp, result
   - Store in separate audit database or log aggregation service

5. **Temporary Access Tokens**
   - Generate time-limited signed URLs for blob downloads
   - Implement token-based authorization instead of real-time checks

6. **Content-Type Restrictions**
   - Allow text files, block binaries
   - Filter by MIME type or file extension

7. **Geographic Restrictions**
   - Block access from certain countries/regions
   - Use IP geolocation for enforcement

### Migration Path

When adding new restrictions:

1. **Design Phase**
   - Document design decision in `docs/explanation/`
   - Follow patterns from this document

2. **Implementation Phase**
   - Add configuration to `.env` and README.md
   - Implement with fail-safe defaults
   - Add comprehensive logging

3. **Testing Phase**
   - Write unit tests for restriction logic
   - Test fail-safe behavior
   - Test configuration edge cases

4. **Documentation Phase**
   - Update this reference document
   - Create how-to guide if complex
   - Update API reference docs

5. **Deployment Phase**
   - Deploy with restriction disabled (or permissive)
   - Monitor logs for unexpected behavior
   - Enable gradually if possible

---

## 3. Recursive Diff Authentication Requirement

### Purpose

Restricts recursive diffing operations to authenticated users only. Single-level diffs (`max_depth: 0`) remain available for anonymous users.

### Implementation

**File:** `src/resolvers.ts` - `diffNodesAt` resolver

**Logic:** Check `max_depth` parameter:
- `max_depth === 0` → Non-recursive - allowed for all users
- `max_depth !== 0` (including `null`, `undefined`, or any other value) → Recursive - requires JWT authentication

**Error Message:** "Recursive diffing requires authentication. Please provide a valid JWT token."

### Rationale

Recursive diffs are computationally expensive and can traverse entire filesystem trees. Restricting to authenticated users prevents DoS attacks while allowing basic exploration for anonymous users.

---

## 4. Date-Based Diff Limitation

### Purpose

Restricts non-filesystem diffs (Blob, WinRegKey) for **unauthenticated users** to nodes that appear in at least one commit from the configured year or older. Filesystem (Tree) diffs remain available for all commit dates. **Authenticated users bypass this restriction.**

### Implementation

**Files:**
- `src/resolvers.ts` - `diffNodesAt` resolver and `isNodeAllowedByDateLimit` helper
- `src/queries.ts` - `GET_NODE_COMMIT_DATES` query function

**Configuration:** `DIFF_DATE_LIMIT_YEAR` environment variable (default: 2020)

**Logic:**
- Check `context.jwt` → If authenticated, **skip all date checks** (bypass restriction)
- `parent_label === "Tree"` → No date restriction (always allowed)
- `parent_label === "Blob"` or `"WinRegKey"` → Query Neo4j to find all commits containing the node
- Allow if **at least one** commit has date ≤ configured year
- Block if **all** commits have date > configured year

**Query Pattern:**
```cypher
MATCH (n:${label} {hash: $node_hash})<-[*]-(root:Tree)<-[:OWNS_FILESYSTEM]-(c:Commit)
RETURN c.date ORDER BY c.date DESC
```

**Error Message:** "Diff operations for {parent_label} nodes from commits after {year} are not available."

### Behavior Example

With `DIFF_DATE_LIMIT_YEAR=2020`:

**Unauthenticated Users:**

| Node Commits | Result |
|--------------|--------|
| 2018, 2019 | ✅ Allowed (2018 ≤ 2020) |
| 2021, 2022 | ❌ Blocked (all > 2020) |
| 2019, 2021 | ✅ Allowed (2019 ≤ 2020) |

**Authenticated Users:**
- ✅ All diffs allowed regardless of commit dates

### Rationale

Historical non-filesystem data (registry, symbols) may be incomplete or less relevant for newer commits. Limiting unauthenticated access to nodes with at least one old commit ensures public users can access historical data while restricting purely new data. Authenticated users have full access to support research and analysis needs.

---

## Summary Table

| Restriction | Type | Scope | Fail-Safe | Configurable |
|------------|------|-------|-----------|--------------|
| Blob Download Authorization | REST Endpoint | `GET /blob/:hash` | Block (403) | `RESTRICTED_BRANCH_NAME` |
| Registry Value Filtering | Response Filter | All GraphQL responses | Allow (fail-open) | `SENSITIVE_REGISTRY_VALUES` |
| Recursive Diff Authentication | Resolver Check | `diffNodesAt` query (unauthenticated only) | Block (error) | N/A (hardcoded) |
| Date-Based Diff Limitation | Resolver Check | `diffNodesAt` for Blob/WinRegKey (unauthenticated only) | Allow (fail-open) | `DIFF_DATE_LIMIT_YEAR` |
| Query Complexity | GraphQL Validation | All GraphQL queries | Block (error) | Hardcoded (100 fields) |
| Rate Limiting | Middleware | All endpoints | Block (429) | Hardcoded (100/min) |
| Result Set Limits | GraphQL Schema | All paginated queries | Limit to 5000 | `@limit` directive |
| Mutations | GraphQL Schema | Write operations | Block (disabled) | `@mutation(operations: [])` |
| CORS | Middleware | All endpoints | Block | `ALLOWED_ORIGINS` |

---

## Related Documentation

- [Blob Authorization Deep Dive](../explanation/blob-authorization.md) - Comprehensive explanation of blob restriction design
- [Blob Download API](./blob-api.md) - Complete REST API specification
- [Configure Blob Restrictions](../how-to/configure-blob-restrictions.md) - Setup instructions
- [Security and Performance](./security-and-performance.md) - Overall security architecture (if exists)

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2025-12-08 | Initial documentation of blob authorization and registry filtering | Claude Code |
