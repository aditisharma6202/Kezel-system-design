import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "kz-design-system";

const meta: Meta<typeof Loader> = {
  title: "Design System/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Loading indicator with spinner, dots, and pulse variants. Supports four sizes and an optional full-page overlay mode. Uses the brand accent color.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["spinner", "dots", "pulse"],
      description: "Visual variant: spinner, dots, or pulse.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the loader.",
    },
    fullPage: {
      control: "boolean",
      description: "Render as a full-page centered overlay.",
    },
    label: {
      control: "text",
      description: "Optional label below the loader.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Spinner: Story = {
  render: () => <Loader variant="spinner" size="md" />,
};

export const Dots: Story = {
  render: () => <Loader variant="dots" size="md" />,
};

export const Pulse: Story = {
  render: () => <Loader variant="pulse" size="md" />,
};

export const WithLabel: Story = {
  render: () => <Loader variant="spinner" size="md" label="Loading data…" />,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Loader variant="spinner" size="sm" />
      <Loader variant="spinner" size="md" />
      <Loader variant="spinner" size="lg" />
      <Loader variant="spinner" size="xl" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Loader variant="spinner" size="lg" />
        <span style={{ fontSize: 12, color: "var(--kz-color-text-tertiary)" }}>
          Spinner
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Loader variant="dots" size="lg" />
        <span style={{ fontSize: 12, color: "var(--kz-color-text-tertiary)" }}>
          Dots
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Loader variant="pulse" size="lg" />
        <span style={{ fontSize: 12, color: "var(--kz-color-text-tertiary)" }}>
          Pulse
        </span>
      </div>
    </div>
  ),
};

export const FullPage: Story = {
  render: function FullPageStory() {
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
      if (!show) return;
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }, [show]);

    return (
      <>
        <button
          type="button"
          onClick={() => setShow(true)}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "1px solid var(--kz-color-border-default)",
            background: "var(--kz-color-surface-base)",
            color: "var(--kz-color-text-primary)",
            cursor: "pointer",
          }}
        >
          Show Full-Page Loader (3s)
        </button>
        {show && (
          <Loader variant="spinner" size="lg" fullPage label="Loading…" />
        )}
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Full-page overlay with a centered loader and backdrop blur. Click the button to trigger it — it auto-dismisses after 3 seconds.",
      },
    },
  },
};
