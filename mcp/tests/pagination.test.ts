import {
    singlePage,
    offsetPage,
    encodeCursor,
    decodeCursor,
    advanceCursor,
    compositeHasMore,
} from "../src/pagination.js";

describe("singlePage", () => {
    it("carries the endCursor when there is a next page", () => {
        expect(
            singlePage([1, 2], { hasNextPage: true, endCursor: "abc" }),
        ).toEqual({ items: [1, 2], has_more: true, next_cursor: "abc" });
    });

    it("nulls the cursor when the connection is exhausted", () => {
        expect(
            singlePage([1], { hasNextPage: false, endCursor: "abc" }),
        ).toEqual({ items: [1], has_more: false, next_cursor: null });
    });
});

describe("offsetPage", () => {
    it("returns the next offset as the cursor", () => {
        expect(offsetPage(["a", "b"], 10, true)).toEqual({
            items: ["a", "b"],
            has_more: true,
            next_cursor: "12",
        });
    });

    it("nulls the cursor on the last page", () => {
        expect(offsetPage(["a"], 10, false)).toEqual({
            items: ["a"],
            has_more: false,
            next_cursor: null,
        });
    });
});

describe("cursor codec", () => {
    it("round-trips a composite state", () => {
        const state = { trees: "t1", blobs: null };
        expect(decodeCursor(encodeCursor(state), ["trees", "blobs"])).toEqual(
            state,
        );
    });

    it("produces a url-safe opaque string", () => {
        expect(encodeCursor({ trees: "a/b+c=", blobs: null })).toMatch(
            /^[A-Za-z0-9_-]+$/,
        );
    });

    it("starts every key at the empty string when no cursor is given", () => {
        expect(decodeCursor(undefined, ["trees", "blobs"])).toEqual({
            trees: "",
            blobs: "",
        });
    });

    it("rejects a malformed cursor with an actionable message", () => {
        expect(() => decodeCursor("not-a-cursor", ["trees"])).toThrow(
            "Invalid cursor",
        );
    });

    it("defaults a key missing from the payload to exhausted", () => {
        const cursor = encodeCursor({ trees: "t1" });
        expect(decodeCursor(cursor, ["trees", "blobs"])).toEqual({
            trees: "t1",
            blobs: null,
        });
    });

    it("rejects a cursor that decodes to something other than an object", () => {
        const arrayCursor = Buffer.from("[]", "utf-8").toString("base64url");
        expect(() => decodeCursor(arrayCursor, ["trees"])).toThrow(
            "Invalid cursor",
        );
    });
});

describe("advanceCursor", () => {
    it("keeps a connection that has more and exhausts one that does not", () => {
        expect(
            advanceCursor(
                { trees: "", blobs: "" },
                {
                    trees: { hasNextPage: true, endCursor: "t2" },
                    blobs: { hasNextPage: false, endCursor: "b9" },
                },
            ),
        ).toEqual({ trees: "t2", blobs: null });
    });

    it("leaves an unrequested connection exhausted", () => {
        expect(
            advanceCursor(
                { trees: "t2", blobs: null },
                { trees: { hasNextPage: false, endCursor: "t9" } },
            ),
        ).toEqual({ trees: null, blobs: null });
    });

    it("exhausts a requested connection that returned no pageInfo", () => {
        expect(
            advanceCursor(
                { trees: "", blobs: "" },
                { trees: undefined, blobs: undefined },
            ),
        ).toEqual({ trees: null, blobs: null });
    });
});

describe("compositeHasMore", () => {
    it("is the OR of the connections still open", () => {
        expect(compositeHasMore({ trees: "t2", blobs: null })).toBe(true);
        expect(compositeHasMore({ trees: null, blobs: null })).toBe(false);
    });
});
