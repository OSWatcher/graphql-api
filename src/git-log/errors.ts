/**
 * Custom error types for git log operations.
 * These provide better debugging context than generic Error objects.
 */

/**
 * Base class for git log errors
 */
export class GitLogError extends Error {
    constructor(
        message: string,
        public readonly cause?: Error,
    ) {
        super(message);
        this.name = "GitLogError";

        // Maintain proper stack trace in V8 environments (Node.js)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

/**
 * Error thrown when entity root resolution fails.
 * This can happen when:
 * - The commit doesn't exist
 * - The entity type is not supported
 * - The path doesn't exist in the commit
 */
export class EntityRootResolutionError extends GitLogError {
    constructor(
        public readonly commitHash: string,
        public readonly entityType: string,
        public readonly path: string,
        cause?: Error,
    ) {
        super(
            `Failed to resolve ${entityType} entity root at path "${path}" for commit ${commitHash}`,
            cause,
        );
        this.name = "EntityRootResolutionError";
    }
}

/**
 * Error thrown when diff processing between commits fails.
 */
export class DiffProcessingError extends GitLogError {
    constructor(
        public readonly baseCommitHash: string,
        public readonly diffeeCommitHash: string,
        public readonly path: string,
        cause?: Error,
    ) {
        super(
            `Failed to process diff between commits ${baseCommitHash} and ${diffeeCommitHash} at path "${path}"`,
            cause,
        );
        this.name = "DiffProcessingError";
    }
}

/**
 * Result type for explicit error handling.
 * Use this instead of try/catch when you want to make error handling explicit
 * and propagate errors without losing type information.
 *
 * @example
 * const result = await getEntityRootSafe(driver, hash, type, path);
 * if (!result.ok) {
 *     // result.error is typed as EntityRootResolutionError
 *     console.log(result.error.commitHash);
 *     return;
 * }
 * // result.value is typed as EntityRootResult
 * const root = result.value;
 */
export type Result<T, E = Error> =
    | { ok: true; value: T }
    | { ok: false; error: E };

/**
 * Create a successful Result
 */
export function ok<T>(value: T): Result<T, never> {
    return { ok: true, value };
}

/**
 * Create a failed Result
 */
export function err<E>(error: E): Result<never, E> {
    return { ok: false, error };
}

/**
 * Check if a Result is successful
 */
export function isOk<T, E>(result: Result<T, E>): result is { ok: true; value: T } {
    return result.ok;
}

/**
 * Check if a Result is an error
 */
export function isErr<T, E>(result: Result<T, E>): result is { ok: false; error: E } {
    return !result.ok;
}

/**
 * Unwrap a Result, throwing the error if it's a failure
 */
export function unwrap<T, E extends Error>(result: Result<T, E>): T {
    if (result.ok) {
        return result.value;
    }
    throw result.error;
}

/**
 * Unwrap a Result, returning a default value if it's a failure
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
    if (result.ok) {
        return result.value;
    }
    return defaultValue;
}
