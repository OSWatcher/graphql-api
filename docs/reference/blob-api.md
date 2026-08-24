# Blob Download API Reference

## Endpoint

```
GET /blob/:hash
```

Downloads a blob by its SHA-1 hash with authorization checks.

## Parameters

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `hash` | string | Yes | SHA-1 hash of the blob (40 hexadecimal characters) |

## Request Headers

The endpoint is unauthenticated: no headers are required.

## Response

### Success Response (200 OK)

The blob content is streamed to the client with appropriate headers.

**Headers:**
- `Content-Type`: MIME type of the blob content
- `Content-Length`: Size of the blob in bytes
- `Content-Disposition`: Attachment disposition for downloads
- `ETag`: Entity tag for cache validation
- `Last-Modified`: Last modification timestamp
- `Cache-Control`: Caching directives

**Body:** Binary blob content (streamed)

### Error Responses

#### 400 Bad Request
Invalid blob hash format.

```json
{
  "error": "Bad Request",
  "message": "Invalid blob hash format"
}
```

#### 403 Forbidden
Blob is restricted and cannot be downloaded.

```json
{
  "error": "Forbidden",
  "message": "This blob is restricted"
}
```

#### 404 Not Found
Blob not found in object storage.

```json
{
  "error": "Storage Error",
  "message": "Blob not found in storage"
}
```

#### 429 Too Many Requests
Rate limit exceeded (100 requests per minute).

```json
{
  "error": "Too many requests. Please try again later.",
  "retryAfter": 30
}
```

#### 500 Internal Server Error
An unexpected error occurred.

```json
{
  "error": "Internal Server Error",
  "message": "An error occurred while processing the request"
}
```

#### 502 Bad Gateway
Error communicating with object storage.

```json
{
  "error": "Storage Error",
  "message": "Error accessing object storage"
}
```

## Authorization

Access control is limited to blob restriction: a Neo4j query checks whether the
blob belongs exclusively to restricted branches. There is no per-user
authentication.

### Restriction Logic

A blob is **restricted** if:
- ALL commits containing the blob are reachable from the configured restricted branch
- Example: If `RESTRICTED_BRANCH_NAME=windows-10`, blobs exclusive to that branch are blocked

A blob is **allowed** if:
- The blob appears in at least one commit NOT reachable from the restricted branch
- Example: If a blob exists in both `windows-10` and `ubuntu-server`, it's allowed

### Fail-Safe Behavior

If an error occurs during authorization checking:
- The blob is treated as **restricted** (access denied)
- Error is logged server-side
- Returns 403 Forbidden to client

## Examples

### Successful Download

```bash
curl -X GET http://localhost:4000/blob/a94a8fe5ccb19ba61c4c0873d391e987982fbbd3 \
  -o downloaded-file.bin
```

### Restricted Blob

```bash
curl -X GET http://localhost:4000/blob/c3499c2729730a7f807efb8676a92dcb6f8a3f8f

# Response: 403 Forbidden
{
  "error": "Forbidden",
  "message": "This blob is restricted"
}
```

### With Authentication

```bash
curl -X GET http://localhost:4000/blob/a94a8fe5ccb19ba61c4c0873d391e987982fbbd3 \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -o downloaded-file.bin
```

### Invalid Hash Format

```bash
curl -X GET http://localhost:4000/blob/invalid-hash

# Response: 400 Bad Request
{
  "error": "Bad Request",
  "message": "Invalid blob hash format"
}
```

## Rate Limiting

- **Limit**: 100 requests per minute per IP address
- **Window**: 60 seconds
- **Response**: 429 Too Many Requests with `retryAfter` field

## CORS

The endpoint supports CORS with configured allowed origins:
- Production: `https://oswatcher.github.io`
- Development: `http://127.0.0.1:8080`

## Implementation Details

### Architecture

```
Client → Express Router → Authorization Check → S3/MinIO Proxy → Stream Response
                              ↓
                         Neo4j Query
```

### Performance Characteristics

- **Streaming**: Large files are streamed without buffering in memory
- **Query Complexity**: Single Neo4j Cypher query per request (O(n) where n = commits in graph)
- **Caching**: No caching implemented (considers each request fresh)

### Source Code

- **Endpoint Handler**: `src/rest-routes.ts`
- **Authorization Logic**: `src/blob-authorization.ts`
- **Cypher Query**: `src/queries.ts` (`CHECK_BLOB_RESTRICTED_QUERY`)
- **Validation Schema**: `src/validation.ts` (`BlobHashParamSchema`)
