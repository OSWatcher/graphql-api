import { describe, it, expect } from "@jest/globals";
import {
    isSensitiveValueName,
    REDACTED_VALUE,
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
});

describe("Registry Filter", () => {
    describe("Connection-style responses", () => {
        it("should show non-sensitive values as-is", () => {
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
                "some-value",
            );
        });

        it("should always redact sensitive values", () => {
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

            filterSensitiveRegistryValues(data);

            expect(data.child_valuesConnection.edges[0].node.value).toBe(
                REDACTED_VALUE,
            );
        });

        it("should redact sensitive values case-insensitively", () => {
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

            filterSensitiveRegistryValues(data);

            expect(data.child_valuesConnection.edges[0].node.value).toBe(
                REDACTED_VALUE,
            );
        });
    });

    describe("Diff-style responses", () => {
        it("should show non-sensitive diff values as-is", () => {
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

            filterSensitiveRegistryValues(data);

            expect(
                data.diffNodesAt.items[0].old_props.properties.value,
            ).toBe("old-val");
            expect(
                data.diffNodesAt.items[0].new_props.properties.value,
            ).toBe("new-val");
        });

        it("should always redact sensitive diff values", () => {
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

            filterSensitiveRegistryValues(data);

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

            filterSensitiveRegistryValues(data);

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

            filterSensitiveRegistryValues(data);

            expect(
                data.someQuery.nested.child_valuesConnection.edges[0].node
                    .value,
            ).toBe("nested-value");
        });
    });
});
