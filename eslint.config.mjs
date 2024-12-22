import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [{
  ignores: ["**/node_modules/", "**/lib/"],
}, ...compat.extends("@react-native", "prettier"), {
  plugins: {
    prettier,
  },
  rules: {
    "prettier/prettier": ["error", {
      quoteProps: "consistent",
      singleQuote: true,
      tabWidth: 2,
      trailingComma: "es5",
      useTabs: false,
    }],
  },
}];