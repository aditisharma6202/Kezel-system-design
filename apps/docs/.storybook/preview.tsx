import React from "react";
import type { Preview } from "@storybook/react";
import { KezelThemeProvider, KezelVariant, KezelMode } from "kz-design-system";
import "kz-design-system/styles.css";

function getThemeFromUrl(): { variant: "standard" | "neumorphic"; mode: "light" | "dark" } | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const theme = params.get("theme")?.replace(/^"|"$/g, "").toLowerCase();
  const mode = params.get("mode")?.replace(/^"|"$/g, "").toLowerCase();
  if (!theme && !mode) return null;
  return {
    variant: theme === "neumorphic" ? "neumorphic" : "standard",
    mode: mode === "dark" ? "dark" : "light",
  };
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      description: {
        component:
          "Use the **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark) toolbar controls above to switch themes and see component styles.",
      },
    },
  },
  initialGlobals: {
    variant: "standard",
    mode: "light",
  },
  globalTypes: {
    variant: {
      name: "Variant",
      description: "Theme variant",
      defaultValue: "standard",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "standard", title: "Standard" },
          { value: "neumorphic", title: "Neumorphic" },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      name: "Mode",
      description: "Light or dark",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const fromUrl = getThemeFromUrl();
      const variant =
        (fromUrl ? fromUrl.variant === "neumorphic" : context.globals?.variant === "neumorphic")
          ? KezelVariant.Neumorphic
          : KezelVariant.Standard;
      const mode =
        (fromUrl ? fromUrl.mode === "dark" : context.globals?.mode === "dark")
          ? KezelMode.Dark
          : KezelMode.Light;
      return (
        <KezelThemeProvider variant={variant} mode={mode}>
          <div
            style={{
              padding: 24,
              background: "var(--kz-color-surface-background)",
              minHeight: "20vh",
            }}
          >
            <Story />
          </div>
        </KezelThemeProvider>
      );
    },
  ],
};

export default preview;
