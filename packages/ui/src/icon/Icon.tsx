import * as React from "react";
import { iconRegistry, type IconName } from "./icon-registry";
import { iconSize, type IconSizeKey } from "./icon-sizes";
import { cn } from "../utils/cn";

export interface IconProps extends Omit<
  React.SVGAttributes<SVGSVGElement>,
  "color"
> {
  /** Icon name from registry (e.g. icon.search). */
  name: IconName;
  /** Size: preset key (sm, md, lg) or number in px. */
  size?: IconSizeKey | number;
  /** CSS color (e.g. "var(--kz-color-text-primary)", "currentColor"). */
  color?: string;
  className?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = "md", color, className, ...props }, ref) => {
    const Component = iconRegistry[name];
    if (!Component) return null;
    const sizePx = typeof size === "number" ? size : iconSize[size];
    const resolvedColor = color ?? "var(--kz-color-icon-default, currentColor)";
    return (
      <Component
        ref={ref}
        size={sizePx}
        color={resolvedColor}
        className={cn("shrink-0", className)}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export { Icon, iconRegistry, iconSize };
export type { IconName, IconSizeKey };
export { icon } from "./icon-registry";
