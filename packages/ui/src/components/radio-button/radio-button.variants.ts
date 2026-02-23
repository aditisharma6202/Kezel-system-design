import { cva, type VariantProps } from "class-variance-authority";
import { RadioSize } from "../../constants/enum";

const rootBase = [
  "kz-radio-button",
  "inline-flex items-center gap-2 cursor-pointer",
  "focus-within:outline-none",
].join(" ");

export const radioButtonVariants = cva(rootBase, {
  variants: {
    size: {
      [RadioSize.Sm]:
        "min-h-[var(--kz-component-radio-size-sm)] min-w-[var(--kz-component-radio-size-sm)]",
      [RadioSize.Md]:
        "min-h-[var(--kz-component-radio-size-md)] min-w-[var(--kz-component-radio-size-md)]",
      [RadioSize.Lg]:
        "min-h-[var(--kz-component-radio-size-lg)] min-w-[var(--kz-component-radio-size-lg)]",
    },
  },
  defaultVariants: {
    size: RadioSize.Md,
  },
});

export type RadioButtonVariants = VariantProps<typeof radioButtonVariants>;
