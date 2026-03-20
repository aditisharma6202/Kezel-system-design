import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  ButtonStatus,
  ButtonType,
  ButtonAspectRatio,
  Icon,
  IconName,
} from "kz-design-system";

const VARIANTS = [
  ButtonVariant.Primary,
  ButtonVariant.Ghost,
  ButtonVariant.Container,
] as const;

const STATUSES = [
  ButtonStatus.Brand,
  ButtonStatus.Success,
  ButtonStatus.Warning,
  ButtonStatus.Error,
  ButtonStatus.Info,
] as const;

const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button with 3 variants (Primary, Ghost, Container) and 5 statuses (Brand, Success, Warning, Error, Info). Status overrides the color; variant controls the shape/style. Use the **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark) toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    children: "Button",
    onClick: () => {},
    variant: ButtonVariant.Primary,
    status: ButtonStatus.Brand,
    size: ButtonSize.Md,
    type: ButtonType.Button,
    loading: false,
    disabled: false,
    asChild: false,
    aspectRatio: ButtonAspectRatio.Auto,
  },
  argTypes: {
    variant: {
      control: "select",
      options: Object.values(ButtonVariant),
      description: "Visual variant: Primary, Ghost, or Container.",
    },
    status: {
      control: "select",
      options: [undefined, ...Object.values(ButtonStatus)],
      description:
        "Optional status: Brand, Success, Warning, Error, or Info. Overrides colors on any variant.",
    },
    size: {
      control: "select",
      options: Object.values(ButtonSize),
      description: "Size: Sm, Md, or Lg (height and padding).",
    },
    children: {
      control: "text",
      description:
        "Button content (text or nodes). When asChild is true, must be a single React element.",
    },
    type: {
      control: "select",
      options: Object.values(ButtonType),
      description:
        "Native button type: button, submit, or reset. Ignored when asChild is true.",
    },
    onClick: {
      action: "clicked",
      description:
        "Click handler. Called when the button is clicked (not when disabled or loading).",
    },
    loading: {
      control: "boolean",
      description:
        "When true, shows a loading spinner, disables the button, and applies loading opacity.",
    },
    disabled: {
      control: "boolean",
      description:
        "Disables the button. Also set to true automatically when loading is true.",
    },
    asChild: {
      control: "boolean",
      description:
        "When true, merges props onto the single child element instead of rendering a <button>. Use for links (e.g. <a>) that should look like a button. Child must be a single React element.",
    },
    aspectRatio: {
      control: "select",
      options: Object.values(ButtonAspectRatio),
      description:
        "When Square, button has 1:1 aspect ratio (equal width and height). Use for icon-only buttons.",
    },
    className: {
      control: "text",
      description:
        "Additional CSS classes applied to the button (or child when asChild).",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/* ── Individual variant stories ── */

export const BrandPrimary: Story = {
  args: {
    variant: ButtonVariant.Primary,
    status: ButtonStatus.Brand,
    size: ButtonSize.Md,
    children: "Brand",
  },
};

export const Primary: Story = {
  args: {
    variant: ButtonVariant.Primary,
    size: ButtonSize.Md,
    children: "Primary",
  },
};

export const Ghost: Story = {
  args: {
    variant: ButtonVariant.Ghost,
    size: ButtonSize.Md,
    children: "Ghost",
  },
};

export const Container: Story = {
  args: {
    variant: ButtonVariant.Container,
    size: ButtonSize.Md,
    children: "Container",
  },
};

/* ── Status stories ── */

export const Success: Story = {
  args: {
    variant: ButtonVariant.Primary,
    status: ButtonStatus.Success,
    size: ButtonSize.Md,
    children: "Success",
  },
};

export const Warning: Story = {
  args: {
    variant: ButtonVariant.Primary,
    status: ButtonStatus.Warning,
    size: ButtonSize.Md,
    children: "Warning",
  },
};

export const Error: Story = {
  args: {
    variant: ButtonVariant.Primary,
    status: ButtonStatus.Error,
    size: ButtonSize.Md,
    children: "Error",
  },
};

export const Info: Story = {
  args: {
    variant: ButtonVariant.Primary,
    status: ButtonStatus.Info,
    size: ButtonSize.Md,
    children: "Info",
  },
};

/* ── State stories ── */

export const Disabled: Story = {
  args: {
    variant: ButtonVariant.Primary,
    status: ButtonStatus.Brand,
    size: ButtonSize.Md,
    children: "Disabled",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    variant: ButtonVariant.Primary,
    status: ButtonStatus.Brand,
    size: ButtonSize.Md,
    children: "Loading",
    loading: true,
  },
};

/* ── Sizes ── */

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button
        variant={ButtonVariant.Primary}
        status={ButtonStatus.Brand}
        size={ButtonSize.Sm}
        onClick={() => {}}
      >
        Small
      </Button>
      <Button
        variant={ButtonVariant.Primary}
        status={ButtonStatus.Brand}
        size={ButtonSize.Md}
        onClick={() => {}}
      >
        Medium
      </Button>
      <Button
        variant={ButtonVariant.Primary}
        status={ButtonStatus.Brand}
        size={ButtonSize.Lg}
        onClick={() => {}}
      >
        Large
      </Button>
    </div>
  ),
};

/* ── All variants ── */

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        alignItems: "center",
      }}
    >
      <Button
        variant={ButtonVariant.Primary}
        status={ButtonStatus.Brand}
        size={ButtonSize.Md}
        onClick={() => {}}
      >
        Brand
      </Button>
      <Button
        variant={ButtonVariant.Primary}
        size={ButtonSize.Md}
        onClick={() => {}}
      >
        Primary
      </Button>
      <Button
        variant={ButtonVariant.Ghost}
        size={ButtonSize.Md}
        onClick={() => {}}
      >
        Ghost
      </Button>
      <Button
        variant={ButtonVariant.Container}
        size={ButtonSize.Md}
        onClick={() => {}}
      >
        Container
      </Button>
      <Button
        variant={ButtonVariant.Primary}
        status={ButtonStatus.Brand}
        size={ButtonSize.Md}
        disabled
        onClick={() => {}}
      >
        Disabled
      </Button>
      <Button
        variant={ButtonVariant.Primary}
        status={ButtonStatus.Brand}
        size={ButtonSize.Md}
        loading
        onClick={() => {}}
      >
        Loading
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All button variants in one view. Use the toolbar to switch **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark).",
      },
    },
  },
};

/* ── Status × Variant matrix ── */

export const StatusWithVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {STATUSES.map((st) => (
        <div
          key={st}
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {VARIANTS.map((v) => (
            <Button
              key={`${st}-${v}`}
              variant={v}
              status={st}
              size={ButtonSize.Md}
              onClick={() => {}}
            >
              {st} {v}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Each status (Brand, Success, Warning, Error, Info) combined with every variant (Primary, Ghost, Container). Ghost + status shows colored text on transparent background. Container + status shows colored text with colored border.",
      },
    },
  },
};

/* ── asChild ── */

export const AsChild: Story = {
  args: {
    variant: ButtonVariant.Ghost,
    size: ButtonSize.Md,
    asChild: true,
  },
  render: (args) => (
    <Button {...args} asChild>
      <a href="#as-child">Link as button</a>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Render as a link using asChild. The single child receives button styles and props.",
      },
    },
  },
};

/* ── Aspect ratio 1:1 ── */

export const AspectRatio1x1: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button
        variant={ButtonVariant.Primary}
        status={ButtonStatus.Brand}
        size={ButtonSize.Sm}
        aspectRatio={ButtonAspectRatio.Square}
        onClick={() => {}}
      >
        <Icon name={IconName.ArrowLeft} size="sm" color="currentColor" />
      </Button>
      <Button
        variant={ButtonVariant.Primary}
        status={ButtonStatus.Brand}
        size={ButtonSize.Md}
        aspectRatio={ButtonAspectRatio.Square}
        onClick={() => {}}
      >
        <Icon name={IconName.ArrowLeft} size="sm" color="currentColor" />
      </Button>
      <Button
        variant={ButtonVariant.Primary}
        status={ButtonStatus.Brand}
        size={ButtonSize.Lg}
        aspectRatio={ButtonAspectRatio.Square}
        onClick={() => {}}
      >
        <Icon name={IconName.ArrowLeft} size="sm" color="currentColor" />
      </Button>
      <Button
        variant={ButtonVariant.Primary}
        size={ButtonSize.Md}
        aspectRatio={ButtonAspectRatio.Square}
        onClick={() => {}}
      >
        <Icon name={IconName.Search} size="sm" color="currentColor" />
      </Button>
      <Button
        variant={ButtonVariant.Ghost}
        size={ButtonSize.Md}
        aspectRatio={ButtonAspectRatio.Square}
        onClick={() => {}}
      >
        <Icon name={IconName.CheckCircle} size="sm" color="currentColor" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use aspectRatio={ButtonAspectRatio.Square} for icon-only buttons so they render as a square (equal width and height).",
      },
    },
  },
};
