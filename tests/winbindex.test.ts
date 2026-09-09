import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
import {
    isWindowsPEFilename,
    symbolServerUrl,
    resolveEntry,
    tryServeFromWinbindex,
    __clearWinbindexCache,
    WINBINDEX_JSON_TTL_MS,
    WinbindexConfig,
    BlobResponse,
} from "../src/winbindex.js";

const CONFIG: WinbindexConfig = {
    enabled: true,
    dataUrl: "https://winbindex.example/data/by_filename_compressed",
    symbolServerUrl: "https://symbols.example/download/symbols",
    timeoutMs: 5000,
};

const KERNEL32_SHA1 = "20735ae6dd1fe416d7c8c08389df321d7c917db5";

const bytes = (text: string): Uint8Array => new TextEncoder().encode(text);

const sha1Hex = (data: Uint8Array): string =>
    createHash("sha1").update(data).digest("hex");

const gzip = (text: string): Uint8Array => Uint8Array.from(gzipSync(bytes(text)));

const toArrayBuffer = (data: Uint8Array): ArrayBuffer => {
    const ab = new ArrayBuffer(data.byteLength);
    new Uint8Array(ab).set(data);
    return ab;
};

/** A fake of the parts of a `fetch` Response the index path reads. */
const indexResponse = (gunzipped: string, status = 200) => ({
    status,
    ok: status >= 200 && status < 300,
    arrayBuffer: async (): Promise<ArrayBuffer> => toArrayBuffer(gzip(gunzipped)),
});

const jsonIndexResponse = (value: unknown): ReturnType<typeof indexResponse> =>
    indexResponse(JSON.stringify(value));

const notFoundResponse = () => ({ status: 404, ok: false });

const streamOf = (data: Uint8Array): ReadableStream<Uint8Array> =>
    new ReadableStream({
        start(controller) {
            controller.enqueue(data);
            controller.close();
        },
    });

/** A 200-body stream that closes without ever yielding a chunk. */
const emptyStream = (): ReadableStream<Uint8Array> =>
    new ReadableStream({
        start(controller) {
            controller.close();
        },
    });

/** A stream that yields `data` then errors, i.e. fails *after* the first byte. */
const streamThenError = (data: Uint8Array): ReadableStream<Uint8Array> => {
    let sent = false;
    return new ReadableStream({
        pull(controller) {
            if (!sent) {
                sent = true;
                controller.enqueue(data);
            } else {
                controller.error(new Error("upstream stream reset"));
            }
        },
    });
};

/** A stream that yields `data` then stalls, recording whether it was cancelled. */
const stallingStream = (
    data: Uint8Array,
): { stream: ReadableStream<Uint8Array>; cancelled: () => boolean } => {
    let cancelled = false;
    const stream = new ReadableStream<Uint8Array>({
        start(controller) {
            controller.enqueue(data);
        },
        cancel() {
            cancelled = true;
        },
    });
    return { stream, cancelled: () => cancelled };
};

/** A stream that errors before yielding anything. */
const erroringStream = (): ReadableStream<Uint8Array> =>
    new ReadableStream({
        start(controller) {
            controller.error(new Error("upstream stream reset"));
        },
    });

/** A fake of the parts of a `fetch` Response the symbol-server path reads. */
const symbolResponse = (
    body: Uint8Array | ReadableStream<Uint8Array> | null,
    status = 200,
    extraHeaders: Record<string, string> = {},
) => {
    const stream =
        body instanceof ReadableStream ? body : body ? streamOf(body) : null;
    const headers: Record<string, string> = {};
    if (body instanceof Uint8Array) {
        headers["content-length"] = String(body.byteLength);
    }
    for (const [k, v] of Object.entries(extraHeaders)) {
        headers[k.toLowerCase()] = v;
    }
    return {
        ok: status >= 200 && status < 300,
        body: stream,
        headers: {
            get: (name: string): string | null =>
                headers[name.toLowerCase()] ?? null,
        },
    };
};

interface MockRes extends BlobResponse {
    headers: Record<string, string | number>;
    body: Uint8Array[];
    ended: boolean;
    destroyed: boolean;
    emit(event: string, ...args: unknown[]): void;
}

/**
 * `writeReturns` feeds the boolean each `write()` call returns (default `true`).
 * A `false` schedules a `drain` on the next microtask so the code under test
 * resumes, exercising the backpressure path.
 */
const makeMockRes = (writeReturns: boolean[] = []): MockRes => {
    const headers: Record<string, string | number> = {};
    const body: Uint8Array[] = [];
    const pending = [...writeReturns];
    const listeners: Record<string, Array<(...args: unknown[]) => void>> = {};
    const res: MockRes = {
        headers,
        body,
        ended: false,
        destroyed: false,
        setHeader(name, value) {
            headers[name] = value;
        },
        write(chunk) {
            body.push(chunk);
            const ok = pending.length ? (pending.shift() as boolean) : true;
            if (!ok) {
                queueMicrotask(() => res.emit("drain"));
            }
            return ok;
        },
        once(event, listener) {
            (listeners[event] ??= []).push(listener);
        },
        off(event, listener) {
            listeners[event] = (listeners[event] ?? []).filter(
                (l) => l !== listener,
            );
        },
        emit(event, ...args) {
            const ls = listeners[event] ?? [];
            listeners[event] = [];
            for (const l of ls) {
                l(...args);
            }
        },
        end() {
            res.ended = true;
        },
        destroy() {
            res.destroyed = true;
        },
    };
    return res;
};

const receivedText = (res: MockRes): string => {
    const total = res.body.reduce((n, chunk) => n + chunk.byteLength, 0);
    const merged = new Uint8Array(total);
    let offset = 0;
    for (const chunk of res.body) {
        merged.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return new TextDecoder().decode(merged);
};

type FetchMock = jest.MockedFunction<(...args: any[]) => Promise<any>>;
let fetchMock: FetchMock;
const REAL_FETCH = globalThis.fetch;

beforeEach(() => {
    __clearWinbindexCache();
    fetchMock = jest.fn<(...args: any[]) => Promise<any>>();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
    jest.restoreAllMocks();
    globalThis.fetch = REAL_FETCH;
});

describe("isWindowsPEFilename", () => {
    it.each(["KERNEL32.DLL", "ntoskrnl.exe", "a/b/c/win32k.sys", "foo.EXE"])(
        "is true for %s",
        (name) => {
            expect(isWindowsPEFilename(name)).toBe(true);
        },
    );

    it.each(["foo.txt", "libc.so.6", "", "notes", ".dll"])(
        "is false for %s",
        (name) => {
            expect(isWindowsPEFilename(name)).toBe(false);
        },
    );
});

describe("symbolServerUrl", () => {
    it("builds the timestamp+virtualSize path segment", () => {
        expect(
            symbolServerUrl(
                "https://symbols.example/download/symbols",
                "kernel32.dll",
                1584069829,
                118784,
            ),
        ).toBe(
            "https://symbols.example/download/symbols/kernel32.dll/5E6AFCC51d000/kernel32.dll",
        );
    });
});

describe("resolveEntry", () => {
    it("returns { timestamp, virtualSize } for a matching sha1 (case-insensitive)", async () => {
        const index = {
            somesha256: {
                fileInfo: {
                    timestamp: 1584069829,
                    virtualSize: 118784,
                    sha1: KERNEL32_SHA1.toUpperCase(),
                },
            },
        };
        fetchMock.mockResolvedValue(jsonIndexResponse(index));

        await expect(
            resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1),
        ).resolves.toEqual({ timestamp: 1584069829, virtualSize: 118784 });
    });

    it("returns null when no entry carries the requested sha1", async () => {
        const index = {
            a: { fileInfo: { timestamp: 1, virtualSize: 2, sha1: "deadbeef" } },
            b: { fileInfo: { timestamp: 3, virtualSize: 4 } },
        };
        fetchMock.mockResolvedValue(jsonIndexResponse(index));

        await expect(
            resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1),
        ).resolves.toBeNull();
    });

    it("returns null on a 404 from Winbindex", async () => {
        fetchMock.mockResolvedValue(notFoundResponse());

        await expect(
            resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1),
        ).resolves.toBeNull();
    });

    it("returns null when fetch rejects", async () => {
        fetchMock.mockRejectedValue(new Error("network down"));

        await expect(
            resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1),
        ).resolves.toBeNull();
    });

    it("returns null when the gzipped payload is not valid JSON", async () => {
        fetchMock.mockResolvedValue(indexResponse("{ not json"));

        await expect(
            resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1),
        ).resolves.toBeNull();
    });

    it("returns null when the matching entry lacks timestamp or virtualSize", async () => {
        const index = {
            a: { fileInfo: { virtualSize: 118784, sha1: KERNEL32_SHA1 } },
        };
        fetchMock.mockResolvedValue(jsonIndexResponse(index));

        await expect(
            resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1),
        ).resolves.toBeNull();
    });

    it("caches the parsed index per filename and re-fetches after __clearWinbindexCache()", async () => {
        const index = {
            a: {
                fileInfo: {
                    timestamp: 1584069829,
                    virtualSize: 118784,
                    sha1: KERNEL32_SHA1,
                },
            },
        };
        fetchMock.mockResolvedValue(jsonIndexResponse(index));

        await resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1);
        await resolveEntry(CONFIG, "KERNEL32.DLL", KERNEL32_SHA1);
        expect(fetchMock).toHaveBeenCalledTimes(1);

        __clearWinbindexCache();
        await resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1);
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it("caches a 404 as a sentinel so the filename is not re-fetched", async () => {
        fetchMock.mockResolvedValue(notFoundResponse());

        await resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1);
        await resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1);

        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("re-fetches the index once the 24h TTL has expired", async () => {
        jest.useFakeTimers();
        try {
            const index = {
                a: {
                    fileInfo: {
                        timestamp: 1584069829,
                        virtualSize: 118784,
                        sha1: KERNEL32_SHA1,
                    },
                },
            };
            fetchMock.mockResolvedValue(jsonIndexResponse(index));

            await resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1);
            await resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1);
            expect(fetchMock).toHaveBeenCalledTimes(1);

            jest.advanceTimersByTime(WINBINDEX_JSON_TTL_MS + 1);
            await resolveEntry(CONFIG, "kernel32.dll", KERNEL32_SHA1);
            expect(fetchMock).toHaveBeenCalledTimes(2);
        } finally {
            jest.useRealTimers();
        }
    });

    it("bounds the cache to 200 entries, evicting the least-recently-used first", async () => {
        const index = {
            a: {
                fileInfo: {
                    timestamp: 1584069829,
                    virtualSize: 118784,
                    sha1: KERNEL32_SHA1,
                },
            },
        };
        fetchMock.mockResolvedValue(jsonIndexResponse(index));

        for (let i = 0; i < 201; i++) {
            await resolveEntry(CONFIG, `f${i}.dll`, KERNEL32_SHA1);
        }
        expect(fetchMock).toHaveBeenCalledTimes(201);

        // f0 was evicted when f200 was inserted -> re-fetch.
        await resolveEntry(CONFIG, "f0.dll", KERNEL32_SHA1);
        expect(fetchMock).toHaveBeenCalledTimes(202);

        // f200 is still cached -> no fetch.
        await resolveEntry(CONFIG, "f200.dll", KERNEL32_SHA1);
        expect(fetchMock).toHaveBeenCalledTimes(202);
    });

    it("a cache read refreshes recency, sparing a hot entry under churn", async () => {
        const index = {
            a: {
                fileInfo: {
                    timestamp: 1584069829,
                    virtualSize: 118784,
                    sha1: KERNEL32_SHA1,
                },
            },
        };
        fetchMock.mockResolvedValue(jsonIndexResponse(index));

        // Fill the cache exactly: f0 .. f199.
        for (let i = 0; i < 200; i++) {
            await resolveEntry(CONFIG, `f${i}.dll`, KERNEL32_SHA1);
        }
        expect(fetchMock).toHaveBeenCalledTimes(200);

        // Re-read f0: it becomes most-recently-used, f1 is now the coldest.
        await resolveEntry(CONFIG, "f0.dll", KERNEL32_SHA1);
        expect(fetchMock).toHaveBeenCalledTimes(200);

        // A new entry evicts the LRU (f1), not the just-read f0.
        await resolveEntry(CONFIG, "f200.dll", KERNEL32_SHA1);
        await resolveEntry(CONFIG, "f0.dll", KERNEL32_SHA1);
        expect(fetchMock).toHaveBeenCalledTimes(201);
        await resolveEntry(CONFIG, "f1.dll", KERNEL32_SHA1);
        expect(fetchMock).toHaveBeenCalledTimes(202);
    });
});

describe("tryServeFromWinbindex", () => {
    const entryIndex = (sha1: string) => ({
        k: {
            fileInfo: { timestamp: 1584069829, virtualSize: 118784, sha1 },
        },
    });

    it("returns not_available for a non-PE filename without calling fetch", async () => {
        const res = makeMockRes();

        await expect(
            tryServeFromWinbindex(CONFIG, "a".repeat(40), "readme.txt", res),
        ).resolves.toBe("not_available");
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("returns not_available when the feature is disabled without calling fetch", async () => {
        const res = makeMockRes();

        await expect(
            tryServeFromWinbindex(
                { ...CONFIG, enabled: false },
                "a".repeat(40),
                "kernel32.dll",
                res,
            ),
        ).resolves.toBe("not_available");
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("streams verified bytes and returns served on the happy path", async () => {
        const bodyText = "MZ...fake portable executable bytes...";
        const body = bytes(bodyText);
        const hash = sha1Hex(body);
        fetchMock.mockImplementation(async (input: unknown) => {
            return String(input).includes(".json.gz")
                ? jsonIndexResponse(entryIndex(hash))
                : symbolResponse(body);
        });

        const res = makeMockRes();
        const outcome = await tryServeFromWinbindex(
            CONFIG,
            hash,
            "kernel32.dll",
            res,
        );

        expect(outcome).toBe("served");
        expect(receivedText(res)).toBe(bodyText);
        expect(res.headers["Content-Type"]).toBe("application/octet-stream");
        expect(res.headers["Content-Disposition"]).toBe(
            'attachment; filename="kernel32.dll"',
        );
        expect(res.headers["Content-Length"]).toBe(String(body.byteLength));
        expect(res.ended).toBe(true);
        expect(res.destroyed).toBe(false);
        expect(fetchMock).toHaveBeenLastCalledWith(
            "https://symbols.example/download/symbols/kernel32.dll/5E6AFCC51d000/kernel32.dll",
            expect.objectContaining({
                headers: { "User-Agent": "Microsoft-Symbol-Server/10.0.0.0" },
                redirect: "follow",
            }),
        );
    });

    it("returns not_available and writes nothing when the symbol server 500s", async () => {
        const hash = sha1Hex(bytes("kernel32 body"));
        fetchMock.mockImplementation(async (input: unknown) => {
            return String(input).includes(".json.gz")
                ? jsonIndexResponse(entryIndex(hash))
                : symbolResponse(null, 500);
        });

        const res = makeMockRes();
        const outcome = await tryServeFromWinbindex(
            CONFIG,
            hash,
            "kernel32.dll",
            res,
        );

        expect(outcome).toBe("not_available");
        expect(res.body).toHaveLength(0);
        expect(res.headers).toEqual({});
        expect(res.ended).toBe(false);
        expect(res.destroyed).toBe(false);
    });

    it("destroys the response and returns failed_after_send on a post-send SHA-1 mismatch", async () => {
        const requestedHash = sha1Hex(bytes("what the caller asked for"));
        const servedBody = bytes("something else entirely");
        fetchMock.mockImplementation(async (input: unknown) => {
            return String(input).includes(".json.gz")
                ? jsonIndexResponse(entryIndex(requestedHash))
                : symbolResponse(servedBody);
        });

        const res = makeMockRes();
        const outcome = await tryServeFromWinbindex(
            CONFIG,
            requestedHash,
            "kernel32.dll",
            res,
        );

        expect(outcome).toBe("failed_after_send");
        expect(res.destroyed).toBe(true);
        expect(res.ended).toBe(false);
        expect(console.warn).toHaveBeenCalled();
    });

    it("falls back to MinIO on a SHA-1 mismatch when no byte was sent (empty 200 body)", async () => {
        const requestedHash = sha1Hex(bytes("a real, non-empty PE file"));
        fetchMock.mockImplementation(async (input: unknown) =>
            String(input).includes(".json.gz")
                ? jsonIndexResponse(entryIndex(requestedHash))
                : symbolResponse(emptyStream()),
        );

        const res = makeMockRes();
        const outcome = await tryServeFromWinbindex(
            CONFIG,
            requestedHash,
            "kernel32.dll",
            res,
        );

        expect(outcome).toBe("not_available");
        expect(res.destroyed).toBe(false);
        expect(res.body).toHaveLength(0);
        expect(res.headers).toEqual({});
    });

    it.each(["a?b.dll", "x#y.dll", "mal ware.dll", "%2e%2e.dll", "café.dll"])(
        "returns not_available without fetching for an unsafe filename %s",
        async (unsafe) => {
            const res = makeMockRes();

            await expect(
                tryServeFromWinbindex(CONFIG, "a".repeat(40), unsafe, res),
            ).resolves.toBe("not_available");
            expect(fetchMock).not.toHaveBeenCalled();
            expect(res.body).toHaveLength(0);
        },
    );

    it("sets a quoted ETag of the requested hash on a successful serve", async () => {
        const body = bytes("MZ pe bytes");
        const hash = sha1Hex(body);
        fetchMock.mockImplementation(async (input: unknown) =>
            String(input).includes(".json.gz")
                ? jsonIndexResponse(entryIndex(hash))
                : symbolResponse(body),
        );

        const res = makeMockRes();
        const outcome = await tryServeFromWinbindex(
            CONFIG,
            hash,
            "kernel32.dll",
            res,
        );

        expect(outcome).toBe("served");
        expect(res.headers["ETag"]).toBe(`"${hash}"`);
    });

    it("omits Content-Length when the symbol server sent Content-Encoding: gzip", async () => {
        const body = bytes("MZ decompressed pe bytes");
        const hash = sha1Hex(body);
        fetchMock.mockImplementation(async (input: unknown) =>
            String(input).includes(".json.gz")
                ? jsonIndexResponse(entryIndex(hash))
                : symbolResponse(body, 200, {
                      "content-encoding": "gzip",
                      "content-length": "11",
                  }),
        );

        const res = makeMockRes();
        const outcome = await tryServeFromWinbindex(
            CONFIG,
            hash,
            "kernel32.dll",
            res,
        );

        expect(outcome).toBe("served");
        expect(res.headers).not.toHaveProperty("Content-Length");
    });

    it("returns not_available (no destroy) when the stream errors before the first byte", async () => {
        const hash = sha1Hex(bytes("kernel32 body"));
        fetchMock.mockImplementation(async (input: unknown) =>
            String(input).includes(".json.gz")
                ? jsonIndexResponse(entryIndex(hash))
                : symbolResponse(erroringStream()),
        );

        const res = makeMockRes();
        const outcome = await tryServeFromWinbindex(
            CONFIG,
            hash,
            "kernel32.dll",
            res,
        );

        expect(outcome).toBe("not_available");
        expect(res.body).toHaveLength(0);
        expect(res.destroyed).toBe(false);
        expect(res.ended).toBe(false);
    });

    it("returns failed_after_send and destroys the response when the stream errors after bytes were sent", async () => {
        const first = bytes("first chunk of the pe");
        // Requested hash need not match; the stream error fires first.
        const hash = sha1Hex(bytes("whole file"));
        fetchMock.mockImplementation(async (input: unknown) =>
            String(input).includes(".json.gz")
                ? jsonIndexResponse(entryIndex(hash))
                : symbolResponse(streamThenError(first)),
        );

        const res = makeMockRes();
        const outcome = await tryServeFromWinbindex(
            CONFIG,
            hash,
            "kernel32.dll",
            res,
        );

        expect(outcome).toBe("failed_after_send");
        expect(res.destroyed).toBe(true);
        expect(res.body).toHaveLength(1);
        expect(console.warn).toHaveBeenCalled();
    });

    it("honours write() backpressure and still serves the whole body", async () => {
        const body = bytes("MZ...a portable executable that needs draining...");
        const hash = sha1Hex(body);
        fetchMock.mockImplementation(async (input: unknown) =>
            String(input).includes(".json.gz")
                ? jsonIndexResponse(entryIndex(hash))
                : symbolResponse(body),
        );

        // First write() reports the buffer is full -> code must await "drain".
        const res = makeMockRes([false]);
        const outcome = await tryServeFromWinbindex(
            CONFIG,
            hash,
            "kernel32.dll",
            res,
        );

        expect(outcome).toBe("served");
        expect(receivedText(res)).toBe(
            "MZ...a portable executable that needs draining...",
        );
        expect(res.ended).toBe(true);
    });

    it("tears the response and the upstream down if the client never drains", async () => {
        const body = bytes("MZ...a client that stops reading...");
        const hash = sha1Hex(body);
        const upstream = stallingStream(body);
        fetchMock.mockImplementation(async (input: unknown) =>
            String(input).includes(".json.gz")
                ? jsonIndexResponse(entryIndex(hash))
                : symbolResponse(upstream.stream),
        );

        // write() reports backpressure but "drain" is never emitted.
        const res = makeMockRes();
        res.write = () => false;

        const outcome = await tryServeFromWinbindex(
            { ...CONFIG, timeoutMs: 10 },
            hash,
            "kernel32.dll",
            res,
        );

        expect(outcome).toBe("failed_after_send");
        expect(res.destroyed).toBe(true);
        expect(upstream.cancelled()).toBe(true);
    });
});
