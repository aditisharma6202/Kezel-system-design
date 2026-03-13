import * as React from "react";
import { cn } from "../../utils/cn";
import { Icon, IconName } from "../../icon";
import { DropdownButton } from "../dropdown";
import type { DropdownButtonItem } from "../dropdown";
import type { PaginationProps } from "./Pagination.types";

function buildPageRange(page: number, pageSize: number, total: number) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const delta = 2;
  let start = Math.max(1, page - delta);
  let end = Math.min(totalPages, page + delta);
  if (end - start < 2 * delta) {
    if (start === 1) end = Math.min(totalPages, start + 2 * delta);
    else end = Math.min(totalPages, end);
    start = Math.max(1, end - 2 * delta);
  }
  const pages: (number | "ellipsis")[] = [];
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("ellipsis");
  }
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("ellipsis");
    pages.push(totalPages);
  }
  return {
    pages,
    totalPages,
    startItem: (page - 1) * pageSize + 1,
    endItem: Math.min(page * pageSize, total),
  };
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      page,
      total,
      pageSize,
      onPageChange,
      onPageSizeChange,
      pageSizeOptions = [10, 20, 50],
      showItemRange = true,
      className,
    },
    ref
  ) => {
    const range = React.useMemo(
      () => buildPageRange(page, pageSize, total),
      [page, pageSize, total]
    );

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn(
          "kz-pagination flex flex-wrap items-center justify-center gap-3",
          className
        )}
      >
        {showItemRange && total > 0 && (
          <div className="kz-pagination-range text-sm text-[var(--kz-color-text-secondary)]">
            {range.startItem}–{range.endItem} of {total}
          </div>
        )}

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="kz-pagination-btn kz-pagination-nav"
            aria-label="Previous page"
          >
            <Icon
              name={IconName.ChevronLeft}
              size="sm"
              color="currentColor"
              aria-hidden
            />
          </button>

          {range.pages.map((p, i) =>
            p === "ellipsis" ? (
              <span
                key={`e-${i}`}
                className="kz-pagination-ellipsis px-2 text-[var(--kz-color-text-muted)]"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                data-active={p === page || undefined}
                onClick={() => onPageChange(p)}
                className="kz-pagination-btn kz-pagination-page"
                aria-label={`Page ${p}`}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= range.totalPages}
            className="kz-pagination-btn kz-pagination-nav"
            aria-label="Next page"
          >
            <Icon
              name={IconName.ChevronRight}
              size="sm"
              color="currentColor"
              aria-hidden
            />
          </button>
        </div>

        {onPageSizeChange && (
          <DropdownButton
            trigger={{
              label: String(pageSize),
              showChevron: true,
            }}
            items={pageSizeOptions.map(
              (n): DropdownButtonItem => ({
                key: String(n),
                label: String(n),
                onSelect: () => onPageSizeChange(n),
              })
            )}
          />
        )}
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";

export { Pagination, buildPageRange };
export type { PaginationProps } from "./Pagination.types";
