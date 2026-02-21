import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonVariant, ButtonSize } from "kz-design-system";

const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: () => {},
  },
  argTypes: {
    variant: {
      control: "select",
      options: Object.values(ButtonVariant),
    },
    size: {
      control: "select",
      options: Object.values(ButtonSize),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: ButtonVariant.Primary,
    size: ButtonSize.Md,
    children: "Primary",
  },
};

export const Accent: Story = {
  args: {
    variant: ButtonVariant.Accent,
    size: ButtonSize.Md,
    children: "Accent",
  },
};

export const Container: Story = {
  args: {
    variant: ButtonVariant.Container,
    size: ButtonSize.Md,
    children: "Container",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <Button variant={ButtonVariant.Primary} size={ButtonSize.Sm} onClick={() => {}}>
        Small
      </Button>
      <Button variant={ButtonVariant.Primary} size={ButtonSize.Md} onClick={() => {}}>
        Medium
      </Button>
      <Button variant={ButtonVariant.Primary} size={ButtonSize.Lg} onClick={() => {}}>
        Large
      </Button>
    </div>
  ),
};
