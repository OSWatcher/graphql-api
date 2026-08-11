/**
 * Response filtering for sensitive Windows registry values
 */

import {
    isSensitiveValueName,
    REDACTED_VALUE,
} from "./registry-filter-config.js";

/**
 * Filter registry values from GraphQL response data
 * Modifies the response object in-place
 *
 * Behavior:
 * - Sensitive values (DigitalProductId, etc.) are always redacted as "[REDACTED]"
 * - All other values are returned as-is
 *
 * @param responseData GraphQL response data object
 */
export function filterSensitiveRegistryValues(responseData: any): void {
    redactSensitiveValues(responseData);
}

/**
 * Recursively traverse response object and redact sensitive registry values
 *
 * Handles two main patterns:
 * 1. Connection-style: edges[].node.value with edges[].properties.name
 * 2. Diff-style: items[] with type="WinRegValue" and path containing value name
 *
 * @param obj Object to traverse and redact
 */
function redactSensitiveValues(obj: any): void {
    if (!obj || typeof obj !== "object") {
        return;
    }

    if (Array.isArray(obj)) {
        obj.forEach((item) => redactSensitiveValues(item));
        return;
    }

    // Pattern 1: Connection edge with properties.name
    // Example: child_valuesConnection.edges[].node.value
    if (obj.node && obj.properties?.name && obj.node.value !== undefined) {
        if (isSensitiveValueName(obj.properties.name)) {
            obj.node.value = REDACTED_VALUE;
        }
    }

    // Pattern 2: Diff item with type="WinRegValue" and path
    // Example: diffNodesAt.items[] where type="WinRegValue"
    if (obj.type === "WinRegValue" && obj.path) {
        const pathParts = obj.path.split("/").filter(Boolean);
        const valueName = pathParts[pathParts.length - 1];
        const isSensitive = isSensitiveValueName(valueName);

        if (isSensitive) {
            if (obj.old_props?.properties?.value !== undefined) {
                obj.old_props.properties.value = REDACTED_VALUE;
            }
            if (obj.new_props?.properties?.value !== undefined) {
                obj.new_props.properties.value = REDACTED_VALUE;
            }
        }
    }

    // Recurse into nested objects
    Object.values(obj).forEach((value) => redactSensitiveValues(value));
}
