import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonVariant, ButtonSize, ButtonType } from "kz-design-system";

const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button variants: Primary, Secondary, Outline, Ghost, Success, Warning, Error. Use the **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark) toolbar to see theme-specific styles (e.g. Standard dark outline/secondary backgrounds, Neumorphic shadows).",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    children: "Button",
    onClick: () => {},
    variant: ButtonVariant.Primary,
    size: ButtonSize.Md,
    type: ButtonType.Button,
    loading: false,
    disabled: false,
    asChild: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: Object.values(ButtonVariant),
      description: "Visual variant: Primary, Secondary, Outline, Ghost, Success, Warning, or Error.",
    },
    size: {
      control: "select",
      options: Object.values(ButtonSize),
      description: "Size: Sm, Md, or Lg (height and padding).",
    },
    children: {
      control: "text",
      description: "Button content (text or nodes). When asChild is true, must be a single React element.",
    },
    type: {
      control: "select",
      options: Object.values(ButtonType),
      description: "Native button type: button, submit, or reset. Ignored when asChild is true.",
    },
    onClick: {
      action: "clicked",
      description: "Click handler. Called when the button is clicked (not when disabled or loading).",
    },
    loading: {
      control: "boolean",
      description: "When true, shows a loading spinner, disables the button, and applies loading opacity.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button. Also set to true automatically when loading is true.",
    },
    asChild: {
      control: "boolean",
      description:
        "When true, merges props onto the single child element instead of rendering a <button>. Use for links (e.g. <a>) that should look like a button. Child must be a single React element.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes applied to the button (or child when asChild).",
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

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.Secondary,
    size: ButtonSize.Md,
    children: "Secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: ButtonVariant.Outline,
    size: ButtonSize.Md,
    children: "Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: ButtonVariant.Ghost,
    size: ButtonSize.Md,
    children: "Ghost",
  },
};

export const Success: Story = {
  args: {
    variant: ButtonVariant.Success,
    size: ButtonSize.Md,
    children: "Success",
  },
};

export const Warning: Story = {
  args: {
    variant: ButtonVariant.Warning,
    size: ButtonSize.Md,
    children: "Warning",
  },
};

export const Error: Story = {
  args: {
    variant: ButtonVariant.Error,
    size: ButtonSize.Md,
    children: "Error",
  },
};

export const Disabled: Story = {
  args: {
    variant: ButtonVariant.Primary,
    size: ButtonSize.Md,
    children: "Disabled",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    variant: ButtonVariant.Primary,
    size: ButtonSize.Md,
    children: "Loading",
    loading: true,
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

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
      <Button variant={ButtonVariant.Primary} size={ButtonSize.Md} onClick={() => {}}>
        Primary
      </Button>
      <Button variant={ButtonVariant.Secondary} size={ButtonSize.Md} onClick={() => {}}>
        Secondary
      </Button>
      <Button variant={ButtonVariant.Outline} size={ButtonSize.Md} onClick={() => {}}>
        Outline
      </Button>
      <Button variant={ButtonVariant.Ghost} size={ButtonSize.Md} onClick={() => {}}>
        Ghost
      </Button>
      <Button variant={ButtonVariant.Success} size={ButtonSize.Md} onClick={() => {}}>
        Success
      </Button>
      <Button variant={ButtonVariant.Warning} size={ButtonSize.Md} onClick={() => {}}>
        Warning
      </Button>
      <Button variant={ButtonVariant.Error} size={ButtonSize.Md} onClick={() => {}}>
        Error
      </Button>
      <Button variant={ButtonVariant.Primary} size={ButtonSize.Md} disabled onClick={() => {}}>
        Disabled
      </Button>
      <Button variant={ButtonVariant.Primary} size={ButtonSize.Md} loading onClick={() => {}}>
        Loading
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All button variants in one view. Use the toolbar to switch **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark) to compare outline, secondary, and neumorphic shadow styles.",
      },
    },
  },
};

export const AsChild: Story = {
  args: {
    variant: ButtonVariant.Ghost,
    size: ButtonSize.Md,
    asChild: true,
  },
  render: (args) => (
    <Button {...args} asChild>
      <a href="#as-child">Link as button</a>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: "Render as a link using asChild. The single child receives button styles and props.",
      },
    },
  },
};
