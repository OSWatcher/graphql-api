import { describe, it, expect } from "@jest/globals";
import {
    parseStructPath,
    parseSymbolPath,
} from "../../src/git-log/path-parser.js";

describe("path-parser", () => {
    describe("parseStructPath", () => {
        it("should parse PE filename and struct name", () => {
            const result = parseStructPath("/ntoskrnl.exe/_KPROCESS");
            expect(result).toEqual({
                pe_filename: "ntoskrnl.exe",
                entity_name: "_KPROCESS",
                remaining_path: "",
            });
        });

        it("should parse struct path with field name", () => {
            const result = parseStructPath(
                "/ntoskrnl.exe/_PEB_LDR_DATA/InMemoryOrderModuleList",
            );
            expect(result).toEqual({
                pe_filename: "ntoskrnl.exe",
                entity_name: "_PEB_LDR_DATA",
                remaining_path: "InMemoryOrderModuleList",
            });
        });

        it("should parse nested field paths", () => {
            const result = parseStructPath(
                "/ntoskrnl.exe/_EPROCESS/Pcb/Header",
            );
            expect(result).toEqual({
                pe_filename: "ntoskrnl.exe",
                entity_name: "_EPROCESS",
                remaining_path: "Pcb/Header",
            });
        });

        it("should handle different PE filenames", () => {
            expect(parseStructPath("/ntdll.dll/_PEB")).toEqual({
                pe_filename: "ntdll.dll",
                entity_name: "_PEB",
                remaining_path: "",
            });

            expect(parseStructPath("/win32k.sys/_THREADINFO")).toEqual({
                pe_filename: "win32k.sys",
                entity_name: "_THREADINFO",
                remaining_path: "",
            });

            expect(parseStructPath("/kernel32.dll/_UNICODE_STRING")).toEqual({
                pe_filename: "kernel32.dll",
                entity_name: "_UNICODE_STRING",
                remaining_path: "",
            });
        });

        it("should throw for path with only PE filename", () => {
            expect(() => parseStructPath("/ntoskrnl.exe")).toThrow(
                /Invalid struct path/,
            );
        });

        it("should throw for empty path", () => {
            expect(() => parseStructPath("")).toThrow(/Invalid struct path/);
        });

        it("should throw for slash only", () => {
            expect(() => parseStructPath("/")).toThrow(/Invalid struct path/);
        });

        it("should handle path without leading slash", () => {
            const result = parseStructPath("ntoskrnl.exe/_KPROCESS");
            expect(result).toEqual({
                pe_filename: "ntoskrnl.exe",
                entity_name: "_KPROCESS",
                remaining_path: "",
            });
        });
    });

    describe("parseSymbolPath", () => {
        it("should parse PE filename and symbol name", () => {
            const result = parseSymbolPath("/ntoskrnl.exe/NtCreateFile");
            expect(result).toEqual({
                pe_filename: "ntoskrnl.exe",
                entity_name: "NtCreateFile",
                remaining_path: "",
            });
        });

        it("should handle different PE filenames", () => {
            expect(parseSymbolPath("/ntdll.dll/RtlInitUnicodeString")).toEqual({
                pe_filename: "ntdll.dll",
                entity_name: "RtlInitUnicodeString",
                remaining_path: "",
            });

            expect(
                parseSymbolPath("/kernel32.dll/CreateFileW"),
            ).toEqual({
                pe_filename: "kernel32.dll",
                entity_name: "CreateFileW",
                remaining_path: "",
            });
        });

        it("should throw for path with extra components", () => {
            expect(() =>
                parseSymbolPath("/ntoskrnl.exe/NtCreateFile/extra"),
            ).toThrow(/Invalid symbol path/);
        });

        it("should throw for path with only PE filename", () => {
            expect(() => parseSymbolPath("/ntoskrnl.exe")).toThrow(
                /Invalid symbol path/,
            );
        });

        it("should throw for empty path", () => {
            expect(() => parseSymbolPath("")).toThrow(/Invalid symbol path/);
        });

        it("should throw for slash only", () => {
            expect(() => parseSymbolPath("/")).toThrow(/Invalid symbol path/);
        });

        it("should handle path without leading slash", () => {
            const result = parseSymbolPath("ntoskrnl.exe/NtCreateFile");
            expect(result).toEqual({
                pe_filename: "ntoskrnl.exe",
                entity_name: "NtCreateFile",
                remaining_path: "",
            });
        });
    });
});
