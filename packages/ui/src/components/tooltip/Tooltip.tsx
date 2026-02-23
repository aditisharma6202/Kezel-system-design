import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../utils/cn";
import {
  TooltipSize,
  TooltipPosition,
  TooltipAlign,
  TooltipColor,
} from "../../constants/enum";

const SIDE_MAP: Record<TooltipPosition, "top" | "right" | "bottom" | "left"> = {
  [TooltipPosition.Top]: "top",
  [TooltipPosition.Right]: "right",
  [TooltipPosition.Bottom]: "bottom",
  [TooltipPosition.Left]: "left",
};

const ALIGN_MAP: Record<TooltipAlign, "start" | "center" | "end"> = {
  [TooltipAlign.Start]: "start",
  [TooltipAlign.Center]: "center",
  [TooltipAlign.End]: "end",
};

export interface TooltipProps {
  /** Tooltip content (text or ReactNode). */
  content: React.ReactNode;
  /** Trigger element(s). */
  children: React.ReactNode;
  /** Size: sm, md, lg. */
  size?: TooltipSize;
  /** Position (side) of the tooltip relative to trigger. */
  position?: TooltipPosition;
  /** Alignment along the cross axis. */
  align?: TooltipAlign;
  /** Color variant: default, inverse, success, warning, error. */
  color?: TooltipColor;
  /** Optional icon shown before content. */
  icon?: React.ReactNode;
  /** Delay in ms before showing (default from provider). */
  delayDuration?: number;
  /** Skip delay when closing. */
  skipDelayDuration?: number;
  /** Additional class for the content container. */
  className?: string;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      size = TooltipSize.Md,
      position = TooltipPosition.Top,
      align = TooltipAlign.Center,
      color = TooltipColor.Default,
      icon,
      delayDuration = 300,
      skipDelayDuration = 0,
      className,
    },
    ref
  ) => {
    return (
      <TooltipPrimitive.Provider
        delayDuration={delayDuration}
        skipDelayDuration={skipDelayDuration}
      >
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger asChild>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              ref={ref}
              side={SIDE_MAP[position]}
              align={ALIGN_MAP[align]}
              sideOffset={6}
              avoidCollisions
              className={cn(
                "kz-tooltip-content",
                `kz-tooltip-content--size-${size}`,
                `kz-tooltip-content--color-${color}`,
                className
              )}
              data-size={size}
              data-color={color}
            >
              {icon != null ? (
                <span className="kz-tooltip-content-inner">
                  <span className="kz-tooltip-icon" aria-hidden>
                    {icon}
                  </span>
                  <span className="kz-tooltip-text">{content}</span>
                </span>
              ) : (
                content
              )}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip, TooltipSize, TooltipPosition, TooltipAlign, TooltipColor };
