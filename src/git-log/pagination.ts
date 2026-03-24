/**
 * Pagination state tracker for streaming operations.
 * Encapsulates offset/limit logic for testability.
 */
export class PaginationTracker {
    private entriesProcessed = 0;
    private readonly offset: number;
    private readonly limit: number;

    constructor(offset: number = 0, limit: number = 50) {
        this.offset = offset;
        this.limit = limit;
    }

    /**
     * Check if we should skip this entry (still in offset range)
     */
    shouldSkip(): boolean {
        return this.entriesProcessed < this.offset;
    }

    /**
     * Check if we can accept more entries
     */
    canAcceptMore(): boolean {
        return this.entriesProcessed < this.offset + this.limit;
    }

    /**
     * Check if we've reached the limit and should stop
     */
    isLimitReached(): boolean {
        return this.entriesProcessed >= this.offset + this.limit;
    }

    /**
     * Increment the entries counter
     */
    increment(): void {
        this.entriesProcessed++;
    }

    /**
     * Get current count of yielded entries (after offset)
     */
    getYieldedCount(): number {
        return Math.max(0, this.entriesProcessed - this.offset);
    }

    /**
     * Process an entry through pagination.
     * Returns the action to take for this entry:
     * - "skip": entry is within offset range, skip it
     * - "yield": entry should be yielded to consumer
     * - "stop": limit reached, stop processing after yielding this entry
     */
    process(): "skip" | "yield" | "stop" {
        if (this.shouldSkip()) {
            this.increment();
            return "skip";
        }
        if (this.canAcceptMore()) {
            this.increment();
            // Return "stop" if this was the last entry we can accept
            return this.isLimitReached() ? "stop" : "yield";
        }
        return "stop";
    }

    /**
     * Get the configured offset
     */
    getOffset(): number {
        return this.offset;
    }

    /**
     * Get the configured limit
     */
    getLimit(): number {
        return this.limit;
    }
}
