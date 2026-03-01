import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  IconPicker,
  IconName,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

function Controlled(
  props: Omit<React.ComponentProps<typeof IconPicker>, "value" | "onChange"> & {
    value?: IconName;
  }
) {
  const [value, setValue] = React.useState<IconName | undefined>(props.value);
  return <IconPicker {...props} value={value} onChange={setValue} />;
}

const meta: Meta<typeof IconPicker> = {
  title: "Design System/IconPicker",
  component: IconPicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Searchable icon picker that returns an IconName value. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: Object.values(TextInputSize),
      description: "Height and padding: Sm, Md, or Lg.",
    },
    variant: {
      control: "select",
      options: Object.values(TextInputVariant),
      description: "Visual style: Default, Container, or Ghost.",
    },
    label: { control: "text", description: "Label shown above the picker." },
    helperText: {
      control: "text",
      description: "Helper text below the picker.",
    },
    description: {
      control: "text",
      description: "Description below the label.",
    },
    state: {
      control: "select",
      options: Object.values(TextInputState),
      description: "Validation state.",
    },
    errorText: { control: "text", description: "Error message." },
    disabled: { control: "boolean", description: "Disables the picker." },
  },
};

export default meta;

type Story = StoryObj<typeof IconPicker>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled label="Section Icon" description="Search and pick an icon" />
    </div>
  ),
};

export const Uncontrolled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <IconPicker
        label="Uncontrolled"
        helperText="No controlled value \u2014 internal state only"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}
    >
      <Controlled label="Small" size={TextInputSize.Sm} />
      <Controlled label="Medium" size={TextInputSize.Md} />
      <Controlled label="Large" size={TextInputSize.Lg} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}
    >
      <Controlled label="Default" variant={TextInputVariant.Default} />
      <Controlled label="Container" variant={TextInputVariant.Container} />
      <Controlled label="Ghost" variant={TextInputVariant.Ghost} />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <IconPicker
        label="Error"
        value={undefined}
        onChange={() => {}}
        state={TextInputState.Error}
        errorText="Please select an icon."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled label="Disabled" disabled />
    </div>
  ),
};
