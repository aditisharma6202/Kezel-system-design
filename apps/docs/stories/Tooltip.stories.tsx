import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipSize,
  TooltipPosition,
  TooltipAlign,
  TooltipColor,
  Button,
  ButtonVariant,
  ButtonSize,
  Icon,
} from "kz-design-system";

const meta: Meta<typeof Tooltip> = {
  title: "Design System/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tooltip shows content on hover (or focus). Use **size** (sm, md, lg), **position** (top, right, bottom, left), **align** (start, center, end), and **color** (default, inverse, success, warning, error). Optional **icon** renders before the content. Use the Variant and Mode toolbar to see standard vs neumorphic and light vs dark.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    content: "Tooltip content",
    size: TooltipSize.Md,
    position: TooltipPosition.Top,
    align: TooltipAlign.Center,
    color: TooltipColor.Default,
    delayDuration: 300,
  },
  argTypes: {
    content: {
      control: "text",
      description: "Tooltip content (text or ReactNode).",
    },
    size: {
      control: "select",
      options: Object.values(TooltipSize),
      description: "Size: sm, md, lg.",
    },
    position: {
      control: "select",
      options: Object.values(TooltipPosition),
      description: "Position (side) of the tooltip relative to trigger.",
    },
    align: {
      control: "select",
      options: Object.values(TooltipAlign),
      description: "Alignment along the cross axis.",
    },
    color: {
      control: "select",
      options: Object.values(TooltipColor),
      description: "Color variant: default, inverse, success, warning, error.",
    },
    icon: { control: false, description: "Optional icon ReactNode before content." },
    delayDuration: {
      control: "number",
      description: "Delay in ms before showing.",
    },
    skipDelayDuration: {
      control: "number",
      description: "Skip delay when closing.",
    },
    className: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "Hover to see tooltip",
    children: (
      <Button variant={ButtonVariant.Outline} size={ButtonSize.Md} onClick={() => {}}>
        Hover me
      </Button>
    ),
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
      <Tooltip {...args} content="Small tooltip" size={TooltipSize.Sm}>
        <button type="button" style={{ padding: "8px 12px" }}>
          Sm
        </button>
      </Tooltip>
      <Tooltip {...args} content="Medium tooltip" size={TooltipSize.Md}>
        <button type="button" style={{ padding: "8px 12px" }}>
          Md
        </button>
      </Tooltip>
      <Tooltip {...args} content="Large tooltip with more text" size={TooltipSize.Lg}>
        <button type="button" style={{ padding: "8px 12px" }}>
          Lg
        </button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Tooltip sizes: sm, md, lg." },
    },
  },
};

export const Positions: Story = {
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gridTemplateRows: "auto 1fr auto",
        gap: 24,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 280,
        minHeight: 200,
      }}
    >
      <div style={{ gridColumn: 2 }}>
        <Tooltip {...args} content="Top" position={TooltipPosition.Top}>
          <button type="button">Top</button>
        </Tooltip>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Tooltip {...args} content="Left" position={TooltipPosition.Left}>
          <button type="button">Left</button>
        </Tooltip>
      </div>
      <div style={{ gridColumn: 2, display: "flex", justifyContent: "center" }}>
        <span style={{ color: "var(--kz-color-text-muted)", fontSize: 12 }}>Trigger</span>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <Tooltip {...args} content="Right" position={TooltipPosition.Right}>
          <button type="button">Right</button>
        </Tooltip>
      </div>
      <div style={{ gridColumn: 2 }}>
        <Tooltip {...args} content="Bottom" position={TooltipPosition.Bottom}>
          <button type="button">Bottom</button>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: { story: "Tooltip position (side): top, right, bottom, left." },
    },
  },
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Tooltip {...args} content="Default" color={TooltipColor.Default}>
        <button type="button" style={{ padding: "8px 12px" }}>
          Default
        </button>
      </Tooltip>
      <Tooltip {...args} content="Inverse" color={TooltipColor.Inverse}>
        <button type="button" style={{ padding: "8px 12px" }}>
          Inverse
        </button>
      </Tooltip>
      <Tooltip {...args} content="Success" color={TooltipColor.Success}>
        <button type="button" style={{ padding: "8px 12px" }}>
          Success
        </button>
      </Tooltip>
      <Tooltip {...args} content="Warning" color={TooltipColor.Warning}>
        <button type="button" style={{ padding: "8px 12px" }}>
          Warning
        </button>
      </Tooltip>
      <Tooltip {...args} content="Error" color={TooltipColor.Error}>
        <button type="button" style={{ padding: "8px 12px" }}>
          Error
        </button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Color variants: default, inverse, success, warning, error.",
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    content: "Save your changes",
    icon: <Icon name="info" size="sm" color="currentColor" />,
    children: (
      <Button variant={ButtonVariant.Ghost} size={ButtonSize.Md} onClick={() => {}}>
        With icon
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: { story: "Optional icon shown before tooltip content." },
    },
  },
};

export const AlignStart: Story = {
  args: {
    content: "Aligned start",
    position: TooltipPosition.Bottom,
    align: TooltipAlign.Start,
    children: (
      <button type="button" style={{ padding: "8px 16px" }}>
        Align start
      </button>
    ),
  },
};

export const AlignEnd: Story = {
  args: {
    content: "Aligned end",
    position: TooltipPosition.Bottom,
    align: TooltipAlign.End,
    children: (
      <button type="button" style={{ padding: "8px 16px" }}>
        Align end
      </button>
    ),
  },
};
