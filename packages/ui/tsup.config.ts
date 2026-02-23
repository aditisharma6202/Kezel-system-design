import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    button: "src/components/button/index.ts",
    dropdown: "src/dropdown/index.ts",
    dialog: "src/dialog/index.ts",
    icon: "src/icon/index.ts",
    theme: "src/theme/index.ts",
    sidemenu: "src/components/sidemenu/index.ts",
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
