import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

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
      include: [path.resolve(__dirname, "../stories"), path.resolve(__dirname, "../.storybook")],
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
    config.resolve.extensions = [...(config.resolve.extensions || []), ".ts", ".tsx"];
    return config;
  },
};

export default config;
