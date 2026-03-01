import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  ToastProvider,
  useToast,
  Toaster,
  ToastVariant,
  ToastPosition,
} from "kz-design-system";

function ToastDemo({ position }: { position?: ToastPosition }) {
  const { toast, dismissAll } = useToast();
  return (
    <div>
      <Toaster position={position ?? ToastPosition.TopRight} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Button
            variant={ButtonVariant.Success}
            size={ButtonSize.Sm}
            onClick={() =>
              toast({
                variant: ToastVariant.Success,
                title: "Success!",
                description: "Your changes have been saved.",
              })
            }
          >
            Success
          </Button>
          <Button
            variant={ButtonVariant.Error}
            size={ButtonSize.Sm}
            onClick={() =>
              toast({
                variant: ToastVariant.Error,
                title: "Error",
                description: "Something went wrong. Please try again.",
              })
            }
          >
            Error
          </Button>
          <Button
            variant={ButtonVariant.Warning}
            size={ButtonSize.Sm}
            onClick={() =>
              toast({
                variant: ToastVariant.Warning,
                title: "Warning",
                description: "This action cannot be undone.",
              })
            }
          >
            Warning
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            size={ButtonSize.Sm}
            onClick={() =>
              toast({
                variant: ToastVariant.Info,
                title: "Info",
                description: "A new version is available.",
              })
            }
          >
            Info
          </Button>
        </div>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Sm}
          onClick={dismissAll}
        >
          Dismiss all
        </Button>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Design System/Toast",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Brief, auto-dismissing notifications with variants (Success, Error, Warning, Info), customizable duration, and position control. Requires ToastProvider. Use the **Variant** and **Mode** toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj;

export const AllVariants: Story = {
  render: () => <ToastDemo />,
};

export const TitleOnly: Story = {
  render: function TitleOnlyStory() {
    const { toast } = useToast();
    return (
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Sm}
        onClick={() =>
          toast({ variant: ToastVariant.Success, title: "Saved successfully" })
        }
      >
        Title only
      </Button>
    );
  },
};

export const CustomDuration: Story = {
  render: function CustomDurationStory() {
    const { toast } = useToast();
    return (
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          variant={ButtonVariant.Outline}
          size={ButtonSize.Sm}
          onClick={() =>
            toast({
              variant: ToastVariant.Info,
              title: "Persistent toast",
              description: "This won't auto-dismiss.",
              duration: 0,
            })
          }
        >
          No auto-dismiss
        </Button>
        <Button
          variant={ButtonVariant.Outline}
          size={ButtonSize.Sm}
          onClick={() =>
            toast({
              variant: ToastVariant.Info,
              title: "Quick toast",
              description: "Disappears in 2 seconds.",
              duration: 2000,
            })
          }
        >
          2s duration
        </Button>
      </div>
    );
  },
};

export const TopLeft: Story = {
  render: () => <ToastDemo position={ToastPosition.TopLeft} />,
  parameters: {
    docs: {
      description: { story: "Toasts positioned at the top-left corner." },
    },
  },
};

export const BottomRight: Story = {
  render: () => <ToastDemo position={ToastPosition.BottomRight} />,
  parameters: {
    docs: {
      description: { story: "Toasts positioned at the bottom-right corner." },
    },
  },
};

export const BottomLeft: Story = {
  render: () => <ToastDemo position={ToastPosition.BottomLeft} />,
  parameters: {
    docs: {
      description: { story: "Toasts positioned at the bottom-left corner." },
    },
  },
};
