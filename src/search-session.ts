import { Driver } from "neo4j-driver";
import { randomUUID } from "crypto";
import { search } from "./search.js";
import { CommitRange, EntityType } from "./ogm-types.js";

// Re-export for resolver use
type OmniSearchInput = {
    commit_range: CommitRange;
    search_term: string;
    entity_types?: EntityType[];
    case_sensitive?: boolean;
};

type OmniSearchResult = {
    type: EntityType;
    commit_name: string;
    commit_hash: string;
    blob_path: string;
    blob_hash: string;
    entity_path: string | null;
    node_hash: string;
};

export type PaginatedSearchResult = {
    session_id: string | null;
    results: OmniSearchResult[];
    has_more: boolean;
    total_fetched: number;
};

interface SearchSession {
    id: string;
    generator: AsyncGenerator<OmniSearchResult>;
    createdAt: number;
    lastAccessedAt: number;
    totalFetched: number;
    pageSize: number;
    authenticated: boolean;
    buffer: OmniSearchResult | null;
    busy: boolean;
}

const sessions = new Map<string, SearchSession>();

const DEFAULT_MAX_SESSIONS = 100;
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes
const CLEANUP_INTERVAL_MS = 60 * 1000; // 60 seconds

let maxSessions = DEFAULT_MAX_SESSIONS;
let ttlMs = DEFAULT_TTL_MS;

export function configureSessionManager(opts: {
    maxSessions?: number;
    ttlMs?: number;
}) {
    if (opts.maxSessions !== undefined) maxSessions = opts.maxSessions;
    if (opts.ttlMs !== undefined) ttlMs = opts.ttlMs;
}

/**
 * Pull up to `count` results from a generator, using the session buffer first.
 * Also peeks one ahead to determine has_more accurately.
 */
async function pullResults(
    session: SearchSession,
    count: number,
): Promise<{ results: OmniSearchResult[]; has_more: boolean }> {
    const results: OmniSearchResult[] = [];

    // Consume buffered peek-ahead result first
    if (session.buffer !== null) {
        results.push(session.buffer);
        session.buffer = null;
    }

    // Pull remaining results from generator
    while (results.length < count) {
        const { value, done } = await session.generator.next();
        if (done) {
            return { results, has_more: false };
        }
        results.push(value);
    }

    // Peek one ahead for exact has_more
    const { value: peekValue, done: peekDone } = await session.generator.next();
    if (peekDone) {
        return { results, has_more: false };
    }
    session.buffer = peekValue;
    return { results, has_more: true };
}

export async function createSession(
    driver: Driver,
    input: OmniSearchInput,
    pageSize: number,
    authenticated: boolean,
): Promise<PaginatedSearchResult> {
    if (sessions.size >= maxSessions) {
        throw new Error(
            `Maximum concurrent search sessions (${maxSessions}) reached. Close existing sessions or wait for them to expire.`,
        );
    }

    const id = randomUUID();
    const generator = search(driver, input);
    const now = Date.now();

    const session: SearchSession = {
        id,
        generator,
        createdAt: now,
        lastAccessedAt: now,
        totalFetched: 0,
        pageSize,
        authenticated,
        buffer: null,
        busy: false,
    };

    sessions.set(id, session);

    try {
        const { results, has_more } = await pullResults(session, pageSize);
        session.totalFetched = results.length;
        session.lastAccessedAt = Date.now();

        // If no more results, clean up immediately
        if (!has_more) {
            await destroySession(session);
        }

        return {
            session_id: has_more ? id : null,
            results,
            has_more,
            total_fetched: session.totalFetched,
        };
    } catch (err) {
        // Clean up on error
        await destroySession(session);
        throw err;
    }
}

export async function fetchNextPage(
    sessionId: string,
): Promise<PaginatedSearchResult> {
    const session = sessions.get(sessionId);
    if (!session) {
        throw new Error(
            "Search session not found or expired. Start a new search.",
        );
    }

    if (session.busy) {
        throw new Error(
            "Search session is busy processing another request. Please wait.",
        );
    }

    session.busy = true;
    try {
        const { results, has_more } = await pullResults(
            session,
            session.pageSize,
        );
        session.totalFetched += results.length;
        session.lastAccessedAt = Date.now();

        // If no more results, clean up immediately
        if (!has_more) {
            await destroySession(session);
        }

        return {
            session_id: has_more ? sessionId : null,
            results,
            has_more,
            total_fetched: session.totalFetched,
        };
    } catch (err) {
        await destroySession(session);
        throw err;
    } finally {
        session.busy = false;
    }
}

export async function closeSession(sessionId: string): Promise<boolean> {
    const session = sessions.get(sessionId);
    if (!session) {
        return false;
    }
    await destroySession(session);
    return true;
}

async function destroySession(session: SearchSession): Promise<void> {
    sessions.delete(session.id);
    try {
        await session.generator.return(undefined);
    } catch {
        // Ignore errors during cleanup
    }
}

async function expireStale(): Promise<void> {
    const now = Date.now();
    const expired: SearchSession[] = [];

    for (const session of sessions.values()) {
        if (now - session.lastAccessedAt > ttlMs) {
            expired.push(session);
        }
    }

    for (const session of expired) {
        console.log(
            `Search session ${session.id} expired (idle ${Math.round((now - session.lastAccessedAt) / 1000)}s)`,
        );
        await destroySession(session);
    }
}

export function startCleanupInterval(): NodeJS.Timeout {
    return setInterval(() => {
        expireStale().catch((err) => {
            console.error("Error during search session cleanup:", err);
        });
    }, CLEANUP_INTERVAL_MS);
}

export async function closeAllSessions(): Promise<void> {
    const allSessions = Array.from(sessions.values());
    for (const session of allSessions) {
        await destroySession(session);
    }
}
