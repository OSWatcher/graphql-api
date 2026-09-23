import { jest } from "@jest/globals";

const mockResolveBlobHash = jest.fn<any>();

jest.unstable_mockModule("../src/resolve.js", () => ({
    resolveBlobHash: mockResolveBlobHash,
}));

const { getStruct } = await import("../src/tools/get-struct.js");

const BLOB = "b".repeat(40);
const STRUCT = "s".repeat(40);

function makeSdk(overrides: Record<string, unknown> = {}) {
    return {
        FetchStructByName: jest.fn<any>().mockResolvedValue({
            blobs: [
                {
                    has_structConnection: {
                        edges: [
                            {
                                properties: { name: "_EPROCESS" },
                                node: { hash: STRUCT, size: 2048, kind: "struct" },
                            },
                        ],
                    },
                },
            ],
        }),
        FetchStructFields: jest.fn<any>().mockResolvedValue({
            structs: [
                {
                    fieldsConnection: {
                        totalCount: 2,
                        edges: [
                            {
                                properties: { name: "Pcb" },
                                node: { hash: "f1", offset: 0, data_type: { type: "struct" } },
                            },
                            {
                                properties: { name: "UniqueProcessId" },
                                node: { hash: "f2", offset: 1088, data_type: { type: "pointer" } },
                            },
                        ],
                    },
                },
            ],
        }),
        ...overrides,
    } as any;
}

describe("getStruct", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockResolveBlobHash.mockResolvedValue(BLOB);
    });

    it("returns the struct with its full field layout", async () => {
        const sdk = makeSdk();

        const result = await getStruct(
            sdk,
            "win11-24h2",
            "/Windows/System32/ntoskrnl.exe",
            "_EPROCESS",
        );

        expect(mockResolveBlobHash).toHaveBeenCalledWith(
            sdk,
            "win11-24h2",
            "/Windows/System32/ntoskrnl.exe",
        );
        expect(sdk.FetchStructByName).toHaveBeenCalledWith({
            blobHash: BLOB,
            structName: "_EPROCESS",
        });
        expect(sdk.FetchStructFields).toHaveBeenCalledWith({
            structHash: STRUCT,
        });
        expect(result).toEqual({
            name: "_EPROCESS",
            hash: STRUCT,
            size: 2048,
            kind: "struct",
            field_count: 2,
            fields: [
                { name: "Pcb", offset: 0, data_type: { type: "struct" } },
                {
                    name: "UniqueProcessId",
                    offset: 1088,
                    data_type: { type: "pointer" },
                },
            ],
        });
    });

    it("sorts fields by offset", async () => {
        const sdk = makeSdk({
            FetchStructFields: jest.fn<any>().mockResolvedValue({
                structs: [
                    {
                        fieldsConnection: {
                            totalCount: 2,
                            edges: [
                                { properties: { name: "b" }, node: { hash: "f2", offset: 16, data_type: {} } },
                                { properties: { name: "a" }, node: { hash: "f1", offset: 0, data_type: {} } },
                            ],
                        },
                    },
                ],
            }),
        });

        const result = await getStruct(sdk, "win11-24h2", "/x.exe", "_S");

        expect(result.fields.map((f) => f.name)).toEqual(["a", "b"]);
    });

    it("throws a named error when the struct is absent from the blob", async () => {
        const sdk = makeSdk({
            FetchStructByName: jest.fn<any>().mockResolvedValue({
                blobs: [{ has_structConnection: { edges: [] } }],
            }),
        });

        await expect(
            getStruct(sdk, "win11-24h2", "/Windows/System32/ntoskrnl.exe", "_NOPE"),
        ).rejects.toThrow(
            'Struct "_NOPE" not found in /Windows/System32/ntoskrnl.exe',
        );
    });

    it("throws when the blob carries no PDB data at all", async () => {
        const sdk = makeSdk({
            FetchStructByName: jest.fn<any>().mockResolvedValue({ blobs: [] }),
        });

        await expect(
            getStruct(sdk, "win11-24h2", "/Windows/notapdb.txt", "_EPROCESS"),
        ).rejects.toThrow(
            "/Windows/notapdb.txt has no PDB symbol or struct data",
        );
    });
});
