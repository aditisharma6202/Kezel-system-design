import type * as React from "react";

export type TableSize = "sm" | "md" | "lg";
export type TableAlign = "left" | "center" | "right";
export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<TData, TEditValue = string> {
  key: string;
  header: React.ReactNode;
  accessor?: (row: TData) => React.ReactNode;
  cell?: (row: TData) => React.ReactNode;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: TableAlign;
  sortable?: boolean;
  /** Whether this column's cells are editable. Enables the pencil icon on hover. */
  editable?: boolean;
  /**
   * Custom edit renderer for this column. Defaults to a TextInput.
   * You can use any input component like DateRangePicker, Select, etc.
   * The value type is flexible - can be string, object, array, etc.
   */
  editCell?: (
    row: TData,
    value: TEditValue,
    onChange: (value: TEditValue) => void
  ) => React.ReactNode;
  /**
   * Optional: Get the initial value for editing this cell.
   * If not provided, uses the accessor result (converted to string).
   * Useful when you need to extract or transform the value for edit mode.
   */
  getEditValue?: (row: TData) => TEditValue;
}

export interface TableSortState {
  key: string;
  direction: SortDirection;
}

export interface TablePaginationState {
  page: number;
  pageSize: number;
  total: number;
}

/** A single pending cell change collected by multi-cell editing. */
export interface TableCellChange<TEditValue = string> {
  rowId: string;
  columnKey: string;
  value: TEditValue;
}

export interface TableProps<TData, TEditValue = string> {
  data: TData[];
  columns: TableColumn<TData, TEditValue>[];
  size?: TableSize;
  /** When true, the table can scroll horizontally when columns overflow (e.g. many columns or custom widths). */
  horizontalScroll?: boolean;
  /** When true and horizontalScroll is enabled, the checkbox column (left) and actions column (right) stay fixed while the rest scrolls. */
  stickyColumns?: boolean;
  stickyHeader?: boolean;
  /** Max height of the scrollable area (CSS value, e.g. "60vh", "400px"). Only applies when stickyHeader is true. Default: none (fills parent). */
  maxHeight?: string;
  getRowSticky?: (row: TData, index: number) => boolean;
  caption?: string;
  header?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  headerRight?: React.ReactNode;
  selectableRows?: boolean;
  selectedRowIds?: Record<string, boolean>;
  getRowId: (row: TData, index: number) => string;
  onRowSelectionChange?: (next: Record<string, boolean>) => void;
  onToggleRow?: (rowId: string, checked: boolean) => void;
  onToggleAll?: (checked: boolean, allRowIds: string[]) => void;
  /** Fires when the user clicks the delete-selected button. Receives the currently selected row IDs. */
  onDeleteSelected?: (selectedIds: string[]) => void;
  actions?: (row: TData) => React.ReactNode;
  actionsHeader?: React.ReactNode;
  sort?: TableSortState | null;
  onSortChange?: (next: TableSortState) => void;
  pagination?: TablePaginationState;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  loading?: boolean;
  emptyState?: React.ReactNode;

  /* ── Single-cell editing (legacy) ── */

  /** Controlled: which cell is currently being edited, or null. */
  editingCell?: { rowId: string; columnKey: string } | null;
  /** Fires when a cell enters/exits edit mode. */
  onEditingCellChange?: (
    cell: { rowId: string; columnKey: string } | null
  ) => void;
  /** Fires when the user clicks Save on an edited cell. The value can be any type (string, object, array, etc.). */
  onSave?: (rowId: string, columnKey: string, value: TEditValue) => void;
  /** Fires when the user clicks Cancel on an edited cell. */
  onCancel?: () => void;

  /* ── Multi-cell editing ── */

  /**
   * Controlled: set of cells currently in edit mode.
   * Map of rowId → columnKey → true.
   * When provided, multi-cell mode is active and `editingCell` is ignored.
   */
  editingCells?: Record<string, Record<string, boolean>>;
  /** Fires when the set of editing cells changes (cell added/removed). */
  onEditingCellsChange?: (
    cells: Record<string, Record<string, boolean>>
  ) => void;
  /**
   * Fires when the user clicks Save in multi-cell mode.
   * Receives all pending changes at once.
   */
  onSaveAll?: (changes: TableCellChange<TEditValue>[]) => void;

  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  containerClassName?: string;
}
