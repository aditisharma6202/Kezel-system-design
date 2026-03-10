import * as React from "react";
import { cn } from "../../utils/cn";
import { Button, ButtonVariant, ButtonSize } from "../button";
import { Icon, IconName } from "../../icon";
import type { SqlEditorProps } from "./SqlEditor.types";

const sizeClasses = {
  sm: {
    toolbar: "px-2 py-1",
    textarea: "px-2 py-1.5 text-xs leading-4",
    status: "px-2 py-1 text-[11px]",
    result: "text-xs",
    resultCell: "px-2 py-1",
  },
  md: {
    toolbar: "px-3 py-1.5",
    textarea: "px-3 py-3 text-sm leading-[22px]",
    status: "px-3 py-1 text-xs",
    result: "text-[13px]",
    resultCell: "px-3 py-1.5",
  },
  lg: {
    toolbar: "px-4 py-2",
    textarea: "px-4 py-3.5 text-base leading-6",
    status: "px-4 py-1.5 text-sm",
    result: "text-sm",
    resultCell: "px-4 py-2",
  },
};

function SqlEditorInner(
  {
    value,
    onValueChange,
    onExecute,
    result,
    placeholder = "SELECT * FROM ...",
    toolbarLabel = "Query",
    runButtonLabel = "Run",
    rows = 5,
    size = "md",
    disabled = false,
    loading = false,
    resultsMaxHeight = "300px",
    toolbarRight,
    className,
  }: SqlEditorProps,
  ref: React.Ref<HTMLDivElement>
) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const sc = sizeClasses[size];

  const handleRun = React.useCallback(() => {
    if (!disabled && !loading) {
      onExecute(value);
    }
  }, [value, onExecute, disabled, loading]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Cmd/Ctrl + Enter to run
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
      // Tab inserts two spaces
      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue =
          value.substring(0, start) + "  " + value.substring(end);
        onValueChange(newValue);
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        });
      }
    },
    [handleRun, value, onValueChange]
  );

  const hasResult = result != null;
  const hasRows = hasResult && !result.error && result.rows.length > 0;

  return (
    <div
      ref={ref}
      className={cn("kz-sql-editor-root", className)}
    >
      {/* Toolbar */}
      <div className={cn("kz-sql-editor-toolbar", sc.toolbar)}>
        <span className="kz-sql-editor-toolbar-label">{toolbarLabel}</span>
        <div className="flex items-center gap-2">
          {toolbarRight}
          <Button
            variant={ButtonVariant.Primary}
            size={size === "lg" ? ButtonSize.Md : ButtonSize.Sm}
            onClick={handleRun}
            disabled={disabled || loading}
          >
            <Icon
              name={IconName.ChevronRight}
              size={14}
              color="currentColor"
            />
            <span className="ml-1">
              {loading ? "Running…" : runButtonLabel}
            </span>
          </Button>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        className={cn("kz-sql-editor-textarea", sc.textarea)}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        rows={rows}
        disabled={disabled}
      />

      {/* Status bar */}
      {hasResult && (
        <div className={cn("kz-sql-editor-status", sc.status)}>
          <span
            className={cn(
              "kz-sql-editor-status-text",
              result.error && "kz-sql-editor-status-text--error",
              !result.error && "kz-sql-editor-status-text--success"
            )}
          >
            {result.message}
          </span>
        </div>
      )}

      {/* Results table */}
      {hasRows && (
        <div
          className="kz-sql-editor-results"
          style={{ maxHeight: resultsMaxHeight }}
        >
          <table>
            <thead>
              <tr>
                {result.columns.map((col) => (
                  <th key={col} className={sc.resultCell}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, i) => (
                <tr key={i}>
                  {result.columns.map((col) => (
                    <td key={col} className={sc.resultCell}>
                      {row[col] == null ? "" : String(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {hasResult && !result.error && result.rows.length === 0 && (
        <div className="kz-sql-editor-empty">No rows returned</div>
      )}
    </div>
  );
}

const SqlEditor = React.forwardRef(SqlEditorInner);
SqlEditor.displayName = "SqlEditor";

export { SqlEditor };
