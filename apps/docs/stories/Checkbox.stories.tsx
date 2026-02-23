import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Checkbox,
  CheckboxSize,
  CheckboxVariant,
} from "kz-design-system";

const meta: Meta<typeof Checkbox> = {
  title: "Design System/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Checkbox with **default** and **container** variants. Sizes: sm (16px), md (20px), lg (24px). Use **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark) toolbar for theme styles. Supports checked, unchecked, and indeterminate. Disabled uses 50% opacity. All tokens overridable via KezelThemeProvider.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    children: "Label",
    size: CheckboxSize.Md,
    variant: CheckboxVariant.Default,
    defaultChecked: false,
    indeterminate: false,
    disabled: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: Object.values(CheckboxSize),
      description: "Box size: sm (16px), md (20px), lg (24px).",
    },
    variant: {
      control: "select",
      options: Object.values(CheckboxVariant),
      description: "Default or Container variant.",
    },
    checked: {
      control: "boolean",
      description: "Controlled checked state.",
    },
    defaultChecked: {
      control: "boolean",
      description: "Uncontrolled initial checked.",
    },
    indeterminate: {
      control: "boolean",
      description: "Show indeterminate (minus) icon.",
    },
    onCheckedChange: {
      action: "checkedChange",
      description: "Called when checked state changes.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox (50% opacity).",
    },
    children: {
      control: "text",
      description: "Label text.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    children: "Unchecked",
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    children: "Checked",
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    defaultChecked: true,
    children: "Indeterminate",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <Checkbox {...args} size={CheckboxSize.Sm} onCheckedChange={() => {}}>
        Sm (16px)
      </Checkbox>
      <Checkbox {...args} size={CheckboxSize.Md} onCheckedChange={() => {}}>
        Md (20px)
      </Checkbox>
      <Checkbox {...args} size={CheckboxSize.Lg} onCheckedChange={() => {}}>
        Lg (24px)
      </Checkbox>
    </div>
  ),
};

export const Container: Story = {
  args: {
    variant: CheckboxVariant.Container,
    children: "Container variant",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled off",
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    children: "Disabled on",
  },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [checked, setChecked] = React.useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={setChecked}
      >
        {checked ? "Checked" : "Unchecked"}
      </Checkbox>
    );
  },
};
