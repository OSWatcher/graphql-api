# Blob Download API Reference

## Endpoint

```
GET /blob/:hash
```

Downloads a blob by its SHA-1 hash.

## Parameters

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `hash` | string | Yes | SHA-1 hash of the blob (40 hexadecimal characters) |

### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filename` | string | No | The file's basename (e.g. `kernel32.dll`). Used **only** to look the blob up on Winbindex for the Windows-PE fast path (see [Winbindex Blob Source](./winbindex-source.md)). Ignored for non-PE names, and by the MinIO path, which always keys on `hash`. The server takes the basename and lowercases it (so `windows/system32/KERNEL32.DLL` resolves as `kernel32.dll`); if that basename then contains anything outside `[a-z0-9._+-]` (`?`, `#`, `%`, whitespace, ...) the fast path is skipped. |

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

The endpoint is unauthenticated and performs no per-blob access control. Every
stored blob is downloadable by hash.

## Examples

### Successful Download

```bash
curl -X GET http://localhost:4000/blob/a94a8fe5ccb19ba61c4c0873d391e987982fbbd3 \
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
Client → Express Router → S3/MinIO Proxy → Stream Response
```

### Performance Characteristics

- **Streaming**: Large files are streamed without buffering in memory
- **Caching**: No caching implemented (considers each request fresh)

### Source Code

- **Endpoint Handler**: `src/rest-routes.ts`
- **Validation Schema**: `src/validation.ts` (`BlobHashParamSchema`)
