import { jest } from "@jest/globals";

const mockResolveHiveRoot = jest.fn<any>();

jest.unstable_mockModule("../src/resolve.js", () => ({
    resolveHiveRoot: mockResolveHiveRoot,
}));

const { listRegistryKey } = await import("../src/tools/list-registry-key.js");

const ROOT = "r".repeat(40);

const bothConnections = {
    winRegKeys: [
        {
            child_keysConnection: {
                totalCount: 1,
                edges: [
                    {
                        properties: { name: "OptionalComponents" },
                        node: { hash: "k1" },
                    },
                ],
                pageInfo: { hasNextPage: false, endCursor: "kc" },
            },
            child_valuesConnection: {
                totalCount: 2,
                edges: [
                    {
                        properties: { name: "SecurityHealth" },
                        node: {
                            hash: "v1",
                            type: "REG_EXPAND_SZ",
                            value: "%windir%\\system32\\SecurityHealthSystray.exe",
                        },
                    },
                ],
                pageInfo: { hasNextPage: true, endCursor: "vc" },
            },
        },
    ],
};

describe("listRegistryKey", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockResolveHiveRoot.mockResolvedValue(ROOT);
    });

    it("traverses below the hive root and splits subkeys from values", async () => {
        const sdk = {
            TraverseRegistryPath: jest
                .fn<any>()
                .mockResolvedValue({ traversePath: "key1" }),
            ListRegistryKey: jest.fn<any>().mockResolvedValue(bothConnections),
        } as any;

        const page = await listRegistryKey(
            sdk,
            "win11",
            "SOFTWARE",
            "/Microsoft/Windows/CurrentVersion/Run",
            50,
        );

        expect(mockResolveHiveRoot).toHaveBeenCalledWith(
            sdk,
            "win11",
            "SOFTWARE",
        );
        expect(sdk.TraverseRegistryPath).toHaveBeenCalledWith({
            rootHash: ROOT,
            path: "/Microsoft/Windows/CurrentVersion/Run",
        });
        expect(sdk.ListRegistryKey).toHaveBeenCalledWith({
            keyHash: "key1",
            first: 50,
            afterKeys: undefined,
            afterValues: undefined,
            includeKeys: true,
            includeValues: true,
        });
        expect(page.subkeys).toEqual([
            { name: "OptionalComponents", hash: "k1" },
        ]);
        expect(page.values).toEqual([
            {
                name: "SecurityHealth",
                type: "REG_EXPAND_SZ",
                value: "%windir%\\system32\\SecurityHealthSystray.exe",
            },
        ]);
        expect(page.has_more).toBe(true);
    });

    it("skips the second traversal for the hive root itself", async () => {
        const sdk = {
            TraverseRegistryPath: jest.fn<any>(),
            ListRegistryKey: jest.fn<any>().mockResolvedValue(bothConnections),
        } as any;

        await listRegistryKey(sdk, "win11", "SYSTEM", "/");

        expect(sdk.TraverseRegistryPath).not.toHaveBeenCalled();
        expect(sdk.ListRegistryKey).toHaveBeenCalledWith(
            expect.objectContaining({ keyHash: ROOT }),
        );
    });

    it("stops requesting an exhausted connection on the next page", async () => {
        const second = {
            winRegKeys: [
                {
                    child_valuesConnection: {
                        totalCount: 2,
                        edges: [
                            {
                                properties: { name: "OneDrive" },
                                node: {
                                    hash: "v2",
                                    type: "REG_SZ",
                                    value: "C:\\OneDrive.exe",
                                },
                            },
                        ],
                        pageInfo: { hasNextPage: false, endCursor: "vc2" },
                    },
                },
            ],
        };
        const sdk = {
            TraverseRegistryPath: jest
                .fn<any>()
                .mockResolvedValue({ traversePath: "key1" }),
            ListRegistryKey: jest
                .fn<any>()
                .mockResolvedValueOnce(bothConnections)
                .mockResolvedValueOnce(second),
        } as any;

        const page1 = await listRegistryKey(
            sdk,
            "win11",
            "SOFTWARE",
            "/Run",
            1,
        );
        const page2 = await listRegistryKey(
            sdk,
            "win11",
            "SOFTWARE",
            "/Run",
            1,
            page1.next_cursor!,
        );

        expect(sdk.ListRegistryKey).toHaveBeenLastCalledWith({
            keyHash: "key1",
            first: 1,
            afterKeys: undefined,
            afterValues: "vc",
            includeKeys: false,
            includeValues: true,
        });
        expect(page2.subkeys).toEqual([]);
        expect(page2.has_more).toBe(false);
        expect(page2.next_cursor).toBeNull();
    });

    it("throws when the key path does not exist in the hive", async () => {
        const sdk = {
            TraverseRegistryPath: jest
                .fn<any>()
                .mockResolvedValue({ traversePath: null }),
            ListRegistryKey: jest.fn<any>(),
        } as any;

        await expect(
            listRegistryKey(sdk, "win11", "SOFTWARE", "/Nope"),
        ).rejects.toThrow(
            'Registry key not found in SOFTWARE ("win11"): /Nope',
        );
    });
});
