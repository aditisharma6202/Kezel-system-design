import { cva, type VariantProps } from "class-variance-authority";
import { ButtonVariant, ButtonSize } from "../../constants/enum";

const base = [
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium",
  "transition-all duration-150 ease-out",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--kz-color-border-focus)]",
  "disabled:pointer-events-none disabled:opacity-[var(--kz-component-button-disabled-opacity,0.5)]",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0",
].join(" ");

export const buttonVariants = cva(base, {
  variants: {
    variant: {
      primary: [
        "bg-[var(--kz-component-button-primary-bg)]",
        "text-[var(--kz-component-button-primary-text)]",
        "rounded-[var(--kz-component-button-radius,8px)]",
        "[box-shadow:var(--kz-component-button-primary-shadow,none)]",
        "hover:bg-[var(--kz-component-button-primary-bg-hover)]",
        "hover:[box-shadow:var(--kz-component-button-primary-shadow-hover,var(--kz-component-button-primary-shadow,none))]",
        "active:bg-[var(--kz-component-button-primary-bg-active)]",
      ].join(" "),
      secondary: [
        "bg-[var(--kz-component-button-secondary-bg)]",
        "text-[var(--kz-component-button-secondary-text)]",
        "rounded-[var(--kz-component-button-radius,8px)]",
        "[box-shadow:var(--kz-component-button-secondary-shadow,none)]",
        "hover:bg-[var(--kz-component-button-secondary-bg-hover)]",
        "hover:[box-shadow:var(--kz-component-button-secondary-shadow-hover,var(--kz-component-button-secondary-shadow,none))]",
        "active:bg-[var(--kz-component-button-secondary-bg-active)]",
      ].join(" "),
      outline: [
        "bg-[var(--kz-component-button-outline-bg)]",
        "text-[var(--kz-component-button-outline-text)]",
        "border border-[var(--kz-component-button-outline-border)]",
        "rounded-[var(--kz-component-button-radius,8px)]",
        "[box-shadow:var(--kz-component-button-outline-shadow,none)]",
        "hover:bg-[var(--kz-component-button-outline-bg-hover,var(--kz-component-button-outline-bg))]",
        "hover:[box-shadow:var(--kz-component-button-outline-shadow-hover,var(--kz-component-button-outline-shadow,none))]",
      ].join(" "),
      ghost: [
        "bg-[var(--kz-component-button-ghost-bg)]",
        "text-[var(--kz-component-button-ghost-text)]",
        "rounded-[var(--kz-component-button-radius,8px)]",
        "border border-transparent",
        "[box-shadow:none]",
        "hover:bg-[var(--kz-component-button-ghost-bg-hover,transparent)]",
        "active:opacity-80",
      ].join(" "),
      success: [
        "bg-[var(--kz-component-button-success-bg)]",
        "text-[var(--kz-component-button-success-text)]",
        "rounded-[var(--kz-component-button-radius,8px)]",
        "[box-shadow:var(--kz-component-button-success-shadow,none)]",
        "hover:bg-[var(--kz-component-button-success-bg-hover,var(--kz-component-button-success-bg))]",
        "hover:[box-shadow:var(--kz-component-button-success-shadow-hover,var(--kz-component-button-success-shadow,none))]",
      ].join(" "),
      warning: [
        "bg-[var(--kz-component-button-warning-bg)]",
        "text-[var(--kz-component-button-warning-text)]",
        "rounded-[var(--kz-component-button-radius,8px)]",
        "[box-shadow:var(--kz-component-button-warning-shadow,none)]",
        "hover:bg-[var(--kz-component-button-warning-bg-hover,var(--kz-component-button-warning-bg))]",
        "hover:[box-shadow:var(--kz-component-button-warning-shadow-hover,var(--kz-component-button-warning-shadow,none))]",
      ].join(" "),
      error: [
        "bg-[var(--kz-component-button-error-bg)]",
        "text-[var(--kz-component-button-error-text)]",
        "rounded-[var(--kz-component-button-radius,8px)]",
        "[box-shadow:var(--kz-component-button-error-shadow,none)]",
        "hover:bg-[var(--kz-component-button-error-bg-hover,var(--kz-component-button-error-bg))]",
        "hover:[box-shadow:var(--kz-component-button-error-shadow-hover,var(--kz-component-button-error-shadow,none))]",
      ].join(" "),
    },
    size: {
      sm: [
        "h-[var(--kz-component-button-height-sm,2rem)]",
        "px-[var(--kz-component-button-px-sm,0.75rem)]",
        "text-[length:var(--kz-component-button-text-sm,0.875rem)]",
        "[&_svg]:size-[var(--kz-component-button-icon-sm,1rem)]",
      ].join(" "),
      md: [
        "h-[var(--kz-component-button-height-md,2.5rem)]",
        "px-[var(--kz-component-button-px-md,1rem)]",
        "text-[length:var(--kz-component-button-text-md,0.875rem)]",
        "[&_svg]:size-[var(--kz-component-button-icon-md,1rem)]",
      ].join(" "),
      lg: [
        "h-[var(--kz-component-button-height-lg,3rem)]",
        "px-[var(--kz-component-button-px-lg,1.25rem)]",
        "text-[length:var(--kz-component-button-text-lg,1rem)]",
        "[&_svg]:size-[var(--kz-component-button-icon-lg,1.25rem)]",
      ].join(" "),
    },
  },
  defaultVariants: {
    variant: ButtonVariant.Primary,
    size: ButtonSize.Md,
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
