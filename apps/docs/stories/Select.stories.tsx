import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";
import type { SelectOption } from "kz-design-system";

const FRUIT_OPTIONS: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
  { value: "orange", label: "Orange" },
  { value: "peach", label: "Peach" },
  { value: "strawberry", label: "Strawberry" },
];

function SingleControlled(
  props: Omit<
    React.ComponentProps<typeof Select>,
    "value" | "onChange" | "options"
  > & {
    options?: SelectOption[];
  }
) {
  const [value, setValue] = React.useState<string>("");
  return (
    <Select
      {...props}
      options={props.options ?? FRUIT_OPTIONS}
      value={value}
      onChange={(v) => setValue(v as string)}
    />
  );
}

function MultiControlled(
  props: Omit<
    React.ComponentProps<typeof Select>,
    "value" | "onChange" | "options" | "multiple"
  > & {
    options?: SelectOption[];
  }
) {
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <Select
      {...props}
      options={props.options ?? FRUIT_OPTIONS}
      multiple
      value={value}
      onChange={(v) => setValue(v as string[])}
    />
  );
}

const meta: Meta<typeof Select> = {
  title: "Design System/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Custom select dropdown with single and multi-select modes, search filtering, tag chips, and keyboard navigation. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
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
    label: { control: "text", description: "Label shown above the select." },
    helperText: {
      control: "text",
      description: "Helper text below the select.",
    },
    description: {
      control: "text",
      description: "Description below the label.",
    },
    placeholder: { control: "text", description: "Placeholder text." },
    multiple: { control: "boolean", description: "Enable multi-select mode." },
    searchable: { control: "boolean", description: "Enable search filtering." },
    state: {
      control: "select",
      options: Object.values(TextInputState),
      description: "Validation state.",
    },
    errorText: { control: "text", description: "Error message." },
    disabled: { control: "boolean", description: "Disables the select." },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Single: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <SingleControlled label="Favorite fruit" description="Pick one fruit" />
    </div>
  ),
};

export const Multi: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <MultiControlled
        label="Fruits you like"
        description="Pick multiple fruits"
      />
    </div>
  ),
};

export const Searchable: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <SingleControlled label="Searchable" searchable />
    </div>
  ),
};

export const SearchableMulti: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <MultiControlled label="Searchable Multi" searchable />
    </div>
  ),
};

export const Uncontrolled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Select
        label="Uncontrolled"
        options={FRUIT_OPTIONS}
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
      <SingleControlled label="Small" size={TextInputSize.Sm} />
      <SingleControlled label="Medium" size={TextInputSize.Md} />
      <SingleControlled label="Large" size={TextInputSize.Lg} />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}
    >
      <SingleControlled label="Default" variant={TextInputVariant.Default} />
      <SingleControlled
        label="Container"
        variant={TextInputVariant.Container}
      />
      <SingleControlled label="Ghost" variant={TextInputVariant.Ghost} />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Select
        label="Error"
        options={FRUIT_OPTIONS}
        value=""
        onChange={() => {}}
        state={TextInputState.Error}
        errorText="Please select an option."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <SingleControlled label="Disabled" disabled />
    </div>
  ),
};
