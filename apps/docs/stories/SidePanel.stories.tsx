import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  SidePanel,
  Button,
  ButtonVariant,
  ButtonSize,
  Typography,
  TypographyVariantEnum,
} from "kz-design-system";

const meta: Meta<typeof SidePanel> = {
  title: "Design System/SidePanel",
  component: SidePanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Sliding side panel overlay with configurable side (left/right), width, overlay, header, and footer. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean", description: "Controlled open state." },
    side: {
      control: "select",
      options: ["left", "right"],
      description: "Which side the panel slides in from.",
    },
    width: {
      control: "text",
      description: "Panel width (CSS value, e.g. '400px' or '50%').",
    },
    overlay: { control: "boolean", description: "Show backdrop overlay." },
    onOpenChange: {
      action: "onOpenChange",
      description: "Called when open state changes.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SidePanel>;

export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setOpen(true)}
        >
          Open Right Panel
        </Button>
        <SidePanel
          open={open}
          onOpenChange={setOpen}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Right Panel
            </Typography>
          }
          footer={
            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                variant={ButtonVariant.Outline}
                size={ButtonSize.Sm}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.Primary}
                size={ButtonSize.Sm}
                onClick={() => setOpen(false)}
              >
                Save
              </Button>
            </div>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            This panel slides in from the right with default 400px width.
          </Typography>
        </SidePanel>
      </>
    );
  },
};

export const LeftSide: Story = {
  render: function LeftSideStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setOpen(true)}
        >
          Open Left Panel
        </Button>
        <SidePanel
          open={open}
          onOpenChange={setOpen}
          side="left"
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Left Panel
            </Typography>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            This panel slides in from the left.
          </Typography>
        </SidePanel>
      </>
    );
  },
};

export const HalfWidth: Story = {
  render: function HalfWidthStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setOpen(true)}
        >
          Open 50% Panel
        </Button>
        <SidePanel
          open={open}
          onOpenChange={setOpen}
          width="50%"
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Half Screen
            </Typography>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            This panel takes up 50% of the screen width.
          </Typography>
        </SidePanel>
      </>
    );
  },
};

export const NoOverlay: Story = {
  render: function NoOverlayStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setOpen(true)}
        >
          Open Without Overlay
        </Button>
        <SidePanel
          open={open}
          onOpenChange={setOpen}
          overlay={false}
          width="300px"
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              No Overlay
            </Typography>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            This panel has no backdrop overlay.
          </Typography>
        </SidePanel>
      </>
    );
  },
};
