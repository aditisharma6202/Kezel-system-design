import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DateTimePicker,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

function Controlled(
  props: Omit<
    React.ComponentProps<typeof DateTimePicker>,
    "value" | "onChange"
  > & {
    value?: Date;
  }
) {
  const [value, setValue] = React.useState<Date | undefined>(props.value);
  return <DateTimePicker {...props} value={value} onChange={setValue} />;
}

const meta: Meta<typeof DateTimePicker> = {
  title: "Design System/DateTimePicker",
  component: DateTimePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Date and/or time picker with calendar popover and time selectors. Supports date, time, and datetime modes with 12h/24h formats and optional seconds. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["date", "time", "datetime"],
      description: "Picker mode: date, time, or datetime.",
    },
    format: {
      control: "select",
      options: ["12h", "24h"],
      description: "Time format: 12h or 24h.",
    },
    showSeconds: {
      control: "boolean",
      description: "Show seconds selector in time mode.",
    },
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

type Story = StoryObj<typeof DateTimePicker>;

export const DateTime12h: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Date & Time"
        mode="datetime"
        format="12h"
        helperText="Select a date and time"
      />
    </div>
  ),
};

export const DateTime24h: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled label="24-Hour Format" mode="datetime" format="24h" />
    </div>
  ),
};

export const WithSeconds: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="With Seconds"
        mode="datetime"
        format="24h"
        showSeconds
      />
    </div>
  ),
};

export const DateOnly: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Date"
        mode="date"
        description="Pick a date from the calendar"
      />
    </div>
  ),
};

export const TimeOnly: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled label="Time" mode="time" format="12h" />
    </div>
  ),
};

export const Uncontrolled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <DateTimePicker
        label="Uncontrolled"
        defaultValue={new Date()}
        mode="datetime"
        format="12h"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}
    >
      <Controlled label="Small" size={TextInputSize.Sm} mode="date" />
      <Controlled label="Medium" size={TextInputSize.Md} mode="date" />
      <Controlled label="Large" size={TextInputSize.Lg} mode="date" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}
    >
      <Controlled
        label="Default"
        variant={TextInputVariant.Default}
        mode="date"
      />
      <Controlled
        label="Container"
        variant={TextInputVariant.Container}
        mode="date"
      />
      <Controlled label="Ghost" variant={TextInputVariant.Ghost} mode="date" />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <DateTimePicker
        label="Error"
        value={undefined}
        onChange={() => {}}
        state={TextInputState.Error}
        errorText="Please select a valid date."
        mode="date"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <DateTimePicker
        label="Disabled"
        value={new Date()}
        onChange={() => {}}
        disabled
        mode="date"
      />
    </div>
  ),
};
