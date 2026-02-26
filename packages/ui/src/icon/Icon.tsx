import * as React from "react";
import { iconRegistry, IconName } from "./icon-registry";
import { iconSize, type IconSizeKey } from "./icon-sizes";
import { cn } from "../utils/cn";

export interface IconProps extends Omit<
  React.SVGAttributes<SVGSVGElement>,
  "color"
> {
  name: IconName;
  size?: IconSizeKey | number;
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

export { Icon, iconRegistry, iconSize, IconName };
export type { IconSizeKey };
