/**
 * D4: every paginated tool returns the same envelope, so an LLM learns one
 * pattern. Underneath there are three mechanisms: Neo4j connection cursors,
 * gitLog's limit/offset, and search's server-side sessions.
 */
export interface Page<T> {
    items: T[];
    has_more: boolean;
    next_cursor: string | null;
}

export interface PageInfo {
    hasNextPage: boolean;
    endCursor?: string | null;
}

/** One Neo4j connection: the cursor is the connection's own endCursor. */
export function singlePage<T>(items: T[], pageInfo: PageInfo): Page<T> {
    return {
        items,
        has_more: pageInfo.hasNextPage,
        next_cursor: pageInfo.hasNextPage ? (pageInfo.endCursor ?? null) : null,
    };
}

/** gitLog: the cursor is the offset to pass back. */
export function offsetPage<T>(
    items: T[],
    offset: number,
    hasMore: boolean,
): Page<T> {
    return {
        items,
        has_more: hasMore,
        next_cursor: hasMore ? String(offset + items.length) : null,
    };
}

/**
 * Composite cursor for tools that page two connections at once. A value is the
 * cursor to resume after; "" means "not started, request with no after"; null
 * means exhausted, so that connection is not requested again.
 */
export type CursorState = Record<string, string | null>;

export function encodeCursor(state: CursorState): string {
    return Buffer.from(JSON.stringify(state), "utf-8").toString("base64url");
}

export function decodeCursor(
    cursor: string | undefined,
    keys: string[],
): CursorState {
    if (!cursor) {
        return Object.fromEntries(keys.map((k) => [k, ""]));
    }

    let parsed: unknown;
    try {
        parsed = JSON.parse(
            Buffer.from(cursor, "base64url").toString("utf-8"),
        );
    } catch {
        throw new Error(
            "Invalid cursor. Pass back the next_cursor value from the previous page unchanged, or omit it to start over.",
        );
    }

    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        throw new Error(
            "Invalid cursor. Pass back the next_cursor value from the previous page unchanged, or omit it to start over.",
        );
    }

    const payload = parsed as Record<string, unknown>;
    return Object.fromEntries(
        keys.map((k) => [
            k,
            typeof payload[k] === "string" ? (payload[k] as string) : null,
        ]),
    );
}

/**
 * Fold this page's pageInfo back into the cursor state. A connection that was
 * not requested (no entry in `results`) stays exhausted; a requested one that
 * came back without pageInfo is treated as exhausted rather than looping.
 */
export function advanceCursor(
    previous: CursorState,
    results: Record<string, PageInfo | undefined>,
): CursorState {
    const next: CursorState = {};
    for (const key of Object.keys(previous)) {
        if (previous[key] === null) {
            next[key] = null;
            continue;
        }
        const info = results[key];
        next[key] = info?.hasNextPage ? (info.endCursor ?? null) : null;
    }
    return next;
}

export function compositeHasMore(state: CursorState): boolean {
    return Object.values(state).some((v) => v !== null);
}
