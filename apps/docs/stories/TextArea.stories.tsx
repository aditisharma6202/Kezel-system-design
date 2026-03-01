import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  TextArea,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

function Controlled(
  props: Omit<
    React.ComponentProps<typeof TextArea>,
    "value" | "onValueChange"
  > & {
    value?: string;
    placeHolder?: string;
  }
) {
  const [value, setValue] = React.useState(props.value ?? "");
  return (
    <TextArea
      {...props}
      value={value}
      onValueChange={setValue}
      placeHolder={props.placeHolder ?? "Placeholder"}
    />
  );
}

const meta: Meta<typeof TextArea> = {
  title: "Design System/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-line text area with label, description, validation states, clearable, and character count. Auto-resize grows vertically with content. Uses the same tokens as TextInput. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
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
    clearable: false,
    showCount: false,
    autoResize: true,
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
      description:
        "Visual style: Default, Container (transparent bg), or Ghost (no border).",
    },
    label: { control: "text", description: "Label shown above the textarea." },
    helperText: {
      control: "text",
      description: "Helper text below the textarea.",
    },
    description: {
      control: "text",
      description: "Description text below the label.",
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
    successText: {
      control: "text",
      description: "Message shown when state is Success.",
    },
    warningText: {
      control: "text",
      description: "Message shown when state is Warning.",
    },
    value: { control: "text", description: "Controlled textarea value." },
    placeHolder: {
      control: "text",
      description: "Placeholder when value is empty.",
    },
    clearable: {
      control: "boolean",
      description:
        "When true, shows a clear button when the textarea has a value.",
    },
    showCount: {
      control: "boolean",
      description: "When true, shows character count. Requires maxLength.",
    },
    maxLength: {
      control: { type: "number", min: 1, max: 1000 },
      description: "Max length; used with showCount and to enforce limit.",
    },
    autoResize: {
      control: "boolean",
      description: "When true, textarea grows vertically with content.",
    },
    rows: {
      control: { type: "number", min: 1, max: 20 },
      description: "Initial number of visible rows.",
    },
    disabled: { control: "boolean", description: "Disables the textarea." },
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

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
        placeHolder="No border"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}
    >
      <Controlled placeHolder="Small" size={TextInputSize.Sm} rows={2} />
      <Controlled placeHolder="Medium" size={TextInputSize.Md} />
      <Controlled placeHolder="Large" size={TextInputSize.Lg} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}
    >
      <Controlled
        label="Error"
        placeHolder="Error example"
        value="Invalid input"
        state={TextInputState.Error}
        errorText="This field is required."
      />
      <Controlled
        label="Success"
        placeHolder="Success example"
        value="Looks good!"
        state={TextInputState.Success}
        successText="Looks good!"
      />
      <Controlled
        label="Warning"
        placeHolder="Optional notes"
        state={TextInputState.Warning}
        warningText="Consider adding more detail."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Disabled"
        placeHolder="Disabled"
        value="Cannot edit this"
        disabled
      />
    </div>
  ),
};

export const Clearable: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Clearable"
        placeHolder="Clearable"
        value="Clear me"
        clearable
      />
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Character count"
        placeHolder="Max 200 characters"
        showCount
        maxLength={200}
      />
    </div>
  ),
};

export const ManualResize: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Controlled
        label="Manual resize"
        placeHolder="Drag to resize"
        autoResize={false}
        rows={4}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "With autoResize disabled, the textarea shows a resize handle.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}
    >
      <Controlled
        label="Default"
        placeHolder="Default variant"
        variant={TextInputVariant.Default}
      />
      <Controlled
        label="Container"
        placeHolder="Transparent background"
        variant={TextInputVariant.Container}
      />
      <Controlled
        label="Ghost"
        placeHolder="No border"
        variant={TextInputVariant.Ghost}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default, Container, and Ghost variants. Use the toolbar to switch **Variant** and **Mode**.",
      },
    },
  },
};
