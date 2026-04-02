import * as React from "react";
import { cn } from "../../utils/cn";
import { Checkbox, CheckboxSize, CheckboxVariant } from "../checkbox";
import { TextInput, TextInputSize, TextInputVariant } from "../text-input";
import { Button, ButtonVariant, ButtonSize, ButtonStatus } from "../button";
import { Icon, IconName } from "../../icon";
import { Pagination } from "../pagination";
import type {
  TableProps,
  TableColumn,
  TableCellChange,
  SortDirection,
} from "./Table.types";

function nextSortDirection(current: SortDirection): SortDirection {
  if (current === null) return "asc";
  if (current === "asc") return "desc";
  return null;
}

function getCellContent<TData, TEditValue = string>(
  row: TData,
  column: TableColumn<TData, TEditValue>
): React.ReactNode {
  if (column.cell) return column.cell(row);
  if (column.accessor) return column.accessor(row);
  return null;
}

function TableInner<TData, TEditValue = string>(
  {
    data,
    columns,
    size = "md",
    horizontalScroll = false,
    stickyColumns = false,
    stickyHeader = false,
    maxHeight,
    getRowSticky,
    getRowClassName,
    getRowStyle,
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
    onDeleteSelected,
    editingCell,
    onEditingCellChange,
    onSave,
    onCancel,
    editingCells,
    onEditingCellsChange,
    onSaveAll,
    className,
    tableClassName,
    headerClassName,
    footerClassName,
    containerClassName,
  }: TableProps<TData, TEditValue>,
  ref: React.Ref<HTMLDivElement>
) {
  const captionId = React.useId();
  const tableId = React.useId();

  const allRowIds = React.useMemo(
    () => data.map((row, i) => getRowId(row, i)),
    [data, getRowId]
  );

  const visibleColumns = React.useMemo(
    () => columns.filter((col) => !col.hidden),
    [columns]
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

  const hasPagination = pagination != null && onPageChange != null;

  /* ── Inline cell editing ── */

  // Detect which mode we're in: multi-cell takes precedence
  const isMultiCellMode = editingCells != null;

  // --- Single-cell draft (legacy) ---
  const [draftValue, setDraftValue] = React.useState<TEditValue | null>(null);

  React.useEffect(() => {
    if (isMultiCellMode) return; // skip in multi-cell mode
    if (editingCell == null) {
      setDraftValue(null);
      return;
    }
    const row = data.find((r, i) => getRowId(r, i) === editingCell.rowId);
    if (!row) return;
    const col = columns.find((c) => c.key === editingCell.columnKey);
    if (!col) return;

    let val: TEditValue;
    if (col.getEditValue) {
      val = col.getEditValue(row);
    } else if (col.accessor) {
      val = col.accessor(row) as TEditValue;
    } else {
      val = "" as TEditValue;
    }
    setDraftValue(val ?? ("" as TEditValue));
  }, [editingCell, data, columns, getRowId, isMultiCellMode]);

  // --- Multi-cell drafts ---
  // Map: rowId → columnKey → draft value
  const [draftValues, setDraftValues] = React.useState<
    Record<string, Record<string, TEditValue>>
  >({});

  /** Seed a draft value for a cell when it enters edit mode (multi-cell). */
  const seedDraft = React.useCallback(
    (rowId: string, columnKey: string) => {
      const row = data.find((r, i) => getRowId(r, i) === rowId);
      if (!row) return;
      const col = columns.find((c) => c.key === columnKey);
      if (!col) return;

      let val: TEditValue;
      if (col.getEditValue) {
        val = col.getEditValue(row);
      } else if (col.accessor) {
        val = col.accessor(row) as TEditValue;
      } else {
        val = "" as TEditValue;
      }

      setDraftValues((prev) => ({
        ...prev,
        [rowId]: { ...prev[rowId], [columnKey]: val ?? ("" as TEditValue) },
      }));
    },
    [data, columns, getRowId]
  );

  const handleEditCellClick = React.useCallback(
    (rowId: string, columnKey: string) => {
      if (isMultiCellMode) {
        // Add to the editing set
        const next = {
          ...editingCells,
          [rowId]: { ...editingCells[rowId], [columnKey]: true },
        };
        onEditingCellsChange?.(next);
        seedDraft(rowId, columnKey);
      } else {
        onEditingCellChange?.({ rowId, columnKey });
      }
    },
    [
      isMultiCellMode,
      editingCells,
      onEditingCellsChange,
      onEditingCellChange,
      seedDraft,
    ]
  );

  const handleCellSave = React.useCallback(() => {
    if (isMultiCellMode) {
      // Collect all changes
      const changes: TableCellChange<TEditValue>[] = [];
      for (const rowId of Object.keys(draftValues)) {
        for (const columnKey of Object.keys(draftValues[rowId])) {
          changes.push({
            rowId,
            columnKey,
            value: draftValues[rowId][columnKey],
          });
        }
      }
      onSaveAll?.(changes);
      onEditingCellsChange?.({});
      setDraftValues({});
    } else {
      if (editingCell != null && draftValue != null) {
        onSave?.(editingCell.rowId, editingCell.columnKey, draftValue);
        onEditingCellChange?.(null);
      }
    }
  }, [
    isMultiCellMode,
    draftValues,
    onSaveAll,
    onEditingCellsChange,
    editingCell,
    draftValue,
    onSave,
    onEditingCellChange,
  ]);

  const handleCellCancel = React.useCallback(() => {
    if (isMultiCellMode) {
      onEditingCellsChange?.({});
      setDraftValues({});
    } else {
      onEditingCellChange?.(null);
    }
    onCancel?.();
  }, [isMultiCellMode, onEditingCellsChange, onEditingCellChange, onCancel]);

  const handleDeleteSelected = React.useCallback(() => {
    if (!onDeleteSelected) return;
    const ids = Object.keys(selectedRowIds).filter((id) => selectedRowIds[id]);
    if (ids.length > 0) onDeleteSelected(ids);
  }, [selectedRowIds, onDeleteSelected]);

  const defaultHeader = (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 w-full m-[kz-space-4]",
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
            "kz-table-header border-b border-[var(--kz-component-table-row-border)] bg-[var(--kz-component-table-header-bg)] px-[var(--kz-space-6)] py-[var(--kz-space-4)]",
            headerClassName
          )}
        >
          {headerProp != null ? headerProp : defaultHeader}
        </div>
      )}
      <div
        className={cn(
          "kz-table-scroll overflow-auto flex-1",
          stickyHeader && !maxHeight && "max-h-full"
        )}
        style={maxHeight ? { maxHeight } : undefined}
      >
        <table
          id={tableId}
          aria-describedby={caption ? captionId : undefined}
          className={cn(
            "border-separate border-spacing-0 bg-[var(--kz-component-table-surface)]",
            horizontalScroll ? "min-w-full w-max" : "w-full",
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
                    stickyHeader &&
                      "sticky top-0 z-10 bg-[var(--kz-component-table-header-bg)]",
                    stickyColumns &&
                      horizontalScroll &&
                      "sticky left-0 z-20 bg-[var(--kz-component-table-header-bg)]"
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
              {visibleColumns.map((col) => {
                const thStyle: React.CSSProperties = {
                  ...col.headerStyle,
                };
                if (col.width) thStyle.width = col.width;
                if (col.minWidth) thStyle.minWidth = col.minWidth;
                if (col.maxWidth) thStyle.maxWidth = col.maxWidth;
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
                      stickyHeader &&
                        "sticky top-0 z-10 bg-[var(--kz-component-table-header-bg)]",
                      col.headerClassName
                    )}
                    style={thStyle}
                  >
                    {isSortable ? (
                      <button
                        type="button"
                        onClick={() => handleSortClick(col.key)}
                        className="inline-flex items-center gap-1 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kz-color-border-focus)] rounded-[var(--kz-radius-sm)]"
                      >
                        {col.header}
                        <span
                          className="inline-flex text-[var(--kz-color-text-muted)]"
                          aria-hidden
                        >
                          {isActive && sort?.direction === "asc" && (
                            <Icon
                              name={IconName.ArrowUp}
                              size="sm"
                              color="currentColor"
                            />
                          )}
                          {isActive && sort?.direction === "desc" && (
                            <Icon
                              name={IconName.ArrowDown}
                              size="sm"
                              color="currentColor"
                            />
                          )}
                          {!isActive && (
                            <Icon
                              name={IconName.ArrowUpDown}
                              size="sm"
                              color="currentColor"
                            />
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
                    stickyHeader &&
                      "sticky top-0 z-10 bg-[var(--kz-component-table-header-bg)]",
                    stickyColumns &&
                      horizontalScroll &&
                      "sticky right-0 z-20 bg-[var(--kz-component-table-header-bg)]"
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
                    visibleColumns.length +
                    (selectableRows ? 1 : 0) +
                    (actions ? 1 : 0)
                  }
                  className={cn(
                    "kz-table-td text-center text-[var(--kz-color-text-muted)]",
                    sizeClass
                  )}
                >
                  Loading…
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    visibleColumns.length +
                    (selectableRows ? 1 : 0) +
                    (actions ? 1 : 0)
                  }
                  className={cn(
                    "kz-table-td text-center text-[var(--kz-color-text-muted)]",
                    sizeClass
                  )}
                >
                  {emptyState ?? "No data"}
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const rowId = getRowId(row, index);
                const isSelected = !!selectedRowIds[rowId];
                const isSticky = getRowSticky?.(row, index) ?? false;
                const hasEditingCell = isMultiCellMode
                  ? editingCells[rowId] != null &&
                    Object.keys(editingCells[rowId]).some(
                      (k) => editingCells[rowId][k]
                    )
                  : editingCell != null && editingCell.rowId === rowId;
                return (
                  <tr
                    key={rowId}
                    className={cn(
                      "kz-table-tr border-b border-[var(--kz-component-table-row-border)] last:border-b-0 hover:bg-[var(--kz-component-table-row-hover-bg)] transition-colors duration-[var(--kz-motion-duration-normal)]",
                      isSticky && "kz-table-tr--sticky",
                      hasEditingCell && "kz-table-tr--editing",
                      getRowClassName?.(row, index)
                    )}
                    style={getRowStyle?.(row, index)}
                  >
                    {selectableRows && (
                      <td
                        className={cn(
                          "kz-table-td",
                          sizeClass,
                          stickyColumns &&
                            horizontalScroll &&
                            "sticky left-0 z-10 bg-[var(--kz-component-table-surface)]"
                        )}
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
                    {visibleColumns.map((col) => {
                      const tdStyle: React.CSSProperties = {
                        ...col.cellStyle,
                      };
                      if (col.width) tdStyle.width = col.width;
                      if (col.minWidth) tdStyle.minWidth = col.minWidth;
                      if (col.maxWidth) tdStyle.maxWidth = col.maxWidth;
                      const align = col.align ?? "left";
                      const isCellEditing = isMultiCellMode
                        ? !!editingCells[rowId]?.[col.key]
                        : editingCell != null &&
                          editingCell.rowId === rowId &&
                          editingCell.columnKey === col.key;

                      if (isCellEditing) {
                        // In multi-cell mode read/write from draftValues map;
                        // in single-cell mode use draftValue.
                        const cellDraft = isMultiCellMode
                          ? (draftValues[rowId]?.[col.key] ??
                            ("" as TEditValue))
                          : (draftValue ?? ("" as TEditValue));

                        const onChange = (v: TEditValue) => {
                          if (isMultiCellMode) {
                            setDraftValues((prev) => ({
                              ...prev,
                              [rowId]: { ...prev[rowId], [col.key]: v },
                            }));
                          } else {
                            setDraftValue(v);
                          }
                        };

                        return (
                          <td
                            key={col.key}
                            className={cn(
                              "kz-table-td text-[var(--kz-color-text-primary)]",
                              sizeClass,
                              alignClasses[align],
                              col.cellClassName
                            )}
                            style={tdStyle}
                          >
                            {col.editCell ? (
                              col.editCell(row, cellDraft, onChange)
                            ) : (
                              <TextInput
                                label=""
                                placeHolder=""
                                value={String(cellDraft ?? "")}
                                onValueChange={(v) => onChange(v as TEditValue)}
                                size={TextInputSize.Sm}
                                variant={TextInputVariant.Default}
                              />
                            )}
                          </td>
                        );
                      }

                      return (
                        <td
                          key={col.key}
                          className={cn(
                            "kz-table-td text-[var(--kz-color-text-primary)]",
                            sizeClass,
                            alignClasses[align],
                            col.editable && "kz-table-td--editable",
                            col.cellClassName
                          )}
                          style={tdStyle}
                        >
                          {getCellContent(row, col)}
                          {col.editable && (
                            <button
                              type="button"
                              className="kz-table-cell-edit-icon"
                              aria-label={`Edit ${col.header}`}
                              onClick={() =>
                                handleEditCellClick(rowId, col.key)
                              }
                            >
                              <Icon
                                name={IconName.Pencil}
                                size={14}
                                color="currentColor"
                              />
                            </button>
                          )}
                        </td>
                      );
                    })}
                    {actions && (
                      <td
                        className={cn(
                          "kz-table-td text-right",
                          sizeClass,
                          stickyColumns &&
                            horizontalScroll &&
                            "sticky right-0 z-10 bg-[var(--kz-component-table-surface)]"
                        )}
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
      {(hasPagination ||
        (someSelected && onDeleteSelected) ||
        editingCell != null ||
        (isMultiCellMode &&
          Object.keys(editingCells).some((rid) =>
            Object.values(editingCells[rid]).some(Boolean)
          ))) && (
        <div
          className={cn(
            "kz-table-footer flex items-center border-t border-[var(--kz-component-table-row-border)] bg-[var(--kz-component-table-footer-bg)] px-[var(--kz-space-6)] py-[var(--kz-space-4)]",
            footerClassName
          )}
        >
          {/* Left: delete selected */}
          <div className="flex items-center gap-[var(--kz-space-2)] shrink-0">
            {someSelected && onDeleteSelected && (
              <Button
                variant={ButtonVariant.Ghost}
                size={ButtonSize.Sm}
                onClick={handleDeleteSelected}
                className="text-[var(--kz-color-error)] hover:text-[var(--kz-color-error)] hover:bg-[var(--kz-color-error-subtle)]"
                aria-label="Delete selected rows"
              >
                <Icon
                  name={IconName.Trash2}
                  size={14}
                  color="currentColor"
                  aria-hidden
                />
                <span className="ml-1">Delete ({selectedCount})</span>
              </Button>
            )}
          </div>
          {/* Center: pagination */}
          {hasPagination ? (
            <div className="flex-1 min-w-0">
              <Pagination
                page={pagination.page}
                total={pagination.total}
                pageSize={pagination.pageSize}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                pageSizeOptions={pageSizeOptions}
              />
            </div>
          ) : (
            <div className="flex-1" />
          )}
          {/* Right: save / cancel */}
          <div className="flex items-center gap-[var(--kz-space-2)] shrink-0 ml-[var(--kz-space-3)]">
            {(editingCell != null ||
              (isMultiCellMode &&
                Object.keys(editingCells).some((rid) =>
                  Object.values(editingCells[rid]).some(Boolean)
                ))) && (
              <>
                <Button
                  variant={ButtonVariant.Primary}
                  size={ButtonSize.Sm}
                  onClick={handleCellCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant={ButtonVariant.Primary}
                  status={ButtonStatus.Success}
                  size={ButtonSize.Sm}
                  onClick={handleCellSave}
                >
                  Save
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const Table = React.forwardRef(TableInner) as <TData, TEditValue = string>(
  props: TableProps<TData, TEditValue> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

export { Table };
export type {
  TableProps,
  TableColumn,
  TableSortState,
  TablePaginationState,
} from "./Table.types";
