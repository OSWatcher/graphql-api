# How to Configure Blob Download Restrictions

## Prerequisites

- Neo4j database with OSWatcher graph data
- S3-compatible object storage (S3, MinIO, etc.)
- Branch in Neo4j containing restricted content

## Step 1: Configure Environment Variables

Add the following variables to your `.env` file:

```bash
# Object storage endpoint
OBJECT_STORAGE_URI=https://s3.amazonaws.com/your-bucket
# Or for MinIO:
# OBJECT_STORAGE_URI=https://minio.example.com/bucket-name

# Branch name containing restricted blobs
RESTRICTED_BRANCH_NAME=windows-10
```

### Environment Variable Details

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `OBJECT_STORAGE_URI` | URL | Yes | Full URL to object storage bucket endpoint |
| `RESTRICTED_BRANCH_NAME` | String | Yes | Name of the branch containing restricted content |

## Step 2: Verify Configuration

Start the server and check the startup messages:

```bash
npm run serve
```

Expected output:
```
🚀 Server ready at http://localhost:4000/graphql
🔌 WebSocket ready at ws://localhost:4000/graphql
📦 Blob API ready at http://localhost:4000/blob
```

## Step 3: Test Blob Restrictions

### Test with an Unrestricted Blob

Find a blob hash from a non-restricted branch:

```bash
curl -X GET http://localhost:4000/blob/{hash_from_ubuntu}
```

Expected: 200 OK with blob content

### Test with a Restricted Blob

Find a blob hash exclusive to the restricted branch:

```bash
curl -X GET http://localhost:4000/blob/{hash_from_windows}
```

Expected: 403 Forbidden with error message

## Step 4: Verify Authorization Query

Connect to your Neo4j database and test the authorization query manually:

```cypher
// Replace $blob_hash and $branch_name with your values
MATCH (b:Blob)
WHERE b.hash = $blob_hash
WITH b
MATCH (b)<-[:HAS_CHILD_BLOB]-(t:Tree)<-[:HAS_CHILD_TREE|OWNS_FILESYSTEM*]-(c:Commit)
WITH collect(c) as commit_list_where_hash
MATCH (br:Branch)-[:TRACKS_COMMIT|HAS_PREVIOUS*]-(c:Commit)
WHERE br.name = $branch_name
WITH commit_list_where_hash, collect(c) as branch_reachable_commit_list
RETURN all(c IN commit_list_where_hash WHERE c IN branch_reachable_commit_list) as is_restricted
```

Results:
- `is_restricted: true` → Blob will be blocked
- `is_restricted: false` → Blob will be allowed

## Common Configuration Scenarios

### Scenario 1: Restrict Multiple Windows Branches

Unfortunately, only one restricted branch is currently supported. To restrict multiple branches:

**Option A**: Create a parent branch that tracks all restricted commits
**Option B**: Modify the code to accept comma-separated branch names (requires code change)

### Scenario 2: Allow Windows Blobs for Authenticated Users

The current implementation blocks restricted blobs for all users. To allow based on authentication:

1. Modify `src/rest-routes.ts` to check `req.auth` (JWT payload)
2. Skip restriction check if user has specific permissions
3. Example:

```typescript
// In src/rest-routes.ts
const isAuthenticated = req.auth?.payload?.sub;
const hasWindowsAccess = req.auth?.payload?.permissions?.includes('download:windows');

if (!hasWindowsAccess) {
  const restricted = await isBlobRestricted(driver, hash, restrictedBranchName);
  if (restricted) {
    return res.status(403).json({ error: "Forbidden" });
  }
}
```

### Scenario 3: Different Object Storage URLs

If blobs are stored in multiple buckets:

**Current limitation**: Only one `OBJECT_STORAGE_URI` is supported

**Workaround**: Use a reverse proxy to route to different buckets based on hash patterns

### Scenario 4: Temporary Access to Restricted Blobs

To temporarily allow access without changing the branch restriction:

1. Create a new branch from the restricted commits
2. Name it differently (e.g., `windows-10-public`)
3. The blobs will now appear in multiple branches and be allowed
4. Delete the temporary branch when access should be revoked

## Troubleshooting

### Problem: All blobs are blocked

**Check:**
- Is `RESTRICTED_BRANCH_NAME` set to a branch that contains all your data?
- Verify the branch exists: `MATCH (b:Branch {name: "your-branch"}) RETURN b`

### Problem: Restricted blobs are not blocked

**Check:**
- Is `RESTRICTED_BRANCH_NAME` correctly spelled?
- Run the authorization query manually to verify results
- Check server logs for authorization errors

### Problem: 502 Bad Gateway errors

**Check:**
- Is `OBJECT_STORAGE_URI` accessible from the server?
- Test: `curl {OBJECT_STORAGE_URI}/objects/{known_hash}`
- Verify network connectivity and credentials

### Problem: Downloads are slow

**Considerations:**
- Authorization query runs on every download (no caching)
- Network latency between server and object storage
- Consider adding Redis cache for authorization results

## Security Considerations

### Fail-Safe Default

If the authorization check fails (database error, query timeout, etc.), the system defaults to **blocking access**. This ensures restricted content is not accidentally served.

### Bypass Prevention

- Blob hashes are still visible in GraphQL queries (for exploration)
- Direct S3 access should be blocked via bucket policies
- Only allow object storage access from the API server's IP

### Recommended Bucket Policy (AWS S3)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket/objects/*",
      "Condition": {
        "StringNotLike": {
          "aws:SourceIp": ["your-api-server-ip"]
        }
      }
    }
  ]
}
```

## Monitoring

### Log Analysis

Check server logs for authorization decisions:

```bash
# Check for restriction checks
grep "Blob download requested" logs/app.log

# Check for authorization errors
grep "Error checking blob authorization" logs/app.log
```

### Metrics to Track

- Number of 403 responses (restricted blob attempts)
- Authorization query execution time
- Object storage latency
- Rate limit hits (429 responses)

## Next Steps

- [Blob API Reference](../reference/blob-api.md) - Full API specification
- [Frontend Integration Guide](./integrate-blob-api.md) - Using the API from frontend
- [Authorization Deep Dive](../explanation/blob-authorization.md) - How restrictions work
