import * as React from "react";
import { cn } from "../../utils/cn";

export type LoaderSize = "sm" | "md" | "lg" | "xl";
export type LoaderVariant = "spinner" | "dots" | "pulse";

export interface LoaderProps {
  /** Size of the loader. Default: "md" */
  size?: LoaderSize;
  /** Visual variant. Default: "spinner" */
  variant?: LoaderVariant;
  /** When true, renders a full-page centered overlay. Default: false */
  fullPage?: boolean;
  /** Optional label shown below the loader. */
  label?: string;
  className?: string;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  (
    { size = "md", variant = "spinner", fullPage = false, label, className },
    ref
  ) => {
    const content = (
      <div
        ref={fullPage ? undefined : ref}
        className={cn("kz-loader", `kz-loader--${size}`, className)}
        role="status"
        aria-label={label ?? "Loading"}
      >
        {variant === "spinner" && (
          <svg
            className="kz-loader-spinner"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="kz-loader-track"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="3"
            />
            <circle
              className="kz-loader-indicator"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )}

        {variant === "dots" && (
          <div className="kz-loader-dots">
            <span className="kz-loader-dot" />
            <span className="kz-loader-dot" />
            <span className="kz-loader-dot" />
          </div>
        )}

        {variant === "pulse" && <div className="kz-loader-pulse" />}

        {label != null && label !== "" && (
          <span className="kz-loader-label">{label}</span>
        )}
      </div>
    );

    if (fullPage) {
      return (
        <div ref={ref} className="kz-loader-overlay">
          {content}
        </div>
      );
    }

    return content;
  }
);

Loader.displayName = "Loader";

export { Loader };
