import * as React from "react";
import { cn } from "../../utils/cn";
import { Loader } from "../loader";
import type { LoaderVariant, LoaderSize } from "../loader";

export interface ScreenLoaderProps {
  /** Controls overlay visibility. */
  loading: boolean;
  /** 0-100 for determinate progress bar. Omit for indeterminate. */
  progress?: number;
  /** Custom logo or ReactNode shown centered on the overlay. */
  logo?: React.ReactNode;
  /** Optional text label below the loader indicator. */
  label?: string;
  /** Backdrop blur in px. Default: 2 */
  blur?: number;
  /** Overlay opacity 0-1. Default: 0.6 */
  overlayOpacity?: number;
  /** Loader variant passed to internal Loader. Default: "spinner" */
  loaderVariant?: LoaderVariant;
  /** Loader size passed to internal Loader. Default: "lg" */
  loaderSize?: LoaderSize;
  /** Additional className on the wrapper. */
  className?: string;
  /** Content rendered beneath the overlay. */
  children: React.ReactNode;
}

const ScreenLoader = React.forwardRef<HTMLDivElement, ScreenLoaderProps>(
  (
    {
      loading,
      progress,
      logo,
      label,
      blur = 2,
      overlayOpacity = 0.6,
      loaderVariant = "spinner",
      loaderSize = "lg",
      className,
      children,
    },
    ref
  ) => {
    const isDeterminate = progress !== undefined;

    return (
      <div ref={ref} className={cn("kz-screen-loader", className)}>
        {children}

        {loading && (
          <div
            className="kz-screen-loader__overlay"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${overlayOpacity})`,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
            }}
            aria-busy="true"
            role="status"
          >
            <div className="kz-screen-loader__content">
              {logo != null && (
                <div className="kz-screen-loader__logo">{logo}</div>
              )}

              <Loader variant={loaderVariant} size={loaderSize} />

              <div className="kz-screen-loader__progress-track">
                <div
                  className={cn(
                    "kz-screen-loader__progress-bar",
                    !isDeterminate &&
                      "kz-screen-loader__progress-bar--indeterminate"
                  )}
                  style={
                    isDeterminate
                      ? {
                          width: `${Math.min(100, Math.max(0, progress))}%`,
                        }
                      : undefined
                  }
                />
              </div>

              {label != null && label !== "" && (
                <span className="kz-screen-loader__label">{label}</span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

ScreenLoader.displayName = "ScreenLoader";

export { ScreenLoader };
