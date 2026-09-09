import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
import {
    isWindowsPEFilename,
    symbolServerUrl,
    resolveEntry,
    tryServeFromWinbindex,
    __clearWinbindexCache,
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

/** A fake of the parts of a `fetch` Response the symbol-server path reads. */
const symbolResponse = (body: Uint8Array | null, status = 200) => ({
    ok: status >= 200 && status < 300,
    body: body ? streamOf(body) : null,
    headers: {
        get: (name: string): string | null =>
            body && name.toLowerCase() === "content-length"
                ? String(body.byteLength)
                : null,
    },
});

interface MockRes extends BlobResponse {
    headers: Record<string, string | number>;
    body: Uint8Array[];
    ended: boolean;
    destroyed: boolean;
}

const makeMockRes = (): MockRes => {
    const headers: Record<string, string | number> = {};
    const body: Uint8Array[] = [];
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
            return true;
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

beforeEach(() => {
    __clearWinbindexCache();
    fetchMock = jest.fn<(...args: any[]) => Promise<any>>();
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
    jest.restoreAllMocks();
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
});
