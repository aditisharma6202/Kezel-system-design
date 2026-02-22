import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  TextInput,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

function Controlled(
  props: Omit<React.ComponentProps<typeof TextInput>, "value" | "onValueChange"> & {
    value?: string;
    placeHolder?: string;
  }
) {
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
    docs: {
      description: {
        component:
          "Text input with label, description, validation states, adornments, clearable, and character count. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    value: "",
    placeHolder: "Placeholder",
    variant: TextInputVariant.Default,
    size: TextInputSize.Md,
    state: TextInputState.Default,
    loading: false,
    clearable: false,
    showCount: false,
    showStateIcon: true,
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
      description: "Visual style: Default, Container (transparent bg), or Ghost (border bottom only).",
    },
    label: {
      control: "text",
      description: "Label shown above the input.",
    },
    helperText: {
      control: "text",
      description: "Helper text below the input (generic).",
    },
    description: {
      control: "text",
      description: "Description text below the label.",
    },
    state: {
      control: "select",
      options: Object.values(TextInputState),
      description: "Validation state: Default, Error, Success, or Warning. Shows state message and optional icon.",
    },
    errorText: {
      control: "text",
      description: "Message shown when state is Error.",
    },
    successText: {
      control: "text",
      description: "Message shown when state is Success.",
    },
    warningText: {
      control: "text",
      description: "Message shown when state is Warning.",
    },
    value: {
      control: "text",
      description: "Controlled input value.",
    },
    placeHolder: {
      control: "text",
      description: "Placeholder when value is empty.",
    },
    startAdornment: {
      control: false,
      description: "React node rendered at the start of the input (e.g. icon).",
    },
    endAdornment: {
      control: false,
      description: "React node rendered at the end of the input. Ignored when clearable and value is non-empty.",
    },
    loading: {
      control: "boolean",
      description: "When true, shows a loading indicator and disables the input.",
    },
    clearable: {
      control: "boolean",
      description: "When true, shows a clear button when the input has a value.",
    },
    showCount: {
      control: "boolean",
      description: "When true, shows character count. Requires maxLength.",
    },
    maxLength: {
      control: { type: "number", min: 1, max: 500 },
      description: "Max length; used with showCount and to enforce limit.",
    },
    containerClassName: {
      control: "text",
      description: "CSS class for the outer container (label + input + messages).",
    },
    inputClassName: {
      control: "text",
      description: "CSS class for the native input element.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input.",
    },
    showStateIcon: {
      control: "boolean",
      description: "When true, shows an icon for Error / Success / Warning state.",
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
  parameters: {
    docs: {
      description: {
        story:
          "Default, Container, and Ghost variants. Use the toolbar to switch **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark) to see input styles (e.g. neumorphic dark inset shadow).",
      },
    },
  },
};
