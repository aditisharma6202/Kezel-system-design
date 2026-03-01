import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  FormGroup,
  FormGroupDirection,
  TextInput,
  TextInputState,
  Select,
  Button,
  ButtonVariant,
  ButtonSize,
} from "kz-design-system";

const meta: Meta<typeof FormGroup> = {
  title: "Design System/FormGroup",
  component: FormGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form group wrapper that provides label, description, helper text, error state, and layout direction (vertical/horizontal) for form fields. Supports fieldset grouping for multiple fields. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Group label." },
    description: {
      control: "text",
      description: "Description below the label.",
    },
    helperText: {
      control: "text",
      description: "Helper text below the fields.",
    },
    errorText: { control: "text", description: "Error message." },
    required: { control: "boolean", description: "Show required indicator." },
    disabled: { control: "boolean", description: "Disable all children." },
    fieldset: {
      control: "boolean",
      description: "Render as fieldset element.",
    },
    gap: { control: "number", description: "Gap between children in pixels." },
    direction: {
      control: "select",
      options: Object.values(FormGroupDirection),
      description: "Layout direction: Vertical or Horizontal.",
    },
    state: {
      control: "select",
      options: Object.values(TextInputState),
      description: "Validation state.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  render: function DefaultStory() {
    const [name, setName] = React.useState("");
    return (
      <div style={{ width: 400 }}>
        <FormGroup
          label="Full Name"
          description="Enter your first and last name"
          helperText="This will be displayed on your profile"
          required
        >
          <TextInput
            value={name}
            onValueChange={setName}
            placeHolder="John Doe"
          />
        </FormGroup>
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: function ErrorStory() {
    const [email, setEmail] = React.useState("");
    return (
      <div style={{ width: 400 }}>
        <FormGroup
          label="Email"
          state={TextInputState.Error}
          errorText="Please enter a valid email address"
          required
        >
          <TextInput
            value={email}
            onValueChange={setEmail}
            placeHolder="you@example.com"
            state={TextInputState.Error}
          />
        </FormGroup>
      </div>
    );
  },
};

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <FormGroup label="Actions" direction={FormGroupDirection.Horizontal}>
        <Button variant={ButtonVariant.Primary} size={ButtonSize.Sm}>
          Save
        </Button>
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
          Cancel
        </Button>
        <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
          Reset
        </Button>
      </FormGroup>
    </div>
  ),
};

export const Fieldset: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <FormGroup
        label="Shipping Address"
        description="Where should we deliver your order?"
        fieldset
        helperText="We ship to most countries"
      >
        <TextInput
          value=""
          onValueChange={() => {}}
          placeHolder="Street address"
          label="Street"
        />
        <TextInput
          value=""
          onValueChange={() => {}}
          placeHolder="City"
          label="City"
        />
        <Select
          options={[
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom" },
            { value: "ca", label: "Canada" },
          ]}
          placeholder="Country"
          label="Country"
        />
      </FormGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Fieldset mode groups multiple fields under a single legend.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <FormGroup
        label="Preferences"
        description="You cannot change these settings"
        disabled
      >
        <Select
          options={[
            { value: "apple", label: "Apple" },
            { value: "banana", label: "Banana" },
            { value: "cherry", label: "Cherry" },
          ]}
          placeholder="Pick a fruit"
        />
      </FormGroup>
    </div>
  ),
};

export const CustomGap: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <FormGroup
        label="Select your interests"
        gap={16}
        direction={FormGroupDirection.Horizontal}
      >
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
          Music
        </Button>
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
          Sports
        </Button>
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
          Tech
        </Button>
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
          Art
        </Button>
      </FormGroup>
    </div>
  ),
};
