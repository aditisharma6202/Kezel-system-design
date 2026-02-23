import * as React from "react";
import { cn } from "../../utils/cn";

export interface SidesheetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content (e.g. NavButton list). */
  children: React.ReactNode;
  /** Optional class for the panel. */
  className?: string;
}

const Sidesheet = React.forwardRef<HTMLDivElement, SidesheetProps>(
  ({ className, children, ...props }, ref) => (
    <aside ref={ref} className={cn("kz-sidesheet", className)} {...props}>
      {children}
    </aside>
  )
);

Sidesheet.displayName = "Sidesheet";

export { Sidesheet };
