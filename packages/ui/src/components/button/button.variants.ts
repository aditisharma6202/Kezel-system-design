import { cva, type VariantProps } from "class-variance-authority";
import { ButtonVariant, ButtonSize } from "../../constants/enum";

const base = [
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium",
  "transition-all duration-150 ease-out",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--kz-color-border-focus)]",
  "disabled:pointer-events-none disabled:opacity-50",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0",
].join(" ");

export const buttonVariants = cva(base, {
  variants: {
    variant: {
      accent: [
        "bg-[var(--kz-component-button-accent-bg)]",
        "text-[var(--kz-component-button-accent-text)]",
        "[box-shadow:var(--kz-component-button-accent-shadow)]",
        "rounded-[var(--kz-radius-md)]",
        "hover:bg-[var(--kz-component-button-accent-bg-hover)]",
        "hover:bg-[var(--kz-component-button-accent-bg-active)]",
        "hover:text-[var(--kz-component-button-accent-text-active)]",
        "hover:[box-shadow:var(--kz-component-button-accent-shadow-inset)]",
      ].join(" "),
      primary: [
        "bg-[var(--kz-component-button-primary-bg)]",
        "text-[var(--kz-component-button-primary-text)]",
        "[box-shadow:var(--kz-component-button-primary-shadow)]",
        "rounded-[var(--kz-radius-md)]",
        "hover:bg-[var(--kz-component-button-primary-bg-hover)]",
        "hover:text-[var(--kz-component-button-primary-text-hover,var(--kz-component-button-primary-text))]",
        "hover:[box-shadow:var(--kz-component-button-primary-shadow-inset-hover,var(--kz-component-button-primary-shadow-inset))]",
        "active:bg-[var(--kz-component-button-primary-bg-active)]",
        "active:text-[var(--kz-component-button-primary-text-active)]",
        "active:[box-shadow:var(--kz-component-button-primary-shadow-inset)]",
      ].join(" "),
      container: [
        "bg-[var(--kz-component-button-container-bg)]",
        "text-[var(--kz-component-button-container-text)]",
        "[box-shadow:var(--kz-component-button-container-shadow)]",
        "rounded-[var(--kz-radius-md)]",
        "hover:bg-[var(--kz-component-button-container-bg-hover)]",
        "hover:text-[var(--kz-component-button-container-text)]",
        "hover:bg-[var(--kz-component-button-container-bg-active)]",
        "hover:text-[var(--kz-component-button-container-text-active)]",
        "hover:[box-shadow:var(--kz-component-button-container-shadow-inset)]",
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
