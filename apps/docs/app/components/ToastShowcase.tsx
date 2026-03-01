"use client";

import * as React from "react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  Typography,
  TypographyVariantEnum,
  useToast,
  Toaster,
  ToastVariant,
  ToastPosition,
} from "kz-design-system";
import { DropdownButton } from "kz-design-system/dropdown";

const POSITIONS: { key: ToastPosition; label: string }[] = [
  { key: ToastPosition.TopRight, label: "Top Right" },
  { key: ToastPosition.TopLeft, label: "Top Left" },
  { key: ToastPosition.BottomRight, label: "Bottom Right" },
  { key: ToastPosition.BottomLeft, label: "Bottom Left" },
];

export default function ToastShowcase() {
  const { toast, dismissAll } = useToast();
  const [position, setPosition] = React.useState<ToastPosition>(
    ToastPosition.TopRight
  );

  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-3xl">
      <Toaster position={position} />

      <Typography variant={TypographyVariantEnum.H2}>Toast</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Brief, auto-dismissing notifications. Click a variant button to trigger
        a toast.
      </Typography>

      {/* Variant buttons */}
      <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
      <div className="flex flex-wrap gap-3 justify-center">
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

      {/* Title-only toast */}
      <Typography variant={TypographyVariantEnum.H3}>Title only</Typography>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant={ButtonVariant.Outline}
          size={ButtonSize.Sm}
          onClick={() =>
            toast({
              variant: ToastVariant.Success,
              title: "Saved successfully",
            })
          }
        >
          Title only
        </Button>
      </div>

      {/* Custom duration */}
      <Typography variant={TypographyVariantEnum.H3}>
        Custom duration
      </Typography>
      <div className="flex flex-wrap gap-3 justify-center">
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

      {/* Position */}
      <Typography variant={TypographyVariantEnum.H3}>Position</Typography>
      <div className="flex flex-wrap gap-3 justify-center items-center">
        <DropdownButton
          trigger={{
            label:
              POSITIONS.find((p) => p.key === position)?.label ?? "Top Right",
            showChevron: true,
          }}
          items={POSITIONS.map((p) => ({
            key: p.key,
            label: p.label,
            onSelect: () => setPosition(p.key),
          }))}
        />
      </div>

      {/* Dismiss all */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Sm}
          onClick={dismissAll}
        >
          Dismiss all
        </Button>
      </div>
    </section>
  );
}
