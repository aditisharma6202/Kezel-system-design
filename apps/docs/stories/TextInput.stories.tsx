import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  TextInput,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

function Controlled(props: {
  value?: string;
  placeHolder?: string;
  variant?: TextInputVariant;
  size?: TextInputSize;
  state?: TextInputState;
  label?: string;
  description?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  warningText?: string;
  clearable?: boolean;
  showCount?: boolean;
  maxLength?: number;
  disabled?: boolean;
}) {
  const [value, setValue] = React.useState(props.value ?? "");
  return (
    <TextInput
      {...props}
      value={value}
      onValueChange={setValue}
      placeHolder={props.placeHolder ?? "Placeholder"}
    />
  );
}

const meta: Meta<typeof TextInput> = {
  title: "Design System/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.values(TextInputVariant),
    },
    size: {
      control: "select",
      options: Object.values(TextInputSize),
    },
    state: {
      control: "select",
      options: Object.values(TextInputState),
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  render: (args) => {
    const { placeHolder, variant, size, ...rest } = args;
    return (
      <div style={{ width: 320 }}>
        <Controlled
          {...rest}
          variant={variant ?? TextInputVariant.Default}
          size={size ?? TextInputSize.Md}
          placeHolder={placeHolder ?? "Placeholder"}
        />
      </div>
    );
  },
};

export const Container: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        variant={TextInputVariant.Container}
        size={TextInputSize.Md}
        placeHolder="Transparent background"
      />
    </div>
  ),
};

export const Ghost: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        variant={TextInputVariant.Ghost}
        size={TextInputSize.Md}
        placeHolder="Border bottom only"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}>
      <Controlled placeHolder="Small" variant={TextInputVariant.Default} size={TextInputSize.Sm} />
      <Controlled placeHolder="Medium" variant={TextInputVariant.Default} size={TextInputSize.Md} />
      <Controlled placeHolder="Large" variant={TextInputVariant.Default} size={TextInputSize.Lg} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Controlled
        label="Error"
        value="invalid@"
        placeHolder="Email"
        state={TextInputState.Error}
        errorText="Please enter a valid email address."
        variant={TextInputVariant.Default}
      />
      <Controlled
        label="Success"
        value="valid@email.com"
        placeHolder="Email"
        state={TextInputState.Success}
        successText="Looks good!"
        variant={TextInputVariant.Default}
      />
      <Controlled
        label="Warning"
        placeHolder="Optional field"
        state={TextInputState.Warning}
        warningText="This field is recommended."
        variant={TextInputVariant.Default}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Disabled"
        value="Disabled value"
        placeHolder="Placeholder"
        variant={TextInputVariant.Default}
        disabled
      />
    </div>
  ),
};

export const WithLabelAndDescription: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Email"
        description="We'll never share this with anyone."
        placeHolder="you@example.com"
        variant={TextInputVariant.Default}
      />
    </div>
  ),
};

export const Clearable: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Clearable"
        value="Clear me"
        placeHolder="Type then clear"
        variant={TextInputVariant.Default}
        clearable
      />
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="With character count"
        placeHolder="Max 50 characters"
        variant={TextInputVariant.Default}
        showCount
        maxLength={50}
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
      <Controlled
        label="Default"
        placeHolder="Placeholder"
        variant={TextInputVariant.Default}
      />
      <Controlled
        label="Container"
        placeHolder="Transparent background"
        variant={TextInputVariant.Container}
      />
      <Controlled
        label="Ghost"
        placeHolder="Border bottom only"
        variant={TextInputVariant.Ghost}
      />
    </div>
  ),
};
