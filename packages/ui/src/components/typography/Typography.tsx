import * as React from "react";
import { cn } from "../../utils/cn";
import {
  getTypographyClass,
  getDefaultElement,
  type TypographyVariant,
} from "./typography-variants";
import {
  TypographyTone as TypographyToneEnum,
  TypographyAlign as TypographyAlignEnum,
  TypographyWeight as TypographyWeightEnum,
} from "../../constants/enum";

export {
  TypographyTone as TypographyToneEnum,
  TypographyAlign as TypographyAlignEnum,
  TypographyWeight as TypographyWeightEnum,
} from "../../constants/enum";

export type TypographyTone = TypographyToneEnum;
export type TypographyAlign = TypographyAlignEnum;
export type TypographyWeight = TypographyWeightEnum;

export type TypographyAsElement =
  | "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "a" | "label" | "figcaption";

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  children: React.ReactNode;
  variant: TypographyVariant;
  href?: string;
  tone?: TypographyTone;
  as?: TypographyAsElement;
  align?: TypographyAlign;
  truncate?: boolean;
  lines?: number;
  weight?: TypographyWeight;
  className?: string;
}

const alignClass: Record<TypographyAlignEnum, string> = {
  [TypographyAlignEnum.Left]: "text-left",
  [TypographyAlignEnum.Center]: "text-center",
  [TypographyAlignEnum.Right]: "text-right",
};

const weightClass: Record<TypographyWeightEnum, string> = {
  [TypographyWeightEnum.Regular]: "font-normal",
  [TypographyWeightEnum.Medium]: "font-medium",
  [TypographyWeightEnum.Semibold]: "font-semibold",
  [TypographyWeightEnum.Bold]: "font-bold",
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      variant,
      href,
      tone,
      as,
      align,
      truncate,
      lines,
      weight,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = href !== undefined ? "a" : (as ?? getDefaultElement(variant));
    const typographyClass = getTypographyClass(variant);

    const toneClass =
      tone !== undefined ? `kz-typography-tone-${tone}` : undefined;

    const lineClampStyle: React.CSSProperties | undefined =
      lines !== undefined && lines > 0
        ? {
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: lines,
          overflow: "hidden",
        }
        : undefined;

    const combinedStyle =
      lineClampStyle ? { ...style, ...lineClampStyle } : style;

    return React.createElement(
      Comp as "p",
      {
        ref,
        ...(href !== undefined && { href }),
        className: cn(
          typographyClass,
          toneClass,
          align !== undefined && alignClass[align],
          truncate && "truncate",
          weight !== undefined && weightClass[weight],
          className
        ),
        style: combinedStyle,
        ...props,
      },
      children
    );
  }
);

Typography.displayName = "Typography";

export { Typography };
export type { TypographyVariant };
