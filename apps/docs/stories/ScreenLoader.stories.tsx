import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ScreenLoader,
  Typography,
  TypographyVariantEnum,
  Icon,
  IconName,
} from "kz-design-system";

const meta: Meta<typeof ScreenLoader> = {
  title: "Design System/ScreenLoader",
  component: ScreenLoader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Content-area loader that overlays a section with a loading indicator, progress bar, and optional branding. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
      description: "Controls overlay visibility.",
    },
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description:
        "0-100 for determinate progress bar. Omit for indeterminate.",
    },
    label: {
      control: "text",
      description: "Optional text label below the loader.",
    },
    blur: {
      control: { type: "range", min: 0, max: 10, step: 1 },
      description: "Backdrop blur in px. Default: 2.",
    },
    overlayOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Overlay opacity 0-1. Default: 0.6.",
    },
    loaderVariant: {
      control: "select",
      options: ["spinner", "dots", "pulse"],
      description: "Loader variant. Default: spinner.",
    },
    loaderSize: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Loader size. Default: lg.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScreenLoader>;

const ContentPlaceholder = () => (
  <div
    style={{
      height: 250,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--kz-color-surface-sunken)",
      borderRadius: 8,
    }}
  >
    <Typography variant={TypographyVariantEnum.Body}>
      Content goes here
    </Typography>
  </div>
);

export const Indeterminate: Story = {
  args: {
    loading: true,
    label: "Loading content...",
  },
  render: (args) => (
    <div style={{ width: 400 }}>
      <ScreenLoader {...args}>
        <ContentPlaceholder />
      </ScreenLoader>
    </div>
  ),
};

export const Determinate: Story = {
  render: function DeterminateStory() {
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 5));
      }, 200);
      return () => clearInterval(interval);
    }, []);
    return (
      <div style={{ width: 400 }}>
        <ScreenLoader loading progress={progress} label={`${progress}%`}>
          <ContentPlaceholder />
        </ScreenLoader>
      </div>
    );
  },
};

export const WithLogo: Story = {
  args: {
    loading: true,
    label: "Preparing dashboard...",
  },
  render: (args) => (
    <div style={{ width: 400 }}>
      <ScreenLoader
        {...args}
        logo={
          <Icon
            name={IconName.BarChart2}
            size={40}
            color="var(--kz-color-brand-accent)"
          />
        }
      >
        <ContentPlaceholder />
      </ScreenLoader>
    </div>
  ),
};

export const DotsVariant: Story = {
  args: {
    loading: true,
    loaderVariant: "dots",
    loaderSize: "xl",
    blur: 4,
    overlayOpacity: 0.8,
    label: "Processing...",
  },
  render: (args) => (
    <div style={{ width: 400 }}>
      <ScreenLoader {...args}>
        <ContentPlaceholder />
      </ScreenLoader>
    </div>
  ),
};

export const PulseVariant: Story = {
  args: {
    loading: true,
    loaderVariant: "pulse",
    label: "Syncing...",
  },
  render: (args) => (
    <div style={{ width: 400 }}>
      <ScreenLoader {...args}>
        <ContentPlaceholder />
      </ScreenLoader>
    </div>
  ),
};
