import { cva, type VariantProps } from "class-variance-authority";
import { AvatarSize } from "../../constants/enum";

const base = [
  "kz-avatar",
  "relative inline-flex items-center justify-center",
  "rounded-full overflow-hidden",
  "shrink-0",
  "[box-shadow:none]",
].join(" ");

export const avatarVariants = cva(base, {
  variants: {
    size: {
      [AvatarSize.Sm]: "size-8 text-xs",
      [AvatarSize.Md]: "size-10 text-sm",
      [AvatarSize.Lg]: "size-12 text-base",
      [AvatarSize.Xl]: "size-16 text-lg",
    },
  },
  defaultVariants: {
    size: AvatarSize.Md,
  },
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;
