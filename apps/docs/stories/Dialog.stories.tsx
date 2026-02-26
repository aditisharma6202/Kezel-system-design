import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Button,
  ButtonVariant,
  ButtonSize,
} from "kz-design-system";

const meta: Meta<typeof Dialog> = {
  title: "Design System/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal dialog built on Radix UI. Use **Dialog** (Root), **DialogTrigger**, **DialogContent**, **DialogHeader**, **DialogFooter**, **DialogTitle**, **DialogDescription**, and **DialogClose** for composition. Use the Variant and Mode toolbar to see theme context.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean", description: "Controlled open state." },
    onOpenChange: {
      action: "onOpenChange",
      description: "Called when open state changes.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={ButtonVariant.Primary} size={ButtonSize.Md}>
          Open dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>
            Optional description. It can wrap multiple lines and use muted text.
          </DialogDescription>
        </DialogHeader>
        <div style={{ padding: "8px 0" }}>
          Body content goes here. Buttons or custom content.
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={ButtonVariant.Secondary} size={ButtonSize.Md}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant={ButtonVariant.Primary} size={ButtonSize.Md}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={ButtonVariant.Outline} size={ButtonSize.Md}>
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Update your display name and email. Changes are saved when you close
            the dialog.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "8px 0",
          }}
        >
          <label style={{ fontSize: 14 }}>
            Name
            <input
              type="text"
              placeholder="Your name"
              style={{
                display: "block",
                width: "100%",
                marginTop: 4,
                padding: "8px 12px",
                border: "1px solid var(--kz-color-border-subtle)",
                borderRadius: 6,
              }}
            />
          </label>
          <label style={{ fontSize: 14 }}>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              style={{
                display: "block",
                width: "100%",
                marginTop: 4,
                padding: "8px 12px",
                border: "1px solid var(--kz-color-border-subtle)",
                borderRadius: 6,
              }}
            />
          </label>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={ButtonVariant.Secondary} size={ButtonSize.Md}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant={ButtonVariant.Primary} size={ButtonSize.Md}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dialog with form fields and Cancel/Save actions.",
      },
    },
  },
};
