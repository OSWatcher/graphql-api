import { createHash } from "node:crypto";
import { promisify } from "node:util";
import { gunzip } from "node:zlib";

/** Off-loads decompression to the threadpool so the event loop is not blocked. */
const gunzipAsync = promisify(gunzip);

/**
 * Best-effort release of a fetch body we are not going to read, so undici does
 * not keep the socket and unread data around in its connection pool.
 */
function discardBody(response: Response): void {
    response.body?.cancel().catch(() => {});
}

/**
 * Winbindex fast path for Windows PE blob downloads.
 *
 * For a `GET /blob/:hash?filename=<pe file>` request the API resolves the file on
 * Winbindex (per-filename index) and serves the bytes from Microsoft's public
 * symbol server, so the public corpus never re-hosts Windows binaries. The file
 * is buffered and its SHA-1 verified before anything is sent, so a client never
 * receives bytes that do not match the requested hash. Every miss or failure
 * falls back to MinIO.
 *
 * See docs/reference/winbindex-source.md.
 */

export const PE_EXTENSIONS = new Set([".exe", ".dll", ".sys"]);

/**
 * A plain, safe PE filename: lowercase letters, digits and `. _ + -` only.
 * Every real Winbindex filename fits this. Names outside it (containing `?`,
 * `#`, whitespace, percent-encoding, ...) are attacker attempts to steer the
 * outbound Winbindex / symbol-server request to another path or query and are
 * rejected before any URL, cache key or header is built from the name.
 */
export const SAFE_PE_NAME = /^[a-z0-9._+-]{1,255}$/;

/** Parsed per-filename Winbindex JSON is cached for 24h. */
export const WINBINDEX_JSON_TTL_MS = 86_400_000;

/** At most this many parsed per-filename indexes are kept in memory. */
const WINBINDEX_JSON_CACHE_MAX = 200;

const SYMBOL_SERVER_USER_AGENT = "Microsoft-Symbol-Server/10.0.0.0";

/**
 * Upper bound on a symbol-server download buffered for verification. Windows PE
 * files are at most a few tens of MB; anything larger falls back to MinIO.
 */
export const WINBINDEX_MAX_PE_BYTES = 256 * 1024 * 1024;

export interface WinbindexConfig {
    enabled: boolean;
    dataUrl: string;
    symbolServerUrl: string;
    timeoutMs: number;
}

export interface WinbindexEntry {
    timestamp: number;
    virtualSize: number;
}

/**
 * Outcome of an attempt to serve a blob from Winbindex.
 * - `not_available`: nothing was written to the response, the caller must fall
 *   back to MinIO.
 * - `served`: the verified file has been sent, the caller must not touch it.
 */
export type WinbindexOutcome = "not_available" | "served";

/** Minimal view of the HTTP response the serving step needs. */
export interface BlobResponse {
    setHeader(name: string, value: string | number): void;
    end(chunk: Uint8Array): void;
}

interface WinbindexFileInfo {
    timestamp?: number;
    virtualSize?: number;
    sha1?: string;
}

type WinbindexJson = Record<
    string,
    { fileInfo?: WinbindexFileInfo } | undefined
>;

interface CacheRecord {
    /** `null` is the sentinel for "filename is 404 on Winbindex". */
    value: WinbindexJson | null;
    expiresAt: number;
}

const jsonCache = new Map<string, CacheRecord>();

/** Test hook: drop the module-level per-filename JSON cache. */
export function __clearWinbindexCache(): void {
    jsonCache.clear();
}

/** Last path segment of `filename`, handling both `/` and `\` separators. */
function basename(filename: string): string {
    const parts = filename.split(/[/\\]/);
    return parts[parts.length - 1] ?? "";
}

/** True iff the lowercased basename of `filename` ends with a PE extension. */
export function isWindowsPEFilename(filename: string): boolean {
    const name = basename(filename).toLowerCase();
    for (const ext of PE_EXTENSIONS) {
        if (name.length > ext.length && name.endsWith(ext)) {
            return true;
        }
    }
    return false;
}

/**
 * Symbol-server URL for a PE file: `<base>/<name>/<TS><VS>/<name>` where
 * `TS = timestamp` as uppercase hex zero-padded to 8 chars and
 * `VS = virtualSize` as lowercase hex with no padding.
 */
export function symbolServerUrl(
    baseUrl: string,
    name: string,
    timestamp: number,
    virtualSize: number,
): string {
    const ts = timestamp.toString(16).toUpperCase().padStart(8, "0");
    const vs = virtualSize.toString(16);
    return `${baseUrl.replace(/\/+$/, "")}/${name}/${ts}${vs}/${name}`;
}

function cacheGet(name: string): { hit: boolean; value: WinbindexJson | null } {
    const record = jsonCache.get(name);
    if (!record) {
        return { hit: false, value: null };
    }
    if (Date.now() >= record.expiresAt) {
        jsonCache.delete(name);
        return { hit: false, value: null };
    }
    // Move to the most-recently-used end so eviction in `cacheSet` is LRU: a
    // `Map` keeps insertion order, so re-inserting is the cheapest bump.
    jsonCache.delete(name);
    jsonCache.set(name, record);
    return { hit: true, value: record.value };
}

function cacheSet(name: string, value: WinbindexJson | null): void {
    // Refresh recency even when the key already exists (re-insert at the end).
    jsonCache.delete(name);
    if (jsonCache.size >= WINBINDEX_JSON_CACHE_MAX) {
        const lru = jsonCache.keys().next().value;
        if (lru !== undefined) {
            jsonCache.delete(lru);
        }
    }
    jsonCache.set(name, {
        value,
        expiresAt: Date.now() + WINBINDEX_JSON_TTL_MS,
    });
}

/**
 * Fetch, gunzip and parse the per-filename Winbindex index. A 404 is cached as a
 * `null` sentinel so a missing filename is not re-fetched on every request;
 * transient failures (network error, timeout, non-404 status, parse error) are
 * not cached. Never throws.
 */
async function fetchIndex(
    cfg: WinbindexConfig,
    name: string,
): Promise<WinbindexJson | null> {
    const url = `${cfg.dataUrl.replace(/\/+$/, "")}/${name}.json.gz`;
    let response: Response;
    try {
        response = await fetch(url, {
            signal: AbortSignal.timeout(cfg.timeoutMs),
        });
    } catch {
        return null;
    }

    if (response.status === 404) {
        discardBody(response);
        cacheSet(name, null);
        return null;
    }
    if (!response.ok) {
        discardBody(response);
        return null;
    }

    try {
        const compressed = new Uint8Array(await response.arrayBuffer());
        const json = (await gunzipAsync(compressed)).toString("utf-8");
        const parsed = JSON.parse(json) as WinbindexJson;
        cacheSet(name, parsed);
        return parsed;
    } catch {
        return null;
    }
}

/**
 * Resolve `sha1` (raw SHA-1 of the file content) to a `{ timestamp, virtualSize }`
 * entry via the per-filename Winbindex index. Returns `null` on any miss or
 * failure and never throws.
 */
export async function resolveEntry(
    cfg: WinbindexConfig,
    name: string,
    sha1: string,
): Promise<WinbindexEntry | null> {
    const key = name.toLowerCase();
    const cached = cacheGet(key);
    const index = cached.hit ? cached.value : await fetchIndex(cfg, key);
    if (!index) {
        return null;
    }

    const target = sha1.toLowerCase();
    for (const entry of Object.values(index)) {
        const fileInfo = entry?.fileInfo;
        if (
            fileInfo &&
            typeof fileInfo.sha1 === "string" &&
            fileInfo.sha1.toLowerCase() === target
        ) {
            if (
                typeof fileInfo.timestamp === "number" &&
                typeof fileInfo.virtualSize === "number"
            ) {
                return {
                    timestamp: fileInfo.timestamp,
                    virtualSize: fileInfo.virtualSize,
                };
            }
            return null;
        }
    }
    return null;
}

/**
 * Read the whole upstream body, giving up (returns `null`) past `maxBytes`.
 * Stream errors propagate to the caller.
 */
async function readBody(
    body: ReadableStream<Uint8Array>,
    maxBytes: number,
): Promise<Uint8Array | null> {
    const reader = body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    try {
        let chunk = await reader.read();
        while (!chunk.done) {
            total += chunk.value.byteLength;
            if (total > maxBytes) {
                return null;
            }
            chunks.push(chunk.value);
            chunk = await reader.read();
        }
    } finally {
        // Stops the symbol-server download when we bail out early; a no-op once
        // the body is fully read.
        void reader.cancel().catch(() => {});
    }
    const data = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
        data.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return data;
}

/**
 * Fetch the PE file from the symbol server, verify its SHA-1 against
 * `expectedSha1`, and only then send it. Nothing is written to `res` unless the
 * digest matches, so every failure (non-2xx, fetch or stream error, timeout,
 * oversized body, SHA-1 mismatch) returns `not_available` with the response
 * untouched for the MinIO fallback.
 *
 * Buffering trades streaming for correctness: a mismatch can only be detected
 * once the last byte is in, and by then a streamed response is already complete
 * on the client side, so it cannot be turned into a failure.
 */
export async function serveFromSymbolServer(
    cfg: WinbindexConfig,
    entry: WinbindexEntry,
    name: string,
    expectedSha1: string,
    res: BlobResponse,
    maxBytes: number = WINBINDEX_MAX_PE_BYTES,
): Promise<WinbindexOutcome> {
    const url = symbolServerUrl(
        cfg.symbolServerUrl,
        name,
        entry.timestamp,
        entry.virtualSize,
    );

    let data: Uint8Array | null;
    try {
        const upstream = await fetch(url, {
            headers: { "User-Agent": SYMBOL_SERVER_USER_AGENT },
            redirect: "follow",
            signal: AbortSignal.timeout(cfg.timeoutMs),
        });
        if (!upstream.ok || !upstream.body) {
            discardBody(upstream);
            return "not_available";
        }
        data = await readBody(upstream.body, maxBytes);
    } catch (error) {
        console.warn(
            `Winbindex: symbol-server download for ${name} failed, falling back:`,
            error,
        );
        return "not_available";
    }

    if (data === null) {
        console.warn(
            `Winbindex: ${name} exceeds ${maxBytes} bytes, falling back`,
        );
        return "not_available";
    }

    const expected = expectedSha1.toLowerCase();
    const digest = createHash("sha1").update(data).digest("hex");
    if (digest !== expected) {
        console.warn(
            `Winbindex: SHA-1 mismatch for ${name} (expected ${expected}, got ${digest}), falling back`,
        );
        return "not_available";
    }

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
    // The bytes were verified against the requested hash just above; this gives
    // the winbindex path ETag parity with MinIO.
    res.setHeader("ETag", `"${expected}"`);
    res.setHeader("Content-Length", data.byteLength);
    res.end(data);
    return "served";
}

/**
 * Orchestrator for the Winbindex fast path. Returns `not_available` (caller
 * falls back to MinIO) unless the feature is enabled, the filename is a Windows
 * PE file, and Winbindex resolves the hash; otherwise delegates to
 * {@link serveFromSymbolServer}. Never throws.
 */
export async function tryServeFromWinbindex(
    cfg: WinbindexConfig,
    hash: string,
    filename: string,
    res: BlobResponse,
): Promise<WinbindexOutcome> {
    if (!cfg.enabled || !isWindowsPEFilename(filename)) {
        return "not_available";
    }

    const name = basename(filename).toLowerCase();

    // Single validation gate. `basename()` strips `/` and `\` but not `?`, `#`
    // or percent-encoded segments, which would otherwise flow unencoded into the
    // outbound Winbindex / symbol-server URLs (blind single-host SSRF). Rejecting
    // here makes the cache key, both URLs and the Content-Disposition value all
    // safe by construction, with no per-site encoding needed.
    if (!SAFE_PE_NAME.test(name)) {
        return "not_available";
    }

    try {
        const entry = await resolveEntry(cfg, name, hash);
        if (!entry) {
            return "not_available";
        }
        return await serveFromSymbolServer(cfg, entry, name, hash, res);
    } catch (error) {
        console.warn(`Winbindex: unexpected error serving ${name}:`, error);
        return "not_available";
    }
}
