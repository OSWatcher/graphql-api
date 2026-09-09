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
 * Winbindex (per-filename index) and streams the verified bytes straight from
 * Microsoft's public symbol server, so the public corpus never re-hosts Windows
 * binaries. Every miss or failure falls back to MinIO, except once bytes have
 * already been streamed to the client.
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
 * - `served`: the response has been fully sent, the caller must not touch it.
 * - `failed_after_send`: bytes were already streamed then something failed
 *   (post-send hash mismatch, upstream stream error); the response has been
 *   destroyed and the caller must not retry MinIO.
 */
export type WinbindexOutcome = "not_available" | "served" | "failed_after_send";

/** Minimal view of the HTTP response the streaming step needs. */
export interface BlobResponse {
    setHeader(name: string, value: string | number): void;
    write(chunk: Uint8Array): boolean;
    once(event: string, listener: (...args: unknown[]) => void): void;
    off(event: string, listener: (...args: unknown[]) => void): void;
    end(): void;
    destroy(): void;
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
 * Resolve once the response has drained and can take more data, or reject if the
 * client went away first (so the caller stops pulling from the upstream instead
 * of buffering forever). Rejects after `timeoutMs` as well, so a socket that
 * never emits `drain`, `close` or `error` cannot hang the request handler.
 * Listeners and the timer are always cleared before settling.
 */
function waitForDrain(res: BlobResponse, timeoutMs: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        const cleanup = (): void => {
            if (timer !== undefined) {
                clearTimeout(timer);
            }
            res.off("drain", onDrain);
            res.off("close", onClose);
            res.off("error", onError);
        };
        const onDrain = (): void => {
            cleanup();
            resolve();
        };
        const onClose = (): void => {
            cleanup();
            reject(new Error("response closed before drain"));
        };
        const onError = (err: unknown): void => {
            cleanup();
            reject(err instanceof Error ? err : new Error(String(err)));
        };
        timer = setTimeout(() => {
            cleanup();
            reject(new Error("timed out waiting for the response to drain"));
        }, timeoutMs);
        res.once("drain", onDrain);
        res.once("close", onClose);
        res.once("error", onError);
    });
}

/**
 * Fetch the PE file from the symbol server and stream it to `res` while
 * verifying its SHA-1. Returns `not_available` (nothing written) on a non-2xx
 * upstream response, a fetch error, or a stream error before the first byte
 * reached the client; `served` on a verified transfer; and `failed_after_send`
 * if the stream errored or the digest did not match *after* bytes were already
 * sent (the response is destroyed in that case).
 *
 * `res.write()` backpressure is honoured: on a `false` return the loop awaits
 * `drain` before reading more, so a slow client cannot make Node buffer the
 * whole (potentially tens-of-MB) PE in memory.
 */
export async function streamFromSymbolServer(
    cfg: WinbindexConfig,
    entry: WinbindexEntry,
    name: string,
    expectedSha1: string,
    res: BlobResponse,
): Promise<WinbindexOutcome> {
    const url = symbolServerUrl(
        cfg.symbolServerUrl,
        name,
        entry.timestamp,
        entry.virtualSize,
    );

    let upstream: Response;
    try {
        upstream = await fetch(url, {
            headers: { "User-Agent": SYMBOL_SERVER_USER_AGENT },
            redirect: "follow",
            signal: AbortSignal.timeout(cfg.timeoutMs),
        });
    } catch {
        return "not_available";
    }

    if (!upstream.ok || !upstream.body) {
        discardBody(upstream);
        return "not_available";
    }

    // Only forward the upstream Content-Length when the bytes are not
    // content-encoded: undici may have transparently decompressed the body, in
    // which case the upstream length no longer matches what the client receives.
    const contentLength = upstream.headers.get("content-length");
    const contentEncoding = (
        upstream.headers.get("content-encoding") ?? ""
    ).toLowerCase();
    const forwardContentLength =
        contentLength !== null &&
        (contentEncoding === "" || contentEncoding === "identity");

    // Headers are set only once bytes are actually in hand, so a failure before
    // the first byte leaves the response pristine for the MinIO fallback.
    const setStreamHeaders = (): void => {
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
        // The requested hash is exactly what the streamed bytes are verified
        // against below; this gives the winbindex path ETag parity with MinIO.
        res.setHeader("ETag", `"${expectedSha1.toLowerCase()}"`);
        if (forwardContentLength && contentLength !== null) {
            res.setHeader("Content-Length", contentLength);
        }
    };

    const hash = createHash("sha1");
    const reader = upstream.body.getReader();
    let wrote = false;
    try {
        let chunk = await reader.read();
        while (!chunk.done) {
            hash.update(chunk.value);
            if (!wrote) {
                setStreamHeaders();
            }
            const flushed = res.write(chunk.value);
            wrote = true;
            if (!flushed) {
                await waitForDrain(res, cfg.timeoutMs);
            }
            chunk = await reader.read();
        }
    } catch (error) {
        if (!wrote) {
            // Nothing reached the client yet: fall back to MinIO.
            return "not_available";
        }
        console.warn(
            `Winbindex: symbol-server stream for ${name} errored mid-transfer, destroying response:`,
            error,
        );
        res.destroy();
        return "failed_after_send";
    } finally {
        // Abort the symbol-server download on any exit: a no-op once the body is
        // fully read, but on a mid-stream error or drain timeout it stops the
        // upstream transfer instead of leaving it running in the background.
        void reader.cancel().catch(() => {});
    }

    const digest = hash.digest("hex");
    if (digest !== expectedSha1.toLowerCase()) {
        console.warn(
            `Winbindex: SHA-1 mismatch for ${name} (expected ${expectedSha1.toLowerCase()}, got ${digest}), destroying response`,
        );
        res.destroy();
        return "failed_after_send";
    }

    if (!wrote) {
        // Zero-byte body that still verified: emit the headers before ending.
        setStreamHeaders();
    }
    res.end();
    return "served";
}

/**
 * Orchestrator for the Winbindex fast path. Returns `not_available` (caller
 * falls back to MinIO) unless the feature is enabled, the filename is a Windows
 * PE file, and Winbindex resolves the hash; otherwise delegates to
 * {@link streamFromSymbolServer}. Never throws.
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
        return await streamFromSymbolServer(cfg, entry, name, hash, res);
    } catch (error) {
        console.warn(`Winbindex: unexpected error serving ${name}:`, error);
        return "not_available";
    }
}
