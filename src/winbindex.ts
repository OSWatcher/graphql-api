import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";

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
    return { hit: true, value: record.value };
}

function cacheSet(name: string, value: WinbindexJson | null): void {
    if (!jsonCache.has(name) && jsonCache.size >= WINBINDEX_JSON_CACHE_MAX) {
        const oldest = jsonCache.keys().next().value;
        if (oldest !== undefined) {
            jsonCache.delete(oldest);
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
        cacheSet(name, null);
        return null;
    }
    if (!response.ok) {
        return null;
    }

    try {
        const compressed = new Uint8Array(await response.arrayBuffer());
        const parsed = JSON.parse(
            gunzipSync(compressed).toString("utf-8"),
        ) as WinbindexJson;
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
 * Fetch the PE file from the symbol server and stream it to `res` while
 * verifying its SHA-1. Returns `not_available` (nothing written) on a non-2xx
 * upstream response or a fetch error, `served` on a verified transfer, and
 * `failed_after_send` if the stream errored or the digest did not match after
 * bytes were already sent (the response is destroyed in that case).
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
        return "not_available";
    }

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename="${name}"`);
    const contentLength = upstream.headers.get("content-length");
    if (contentLength) {
        res.setHeader("Content-Length", contentLength);
    }

    const hash = createHash("sha1");
    const reader = upstream.body.getReader();
    try {
        let chunk = await reader.read();
        while (!chunk.done) {
            hash.update(chunk.value);
            res.write(chunk.value);
            chunk = await reader.read();
        }
    } catch (error) {
        console.warn(
            `Winbindex: symbol-server stream for ${name} errored mid-transfer, destroying response:`,
            error,
        );
        res.destroy();
        return "failed_after_send";
    }

    const digest = hash.digest("hex");
    if (digest !== expectedSha1.toLowerCase()) {
        console.warn(
            `Winbindex: SHA-1 mismatch for ${name} (expected ${expectedSha1.toLowerCase()}, got ${digest}), destroying response`,
        );
        res.destroy();
        return "failed_after_send";
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

    let entry: WinbindexEntry | null;
    try {
        entry = await resolveEntry(cfg, name, hash);
    } catch (error) {
        console.warn(`Winbindex: unexpected error resolving ${name}:`, error);
        return "not_available";
    }
    if (!entry) {
        return "not_available";
    }

    return streamFromSymbolServer(cfg, entry, name, hash, res);
}
