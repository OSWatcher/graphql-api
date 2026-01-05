/**
 * Configuration for filtering sensitive Windows registry values
 */

export const REDACTED_VALUE = "[REDACTED]";
export const HIDDEN_VALUE = "[HIDDEN]";

const DEFAULT_SENSITIVE_VALUE_NAMES = [
    "DigitalProductId",
    "DigitalProductId4",
    "ProductId",
];

/**
 * Get the list of sensitive registry value names from environment or defaults
 */
export function getSensitiveValueNames(): string[] {
    const envNames = process.env.SENSITIVE_REGISTRY_VALUES;

    if (envNames && envNames.trim()) {
        return envNames
            .split(",")
            .map((n) => n.trim())
            .filter(Boolean);
    }

    return DEFAULT_SENSITIVE_VALUE_NAMES;
}

// Precompute normalized set for O(1) lookup performance
const SENSITIVE_NAMES_SET = new Set(
    getSensitiveValueNames().map((name) => name.toLowerCase()),
);

/**
 * Check if a registry value name is in the sensitive blocklist
 * Case-insensitive matching
 *
 * @param name Registry value name to check
 * @returns true if the name is sensitive and should be redacted
 */
export function isSensitiveValueName(name: string): boolean {
    return SENSITIVE_NAMES_SET.has(name.toLowerCase());
}
