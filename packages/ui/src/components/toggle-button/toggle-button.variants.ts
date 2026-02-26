import { cva, type VariantProps } from "class-variance-authority";
import { ToggleButtonVariant, ToggleButtonSize } from "../../constants/enum";

const trackBase = [
  "kz-toggle-button",
  "relative inline-flex shrink-0 rounded-full p-1",
  "transition-colors duration-200 ease-in-out",
].join(" ");

export const toggleButtonVariants = cva(trackBase, {
  variants: {
    variant: {
      [ToggleButtonVariant.Default]:
        "kz-toggle-button-track kz-toggle-button-track--default",
      [ToggleButtonVariant.Primary]:
        "kz-toggle-button-track kz-toggle-button-track--primary",
      [ToggleButtonVariant.Container]: [
        "kz-toggle-button-track",
        "bg-[var(--kz-color-surface-base)] border border-[var(--kz-color-border-default)]",
        "group-data-[state=on]:bg-[var(--kz-component-button-success-bg)]",
      ].join(" "),
    },
    size: {
      [ToggleButtonSize.Sm]: "h-5 w-9 min-w-[2.25rem]",
      [ToggleButtonSize.Md]: "h-6 w-10 min-w-[2.5rem]",
      [ToggleButtonSize.Lg]: "h-7 w-11 min-w-[2.75rem]",
    },
    fullWidth: {
      true: "w-full min-w-0",
      false: "",
    },
  },
  defaultVariants: {
    variant: ToggleButtonVariant.Default,
    size: ToggleButtonSize.Md,
    fullWidth: false,
  },
});

export type ToggleButtonVariants = VariantProps<typeof toggleButtonVariants>;
