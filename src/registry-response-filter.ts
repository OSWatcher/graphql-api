/**
 * Response filtering for sensitive Windows registry values
 */

import {
    isSensitiveValueName,
    REDACTED_VALUE,
    HIDDEN_VALUE,
} from "./registry-filter-config.js";

/**
 * Filter registry values from GraphQL response data
 * Modifies the response object in-place
 *
 * Behavior:
 * - Sensitive values (DigitalProductId, etc.) are always redacted as "[REDACTED]"
 * - For unauthenticated users, all other values are hidden as "[HIDDEN]"
 * - Authenticated users see actual non-sensitive values
 *
 * @param responseData GraphQL response data object
 * @param isAuthenticated Whether the user is authenticated (default: false)
 */
export function filterSensitiveRegistryValues(
    responseData: any,
    isAuthenticated: boolean = false,
): void {
    redactSensitiveValues(responseData, isAuthenticated);
}

/**
 * Recursively traverse response object and redact/hide registry values
 *
 * Handles two main patterns:
 * 1. Connection-style: edges[].node.value with edges[].properties.name
 * 2. Diff-style: items[] with type="WinRegValue" and path containing value name
 *
 * @param obj Object to traverse and redact
 * @param isAuthenticated Whether the user is authenticated
 */
function redactSensitiveValues(obj: any, isAuthenticated: boolean): void {
    if (!obj || typeof obj !== "object") {
        return;
    }

    if (Array.isArray(obj)) {
        obj.forEach((item) => redactSensitiveValues(item, isAuthenticated));
        return;
    }

    // Pattern 1: Connection edge with properties.name
    // Example: child_valuesConnection.edges[].node.value
    if (obj.node && obj.properties?.name && obj.node.value !== undefined) {
        if (isSensitiveValueName(obj.properties.name)) {
            // Sensitive values are always redacted for all users
            obj.node.value = REDACTED_VALUE;
        } else if (!isAuthenticated) {
            // Non-sensitive values are hidden for unauthenticated users
            obj.node.value = HIDDEN_VALUE;
        }
    }

    // Pattern 2: Diff item with type="WinRegValue" and path
    // Example: diffNodesAt.items[] where type="WinRegValue"
    if (obj.type === "WinRegValue" && obj.path) {
        const pathParts = obj.path.split("/").filter(Boolean);
        const valueName = pathParts[pathParts.length - 1];
        const isSensitive = isSensitiveValueName(valueName);

        if (obj.old_props?.properties?.value !== undefined) {
            if (isSensitive) {
                obj.old_props.properties.value = REDACTED_VALUE;
            } else if (!isAuthenticated) {
                obj.old_props.properties.value = HIDDEN_VALUE;
            }
        }
        if (obj.new_props?.properties?.value !== undefined) {
            if (isSensitive) {
                obj.new_props.properties.value = REDACTED_VALUE;
            } else if (!isAuthenticated) {
                obj.new_props.properties.value = HIDDEN_VALUE;
            }
        }
    }

    // Recurse into nested objects
    Object.values(obj).forEach((value) =>
        redactSensitiveValues(value, isAuthenticated),
    );
}
