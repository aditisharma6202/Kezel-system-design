import * as React from "react";
import { cn } from "../../utils/cn";
import {
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "../../constants/enum";
import { Typography } from "../typography";
import { TypographyVariantEnum } from "../typography/typography-variants";
import { Icon, IconName } from "../../icon";

/* ── Helpers ── */

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

/* ── Props ── */

export interface FileUploaderProps {
  /** Controlled value (File[]). Omit for uncontrolled. */
  value?: File[];
  /** Initial value for uncontrolled mode. */
  defaultValue?: File[];
  /** Fires when files change (added or removed). */
  onChange?: (files: File[]) => void;

  /** MIME type accept string, e.g. "image/*,.pdf" */
  accept?: string;
  /** Allow multiple files. Default: true */
  multiple?: boolean;
  /** Max file size in bytes per file. */
  maxSize?: number;
  /** Max number of files allowed. */
  maxFiles?: number;

  placeholder?: string;
  disabled?: boolean;

  size?: TextInputSize;
  variant?: TextInputVariant;
  state?: TextInputState;

  errorText?: string;
  successText?: string;
  warningText?: string;

  label?: string;
  helperText?: string;
  description?: string;

  className?: string;
}

/* ── Component ── */

const FileUploader = React.forwardRef<HTMLInputElement, FileUploaderProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onChange,
      accept,
      multiple = true,
      maxSize,
      maxFiles,
      placeholder = "Choose files…",
      disabled = false,
      size = TextInputSize.Md,
      variant = TextInputVariant.Default,
      state = TextInputState.Default,
      errorText,
      successText,
      warningText,
      label,
      helperText,
      description,
      className,
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = React.useState<File[]>(
      defaultValue ?? []
    );

    const files = isControlled ? valueProp : internalValue;

    const fireChange = React.useCallback(
      (next: File[]) => {
        if (!isControlled) {
          setInternalValue(next);
        }
        onChange?.(next);
      },
      [isControlled, onChange]
    );

    const [isDragOver, setIsDragOver] = React.useState(false);
    const dragCounterRef = React.useRef(0);

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current!);

    const validateAndAdd = (incoming: File[]) => {
      let filtered = incoming;
      if (maxSize != null) {
        filtered = filtered.filter((f) => f.size <= maxSize);
      }
      let merged = [...files, ...filtered];
      if (maxFiles != null) {
        merged = merged.slice(0, maxFiles);
      }
      fireChange(merged);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        validateAndAdd(Array.from(e.target.files));
      }
      e.target.value = "";
    };

    const handleWrapperClick = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current += 1;
      if (!disabled) setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current -= 1;
      if (dragCounterRef.current === 0) setIsDragOver(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current = 0;
      setIsDragOver(false);
      if (disabled) return;
      if (e.dataTransfer.files) {
        validateAndAdd(Array.from(e.dataTransfer.files));
      }
    };

    const handleRemove = (index: number) => {
      const next = files.filter((_, i) => i !== index);
      fireChange(next);
    };

    const stateMessage =
      state === TextInputState.Error
        ? errorText
        : state === TextInputState.Success
          ? successText
          : state === TextInputState.Warning
            ? warningText
            : undefined;

    const rootClass = cn("kz-file-uploader-root", className);

    const wrapperClass = cn(
      "kz-file-uploader-wrapper",
      `kz-file-uploader-wrapper--${variant}`,
      `kz-file-uploader-wrapper--${size}`,
      state !== TextInputState.Default && `kz-file-uploader-wrapper--${state}`,
      isDragOver && "kz-file-uploader-wrapper--dragover",
      disabled && "kz-file-uploader-wrapper--disabled"
    );

    const textClass = cn(
      "kz-file-uploader-text",
      `kz-file-uploader-text--${size}`,
      files.length > 0 && "kz-file-uploader-text--has-files"
    );

    const iconSize = size === TextInputSize.Sm ? 14 : 16;
    const itemIconSize = size === TextInputSize.Sm ? 14 : 16;
    const removeIconSize = size === TextInputSize.Sm ? 12 : 14;

    const displayText =
      files.length === 0
        ? placeholder
        : files.length === 1
          ? files[0].name
          : `${files.length} files selected`;

    return (
      <div className={rootClass}>
        {label != null && label !== "" && (
          <label className="kz-file-uploader-label">
            <Typography variant={TypographyVariantEnum.Label}>
              {label}
            </Typography>
          </label>
        )}

        {description != null && description !== "" && (
          <Typography variant={TypographyVariantEnum.Caption}>
            {description}
          </Typography>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className="kz-file-uploader-input"
          tabIndex={-1}
          aria-hidden
        />

        <div
          className={wrapperClass}
          onClick={handleWrapperClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <span className={textClass}>{displayText}</span>
          <span className="kz-file-uploader-icon">
            <Icon name={IconName.FilePlus} size={iconSize} />
          </span>
        </div>

        {files.length > 0 && (
          <ul className="kz-file-uploader-list">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.size}-${index}`}
                className="kz-file-uploader-item"
              >
                <Icon
                  name={IconName.FileText}
                  size={itemIconSize}
                  className="kz-file-uploader-item-icon"
                />
                <span className="kz-file-uploader-item-name">{file.name}</span>
                <span className="kz-file-uploader-item-size">
                  {formatFileSize(file.size)}
                </span>
                <button
                  type="button"
                  className="kz-file-uploader-item-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                  aria-label={`Remove ${file.name}`}
                  disabled={disabled}
                >
                  <Icon name={IconName.X} size={removeIconSize} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {stateMessage != null && stateMessage !== "" && (
          <Typography
            id="file-uploader-message"
            variant={
              state === TextInputState.Error
                ? TypographyVariantEnum.Error
                : state === TextInputState.Success
                  ? TypographyVariantEnum.Success
                  : TypographyVariantEnum.Warning
            }
          >
            {stateMessage}
          </Typography>
        )}

        {helperText != null &&
          helperText !== "" &&
          state === TextInputState.Default && (
            <Typography
              id="file-uploader-helper"
              variant={TypographyVariantEnum.Caption}
            >
              {helperText}
            </Typography>
          )}
      </div>
    );
  }
);

FileUploader.displayName = "FileUploader";

export { FileUploader };
