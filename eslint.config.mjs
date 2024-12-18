import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    "extends":[
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",

    ],
    ignores: ["node_modules", "dist"],
    rules: {
      "no-unused-vars": "error",
      "no-unsed-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",

    },
    "globals": {
      "process": "readonly",
    },
  },
];