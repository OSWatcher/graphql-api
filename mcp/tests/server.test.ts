import { tools } from "../src/tools/index.js";

describe("tool manifest", () => {
    it("registers every tool exactly once", () => {
        const names = tools.map((t) => t.name);
        expect(new Set(names).size).toBe(names.length);
    });

    it("gives every tool a name, a description and a schema", () => {
        for (const tool of tools) {
            expect(tool.name).toMatch(/^[a-z][a-z0-9_]*$/);
            expect(tool.description.length).toBeGreaterThan(20);
            expect(typeof tool.schema).toBe("object");
            expect(typeof tool.handler).toBe("function");
        }
    });

    it("exposes the expected surface", () => {
        expect(tools.map((t) => t.name).sort()).toEqual(
            [
                "diff_nodes",
                "diff_versions",
                "get_blobs_with_symbols",
                "get_struct",
                "get_winreg_root",
                "list_branches",
                "list_commits",
                "list_structs",
                "list_symbols",
                "search",
                "search_close",
                "search_next",
                "traverse_path",
            ].sort(),
        );
    });
});
