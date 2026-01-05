import { describe, it, expect } from "@jest/globals";
import {
    isSensitiveValueName,
    REDACTED_VALUE,
    HIDDEN_VALUE,
} from "../src/registry-filter-config.js";
import { filterSensitiveRegistryValues } from "../src/registry-response-filter.js";

describe("Registry Filter Configuration", () => {
    describe("isSensitiveValueName", () => {
        it("should identify DigitalProductId as sensitive (case-insensitive)", () => {
            expect(isSensitiveValueName("DigitalProductId")).toBe(true);
            expect(isSensitiveValueName("digitalproductid")).toBe(true);
            expect(isSensitiveValueName("DIGITALPRODUCTID")).toBe(true);
            expect(isSensitiveValueName("DiGiTaLpRoDuCtId")).toBe(true);
        });

        it("should identify DigitalProductId4 as sensitive (case-insensitive)", () => {
            expect(isSensitiveValueName("DigitalProductId4")).toBe(true);
            expect(isSensitiveValueName("digitalproductid4")).toBe(true);
            expect(isSensitiveValueName("DIGITALPRODUCTID4")).toBe(true);
        });

        it("should identify ProductId as sensitive (case-insensitive)", () => {
            expect(isSensitiveValueName("ProductId")).toBe(true);
            expect(isSensitiveValueName("productid")).toBe(true);
            expect(isSensitiveValueName("PRODUCTID")).toBe(true);
        });

        it("should not flag non-sensitive registry values", () => {
            expect(isSensitiveValueName("ProductName")).toBe(false);
            expect(isSensitiveValueName("CurrentVersion")).toBe(false);
            expect(isSensitiveValueName("InstallDate")).toBe(false);
            expect(isSensitiveValueName("RegisteredOwner")).toBe(false);
        });

        it("should handle empty strings", () => {
            expect(isSensitiveValueName("")).toBe(false);
        });

        it("should handle whitespace-only strings", () => {
            expect(isSensitiveValueName("   ")).toBe(false);
        });
    });

    describe("REDACTED_VALUE constant", () => {
        it("should be defined as [REDACTED]", () => {
            expect(REDACTED_VALUE).toBe("[REDACTED]");
        });
    });

    describe("HIDDEN_VALUE constant", () => {
        it("should be defined as [HIDDEN]", () => {
            expect(HIDDEN_VALUE).toBe("[HIDDEN]");
        });
    });
});

describe("Registry Filter with Authentication", () => {
    describe("Connection-style responses", () => {
        it("should hide all values for unauthenticated users (default)", () => {
            const data = {
                child_valuesConnection: {
                    edges: [
                        {
                            node: { value: "some-value" },
                            properties: { name: "NormalValue" },
                        },
                    ],
                },
            };

            filterSensitiveRegistryValues(data);

            expect(data.child_valuesConnection.edges[0].node.value).toBe(
                HIDDEN_VALUE,
            );
        });

        it("should hide all values when isAuthenticated is false", () => {
            const data = {
                child_valuesConnection: {
                    edges: [
                        {
                            node: { value: "some-value" },
                            properties: { name: "NormalValue" },
                        },
                    ],
                },
            };

            filterSensitiveRegistryValues(data, false);

            expect(data.child_valuesConnection.edges[0].node.value).toBe(
                HIDDEN_VALUE,
            );
        });

        it("should show actual values for authenticated users (non-sensitive)", () => {
            const data = {
                child_valuesConnection: {
                    edges: [
                        {
                            node: { value: "some-value" },
                            properties: { name: "NormalValue" },
                        },
                    ],
                },
            };

            filterSensitiveRegistryValues(data, true);

            expect(data.child_valuesConnection.edges[0].node.value).toBe(
                "some-value",
            );
        });

        it("should always redact sensitive values even for authenticated users", () => {
            const data = {
                child_valuesConnection: {
                    edges: [
                        {
                            node: { value: "XXXXX-XXXXX-XXXXX" },
                            properties: { name: "ProductId" },
                        },
                    ],
                },
            };

            filterSensitiveRegistryValues(data, true);

            expect(data.child_valuesConnection.edges[0].node.value).toBe(
                REDACTED_VALUE,
            );
        });

        it("should redact sensitive values for unauthenticated users", () => {
            const data = {
                child_valuesConnection: {
                    edges: [
                        {
                            node: { value: "XXXXX-XXXXX-XXXXX" },
                            properties: { name: "DigitalProductId" },
                        },
                    ],
                },
            };

            filterSensitiveRegistryValues(data, false);

            expect(data.child_valuesConnection.edges[0].node.value).toBe(
                REDACTED_VALUE,
            );
        });
    });

    describe("Diff-style responses", () => {
        it("should hide diff values for unauthenticated users", () => {
            const data = {
                diffNodesAt: {
                    items: [
                        {
                            type: "WinRegValue",
                            path: "/HKLM/Software/SomeKey/NormalValue",
                            old_props: { properties: { value: "old-val" } },
                            new_props: { properties: { value: "new-val" } },
                        },
                    ],
                },
            };

            filterSensitiveRegistryValues(data, false);

            expect(
                data.diffNodesAt.items[0].old_props.properties.value,
            ).toBe(HIDDEN_VALUE);
            expect(
                data.diffNodesAt.items[0].new_props.properties.value,
            ).toBe(HIDDEN_VALUE);
        });

        it("should show diff values for authenticated users (non-sensitive)", () => {
            const data = {
                diffNodesAt: {
                    items: [
                        {
                            type: "WinRegValue",
                            path: "/HKLM/Software/SomeKey/NormalValue",
                            old_props: { properties: { value: "old-val" } },
                            new_props: { properties: { value: "new-val" } },
                        },
                    ],
                },
            };

            filterSensitiveRegistryValues(data, true);

            expect(
                data.diffNodesAt.items[0].old_props.properties.value,
            ).toBe("old-val");
            expect(
                data.diffNodesAt.items[0].new_props.properties.value,
            ).toBe("new-val");
        });

        it("should always redact sensitive diff values even for authenticated users", () => {
            const data = {
                diffNodesAt: {
                    items: [
                        {
                            type: "WinRegValue",
                            path: "/HKLM/Software/Microsoft/Windows/CurrentVersion/ProductId",
                            old_props: { properties: { value: "old-key" } },
                            new_props: { properties: { value: "new-key" } },
                        },
                    ],
                },
            };

            filterSensitiveRegistryValues(data, true);

            expect(
                data.diffNodesAt.items[0].old_props.properties.value,
            ).toBe(REDACTED_VALUE);
            expect(
                data.diffNodesAt.items[0].new_props.properties.value,
            ).toBe(REDACTED_VALUE);
        });
    });

    describe("Mixed scenarios", () => {
        it("should handle mixed sensitive and non-sensitive values", () => {
            const data = {
                child_valuesConnection: {
                    edges: [
                        {
                            node: { value: "product-key" },
                            properties: { name: "ProductId" },
                        },
                        {
                            node: { value: "Windows 10" },
                            properties: { name: "ProductName" },
                        },
                    ],
                },
            };

            filterSensitiveRegistryValues(data, true);

            // Sensitive value should be redacted
            expect(data.child_valuesConnection.edges[0].node.value).toBe(
                REDACTED_VALUE,
            );
            // Non-sensitive value should be visible
            expect(data.child_valuesConnection.edges[1].node.value).toBe(
                "Windows 10",
            );
        });

        it("should handle deeply nested structures", () => {
            const data = {
                someQuery: {
                    nested: {
                        child_valuesConnection: {
                            edges: [
                                {
                                    node: { value: "nested-value" },
                                    properties: { name: "DeepValue" },
                                },
                            ],
                        },
                    },
                },
            };

            filterSensitiveRegistryValues(data, false);

            expect(
                data.someQuery.nested.child_valuesConnection.edges[0].node
                    .value,
            ).toBe(HIDDEN_VALUE);
        });
    });
});
