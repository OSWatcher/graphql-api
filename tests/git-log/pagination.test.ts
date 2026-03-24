import { describe, it, expect } from "@jest/globals";
import { PaginationTracker } from "../../src/git-log/pagination.js";

describe("PaginationTracker", () => {
    describe("constructor", () => {
        it("should use default values when not provided", () => {
            const tracker = new PaginationTracker();
            expect(tracker.getOffset()).toBe(0);
            expect(tracker.getLimit()).toBe(50);
        });

        it("should accept custom offset and limit", () => {
            const tracker = new PaginationTracker(10, 25);
            expect(tracker.getOffset()).toBe(10);
            expect(tracker.getLimit()).toBe(25);
        });
    });

    describe("with no offset (offset=0)", () => {
        it("should not skip any entries", () => {
            const tracker = new PaginationTracker(0, 50);
            expect(tracker.shouldSkip()).toBe(false);
        });

        it("should yield entries up to limit", () => {
            const tracker = new PaginationTracker(0, 3);
            expect(tracker.process()).toBe("yield");
            expect(tracker.process()).toBe("yield");
            expect(tracker.process()).toBe("stop"); // 3rd entry is at limit
        });

        it("should report correct yielded count", () => {
            const tracker = new PaginationTracker(0, 5);
            tracker.process();
            tracker.process();
            expect(tracker.getYieldedCount()).toBe(2);
        });
    });

    describe("with offset", () => {
        it("should skip entries up to offset", () => {
            const tracker = new PaginationTracker(3, 5);
            expect(tracker.shouldSkip()).toBe(true);
            tracker.increment();
            expect(tracker.shouldSkip()).toBe(true);
            tracker.increment();
            expect(tracker.shouldSkip()).toBe(true);
            tracker.increment();
            expect(tracker.shouldSkip()).toBe(false);
        });

        it("should process correctly with offset", () => {
            const tracker = new PaginationTracker(2, 3);

            // First 2 entries should be skipped (offset)
            expect(tracker.process()).toBe("skip");
            expect(tracker.process()).toBe("skip");

            // Next 3 entries should be yielded (limit)
            expect(tracker.process()).toBe("yield");
            expect(tracker.process()).toBe("yield");
            expect(tracker.process()).toBe("stop"); // 3rd yield, at limit

            // Further entries should stop
            expect(tracker.process()).toBe("stop");
        });

        it("should report correct yielded count after offset", () => {
            const tracker = new PaginationTracker(2, 5);
            tracker.process(); // skip
            tracker.process(); // skip
            tracker.process(); // yield
            expect(tracker.getYieldedCount()).toBe(1);
            tracker.process(); // yield
            expect(tracker.getYieldedCount()).toBe(2);
        });
    });

    describe("limit edge cases", () => {
        it("should handle limit of 1", () => {
            const tracker = new PaginationTracker(0, 1);
            expect(tracker.process()).toBe("stop"); // yield and stop at same time
            expect(tracker.process()).toBe("stop");
        });

        it("should handle large limit", () => {
            const tracker = new PaginationTracker(0, 1000);
            for (let i = 0; i < 999; i++) {
                expect(tracker.process()).toBe("yield");
            }
            expect(tracker.process()).toBe("stop"); // 1000th entry
        });
    });

    describe("isLimitReached", () => {
        it("should return false before limit is reached", () => {
            const tracker = new PaginationTracker(0, 3);
            expect(tracker.isLimitReached()).toBe(false);
            tracker.process();
            expect(tracker.isLimitReached()).toBe(false);
            tracker.process();
            expect(tracker.isLimitReached()).toBe(false);
        });

        it("should return true when limit is reached", () => {
            const tracker = new PaginationTracker(0, 3);
            tracker.process();
            tracker.process();
            tracker.process();
            expect(tracker.isLimitReached()).toBe(true);
        });

        it("should account for offset in limit calculation", () => {
            const tracker = new PaginationTracker(2, 3);
            // Need to process offset (2) + limit (3) = 5 entries
            for (let i = 0; i < 4; i++) {
                tracker.process();
                expect(tracker.isLimitReached()).toBe(false);
            }
            tracker.process(); // 5th entry
            expect(tracker.isLimitReached()).toBe(true);
        });
    });

    describe("canAcceptMore", () => {
        it("should return true when more entries can be accepted", () => {
            const tracker = new PaginationTracker(0, 3);
            expect(tracker.canAcceptMore()).toBe(true);
            tracker.process();
            expect(tracker.canAcceptMore()).toBe(true);
        });

        it("should return false when limit is reached", () => {
            const tracker = new PaginationTracker(0, 2);
            tracker.process();
            tracker.process();
            expect(tracker.canAcceptMore()).toBe(false);
        });
    });
});
