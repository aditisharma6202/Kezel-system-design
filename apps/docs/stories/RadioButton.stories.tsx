import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  RadioButton,
  RadioSize,
} from "kz-design-system";

const meta: Meta<typeof RadioButton> = {
  title: "Design System/RadioButton",
  component: RadioButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radio button with Standard and Neumorphic themes. Sizes: sm (16px), md (20px), lg (24px). Disabled uses 50% opacity. All tokens overridable via KezelThemeProvider. Use Variant and Mode toolbar for theme styles.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    name: "radio",
    value: "one",
    size: RadioSize.Md,
    children: "Option",
  },
  argTypes: {
    size: {
      control: "select",
      options: Object.values(RadioSize),
      description: "sm (16px), md (20px), lg (24px).",
    },
    name: {
      control: "text",
      description: "Group name for radio set.",
    },
    value: {
      control: "text",
      description: "Value when selected.",
    },
    checked: {
      control: "boolean",
      description: "Controlled checked state.",
    },
    defaultChecked: {
      control: "boolean",
      description: "Uncontrolled initial checked.",
    },
    disabled: {
      control: "boolean",
      description: "Disables with 50% opacity.",
    },
    children: {
      control: "text",
      description: "Label text.",
    },
    className: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Unselected: Story = {
  args: {
    name: "demo",
    value: "one",
    children: "Option one",
  },
};

export const Selected: Story = {
  args: {
    name: "demo",
    value: "one",
    defaultChecked: true,
    children: "Option one",
  },
};

export const Sizes: Story = {
  render: function SizesStory() {
    const [value, setValue] = React.useState("sm");
    return (
      <div className="flex flex-wrap items-center gap-6">
        <RadioButton
          name="sizes"
          value="sm"
          size={RadioSize.Sm}
          checked={value === "sm"}
          onChange={(e) => setValue(e.target.value)}
        >
          Sm (16px)
        </RadioButton>
        <RadioButton
          name="sizes"
          value="md"
          size={RadioSize.Md}
          checked={value === "md"}
          onChange={(e) => setValue(e.target.value)}
        >
          Md (20px)
        </RadioButton>
        <RadioButton
          name="sizes"
          value="lg"
          size={RadioSize.Lg}
          checked={value === "lg"}
          onChange={(e) => setValue(e.target.value)}
        >
          Lg (24px)
        </RadioButton>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    name: "disabled",
    value: "off",
    disabled: true,
    children: "Disabled off",
  },
};

export const DisabledChecked: Story = {
  args: {
    name: "disabled",
    value: "on",
    disabled: true,
    defaultChecked: true,
    children: "Disabled on",
  },
};

export const Group: Story = {
  render: function GroupStory() {
    const [value, setValue] = React.useState("a");
    return (
      <div className="flex flex-col gap-2">
        <RadioButton
          name="group"
          value="a"
          size={RadioSize.Md}
          checked={value === "a"}
          onChange={(e) => setValue(e.target.value)}
        >
          Option A
        </RadioButton>
        <RadioButton
          name="group"
          value="b"
          size={RadioSize.Md}
          checked={value === "b"}
          onChange={(e) => setValue(e.target.value)}
        >
          Option B
        </RadioButton>
        <RadioButton
          name="group"
          value="c"
          size={RadioSize.Md}
          checked={value === "c"}
          onChange={(e) => setValue(e.target.value)}
        >
          Option C
        </RadioButton>
      </div>
    );
  },
};
