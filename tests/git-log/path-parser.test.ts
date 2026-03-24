import { describe, it, expect } from "@jest/globals";
import {
    parseStructPath,
    parseSymbolPath,
} from "../../src/git-log/path-parser.js";

describe("path-parser", () => {
    describe("parseStructPath", () => {
        it("should parse blob path and struct name", () => {
            const result = parseStructPath(
                "/Windows/System32/ntoskrnl.exe::_KPROCESS",
            );
            expect(result).toEqual({
                blob_path: "/Windows/System32/ntoskrnl.exe",
                entity_name: "_KPROCESS",
                remaining_path: "",
            });
        });

        it("should parse struct path with field name", () => {
            const result = parseStructPath(
                "/Windows/System32/ntoskrnl.exe::_PEB_LDR_DATA/InMemoryOrderModuleList",
            );
            expect(result).toEqual({
                blob_path: "/Windows/System32/ntoskrnl.exe",
                entity_name: "_PEB_LDR_DATA",
                remaining_path: "InMemoryOrderModuleList",
            });
        });

        it("should parse nested field paths", () => {
            const result = parseStructPath(
                "/Windows/System32/ntoskrnl.exe::_EPROCESS/Pcb/Header",
            );
            expect(result).toEqual({
                blob_path: "/Windows/System32/ntoskrnl.exe",
                entity_name: "_EPROCESS",
                remaining_path: "Pcb/Header",
            });
        });

        it("should handle different blob paths", () => {
            expect(parseStructPath("/Windows/System32/ntdll.dll::_PEB")).toEqual({
                blob_path: "/Windows/System32/ntdll.dll",
                entity_name: "_PEB",
                remaining_path: "",
            });

            expect(parseStructPath("/Windows/System32/win32k.sys::_THREADINFO")).toEqual({
                blob_path: "/Windows/System32/win32k.sys",
                entity_name: "_THREADINFO",
                remaining_path: "",
            });

            expect(
                parseStructPath(
                    "/Windows/SysWOW64/kernel32.dll::_UNICODE_STRING",
                ),
            ).toEqual({
                blob_path: "/Windows/SysWOW64/kernel32.dll",
                entity_name: "_UNICODE_STRING",
                remaining_path: "",
            });
        });

        it("should throw for path with only blob path", () => {
            expect(() => parseStructPath("/Windows/System32/ntoskrnl.exe")).toThrow(
                /Invalid struct path/,
            );
        });

        it("should throw for empty path", () => {
            expect(() => parseStructPath("")).toThrow(/Invalid struct path/);
        });

        it("should throw for slash only", () => {
            expect(() => parseStructPath("/")).toThrow(/Invalid struct path/);
        });

        it("should throw for legacy basename-only format", () => {
            expect(() => parseStructPath("/ntoskrnl.exe/_KPROCESS")).toThrow(
                /Invalid struct path/,
            );
        });
    });

    describe("parseSymbolPath", () => {
        it("should parse blob path and symbol name", () => {
            const result = parseSymbolPath(
                "/Windows/System32/ntoskrnl.exe::NtCreateFile",
            );
            expect(result).toEqual({
                blob_path: "/Windows/System32/ntoskrnl.exe",
                entity_name: "NtCreateFile",
                remaining_path: "",
            });
        });

        it("should handle different blob paths", () => {
            expect(
                parseSymbolPath("/Windows/System32/ntdll.dll::RtlInitUnicodeString"),
            ).toEqual({
                blob_path: "/Windows/System32/ntdll.dll",
                entity_name: "RtlInitUnicodeString",
                remaining_path: "",
            });

            expect(
                parseSymbolPath("/Windows/SysWOW64/kernel32.dll::CreateFileW"),
            ).toEqual({
                blob_path: "/Windows/SysWOW64/kernel32.dll",
                entity_name: "CreateFileW",
                remaining_path: "",
            });
        });

        it("should throw for path with extra components", () => {
            expect(() =>
                parseSymbolPath("/Windows/System32/ntoskrnl.exe::NtCreateFile/extra"),
            ).toThrow(/Invalid symbol path/);
        });

        it("should throw for path with only blob path", () => {
            expect(() => parseSymbolPath("/Windows/System32/ntoskrnl.exe")).toThrow(
                /Invalid symbol path/,
            );
        });

        it("should throw for empty path", () => {
            expect(() => parseSymbolPath("")).toThrow(/Invalid symbol path/);
        });

        it("should throw for slash only", () => {
            expect(() => parseSymbolPath("/")).toThrow(/Invalid symbol path/);
        });

        it("should throw for legacy basename-only format", () => {
            expect(() => parseSymbolPath("/ntoskrnl.exe/NtCreateFile")).toThrow(
                /Invalid symbol path/,
            );
        });
    });
});
