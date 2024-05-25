import pluginJs from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import node from "eslint-plugin-node";
import globals from "globals";
import tseslint from "typescript-eslint";
export default [
{
files: ["src/**/*.ts", "src/**/*.tsx"],
ignores: ["**/node_modules/**", "**/dist/**"],
languageOptions: {
globals: globals.node,
ecmaVersion: "latest",
sourceType: "module",
parser: tsParser,
}
},
{
plugins: {
node,
"@typescript-eslint": tsPlugin,
},
rules: {
"no-unused-vars": 'warn',
"semi": ["error", "always"],
"no-console": "warn",
 "no-unused-expressions": "warn",
 "prefer-const": "error",
 "no-undef" : "error",
},
},
pluginJs.configs.recommended,
...tseslint.configs.recommended,
prettierConfig,
];