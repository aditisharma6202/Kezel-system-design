import * as React from "react";
import { cn } from "../../utils/cn";
import { CardShadow } from "../../constants/enum";
import type { CardProps } from "./Card.types";

const shadowClasses = {
  [CardShadow.Sm]: "kz-card--shadow-sm",
  [CardShadow.Md]: "kz-card--shadow-md",
  [CardShadow.Lg]: "kz-card--shadow-lg",
} as const;

const paddingClasses = {
  none: "",
  sm: "kz-card-padding--sm",
  md: "kz-card-padding--md",
  lg: "kz-card-padding--lg",
} as const;

const sizeToPadding = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      size = "md",
      shadow = CardShadow.Sm,
      padding,
      width,
      height,
      aspectRatio,
      flat = false,
      hoverable = false,
      clickable = false,
      header,
      footer,
      cover,
      className,
      children,
      onClick,
      style,
      ...props
    },
    ref
  ) => {
    const resolvedPadding = padding ?? sizeToPadding[size];

    const customStyle: React.CSSProperties = {
      ...style,
      ...(width ? { width } : {}),
      ...(height ? { height } : {}),
      ...(aspectRatio ? { aspectRatio } : {}),
    };

    return (
      <div
        ref={ref}
        className={cn(
          "kz-card",
          !flat && shadowClasses[shadow],
          flat && "kz-card--flat",
          hoverable && "kz-card--hoverable",
          clickable && "kz-card--clickable",
          className
        )}
        style={customStyle}
        onClick={onClick}
        tabIndex={clickable ? 0 : undefined}
        role={clickable ? "button" : undefined}
        {...props}
      >
        {cover != null && <div className="kz-card-cover">{cover}</div>}
        {header != null && (
          <div
            className={cn("kz-card-header", paddingClasses[resolvedPadding])}
          >
            {header}
          </div>
        )}
        <div className={cn("kz-card-body", paddingClasses[resolvedPadding])}>
          {children}
        </div>
        {footer != null && (
          <div
            className={cn("kz-card-footer", paddingClasses[resolvedPadding])}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
export type { CardProps, CardSize, CardPadding } from "./Card.types";
