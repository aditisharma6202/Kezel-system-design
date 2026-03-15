import * as React from "react";
import { cn } from "../../utils/cn";

export type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Shape variant. Default: "text" */
  variant?: SkeletonVariant;
  /** Width (CSS value). Default: "100%" */
  width?: string | number;
  /** Height (CSS value). Default: depends on variant */
  height?: string | number;
  /** Number of text lines to render (only for variant="text"). Default: 1 */
  lines?: number;
  /** Disable the shimmer animation. Default: false */
  static?: boolean;
  className?: string;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      width,
      height,
      lines = 1,
      static: isStatic = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const resolvedStyle: React.CSSProperties = {
      ...style,
      ...(width != null ? { width } : {}),
      ...(height != null ? { height } : {}),
    };

    if (variant === "text" && lines > 1) {
      return (
        <div
          ref={ref}
          className={cn("kz-skeleton-lines", className)}
          style={width != null ? { width } : undefined}
          {...props}
        >
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={cn(
                "kz-skeleton",
                "kz-skeleton--text",
                isStatic && "kz-skeleton--static",
                i === lines - 1 && "kz-skeleton--last-line"
              )}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "kz-skeleton",
          `kz-skeleton--${variant}`,
          isStatic && "kz-skeleton--static",
          className
        )}
        style={resolvedStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

/* ── TableSkeleton ── */

export type TableSkeletonSize = "sm" | "md" | "lg";

export interface TableSkeletonProps {
  /** Number of columns. Default: 4 */
  columns?: number;
  /** Number of rows. Default: 5 */
  rows?: number;
  /** Show a header bar (title area). Default: true */
  showHeader?: boolean;
  /** Show pagination area. Default: true */
  showPagination?: boolean;
  /** Show checkbox column. Default: false */
  showCheckbox?: boolean;
  /** Show actions column. Default: false */
  showActions?: boolean;
  /** Table size. Default: "md" */
  size?: TableSkeletonSize;
  className?: string;
}

const TableSkeleton = React.forwardRef<HTMLDivElement, TableSkeletonProps>(
  (
    {
      columns = 4,
      rows = 5,
      showHeader = true,
      showPagination = true,
      showCheckbox = false,
      showActions = false,
      size = "md",
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "kz-table-skeleton",
          `kz-table-skeleton--${size}`,
          className
        )}
        role="status"
        aria-label="Loading table"
      >
        {showHeader && (
          <div className="kz-table-skeleton-header">
            <Skeleton variant="text" width="140px" height="20px" />
            <Skeleton variant="rectangular" width="160px" height="32px" />
          </div>
        )}

        <div className="kz-table-skeleton-table">
          {/* Column headers */}
          <div className="kz-table-skeleton-row kz-table-skeleton-row--head">
            {showCheckbox && (
              <div className="kz-table-skeleton-cell kz-table-skeleton-cell--checkbox">
                <Skeleton variant="rectangular" width={16} height={16} />
              </div>
            )}
            {Array.from({ length: columns }, (_, i) => (
              <div key={i} className="kz-table-skeleton-cell">
                <Skeleton
                  variant="text"
                  width={`${50 + ((i * 20) % 40)}%`}
                  height="14px"
                />
              </div>
            ))}
            {showActions && (
              <div className="kz-table-skeleton-cell kz-table-skeleton-cell--actions">
                <Skeleton variant="text" width="50px" height="14px" />
              </div>
            )}
          </div>

          {/* Data rows */}
          {Array.from({ length: rows }, (_, rowIdx) => (
            <div key={rowIdx} className="kz-table-skeleton-row">
              {showCheckbox && (
                <div className="kz-table-skeleton-cell kz-table-skeleton-cell--checkbox">
                  <Skeleton variant="rectangular" width={16} height={16} />
                </div>
              )}
              {Array.from({ length: columns }, (_, colIdx) => (
                <div key={colIdx} className="kz-table-skeleton-cell">
                  <Skeleton
                    variant="text"
                    width={`${40 + (((rowIdx + colIdx) * 17) % 50)}%`}
                  />
                </div>
              ))}
              {showActions && (
                <div className="kz-table-skeleton-cell kz-table-skeleton-cell--actions">
                  <Skeleton variant="circular" width={24} height={24} />
                </div>
              )}
            </div>
          ))}
        </div>

        {showPagination && (
          <div className="kz-table-skeleton-footer">
            <Skeleton variant="text" width="100px" height="14px" />
            <div className="kz-table-skeleton-footer-right">
              <Skeleton variant="rectangular" width="80px" height="28px" />
              <Skeleton variant="rectangular" width="120px" height="28px" />
            </div>
          </div>
        )}
      </div>
    );
  }
);

TableSkeleton.displayName = "TableSkeleton";

/* ── CardSkeleton ── */

export type CardSkeletonLayout = "standard" | "horizontal" | "media";

export interface CardSkeletonProps {
  /** Layout preset. Default: "standard" */
  layout?: CardSkeletonLayout;
  /** Show a cover/image area. Default: true for "standard" and "media" */
  showCover?: boolean;
  /** Number of text lines in the body. Default: 3 */
  lines?: number;
  /** Show a footer area. Default: false */
  showFooter?: boolean;
  /** Width (CSS value). Default: "100%" */
  width?: string | number;
  className?: string;
}

const CardSkeleton = React.forwardRef<HTMLDivElement, CardSkeletonProps>(
  (
    {
      layout = "standard",
      showCover,
      lines = 3,
      showFooter = false,
      width,
      className,
    },
    ref
  ) => {
    const hasCover = showCover ?? (layout === "standard" || layout === "media");

    if (layout === "horizontal") {
      return (
        <div
          ref={ref}
          className={cn(
            "kz-card-skeleton",
            "kz-card-skeleton--horizontal",
            className
          )}
          style={width != null ? { width } : undefined}
          role="status"
          aria-label="Loading card"
        >
          {hasCover && (
            <Skeleton
              variant="rectangular"
              className="kz-card-skeleton-cover kz-card-skeleton-cover--side"
            />
          )}
          <div className="kz-card-skeleton-content">
            <Skeleton variant="text" width="60%" height="16px" />
            <Skeleton variant="text" lines={lines} />
            {showFooter && (
              <div className="kz-card-skeleton-footer">
                <Skeleton variant="rectangular" width="80px" height="28px" />
                <Skeleton variant="rectangular" width="80px" height="28px" />
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("kz-card-skeleton", className)}
        style={width != null ? { width } : undefined}
        role="status"
        aria-label="Loading card"
      >
        {hasCover && (
          <Skeleton
            variant="rectangular"
            className={cn(
              "kz-card-skeleton-cover",
              layout === "media" && "kz-card-skeleton-cover--tall"
            )}
          />
        )}
        <div className="kz-card-skeleton-content">
          <Skeleton variant="text" width="50%" height="16px" />
          <Skeleton variant="text" lines={lines} />
          {showFooter && (
            <div className="kz-card-skeleton-footer">
              <Skeleton variant="rectangular" width="80px" height="28px" />
              <Skeleton variant="rectangular" width="80px" height="28px" />
            </div>
          )}
        </div>
      </div>
    );
  }
);

CardSkeleton.displayName = "CardSkeleton";

export { Skeleton, TableSkeleton, CardSkeleton };
