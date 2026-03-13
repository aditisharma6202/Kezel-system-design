export interface PaginationProps {
  /** Current active page (1-based). */
  page: number;
  /** Total number of items. */
  total: number;
  /** Items per page. */
  pageSize: number;
  /** Called when user changes page. */
  onPageChange: (page: number) => void;
  /** Called when user changes page size. */
  onPageSizeChange?: (pageSize: number) => void;
  /** Available page size options for the dropdown. */
  pageSizeOptions?: number[];
  /** Show the "X–Y of Z" item range text. @default true */
  showItemRange?: boolean;
  /** Additional className on the root element. */
  className?: string;
}
