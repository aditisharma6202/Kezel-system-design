/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  ignorePatterns: ["dist", ".next", "node_modules", "*.cjs", "**/next-env.d.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  settings: { react: { version: "detect" } },
  overrides: [
    {
      files: ["apps/docs/**/*.{ts,tsx}"],
      extends: ["next/core-web-vitals"],
      settings: {
        next: { rootDir: "apps/docs" },
      },
    },
  ],
};
