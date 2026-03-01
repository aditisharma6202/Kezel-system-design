import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  FileUploader,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

function Controlled(
  props: Omit<
    React.ComponentProps<typeof FileUploader>,
    "value" | "onChange"
  > & {
    value?: File[];
  }
) {
  const [value, setValue] = React.useState<File[]>(props.value ?? []);
  return <FileUploader {...props} value={value} onChange={setValue} />;
}

const meta: Meta<typeof FileUploader> = {
  title: "Design System/FileUploader",
  component: FileUploader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "File uploader with drag-and-drop, file list, and constraints (accept, maxSize, maxFiles). Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
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
    label: { control: "text", description: "Label shown above the uploader." },
    helperText: {
      control: "text",
      description: "Helper text below the uploader.",
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
    accept: {
      control: "text",
      description: "Accepted file types (e.g. image/*).",
    },
    maxSize: { control: "number", description: "Max file size in bytes." },
    maxFiles: { control: "number", description: "Max number of files." },
    disabled: { control: "boolean", description: "Disables the uploader." },
  },
};

export default meta;

type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Controlled
        label="Attachments"
        description="Upload documents, images, or other files"
      />
    </div>
  ),
};

export const Uncontrolled: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <FileUploader
        label="Uncontrolled"
        helperText="No controlled value \u2014 internal state only"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 400 }}
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
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 400 }}
    >
      <Controlled label="Default" variant={TextInputVariant.Default} />
      <Controlled label="Container" variant={TextInputVariant.Container} />
      <Controlled label="Ghost" variant={TextInputVariant.Ghost} />
    </div>
  ),
};

export const Constrained: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Controlled
        label="Images only (max 2 MB)"
        accept="image/*"
        maxSize={2097152}
        maxFiles={3}
        helperText="Up to 3 images, 2 MB each"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Constrained to image files, max 2 MB each, up to 3 files.",
      },
    },
  },
};

export const Error: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <FileUploader
        label="Error"
        value={[]}
        onChange={() => {}}
        state={TextInputState.Error}
        errorText="Please upload at least one file."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Controlled label="Disabled" disabled />
    </div>
  ),
};
