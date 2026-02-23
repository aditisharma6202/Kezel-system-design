import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Typography,
  TypographyVariantEnum,
  TypographyToneEnum,
  TypographyAlignEnum,
  TypographyWeightEnum,
  KezelThemeProvider,
  KezelVariant,
  KezelMode,
} from "kz-design-system";

const meta: Meta<typeof Typography> = {
  title: "Design System/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Typography variants use design tokens. Status colors (error, success, warning) can be overridden via `KezelThemeProvider` tokens — see **Typography token overrides** story and table below.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.values(TypographyVariantEnum),
    },
    tone: {
      control: "select",
      options: Object.values(TypographyToneEnum),
    },
    align: {
      control: "select",
      options: Object.values(TypographyAlignEnum),
    },
    truncate: { control: "boolean" },
    weight: {
      control: "select",
      options: Object.values(TypographyWeightEnum),
    },
  },
  args: {
    variant: TypographyVariantEnum.Body,
    children: "The quick brown fox jumps over the lazy dog.",
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Body: Story = {
  args: {
    variant: TypographyVariantEnum.Body,
    children: "Body text (16px, primary color).",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        maxWidth: 560,
      }}
    >
      <Typography variant={TypographyVariantEnum.H1}>
        Heading 1 — 24px
      </Typography>
      <Typography variant={TypographyVariantEnum.H2}>
        Heading 2 — 24px
      </Typography>
      <Typography variant={TypographyVariantEnum.H3}>
        Heading 3 — 24px
      </Typography>
      <Typography variant={TypographyVariantEnum.Body}>
        Body — 16px, primary color, 24px line-height.
      </Typography>
      <Typography variant={TypographyVariantEnum.Small}>
        Small — 14px, primary color.
      </Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Caption — 14px, secondary color.
      </Typography>
      <Typography variant={TypographyVariantEnum.Label}>
        Label — 16px, primary color.
      </Typography>
      <Typography variant={TypographyVariantEnum.Link} href="#">
        Link — 16px, link color (use href for anchor).
      </Typography>
      <Typography variant={TypographyVariantEnum.Error}>
        Error — 12px, error color (override via token).
      </Typography>
      <Typography variant={TypographyVariantEnum.Success}>
        Success — 12px, success color (override via token).
      </Typography>
      <Typography variant={TypographyVariantEnum.Warning}>
        Warning — 12px, warning color (override via token).
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All typography variants. Use the toolbar above to switch **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark) to see typography colors per theme.",
      },
    },
  },
};

/** Pass these keys to `KezelThemeProvider`'s `tokens` prop to override typography status colors. Values must be valid CSS colors (e.g. hex, rgb, hsl). */
const TYPOGRAPHY_TOKEN_KEYS = [
  {
    key: "typography.error.color",
    cssVar: "--kz-typography-error-color",
    example: "#ef4444",
  },
  {
    key: "typography.success.color",
    cssVar: "--kz-typography-success-color",
    example: "#22c55e",
  },
  {
    key: "typography.warning.color",
    cssVar: "--kz-typography-warning-color",
    example: "#f59e0b",
  },
] as const;

export const TypographyTokenOverrides: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        padding: 24,
        maxWidth: 720,
      }}
    >
      <div>
        <h3 style={{ marginTop: 0, marginBottom: 8 }}>
          Tokens to override typography colors
        </h3>
        <p style={{ color: "#52606d", fontSize: 14, marginBottom: 16 }}>
          Pass these keys in the <code>tokens</code> prop of{" "}
          <code>KezelThemeProvider</code> to override error, success, and
          warning typography colors. Values must be valid CSS colors (hex, rgb,
          hsl, etc.).
        </p>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
          }}
        >
          <thead>
            <tr
              style={{ borderBottom: "1px solid #e4e7eb", textAlign: "left" }}
            >
              <th style={{ padding: "8px 12px", fontWeight: 600 }}>
                Token key (for <code>tokens</code>)
              </th>
              <th style={{ padding: "8px 12px", fontWeight: 600 }}>
                CSS variable
              </th>
              <th style={{ padding: "8px 12px", fontWeight: 600 }}>
                Example value
              </th>
            </tr>
          </thead>
          <tbody>
            {TYPOGRAPHY_TOKEN_KEYS.map(({ key, cssVar, example }) => (
              <tr key={key} style={{ borderBottom: "1px solid #f0f2f5" }}>
                <td
                  style={{
                    padding: "8px 12px",
                    fontFamily: "monospace",
                    fontSize: 12,
                  }}
                >
                  {key}
                </td>
                <td
                  style={{
                    padding: "8px 12px",
                    fontFamily: "monospace",
                    fontSize: 12,
                    color: "#52606d",
                  }}
                >
                  {cssVar}
                </td>
                <td
                  style={{
                    padding: "8px 12px",
                    fontFamily: "monospace",
                    fontSize: 12,
                  }}
                >
                  {example}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 style={{ marginBottom: 12 }}>
          Example: custom typography colors via tokens
        </h3>
        <KezelThemeProvider
          variant={KezelVariant.Standard}
          mode={KezelMode.Light}
          tokens={{
            "typography.error.color": "#dc2626",
            "typography.success.color": "#16a34a",
            "typography.warning.color": "#d97706",
          }}
        >
          <div
            style={{
              padding: 16,
              background: "var(--kz-color-surface-background)",
              borderRadius: 8,
              border: "1px solid var(--kz-color-border-default)",
            }}
          >
            <Typography variant={TypographyVariantEnum.Error}>
              Error message (custom red)
            </Typography>
            <Typography
              variant={TypographyVariantEnum.Success}
              style={{ marginTop: 8 }}
            >
              Success message (custom green)
            </Typography>
            <Typography
              variant={TypographyVariantEnum.Warning}
              style={{ marginTop: 8 }}
            >
              Warning message (custom amber)
            </Typography>
          </div>
        </KezelThemeProvider>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**What to send in `tokens` for typography overrides:** Use the token keys in the table above. Example: `tokens={{ "typography.error.color": "#dc2626", "typography.success.color": "#16a34a", "typography.warning.color": "#d97706" }}`. Only typography status colors (error, success, warning) are overridable via tokens; other typography (family, weight, sizes) come from theme CSS.',
      },
    },
  },
};

export const WithTone: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Typography
        variant={TypographyVariantEnum.Body}
        tone={TypographyToneEnum.Primary}
      >
        Primary tone
      </Typography>
      <Typography
        variant={TypographyVariantEnum.Body}
        tone={TypographyToneEnum.Secondary}
      >
        Secondary tone
      </Typography>
      <Typography
        variant={TypographyVariantEnum.Body}
        tone={TypographyToneEnum.Muted}
      >
        Muted tone
      </Typography>
      <Typography
        variant={TypographyVariantEnum.Body}
        tone={TypographyToneEnum.Link}
        as="a"
        href="#"
      >
        Link tone (as anchor)
      </Typography>
    </div>
  ),
};

export const WithHref: Story = {
  args: {
    variant: TypographyVariantEnum.Link,
    href: "https://example.com",
    children: "Link with href (renders as <a>)",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `href` to render as an anchor. When `href` is set, the component renders as <a> regardless of `as`.",
      },
    },
  },
};

export const Alignment: Story = {
  render: () => (
    <div style={{ width: 320, border: "1px dashed #e4e7eb", padding: 8 }}>
      <Typography
        variant={TypographyVariantEnum.Body}
        align={TypographyAlignEnum.Left}
      >
        Align left
      </Typography>
      <Typography
        variant={TypographyVariantEnum.Body}
        align={TypographyAlignEnum.Center}
      >
        Align center
      </Typography>
      <Typography
        variant={TypographyVariantEnum.Body}
        align={TypographyAlignEnum.Right}
      >
        Align right
      </Typography>
    </div>
  ),
};
