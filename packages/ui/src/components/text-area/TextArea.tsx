import * as React from "react";
import { cn } from "../../utils/cn";
import {
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "../../constants/enum";
import { Typography } from "../typography";
import { TypographyVariantEnum } from "../typography/typography-variants";
import { TypographyAlignEnum } from "../typography";
import { Icon, IconName } from "../../icon";

export interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  size?: TextInputSize;
  variant?: TextInputVariant;

  label?: string;
  helperText?: string;
  description?: string;

  state?: TextInputState;
  errorText?: string;
  successText?: string;
  warningText?: string;

  value: string;
  placeHolder: string;
  onValueChange: (value: string) => void;

  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;

  loading?: boolean;
  clearable?: boolean;
  showCount?: boolean;
  maxLength?: number;

  autoResize?: boolean;

  containerClassName?: string;
  textareaClassName?: string;
  showStateIcon?: boolean;
}

const stateIcon: Record<
  TextInputState.Error | TextInputState.Success | TextInputState.Warning,
  IconName
> = {
  [TextInputState.Error]: IconName.CircleAlert,
  [TextInputState.Success]: IconName.CheckCircle,
  [TextInputState.Warning]: IconName.TriangleAlert,
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      size = TextInputSize.Md,
      variant = TextInputVariant.Default,
      label,
      helperText,
      description,
      state = TextInputState.Default,
      errorText,
      successText,
      warningText,
      value,
      placeHolder,
      onValueChange,
      startAdornment,
      endAdornment,
      loading = false,
      clearable = false,
      showCount = false,
      maxLength,
      autoResize = true,
      containerClassName,
      textareaClassName,
      disabled,
      showStateIcon = true,
      rows = 3,
      ...textareaProps
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    React.useImperativeHandle(ref, () => textareaRef.current!);

    const stateMessage =
      state === TextInputState.Error
        ? errorText
        : state === TextInputState.Success
          ? successText
          : state === TextInputState.Warning
            ? warningText
            : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const next = e.target.value;
      if (maxLength != null && next.length > maxLength) return;
      onValueChange(next);
    };

    const handleClear = () => {
      onValueChange("");
    };

    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    }, [value, autoResize]);

    const wrapperClass = cn(
      "kz-textarea-wrapper",
      `kz-textarea-wrapper--${variant}`,
      `kz-textarea-wrapper--${size}`,
      state !== TextInputState.Default && `kz-textarea-wrapper--${state}`
    );

    const textareaClass = cn(
      "kz-textarea-input",
      `kz-textarea-input--${size}`,
      textareaClassName
    );

    const rootClass = cn("kz-textarea-root", containerClassName);

    return (
      <div className={rootClass}>
        {label != null && label !== "" && (
          <label className="kz-textarea-label">
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

        <div className={wrapperClass}>
          {startAdornment != null && (
            <span className="kz-textarea-adornment kz-textarea-adornment--start">
              {startAdornment}
            </span>
          )}

          <textarea
            ref={textareaRef}
            value={value}
            placeholder={placeHolder}
            onChange={handleChange}
            disabled={disabled ?? loading}
            maxLength={maxLength}
            rows={rows}
            className={textareaClass}
            aria-invalid={state === TextInputState.Error}
            aria-describedby={
              stateMessage != null
                ? "textarea-message"
                : helperText != null
                  ? "textarea-helper"
                  : undefined
            }
            style={{ resize: autoResize ? "none" : "vertical" }}
            {...textareaProps}
          />

          {clearable && value.length > 0 && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="kz-textarea-adornment kz-textarea-clear"
              aria-label="Clear"
            >
              ×
            </button>
          )}

          {endAdornment != null && (
            <span className="kz-textarea-adornment kz-textarea-adornment--end">
              {endAdornment}
            </span>
          )}

          {showStateIcon && state !== TextInputState.Default && (
            <span className="kz-textarea-state-icon" aria-hidden>
              <Icon
                name={
                  stateIcon[
                    state as
                      | TextInputState.Error
                      | TextInputState.Success
                      | TextInputState.Warning
                  ]
                }
                size={size === TextInputSize.Sm ? 14 : 16}
                color={
                  state === TextInputState.Error
                    ? "var(--kz-typography-error-color)"
                    : state === TextInputState.Success
                      ? "var(--kz-typography-success-color)"
                      : "var(--kz-typography-warning-color)"
                }
              />
            </span>
          )}
        </div>

        {stateMessage != null && stateMessage !== "" && (
          <Typography
            id="textarea-message"
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
              id="textarea-helper"
              variant={TypographyVariantEnum.Caption}
            >
              {helperText}
            </Typography>
          )}

        {showCount && maxLength != null && (
          <Typography
            variant={TypographyVariantEnum.Caption}
            align={TypographyAlignEnum.Right}
          >
            {value.length}/{maxLength}
          </Typography>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
