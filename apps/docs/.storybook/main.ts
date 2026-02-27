import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const designSystemRoot = path.resolve(__dirname, "../../../packages/ui");

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    config.module = config.module || { rules: [] };
    config.module.rules.unshift({
      test: /\.(ts|tsx)$/,
      include: [
        path.resolve(__dirname, "../stories"),
        path.resolve(__dirname, "../.storybook"),
        path.resolve(designSystemRoot, "src"),
      ],
      use: [
        {
          loader: require.resolve("ts-loader"),
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, "../tsconfig.json"),
            compilerOptions: {
              jsx: "react",
            },
          },
        },
      ],
    });
    config.resolve = config.resolve || {};
    config.resolve.extensions = [
      ...(config.resolve.extensions || []),
      ".ts",
      ".tsx",
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      "kz-design-system/button": path.join(
        designSystemRoot,
        "src/components/button/index.ts"
      ),
      "kz-design-system/dropdown": path.join(
        designSystemRoot,
        "src/components/dropdown/index.ts"
      ),
      "kz-design-system/dialog": path.join(
        designSystemRoot,
        "src/components/dialog/index.ts"
      ),
      "kz-design-system/icon": path.join(designSystemRoot, "src/icon/index.ts"),
      "kz-design-system/theme": path.join(
        designSystemRoot,
        "src/theme/index.ts"
      ),
      "kz-design-system/sidemenu": path.join(
        designSystemRoot,
        "src/components/sidemenu/index.ts"
      ),
      "kz-design-system/styles.css": path.join(
        designSystemRoot,
        "src/styles.css"
      ),
      "kz-design-system": path.join(designSystemRoot, "src/index.ts"),
    };
    return config;
  },
};

export default config;
