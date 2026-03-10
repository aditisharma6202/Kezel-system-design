import type * as React from "react";

export type SqlEditorSize = "sm" | "md" | "lg";

export interface SqlEditorQueryResult {
  /** Column names for the result table header */
  columns: string[];
  /** Result rows as key-value records */
  rows: Record<string, string | number | boolean | null>[];
  /** Status message shown below the editor (e.g. "3 rows returned in 1.2ms") */
  message: string;
  /** Whether the result is an error */
  error?: boolean;
}

export interface SqlEditorProps {
  /** Current SQL value (controlled) */
  value: string;
  /** Fires when the SQL text changes */
  onValueChange: (value: string) => void;
  /** Fires when the user clicks Run or presses Cmd/Ctrl+Enter */
  onExecute: (sql: string) => void;
  /** Query result to display below the editor */
  result?: SqlEditorQueryResult | null;
  /** Placeholder text for the textarea */
  placeholder?: string;
  /** Label shown in the toolbar (defaults to "Query") */
  toolbarLabel?: string;
  /** Text for the run button (defaults to "Run") */
  runButtonLabel?: string;
  /** Number of visible textarea rows (defaults to 5) */
  rows?: number;
  /** Size variant */
  size?: SqlEditorSize;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Whether the editor is loading / executing */
  loading?: boolean;
  /** Maximum height for the results area (defaults to "300px") */
  resultsMaxHeight?: string;
  /** Optional content rendered in the toolbar (right side, before Run button) */
  toolbarRight?: React.ReactNode;
  /** Root element className */
  className?: string;
}
