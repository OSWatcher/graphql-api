import { jwtVerify, createRemoteJWKSet } from "jose";

/**
 * Extract JWT token from connectionParams
 * Supports multiple connection param formats:
 * - { authorization: "Bearer <token>" }
 * - { Authorization: "Bearer <token>" }
 * - { token: "<token>" }
 * - { authToken: "<token>" }
 */
export function extractTokenFromConnectionParams(
    connectionParams?: Record<string, unknown>,
): string | null {
    if (!connectionParams) return null;

    // Check for Authorization header format (case-insensitive)
    const auth =
        connectionParams.authorization || connectionParams.Authorization;
    if (typeof auth === "string") {
        const [scheme, token] = auth.split(" ");
        if (scheme && scheme.toLowerCase() === "bearer" && token) {
            return token;
        }
        // If no Bearer prefix, treat as token directly
        return auth;
    }

    // Check for token or authToken fields (common patterns)
    const token = connectionParams.token || connectionParams.authToken;
    if (typeof token === "string") {
        return token;
    }

    return null;
}

/**
 * Create a JWT verifier for Auth0 tokens
 * Caches JWKS for performance
 */
export function createAuth0JwtVerifier(jwksUri: string, audience: string) {
    const JWKS = createRemoteJWKSet(new URL(jwksUri));

    return async (token: string): Promise<any | null> => {
        try {
            const { payload } = await jwtVerify(token, JWKS, {
                audience,
            });
            return payload;
        } catch (error) {
            console.error("JWT verification failed:", error);
            return null;
        }
    };
}
