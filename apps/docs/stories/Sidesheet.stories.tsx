import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sidesheet } from "kz-design-system";

const meta: Meta<typeof Sidesheet> = {
  title: "Design System/Sidesheet",
  component: Sidesheet,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Side panel for navigation. Width and styles are tokenized (component.sidesheet.*). Override via KezelThemeProvider tokens. Use SideMenu for full sidebar navigation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          minHeight: 320,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Story />
        <div
          style={{
            flex: 1,
            background: "var(--kz-color-surface-base)",
            padding: 16,
            color: "var(--kz-color-text-muted)",
          }}
        >
          Main content area
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Sidesheet>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: 12, color: "var(--kz-color-text-primary)" }}>
        Sidesheet content
      </div>
    ),
  },
};
