import type * as React from "react";

export type TableSize = "sm" | "md" | "lg";
export type TableAlign = "left" | "center" | "right";
export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<TData> {
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
  /** Custom edit renderer for this column. Defaults to a TextInput. */
  editCell?: (
    row: TData,
    value: string,
    onChange: (value: string) => void
  ) => React.ReactNode;
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

export interface TableProps<TData> {
  data: TData[];
  columns: TableColumn<TData>[];
  size?: TableSize;
  /** When true, the table can scroll horizontally when columns overflow (e.g. many columns or custom widths). */
  horizontalScroll?: boolean;
  stickyHeader?: boolean;
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
  /** Controlled: which cell is currently being edited, or null. */
  editingCell?: { rowId: string; columnKey: string } | null;
  /** Fires when a cell enters/exits edit mode. */
  onEditingCellChange?: (
    cell: { rowId: string; columnKey: string } | null
  ) => void;
  /** Fires when the user clicks Save on an edited cell. */
  onSave?: (rowId: string, columnKey: string, value: string) => void;
  /** Fires when the user clicks Cancel on an edited cell. */
  onCancel?: () => void;
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  containerClassName?: string;
}
