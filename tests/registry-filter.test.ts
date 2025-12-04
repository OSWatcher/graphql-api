import { describe, it, expect } from "@jest/globals";
import {
    isSensitiveValueName,
    REDACTED_VALUE,
} from "../src/registry-filter-config.js";

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
