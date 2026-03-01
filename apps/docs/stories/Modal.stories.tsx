import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Modal,
  ModalSize,
  Button,
  ButtonVariant,
  ButtonSize,
  TextInput,
  Typography,
  TypographyVariantEnum,
} from "kz-design-system";

const meta: Meta<typeof Modal> = {
  title: "Design System/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal dialog with configurable sizes (Sm, Md, Lg, Xl), optional overlay, header, and footer. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean", description: "Controlled open state." },
    size: {
      control: "select",
      options: Object.values(ModalSize),
      description: "Modal size: Sm, Md, Lg, or Xl.",
    },
    overlay: { control: "boolean", description: "Show backdrop overlay." },
    onOpenChange: {
      action: "onOpenChange",
      description: "Called when open state changes.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

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
          Open Modal
        </Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Default Modal
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
                Confirm
              </Button>
            </div>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            This is a default medium-sized modal with header and footer.
          </Typography>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  render: function SmallStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setOpen(true)}
        >
          Open Small Modal
        </Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          size={ModalSize.Sm}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Small Modal
            </Typography>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            A compact modal for simple confirmations.
          </Typography>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 16,
            }}
          >
            <Button
              variant={ButtonVariant.Outline}
              size={ButtonSize.Sm}
              onClick={() => setOpen(false)}
            >
              No
            </Button>
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Sm}
              onClick={() => setOpen(false)}
            >
              Yes
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  render: function LargeStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setOpen(true)}
        >
          Open Large Modal
        </Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          size={ModalSize.Lg}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Large Modal
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
                Close
              </Button>
            </div>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            A larger modal for more complex content. Great for forms, detailed
            information, or multi-step flows.
          </Typography>
        </Modal>
      </>
    );
  },
};

export const ExtraLarge: Story = {
  render: function ExtraLargeStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setOpen(true)}
        >
          Open XL Modal
        </Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          size={ModalSize.Xl}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Extra Large Modal
            </Typography>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            An extra-large modal for data-heavy content like tables or
            dashboards.
          </Typography>
        </Modal>
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
        <Modal
          open={open}
          onOpenChange={setOpen}
          overlay={false}
          size={ModalSize.Sm}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              No Overlay
            </Typography>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            This modal has no backdrop overlay.
          </Typography>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  render: function FormStory() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    return (
      <>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Md}
          onClick={() => setOpen(true)}
        >
          Open Form Modal
        </Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Create Account
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
                Create
              </Button>
            </div>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <TextInput
              value={name}
              onValueChange={setName}
              placeHolder="Full name"
              label="Name"
            />
            <TextInput
              value={email}
              onValueChange={setEmail}
              placeHolder="you@example.com"
              label="Email"
            />
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Modal with form fields and Cancel/Create actions.",
      },
    },
  },
};
