import * as React from "react";
import { cn } from "../../utils/cn";
import { Checkbox, CheckboxSize, CheckboxVariant } from "../checkbox";
import { TextInput, TextInputSize, TextInputVariant } from "../text-input";
import { Button, ButtonVariant, ButtonSize } from "../button";
import { DropdownButton } from "../dropdown";
import type { DropdownButtonItem } from "../dropdown";
import { Icon, IconName } from "../../icon";
import type {
  TableProps,
  TableColumn,
  SortDirection,
} from "./Table.types";

function nextSortDirection(current: SortDirection): SortDirection {
  if (current === null) return "asc";
  if (current === "asc") return "desc";
  return null;
}

function getCellContent<TData>(
  row: TData,
  column: TableColumn<TData>
): React.ReactNode {
  if (column.cell) return column.cell(row);
  if (column.accessor) return column.accessor(row);
  return null;
}

function TableInner<TData>(
  {
    data,
    columns,
    size = "md",
    stickyHeader = false,
    getRowSticky,
    caption,
    header: headerProp,
    title,
    description,
    searchable,
    searchValue = "",
    onSearchChange,
    searchPlaceholder = "Search…",
    headerRight,
    selectableRows,
    selectedRowIds = {},
    getRowId,
    onRowSelectionChange,
    onToggleRow,
    onToggleAll,
    actions,
    actionsHeader,
    sort = null,
    onSortChange,
    pagination,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 20, 50],
    loading,
    emptyState,
    className,
    tableClassName,
    headerClassName,
    containerClassName,
  }: TableProps<TData>,
  ref: React.Ref<HTMLDivElement>
) {
  const captionId = React.useId();
  const tableId = React.useId();

  const allRowIds = React.useMemo(
    () => data.map((row, i) => getRowId(row, i)),
    [data, getRowId]
  );

  const selectedCount = React.useMemo(
    () => Object.keys(selectedRowIds).filter((id) => selectedRowIds[id]).length,
    [selectedRowIds]
  );
  const allSelected =
    allRowIds.length > 0 && selectedCount === allRowIds.length;
  const someSelected = selectedCount > 0;

  const handleToggleAll = React.useCallback(
    (checked: boolean) => {
      if (onToggleAll) {
        onToggleAll(checked, allRowIds);
        return;
      }
      if (onRowSelectionChange) {
        const next: Record<string, boolean> = {};
        allRowIds.forEach((id) => (next[id] = checked));
        onRowSelectionChange(next);
      }
    },
    [allRowIds, onToggleAll, onRowSelectionChange]
  );

  const handleToggleRow = React.useCallback(
    (rowId: string, checked: boolean) => {
      if (onToggleRow) {
        onToggleRow(rowId, checked);
        return;
      }
      if (onRowSelectionChange) {
        const next = { ...selectedRowIds, [rowId]: checked };
        onRowSelectionChange(next);
      }
    },
    [selectedRowIds, onToggleRow, onRowSelectionChange]
  );

  const handleSortClick = React.useCallback(
    (key: string) => {
      if (!onSortChange) return;
      const currentDir = sort?.key === key ? sort.direction : null;
      const nextDir = nextSortDirection(currentDir ?? null);
      onSortChange({ key, direction: nextDir });
    },
    [sort, onSortChange]
  );

  const pageRange = React.useMemo(() => {
    if (!pagination) return null;
    const { page, pageSize, total } = pagination;
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
    return { pages, totalPages, startItem: (page - 1) * pageSize + 1, endItem: Math.min(page * pageSize, total) };
  }, [pagination]);

  const defaultHeader = (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 w-full",
        headerClassName
      )}
    >
      <div className="flex flex-col gap-0.5 min-w-0">
        {title != null && (
          <span className="text-base font-medium text-[var(--kz-color-text-primary)]">
            {title}
          </span>
        )}
        {description != null && (
          <span className="text-sm text-[var(--kz-color-text-secondary)]">
            {description}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
        {searchable && (
          <div className="w-full max-w-xs">
            <TextInput
              label=""
              value={searchValue}
              onValueChange={(v) => onSearchChange?.(v)}
              placeHolder={searchPlaceholder}
              size={TextInputSize.Sm}
              variant={TextInputVariant.Default}
            />
          </div>
        )}
        {headerRight != null && <div className="shrink-0">{headerRight}</div>}
      </div>
    </div>
  );

  const sizeClasses = {
    sm: "py-1.5 px-2 text-xs",
    md: "py-2 px-3 text-sm",
    lg: "py-3 px-4 text-base",
  };
  const sizeClass = sizeClasses[size];

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const hasHeader =
    headerProp != null ||
    title != null ||
    description != null ||
    searchable ||
    headerRight != null;

  return (
    <div
      ref={ref}
      className={cn(
        "kz-table-root kz-table-surface flex flex-col w-full min-w-0 overflow-hidden rounded-[var(--kz-radius-md)] bg-[var(--kz-component-table-surface)] border border-[var(--kz-color-border-default)]",
        className,
        containerClassName
      )}
    >
      {hasHeader && (
        <div
          className={cn(
            "kz-table-header border-b border-[var(--kz-component-table-row-border)] bg-[var(--kz-component-table-header-bg)] px-[var(--kz-space-4)] py-[var(--kz-space-3)]",
            headerClassName
          )}
        >
          {headerProp != null ? headerProp : defaultHeader}
        </div>
      )}
      <div
        className={cn(
          "kz-table-scroll overflow-auto",
          stickyHeader && "max-h-[60vh]"
        )}
      >
        <table
          id={tableId}
          aria-describedby={caption ? captionId : undefined}
          className={cn(
            "w-full border-collapse bg-[var(--kz-component-table-surface)]",
            tableClassName
          )}
        >
          {caption && (
            <caption id={captionId} className="sr-only">
              {caption}
            </caption>
          )}
          <thead>
            <tr>
              {selectableRows && (
                <th
                  scope="col"
                  className={cn(
                    "kz-table-th w-[var(--kz-space-10)] border-b border-[var(--kz-component-table-row-border)] bg-[var(--kz-component-table-header-bg)]",
                    sizeClass,
                    stickyHeader && "sticky top-0 z-10 bg-[var(--kz-component-table-header-bg)]"
                  )}
                  style={{ width: "var(--kz-space-10)" }}
                >
                  <Checkbox
                    size={CheckboxSize.Sm}
                    variant={CheckboxVariant.Default}
                    checked={allSelected}
                    indeterminate={someSelected && !allSelected}
                    onCheckedChange={(checked) => handleToggleAll(!!checked)}
                    aria-label="Toggle all rows"
                  />
                </th>
              )}
              {columns.map((col) => {
                const style: React.CSSProperties = {};
                if (col.width) style.width = col.width;
                if (col.minWidth) style.minWidth = col.minWidth;
                if (col.maxWidth) style.maxWidth = col.maxWidth;
                const align = col.align ?? "left";
                const isSortable = col.sortable && onSortChange != null;
                const isActive = sort?.key === col.key;
                const ariaSort: "ascending" | "descending" | "none" =
                  isActive && sort?.direction === "asc"
                    ? "ascending"
                    : isActive && sort?.direction === "desc"
                      ? "descending"
                      : "none";
                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={isSortable ? ariaSort : undefined}
                    className={cn(
                      "kz-table-th border-b border-[var(--kz-component-table-row-border)] bg-[var(--kz-component-table-header-bg)]",
                      sizeClass,
                      alignClasses[align],
                      stickyHeader && "sticky top-0 z-10 bg-[var(--kz-component-table-header-bg)]"
                    )}
                    style={style}
                  >
                    {isSortable ? (
                      <button
                        type="button"
                        onClick={() => handleSortClick(col.key)}
                        className="inline-flex items-center gap-1 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kz-color-border-focus)] rounded-[var(--kz-radius-sm)]"
                      >
                        {col.header}
                        <span className="inline-flex text-[var(--kz-color-text-muted)]" aria-hidden>
                          {isActive && sort?.direction === "asc" && (
                            <Icon name={IconName.ArrowUp} size="sm" color="currentColor" />
                          )}
                          {isActive && sort?.direction === "desc" && (
                            <Icon name={IconName.ArrowDown} size="sm" color="currentColor" />
                          )}
                          {!isActive && (
                            <Icon name={IconName.ArrowUpDown} size="sm" color="currentColor" />
                          )}
                        </span>
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                );
              })}
              {actions && (
                <th
                  scope="col"
                  className={cn(
                    "kz-table-th text-right w-[var(--kz-space-24)] border-b border-[var(--kz-component-table-row-border)] bg-[var(--kz-component-table-header-bg)]",
                    sizeClass,
                    stickyHeader && "sticky top-0 z-10 bg-[var(--kz-component-table-header-bg)]"
                  )}
                >
                  {actionsHeader ?? ""}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={
                    columns.length + (selectableRows ? 1 : 0) + (actions ? 1 : 0)
                  }
                  className={cn("kz-table-td text-center text-[var(--kz-color-text-muted)]", sizeClass)}
                >
                  Loading…
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    columns.length + (selectableRows ? 1 : 0) + (actions ? 1 : 0)
                  }
                  className={cn("kz-table-td text-center text-[var(--kz-color-text-muted)]", sizeClass)}
                >
                  {emptyState ?? "No data"}
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const rowId = getRowId(row, index);
                const isSelected = !!selectedRowIds[rowId];
                const isSticky = getRowSticky?.(row, index) ?? false;
                return (
                  <tr
                    key={rowId}
                    className={cn(
                      "kz-table-tr border-b border-[var(--kz-component-table-row-border)] last:border-b-0 hover:bg-[var(--kz-component-table-row-hover-bg)] transition-colors duration-[var(--kz-motion-duration-normal)]",
                      isSticky && "kz-table-tr--sticky"
                    )}
                  >
                    {selectableRows && (
                      <td
                        className={cn("kz-table-td", sizeClass)}
                      >
                        <Checkbox
                          size={CheckboxSize.Sm}
                          variant={CheckboxVariant.Default}
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            handleToggleRow(rowId, !!checked)
                          }
                          aria-label={`Select row ${rowId}`}
                        />
                      </td>
                    )}
                    {columns.map((col) => {
                      const style: React.CSSProperties = {};
                      if (col.width) style.width = col.width;
                      if (col.minWidth) style.minWidth = col.minWidth;
                      if (col.maxWidth) style.maxWidth = col.maxWidth;
                      const align = col.align ?? "left";
                      return (
                        <td
                          key={col.key}
                          className={cn(
                            "kz-table-td text-[var(--kz-color-text-primary)]",
                            sizeClass,
                            alignClasses[align]
                          )}
                          style={style}
                        >
                          {getCellContent(row, col)}
                        </td>
                      );
                    })}
                    {actions && (
                      <td
                        className={cn("kz-table-td text-right", sizeClass)}
                      >
                        {actions(row)}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && pageRange && onPageChange && (
        <div className="kz-table-footer flex flex-wrap items-center justify-between gap-3 border-t border-[var(--kz-component-table-row-border)] bg-[var(--kz-component-table-footer-bg)] px-[var(--kz-space-4)] py-[var(--kz-space-3)]">
          <div className="text-sm text-[var(--kz-color-text-secondary)]">
            {pageRange.startItem}–{pageRange.endItem} of {pagination.total}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant={ButtonVariant.Ghost}
              size={ButtonSize.Sm}
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="kz-table-pagination-prev-next"
              aria-label="Previous page"
            >
              <Icon name={IconName.ChevronLeft} size="sm" color="currentColor" aria-hidden />
            </Button>
            {pageRange.pages.map((p, i) =>
              p === "ellipsis" ? (
                <span
                  key={`e-${i}`}
                  className="px-2 text-[var(--kz-color-text-muted)]"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  data-active={p === pagination.page}
                  onClick={() => onPageChange(p)}
                  className="kz-table-pagination-page min-w-[var(--kz-space-8)] h-[var(--kz-space-8)] rounded-[var(--kz-radius-sm)] text-sm font-medium text-[var(--kz-color-text-primary)] bg-transparent border border-transparent hover:bg-[var(--kz-color-surface-muted)] hover:shadow-[var(--kz-component-table-pagination-hover-shadow)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kz-color-border-focus)] data-[active=true]:bg-[var(--kz-component-table-pagination-active-bg)] data-[active=true]:shadow-[var(--kz-component-table-pagination-active-shadow)]"
                >
                  {p}
                </button>
              )
            )}
            <Button
              variant={ButtonVariant.Ghost}
              size={ButtonSize.Sm}
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page >= pageRange.totalPages}
              className="kz-table-pagination-prev-next"
              aria-label="Next page"
            >
              <Icon name={IconName.ChevronRight} size="sm" color="currentColor" aria-hidden />
            </Button>
          </div>
          {onPageSizeChange && (
            <DropdownButton
              trigger={{
                label: String(pagination.pageSize),
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
        </div>
      )}
    </div>
  );
}

const Table = React.forwardRef(TableInner) as <TData>(
  props: TableProps<TData> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

export { Table };
export type { TableProps, TableColumn, TableSortState, TablePaginationState } from "./Table.types";
