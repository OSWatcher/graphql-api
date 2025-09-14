const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");

const {
    FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = [
    // Global ignores - must be first
    {
        ignores: ["node_modules/**", "dist/**", "src/ogm-types.ts"],
    },
    
    // Main configuration
    {
        languageOptions: {
            parser: tsParser,
        },

        plugins: {
            "@typescript-eslint": typescriptEslint,
        },

        ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended")[0],

        rules: {
            "@typescript-eslint/no-non-null-assertion": "off",

            "@typescript-eslint/no-unused-vars": ["warn", {
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_",
            }],
        },
    },
    
    // Test files configuration
    {
        files: ["**/*.test.ts", "**/*.spec.ts", "**/tests/**/*.ts"],

        rules: {
            "@typescript-eslint/no-explicit-any": "off",
        },
    }
];
