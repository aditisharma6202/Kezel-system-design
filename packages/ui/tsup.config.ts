import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    button: "src/button/index.ts",
    dialog: "src/dialog/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.conditions = ["import", "module", "browser", "default"];
  },
});
