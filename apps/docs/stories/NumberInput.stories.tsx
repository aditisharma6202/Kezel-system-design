import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  NumberInput,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

function Controlled(
  props: Omit<
    React.ComponentProps<typeof NumberInput>,
    "value" | "onValueChange"
  > & { value?: number }
) {
  const [value, setValue] = React.useState<number | undefined>(
    props.value ?? 0
  );
  return <NumberInput {...props} value={value} onValueChange={setValue} />;
}

const meta: Meta<typeof NumberInput> = {
  title: "Design System/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Number input with stepper buttons (+/\u2212). Supports min/max clamping, decimal/integer modes, and negative number control. Same tokens as TextInput. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    value: 0,
    variant: TextInputVariant.Default,
    size: TextInputSize.Md,
    state: TextInputState.Default,
    allowDecimal: true,
    allowNegative: true,
  },
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
    label: { control: "text", description: "Label shown above the input." },
    helperText: {
      control: "text",
      description: "Helper text below the input.",
    },
    state: {
      control: "select",
      options: Object.values(TextInputState),
      description: "Validation state: Default, Error, Success, or Warning.",
    },
    errorText: {
      control: "text",
      description: "Message shown when state is Error.",
    },
    min: { control: "number", description: "Minimum allowed value." },
    max: { control: "number", description: "Maximum allowed value." },
    step: {
      control: "number",
      description: "Step increment for stepper buttons.",
    },
    allowDecimal: { control: "boolean", description: "Allow decimal values." },
    allowNegative: {
      control: "boolean",
      description: "Allow negative values.",
    },
    disabled: { control: "boolean", description: "Disables the input." },
  },
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Controlled
        {...args}
        variant={args.variant ?? TextInputVariant.Default}
        size={args.size ?? TextInputSize.Md}
      />
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

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}
    >
      <Controlled size={TextInputSize.Sm} />
      <Controlled size={TextInputSize.Md} />
      <Controlled size={TextInputSize.Lg} />
    </div>
  ),
};

export const Decimal: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Decimal (step 0.5)"
        value={1.5}
        step={0.5}
        allowDecimal
      />
    </div>
  ),
};

export const Clamped: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Clamped (0\u201310)"
        value={5}
        min={0}
        max={10}
        helperText="Value is clamped between 0 and 10."
      />
    </div>
  ),
};

export const IntegerOnly: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Integer only, no negative"
        allowDecimal={false}
        allowNegative={false}
      />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Error"
        state={TextInputState.Error}
        errorText="A value is required."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled label="Disabled" value={42} disabled />
    </div>
  ),
};
