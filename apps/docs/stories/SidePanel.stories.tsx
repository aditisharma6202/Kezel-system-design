import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  SidePanel,
  Button,
  ButtonVariant,
  ButtonStatus,
  ButtonSize,
  Typography,
  TypographyVariantEnum,
  Icon,
  IconName,
  TextInput,
  TextInputSize,
  Select,
} from "kz-design-system";

const LONG_CONTENT = Array.from({ length: 20 }, (_, i) => (
  <Typography key={i} variant={TypographyVariantEnum.Body}>
    Scrollable content block {i + 1}. Lorem ipsum dolor sit amet, consectetur
    adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
  </Typography>
));

const meta: Meta<typeof SidePanel> = {
  title: "Design System/SidePanel",
  component: SidePanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Sliding side panel with configurable side, width, overlay, fully customisable header/footer (breadcrumbs, buttons, etc.), and sticky/scrollable modes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    side: { control: "select", options: ["left", "right"] },
    width: { control: "text" },
    overlay: { control: "boolean" },
    stickyHeader: { control: "boolean" },
    stickyFooter: { control: "boolean" },
    hideCloseButton: { control: "boolean" },
    onOpenChange: { action: "onOpenChange" },
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
          status={ButtonStatus.Brand}
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
                variant={ButtonVariant.Primary}
                size={ButtonSize.Sm}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.Primary}
                status={ButtonStatus.Brand}
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
          status={ButtonStatus.Brand}
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
          status={ButtonStatus.Brand}
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
          status={ButtonStatus.Brand}
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
                variant={ButtonVariant.Primary}
                size={ButtonSize.Sm}
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </div>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            No backdrop overlay. The rest of the page remains accessible and
            interactive. Clicking outside does not close the panel — use the
            close button or the X.
          </Typography>
        </SidePanel>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "With **overlay={false}**, the panel has no backdrop, the rest of the page stays interactive, and clicking outside does not close the panel. Users must explicitly close it via the X or a button.",
      },
    },
  },
};

export const CustomHeader: Story = {
  render: function CustomHeaderStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button
          variant={ButtonVariant.Primary}
          status={ButtonStatus.Brand}
          size={ButtonSize.Md}
          onClick={() => setOpen(true)}
        >
          Custom Header & Footer
        </Button>
        <SidePanel
          open={open}
          onOpenChange={setOpen}
          width="480px"
          header={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                width: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Typography variant={TypographyVariantEnum.Caption}>
                  Home
                </Typography>
                <span style={{ color: "var(--kz-color-text-muted)" }}>/</span>
                <Typography variant={TypographyVariantEnum.Caption}>
                  Settings
                </Typography>
                <span style={{ color: "var(--kz-color-text-muted)" }}>/</span>
                <Typography variant={TypographyVariantEnum.Caption}>
                  Profile
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant={TypographyVariantEnum.H4}>
                  Edit Profile
                </Typography>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
                    <Icon name={IconName.Filter} size={14} />
                  </Button>
                  <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
                    <Icon name={IconName.Settings} size={14} />
                  </Button>
                </div>
              </div>
            </div>
          }
          footer={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant={TypographyVariantEnum.Caption}>
                Last saved: 2 min ago
              </Typography>
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  variant={ButtonVariant.Primary}
                  size={ButtonSize.Sm}
                  onClick={() => setOpen(false)}
                >
                  Discard
                </Button>
                <Button
                  variant={ButtonVariant.Primary}
                  status={ButtonStatus.Brand}
                  size={ButtonSize.Sm}
                  onClick={() => setOpen(false)}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {LONG_CONTENT}
          </div>
        </SidePanel>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Header accepts any ReactNode — here it has breadcrumbs and icon buttons. Footer has status text and action buttons. Both stay fixed while body scrolls.",
      },
    },
  },
};

export const ScrollableHeaderFooter: Story = {
  render: function ScrollableStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button
          variant={ButtonVariant.Primary}
          status={ButtonStatus.Brand}
          size={ButtonSize.Md}
          onClick={() => setOpen(true)}
        >
          Scrollable Header & Footer
        </Button>
        <SidePanel
          open={open}
          onOpenChange={setOpen}
          stickyHeader={false}
          stickyFooter={false}
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Scrollable Header (scrolls away)
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
                variant={ButtonVariant.Primary}
                size={ButtonSize.Sm}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.Primary}
                status={ButtonStatus.Brand}
                size={ButtonSize.Sm}
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {LONG_CONTENT}
          </div>
        </SidePanel>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "With stickyHeader={false} and stickyFooter={false}, the header and footer scroll with the body content instead of staying fixed.",
      },
    },
  },
};

export const HiddenCloseButton: Story = {
  render: function HiddenCloseStory() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <Button
          variant={ButtonVariant.Primary}
          status={ButtonStatus.Brand}
          size={ButtonSize.Md}
          onClick={() => setOpen(true)}
        >
          Hidden Close Button
        </Button>
        <SidePanel
          open={open}
          onOpenChange={setOpen}
          hideCloseButton
          header={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant={TypographyVariantEnum.Label}>
                Custom Close
              </Typography>
              <Button
                variant={ButtonVariant.Ghost}
                size={ButtonSize.Sm}
                onClick={() => setOpen(false)}
              >
                <Icon name={IconName.X} size={14} />
              </Button>
            </div>
          }
        >
          <Typography variant={TypographyVariantEnum.Body}>
            The built-in close button is hidden. The header provides its own
            close action.
          </Typography>
        </SidePanel>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use hideCloseButton to remove the built-in X button and provide your own close mechanism in the header or footer.",
      },
    },
  },
};

export const WithFormControls: Story = {
  render: function FormControlsStory() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [notes, setNotes] = React.useState("");
    return (
      <>
        <Button
          variant={ButtonVariant.Primary}
          status={ButtonStatus.Brand}
          size={ButtonSize.Md}
          onClick={() => setOpen(true)}
        >
          Open Form Panel
        </Button>
        <SidePanel
          open={open}
          onOpenChange={setOpen}
          width="420px"
          header={
            <Typography variant={TypographyVariantEnum.Label}>
              Create Record
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
                variant={ButtonVariant.Primary}
                size={ButtonSize.Sm}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant={ButtonVariant.Primary}
                status={ButtonStatus.Brand}
                size={ButtonSize.Sm}
                onClick={() => setOpen(false)}
              >
                Save
              </Button>
            </div>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <TextInput
              label="Name"
              placeHolder="Enter name"
              value={name}
              onValueChange={setName}
              size={TextInputSize.Md}
            />
            <Select
              label="Country"
              multiple
              triggerLabel="Countries"
              placeholder="Select countries…"
              options={[
                { value: "us", label: "United States" },
                { value: "uk", label: "United Kingdom" },
                { value: "ca", label: "Canada" },
                { value: "de", label: "Germany" },
                { value: "fr", label: "France" },
                { value: "jp", label: "Japan" },
              ]}
            />
            <TextInput
              label="Email"
              placeHolder="Enter email"
              value={email}
              onValueChange={setEmail}
              size={TextInputSize.Md}
            />
            <Select
              label="Role"
              placeholder="Select role…"
              options={[
                { value: "admin", label: "Admin" },
                { value: "editor", label: "Editor" },
                { value: "viewer", label: "Viewer" },
              ]}
            />
            <TextInput
              label="Notes"
              placeHolder="Additional notes"
              value={notes}
              onValueChange={setNotes}
              size={TextInputSize.Md}
            />
          </div>
        </SidePanel>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "SidePanel with form controls including TextInputs and Select dropdowns. Tests scroll behavior and focus management within panels.",
      },
    },
  },
};
