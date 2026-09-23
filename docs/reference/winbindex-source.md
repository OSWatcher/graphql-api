# Winbindex Blob Source Reference

## What it is

A fast path in front of the `GET /blob/:hash` handler (`src/rest-routes.ts`).
For Windows PE files the API resolves the file on
[Winbindex](https://winbindex.m417z.com/) and serves the bytes from
Microsoft's public symbol server, verified against the requested SHA-1, instead
of proxying them from MinIO. The public corpus therefore never has to re-host Windows binaries.

Implementation: `src/winbindex.ts`.

## When it engages

All of the following must hold, otherwise the request is served from MinIO
exactly as before:

| Condition | Detail |
|-----------|--------|
| `WINBINDEX_ENABLED` is true | Global kill switch. |
| The request carries `?filename=` | A non-string or absent `filename` skips the fast path with no external call. |
| `filename` is a Windows PE file | The lowercased basename ends with `.exe`, `.dll` or `.sys`. Detection is purely by extension. |
| `filename` is a plain safe name | The lowercased basename matches `^[a-z0-9._+-]{1,255}$`. Names with `?`, `#`, whitespace or percent-encoding are rejected (they would otherwise steer the outbound request), and the request goes to MinIO. |
| Winbindex resolves the hash | The per-filename index contains an entry whose `fileInfo.sha1` equals the requested `hash`, with numeric `timestamp` and `virtualSize`. |
| The symbol server returns 2xx | A non-2xx response leaves the HTTP response untouched. |

`filename` drives Winbindex only. The MinIO path always keys on `hash` and
ignores `filename`.

## Request flow

1. `GET /blob/<sha1>?filename=kernel32.dll`
2. `GET <WINBINDEX_DATA_URL>/kernel32.dll.json.gz` — gzipped JSON, top-level keys
   are SHA-256, each value carries `fileInfo.timestamp`, `fileInfo.virtualSize`
   and (about 70% of the time) `fileInfo.sha1`. The index is decompressed off the
   event loop (async gunzip). The parsed result is cached in memory for 24h,
   keyed by lowercased filename, bounded to 200 entries evicted least-recently-used.
   A 404 is
   cached as a negative result so a missing filename is not re-fetched on every
   request. This in-memory negative cache is best-effort only: it is per-process,
   unbounded in eviction pressure, and can be flushed by requests for 200 other
   filenames, so a cache hit is a latency optimisation, not a reliability or
   rate-limit guarantee.
3. The entry whose `fileInfo.sha1` matches `<sha1>` yields `timestamp` and
   `virtualSize`.
4. `GET <WINBINDEX_SYMBOL_SERVER_URL>/<name>/<TS><VS>/<name>` where
   `TS = timestamp.toString(16).toUpperCase().padStart(8, "0")` and
   `VS = virtualSize.toString(16)` (lowercase, unpadded). Sent with
   `User-Agent: Microsoft-Symbol-Server/10.0.0.0`, redirects followed.
5. The body is read into memory, up to `WINBINDEX_MAX_PE_BYTES` (256 MiB), and
   its SHA-1 is compared with `<sha1>` **before anything is sent**. Only a
   matching file is written to the client, as
   `Content-Type: application/octet-stream`,
   `Content-Disposition: attachment; filename="<name>"`, `ETag: "<sha1>"` and
   `Content-Length: <verified byte count>`. A mismatch, a stream error, a
   timeout or an oversized body leaves the response untouched and falls back to
   MinIO.

   The file is buffered rather than streamed because a mismatch can only be
   detected once the last byte is in. By then a streamed response is already
   complete on the client side and can no longer be turned into a failure, so
   the client would silently keep the wrong bytes. Each in-flight download
   therefore holds one PE file (a few MB to a few tens of MB) in memory.

The `symbols` plugin in the OSWatcher collector already downloads PDBs from this
same server, so no new external trust boundary is introduced.

## Configuration

All four variables are optional and have defaults (`src/index.ts`).

| Variable | Default | Purpose |
|----------|---------|---------|
| `WINBINDEX_ENABLED` | `true` | Enable the Winbindex fast path for Windows PE blob downloads. |
| `WINBINDEX_DATA_URL` | `https://winbindex.m417z.com/data/by_filename_compressed` | Winbindex per-filename JSON index host. |
| `WINBINDEX_SYMBOL_SERVER_URL` | `https://msdl.microsoft.com/download/symbols` | Microsoft public symbol server (serves PE binaries by timestamp+size). |
| `WINBINDEX_FETCH_TIMEOUT_MS` | `15000` | Timeout for each Winbindex index / symbol-server request. |

## Failure modes

| Situation | Behaviour |
|-----------|-----------|
| Feature disabled, no `filename`, or non-PE extension | MinIO, no external call. |
| Winbindex index 404 / network error / timeout / bad JSON | MinIO. |
| No matching `fileInfo.sha1`, or match missing `timestamp` / `virtualSize` | MinIO. |
| Symbol server returns non-2xx, the fetch fails, the stream errors or times out | MinIO; nothing was written to the response. |
| Body larger than `WINBINDEX_MAX_PE_BYTES` | MinIO; the upstream download is cancelled. |
| Downloaded bytes hash to something other than `<sha1>` | MinIO; a warning is logged; nothing was written to the response. |

MinIO is never written to by this feature — it is a pure proxy, `GetObject`
only.

## Source Code

- **Winbindex path**: `src/winbindex.ts` (`tryServeFromWinbindex`)
- **Integration point**: `src/rest-routes.ts` (`GET /:hash` handler)
- **Configuration**: `src/index.ts`
