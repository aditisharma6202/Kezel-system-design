import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DateRangePicker,
  TextInputVariant,
  TextInputSize,
  TextInputState,
  type DateRange,
} from "kz-design-system";

function Controlled(
  props: Omit<
    React.ComponentProps<typeof DateRangePicker>,
    "value" | "onChange"
  >
) {
  const [value, setValue] = React.useState<DateRange | undefined>(undefined);
  return <DateRangePicker {...props} value={value} onChange={setValue} />;
}

const meta: Meta<typeof DateRangePicker> = {
  title: "Design System/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Date range picker with a dual-calendar popover for selecting start and end dates. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
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

type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Controlled
        label="Date Range"
        description="Select a start and end date"
      />
    </div>
  ),
};

export const Uncontrolled: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <DateRangePicker
        label="Uncontrolled Range"
        helperText="No controlled value \u2014 internal state only"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 360 }}
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
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 360 }}
    >
      <Controlled label="Default" variant={TextInputVariant.Default} />
      <Controlled label="Container" variant={TextInputVariant.Container} />
      <Controlled label="Ghost" variant={TextInputVariant.Ghost} />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <DateRangePicker
        label="Error"
        value={undefined}
        onChange={() => {}}
        state={TextInputState.Error}
        errorText="Please select a valid date range."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Controlled label="Disabled" disabled />
    </div>
  ),
};
