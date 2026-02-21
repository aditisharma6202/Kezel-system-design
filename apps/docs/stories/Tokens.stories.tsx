import type { Meta, StoryObj } from "@storybook/react";
import {
  TOKEN_KEYS,
  tokenToCssVar,
  KezelThemeProvider,
  KezelVariant,
  KezelMode,
  Button,
  ButtonVariant,
  ButtonSize,
} from "kz-design-system";
import React from "react";

const meta: Meta = {
  title: "Design System/Tokens",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "All theme tokens that can be passed to `KezelThemeProvider` via the `tokens` prop. Values must be valid CSS for the corresponding type (e.g. colors as hex/rgb/hsl, shadows as box-shadow values).",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

function groupKeys(keys: readonly string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  for (const key of keys) {
    const parts = key.split(".");
    let group: string;
    if (parts[0] === "color" && parts[1])
      group = `color.${parts[1]}`;
    else if (parts[0] === "component" && parts[1])
      group = `component.${parts[1]}`;
    else
      group = parts[0];
    if (!groups[group]) groups[group] = [];
    groups[group].push(key);
  }
  return groups;
}

const tokenGroups = groupKeys(TOKEN_KEYS);
const groupOrder = [
  "color.brand",
  "color.surface",
  "color.text",
  "color.border",
  "color.status",
  "shadow",
  "effect",
  "radius",
  "space",
  "font",
  "line",
  "motion",
  "component.sidebar",
  "component.header",
  "component.button",
  "component.input",
  "component.card",
  "component.canvas",
  "component.filter",
];

function TokenTable() {
  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h2 style={{ marginTop: 0 }}>Token reference</h2>
      <p style={{ color: "#52606d", marginBottom: 24 }}>
        Pass any of these keys to the <code>tokens</code> prop of{" "}
        <code>KezelThemeProvider</code>. Each key maps to a CSS variable applied on the theme root.
      </p>
      {groupOrder.map((group) => {
        const keys = tokenGroups[group];
        if (!keys || keys.length === 0) return null;
        const groupLabel = group.startsWith("component.")
          ? `Component — ${group.replace("component.", "").replace(".", " / ")}`
          : group.startsWith("color.")
            ? group.replace("color.", "Color — ").replace(".", " / ")
            : group.charAt(0).toUpperCase() + group.slice(1);
        return (
          <div key={group} style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {groupLabel}
            </h3>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #e4e7eb", textAlign: "left" }}>
                  <th style={{ padding: "8px 12px", fontWeight: 600 }}>Token key</th>
                  <th style={{ padding: "8px 12px", fontWeight: 600 }}>CSS variable</th>
                </tr>
              </thead>
              <tbody>
                {keys.map((key) => (
                  <tr key={key} style={{ borderBottom: "1px solid #f0f2f5" }}>
                    <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 12 }}>
                      {key}
                    </td>
                    <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 12, color: "#52606d" }}>
                      {tokenToCssVar[key as keyof typeof tokenToCssVar]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export const Reference: StoryObj = {
  render: () => <TokenTable />,
};

export const ExampleOverride: StoryObj = {
  render: () => (
    <KezelThemeProvider
      variant={KezelVariant.Standard}
      mode={KezelMode.Light}
      tokens={{
        "color.brand.primary": "#0066cc",
        "color.brand.accent": "#00a89d",
        "color.brand.accent.hover": "#00968d",
        "color.brand.accent.active": "#007a73",
      }}
    >
      <div style={{ padding: 24, background: "var(--kz-color-surface-background)", minHeight: 120 }}>
        <p style={{ marginBottom: 16, color: "var(--kz-color-text-primary)" }}>
          Buttons below use overridden brand tokens:
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button variant={ButtonVariant.Primary} size={ButtonSize.Md} onClick={() => {}}>
            Primary
          </Button>
          <Button variant={ButtonVariant.Accent} size={ButtonSize.Md} onClick={() => {}}>
            Accent
          </Button>
        </div>
      </div>
    </KezelThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example: override brand and accent tokens via the `tokens` prop.",
      },
    },
  },
};
