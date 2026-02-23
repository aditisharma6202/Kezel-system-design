import { cva, type VariantProps } from "class-variance-authority";
import { CheckboxSize, CheckboxVariant } from "../../constants/enum";

const rootBase = [
  "kz-checkbox",
  "inline-flex items-center gap-2 cursor-pointer",
  "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[var(--kz-color-border-focus)] focus-within:rounded-[var(--kz-component-checkbox-radius,4px)]",
].join(" ");

export const checkboxVariants = cva(rootBase, {
  variants: {
    size: {
      [CheckboxSize.Sm]:
        "min-h-[var(--kz-component-checkbox-size-sm)] min-w-[var(--kz-component-checkbox-size-sm)]",
      [CheckboxSize.Md]:
        "min-h-[var(--kz-component-checkbox-size-md)] min-w-[var(--kz-component-checkbox-size-md)]",
      [CheckboxSize.Lg]:
        "min-h-[var(--kz-component-checkbox-size-lg)] min-w-[var(--kz-component-checkbox-size-lg)]",
    },
    variant: {
      [CheckboxVariant.Default]: "kz-checkbox--default",
      [CheckboxVariant.Container]: "kz-checkbox--container",
    },
  },
  defaultVariants: {
    size: CheckboxSize.Md,
    variant: CheckboxVariant.Default,
  },
});

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
