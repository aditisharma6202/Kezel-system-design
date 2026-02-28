import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Typography,
  TypographyVariantEnum,
  TypographyToneEnum,
} from "kz-design-system";

const meta: Meta = {
  title: "Design System/Introduction",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Kezel Design System — token-driven components for Standard and Neumorphic themes with Light and Dark modes. Use the **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark) toolbar above to switch themes and see component styles update.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

const components = [
  "Button",
  "ToggleButton",
  "Checkbox",
  "RadioButton",
  "TextInput",
  "Dropdown",
  "Icon",
  "Typography",
  "Sidesheet",
  "SideMenu",
  "Tooltip",
  "Tokens",
];

export const Overview: Story = {
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <Typography
        variant={TypographyVariantEnum.H1}
        style={{ marginBottom: 8 }}
      >
        Kezel Design System
      </Typography>
      <Typography
        variant={TypographyVariantEnum.Body}
        tone={TypographyToneEnum.Secondary}
        style={{ marginBottom: 24 }}
      >
        Use the <strong>Variant</strong> (Standard / Neumorphic) and{" "}
        <strong>Mode</strong> (Light / Dark) toolbar at the top to switch
        themes. All components respond to these settings.
      </Typography>
      <Typography
        variant={TypographyVariantEnum.H2}
        style={{ marginBottom: 12 }}
      >
        Components
      </Typography>
      <ul
        style={{
          margin: 0,
          paddingLeft: 20,
          color: "var(--kz-color-text-primary)",
          lineHeight: 1.8,
        }}
      >
        {components.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <Typography
        variant={TypographyVariantEnum.Caption}
        tone={TypographyToneEnum.Secondary}
        style={{ marginTop: 24 }}
      >
        Select a component from the sidebar to see its stories and props. Tokens
        can be overridden via KezelThemeProvider.
      </Typography>
    </div>
  ),
};
