import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardShadow,
  Button,
  ButtonVariant,
  ButtonSize,
  ButtonStatus,
  Typography,
  TypographyVariantEnum,
} from "kz-design-system";

const meta: Meta<typeof Card> = {
  title: "Design System/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile card container with configurable shadow elevation, padding, header/footer slots, cover media, aspect ratio, and interactive states. Neumorphic theme uses raised neumorphic shadows; standard uses subtle elevation shadows.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    shadow: {
      control: "select",
      options: [CardShadow.Sm, CardShadow.Md, CardShadow.Lg],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    flat: { control: "boolean" },
    hoverable: { control: "boolean" },
    clickable: { control: "boolean" },
    width: { control: "text" },
    height: { control: "text" },
    aspectRatio: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    width: "300px",
    shadow: CardShadow.Sm,
    children: (
      <>
        <Typography variant={TypographyVariantEnum.Label}>
          Default Card
        </Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          A basic card with small shadow and medium padding.
        </Typography>
      </>
    ),
  },
};

export const ShadowLevels: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "start" }}>
      <Card width="200px" shadow={CardShadow.Sm}>
        <Typography variant={TypographyVariantEnum.Label}>Sm</Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Subtle shadow
        </Typography>
      </Card>
      <Card width="200px" shadow={CardShadow.Md}>
        <Typography variant={TypographyVariantEnum.Label}>Md</Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Medium shadow
        </Typography>
      </Card>
      <Card width="200px" shadow={CardShadow.Lg}>
        <Typography variant={TypographyVariantEnum.Label}>Lg</Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Heavy shadow
        </Typography>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Three shadow levels: Sm (default), Md, and Lg. In neumorphic theme these map to raised-sm/md/lg; in standard they map to elevation-1/2/3.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "start" }}>
      <Card width="180px" size="sm">
        <Typography variant={TypographyVariantEnum.Label}>Small</Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          8px padding
        </Typography>
      </Card>
      <Card width="220px" size="md">
        <Typography variant={TypographyVariantEnum.Label}>Medium</Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          16px padding
        </Typography>
      </Card>
      <Card width="260px" size="lg">
        <Typography variant={TypographyVariantEnum.Label}>Large</Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          24px padding
        </Typography>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Size controls default padding: sm (8px), md (16px), lg (24px).",
      },
    },
  },
};

export const Flat: Story = {
  args: {
    width: "300px",
    flat: true,
    children: (
      <>
        <Typography variant={TypographyVariantEnum.Label}>Flat Card</Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          No shadow — useful for nesting or reducing visual weight.
        </Typography>
      </>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    width: "300px",
    hoverable: true,
    children: (
      <>
        <Typography variant={TypographyVariantEnum.Label}>
          Hoverable Card
        </Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Lifts on hover with enhanced shadow.
        </Typography>
      </>
    ),
  },
};

export const Clickable: Story = {
  args: {
    width: "300px",
    clickable: true,
    hoverable: true,
    onClick: () => alert("Card clicked!"),
    children: (
      <>
        <Typography variant={TypographyVariantEnum.Label}>
          Clickable Card
        </Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Cursor pointer and focus ring on tab.
        </Typography>
      </>
    ),
  },
};

export const HeaderAndFooter: Story = {
  render: () => (
    <Card
      width="360px"
      header={
        <Typography variant={TypographyVariantEnum.Label}>
          Card Header
        </Typography>
      }
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
            Cancel
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            status={ButtonStatus.Brand}
            size={ButtonSize.Sm}
          >
            Save
          </Button>
        </div>
      }
    >
      <Typography variant={TypographyVariantEnum.Caption}>
        Body content between the header and footer, each separated by a border.
      </Typography>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Header and footer slots with automatic border separators.",
      },
    },
  },
};

export const CoverMedia: Story = {
  render: () => (
    <Card width="320px">
      <Typography variant={TypographyVariantEnum.Label}>
        Mountain View
      </Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        A card with a cover image above the content.
      </Typography>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Cover slot renders media (image/video) above the body.",
      },
    },
  },
};

export const AspectRatios: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "start" }}>
      <Card width="160px" aspectRatio="1/1" padding="md">
        <Typography variant={TypographyVariantEnum.Label}>1:1</Typography>
      </Card>
      <Card width="200px" aspectRatio="16/9" padding="md">
        <Typography variant={TypographyVariantEnum.Label}>16:9</Typography>
      </Card>
      <Card width="160px" aspectRatio="4/3" padding="md">
        <Typography variant={TypographyVariantEnum.Label}>4:3</Typography>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use the aspectRatio prop with any CSS aspect-ratio value (e.g. '1/1', '16/9', '4/3').",
      },
    },
  },
};

export const FixedDimensions: Story = {
  args: {
    width: "300px",
    height: "200px",
    children: (
      <>
        <Typography variant={TypographyVariantEnum.Label}>300 x 200</Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Explicit width and height.
        </Typography>
      </>
    ),
  },
};
