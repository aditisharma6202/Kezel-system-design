import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ToggleButton,
  ToggleButtonVariant,
  ToggleButtonSize,
  Icon,
  IconName,
} from "kz-design-system";

const meta: Meta<typeof ToggleButton> = {
  title: "Design System/ToggleButton",
  component: ToggleButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toggle button with **default**, **primary**, and **container** variants. Supports controlled (`pressed` + `onPressedChange`) or uncontrolled (`defaultPressed`) usage. Use the **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark) toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    children: "Toggle",
    variant: ToggleButtonVariant.Default,
    size: ToggleButtonSize.Md,
    fullWidth: false,
    defaultPressed: false,
    loading: false,
    disabled: false,
    asChild: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: Object.values(ToggleButtonVariant),
      description: "Visual variant: Default (secondary-like), Primary, or Container (outline-like).",
    },
    size: {
      control: "select",
      options: Object.values(ToggleButtonSize),
      description: "Size: Sm, Md, or Lg.",
    },
    fullWidth: {
      control: "boolean",
      description: "When true, button stretches to full width of container.",
    },
    pressed: {
      control: "boolean",
      description: "Controlled pressed state. Omit to use uncontrolled (defaultPressed).",
    },
    defaultPressed: {
      control: "boolean",
      description: "Initial pressed state when uncontrolled.",
    },
    onPressedChange: {
      action: "pressedChange",
      description: "Called when pressed state changes (after click).",
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner and disables interaction.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button.",
    },
    asChild: {
      control: "boolean",
      description: "When true, merges props onto the single child (e.g. <a>).",
    },
    children: {
      control: "text",
      description: "Button content (text or nodes).",
    },
    className: {
      control: "text",
      description: "Additional CSS classes.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {
  args: {
    variant: ToggleButtonVariant.Default,
    children: "Default",
  },
};

export const Primary: Story = {
  args: {
    variant: ToggleButtonVariant.Primary,
    children: "Primary",
  },
};

export const Container: Story = {
  args: {
    variant: ToggleButtonVariant.Container,
    children: "Container",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <ToggleButton
        {...args}
        size={ToggleButtonSize.Sm}
        onPressedChange={() => {}}
      >
        Sm
      </ToggleButton>
      <ToggleButton
        {...args}
        size={ToggleButtonSize.Md}
        onPressedChange={() => {}}
      >
        Md
      </ToggleButton>
      <ToggleButton
        {...args}
        size={ToggleButtonSize.Lg}
        onPressedChange={() => {}}
      >
        Lg
      </ToggleButton>
    </div>
  ),
  args: {
    variant: ToggleButtonVariant.Default,
  },
};

export const WithIcon: Story = {
  args: {
    variant: ToggleButtonVariant.Primary,
    size: ToggleButtonSize.Md,
    children: (
      <>
        <Icon name={IconName.CheckCircle} size="sm" color="currentColor" />
        With icon
      </>
    ),
  },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [pressed, setPressed] = React.useState(false);
    return (
      <ToggleButton
        {...args}
        pressed={pressed}
        onPressedChange={setPressed}
      >
        {pressed ? "On" : "Off"}
      </ToggleButton>
    );
  },
  args: {
    variant: ToggleButtonVariant.Default,
  },
};

export const Loading: Story = {
  args: {
    variant: ToggleButtonVariant.Primary,
    loading: true,
    children: "Loading",
  },
};

export const Disabled: Story = {
  args: {
    variant: ToggleButtonVariant.Default,
    disabled: true,
    defaultPressed: false,
    children: "Disabled",
  },
};

export const DisabledOn: Story = {
  args: {
    variant: ToggleButtonVariant.Default,
    disabled: true,
    defaultPressed: true,
    children: "Disabled on",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled while in the on (pressed) state. Uses 50% opacity.",
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    variant: ToggleButtonVariant.Container,
    fullWidth: true,
    children: "Full width",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};
