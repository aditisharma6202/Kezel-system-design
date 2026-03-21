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
        "bg-[var(--kz-component-button-secondary-bg)]",
        "text-[var(--kz-component-button-secondary-text)]",
        "rounded-[var(--kz-component-button-radius,8px)]",
        "[border:var(--kz-component-button-secondary-border,none)]",
        "[box-shadow:var(--kz-component-button-secondary-shadow,none)]",
        "hover:bg-[var(--kz-component-button-secondary-bg-hover)]",
        "hover:[box-shadow:var(--kz-component-button-secondary-shadow-hover,var(--kz-component-button-secondary-shadow,none))]",
        "active:bg-[var(--kz-component-button-secondary-bg-active)]",
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
      container: [
        "bg-[var(--kz-component-button-container-bg)]",
        "text-[var(--kz-component-button-container-text)]",
        "border border-[var(--kz-component-button-container-border)]",
        "rounded-[var(--kz-component-button-radius,8px)]",
        "[box-shadow:var(--kz-component-button-container-shadow)]",
        "hover:bg-[var(--kz-component-button-ghost-bg-hover,transparent)]",
        "hover:[box-shadow:var(--kz-component-button-container-shadow-hover)]",
      ].join(" "),
    },
    status: {
      default: "",
      brand: [
        "bg-[var(--kz-component-button-brand-bg)]",
        "text-[var(--kz-component-button-brand-text)]",
        "[box-shadow:var(--kz-component-button-brand-shadow,none)]",
        "hover:bg-[var(--kz-component-button-brand-bg-hover,var(--kz-component-button-brand-bg))]",
        "hover:[box-shadow:var(--kz-component-button-brand-shadow-hover,var(--kz-component-button-brand-shadow,none))]",
        "active:!bg-[var(--kz-component-button-brand-bg-hover,var(--kz-component-button-brand-bg))]",
      ].join(" "),
      success: [
        "bg-[var(--kz-component-button-success-bg)]",
        "text-[var(--kz-component-button-success-text)]",
        "[box-shadow:var(--kz-component-button-success-shadow,none)]",
        "hover:bg-[var(--kz-component-button-success-bg-hover,var(--kz-component-button-success-bg))]",
        "hover:[box-shadow:var(--kz-component-button-success-shadow-hover,var(--kz-component-button-success-shadow,none))]",
        "active:!bg-[var(--kz-component-button-success-bg-hover,var(--kz-component-button-success-bg))]",
      ].join(" "),
      warning: [
        "bg-[var(--kz-component-button-warning-bg)]",
        "text-[var(--kz-component-button-warning-text)]",
        "[box-shadow:var(--kz-component-button-warning-shadow,none)]",
        "hover:bg-[var(--kz-component-button-warning-bg-hover,var(--kz-component-button-warning-bg))]",
        "hover:[box-shadow:var(--kz-component-button-warning-shadow-hover,var(--kz-component-button-warning-shadow,none))]",
        "active:!bg-[var(--kz-component-button-warning-bg-hover,var(--kz-component-button-warning-bg))]",
      ].join(" "),
      error: [
        "bg-[var(--kz-component-button-error-bg)]",
        "text-[var(--kz-component-button-error-text)]",
        "[box-shadow:var(--kz-component-button-error-shadow,none)]",
        "hover:bg-[var(--kz-component-button-error-bg-hover,var(--kz-component-button-error-bg))]",
        "hover:[box-shadow:var(--kz-component-button-error-shadow-hover,var(--kz-component-button-error-shadow,none))]",
        "active:!bg-[var(--kz-component-button-error-bg-hover,var(--kz-component-button-error-bg))]",
      ].join(" "),
      info: [
        "bg-[var(--kz-component-button-info-bg)]",
        "text-[var(--kz-component-button-info-text)]",
        "[box-shadow:var(--kz-component-button-info-shadow,none)]",
        "hover:bg-[var(--kz-component-button-info-bg-hover,var(--kz-component-button-info-bg))]",
        "hover:[box-shadow:var(--kz-component-button-info-shadow-hover,var(--kz-component-button-info-shadow,none))]",
        "active:!bg-[var(--kz-component-button-info-bg-hover,var(--kz-component-button-info-bg))]",
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
  compoundVariants: [
    // Ghost + brand: brand text, transparent bg, brand-tinted hover
    {
      variant: "ghost",
      status: "brand",
      className: [
        "!bg-transparent text-[var(--kz-color-brand-accent)]",
        "hover:!bg-[var(--kz-component-button-ghost-brand-bg-hover,rgba(0,150,137,0.1))]",
        "[box-shadow:none] hover:[box-shadow:none]",
      ].join(" "),
    },
    // Ghost + status: text color = status, bg transparent, hover = light tint
    {
      variant: "ghost",
      status: "success",
      className: [
        "!bg-transparent text-[var(--kz-color-status-success)]",
        "hover:!bg-[var(--kz-component-button-ghost-success-bg-hover,rgba(0,201,80,0.1))]",
        "[box-shadow:none] hover:[box-shadow:none]",
      ].join(" "),
    },
    {
      variant: "ghost",
      status: "warning",
      className: [
        "!bg-transparent text-[var(--kz-color-status-warning)]",
        "hover:!bg-[var(--kz-component-button-ghost-warning-bg-hover,rgba(245,158,11,0.1))]",
        "[box-shadow:none] hover:[box-shadow:none]",
      ].join(" "),
    },
    {
      variant: "ghost",
      status: "error",
      className: [
        "!bg-transparent text-[var(--kz-color-status-error)]",
        "hover:!bg-[var(--kz-component-button-ghost-error-bg-hover,rgba(251,44,54,0.1))]",
        "[box-shadow:none] hover:[box-shadow:none]",
      ].join(" "),
    },
    {
      variant: "ghost",
      status: "info",
      className: [
        "!bg-transparent text-[var(--kz-color-status-info)]",
        "hover:!bg-[var(--kz-component-button-ghost-info-bg-hover,rgba(37,99,235,0.1))]",
        "[box-shadow:none] hover:[box-shadow:none]",
      ].join(" "),
    },
    // Container + brand: brand text, brand border, no shadow, brand-tinted hover
    {
      variant: "container",
      status: "brand",
      className: [
        "!bg-transparent",
        "!text-[var(--kz-component-button-container-brand-text,var(--kz-color-brand-accent))]",
        "!border-[var(--kz-component-button-container-brand-border,var(--kz-color-brand-accent))]",
        "[box-shadow:none] hover:[box-shadow:none]",
        "hover:!bg-[var(--kz-component-button-container-brand-bg-hover,rgba(0,150,137,0.08))]",
      ].join(" "),
    },
    // Container + status: keep container shape/shadow, override bg/text with status colors
    {
      variant: "container",
      status: "success",
      className: [
        "!bg-transparent",
        "!text-[var(--kz-color-status-success)]",
        "!border-[var(--kz-color-status-success)]",
        "[box-shadow:none] hover:[box-shadow:none]",
        "hover:!bg-[var(--kz-component-button-ghost-success-bg-hover,rgba(0,201,80,0.1))]",
      ].join(" "),
    },
    {
      variant: "container",
      status: "warning",
      className: [
        "!bg-transparent",
        "!text-[var(--kz-color-status-warning)]",
        "!border-[var(--kz-color-status-warning)]",
        "[box-shadow:none] hover:[box-shadow:none]",
        "hover:!bg-[var(--kz-component-button-ghost-warning-bg-hover,rgba(245,158,11,0.1))]",
      ].join(" "),
    },
    {
      variant: "container",
      status: "error",
      className: [
        "!bg-transparent",
        "!text-[var(--kz-color-status-error)]",
        "!border-[var(--kz-color-status-error)]",
        "[box-shadow:none] hover:[box-shadow:none]",
        "hover:!bg-[var(--kz-component-button-ghost-error-bg-hover,rgba(251,44,54,0.1))]",
      ].join(" "),
    },
    {
      variant: "container",
      status: "info",
      className: [
        "!bg-transparent",
        "!text-[var(--kz-color-status-info)]",
        "!border-[var(--kz-color-status-info)]",
        "[box-shadow:none] hover:[box-shadow:none]",
        "hover:!bg-[var(--kz-component-button-ghost-info-bg-hover,rgba(37,99,235,0.1))]",
      ].join(" "),
    },
  ],
  defaultVariants: {
    variant: ButtonVariant.Primary,
    size: ButtonSize.Md,
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
