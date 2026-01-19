import createDebug from "debug";

const ROOT_NAMESPACE = "graphql-api";

/**
 * Creates a namespaced debug logger.
 *
 * Usage:
 *   const debug = createLogger('resolvers:diff');
 *   debug('Computing diff at path %s', path);
 *
 * Enable via DEBUG env var:
 *   DEBUG=graphql-api:* npm run serve          # all logs
 *   DEBUG=graphql-api:resolvers:* npm run serve # resolvers only
 */
export const createLogger = (namespace: string) =>
	createDebug(`${ROOT_NAMESPACE}:${namespace}`);
