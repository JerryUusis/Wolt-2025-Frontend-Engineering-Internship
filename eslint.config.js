import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import vitestGlobals from "eslint-plugin-vitest-globals"; // https://github.com/saqqdy/eslint-plugin-vitest-globals?tab=readme-ov-file#usage
import vitest from "@vitest/eslint-plugin"; // https://github.com/vitest-dev/eslint-plugin-vitest?tab=readme-ov-file#usage

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      "plugin:vitest-globals/recommended",
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "vitest-globals": vitestGlobals,
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    env: {
      "vitest-globals/env": true,
      browser: true,
      jsdom: true,
      es2020: true,
    },
  }
);
