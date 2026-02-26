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

export interface TextInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
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

  containerClassName?: string;
  inputClassName?: string;
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

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
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
      containerClassName,
      inputClassName,
      disabled,
      showStateIcon = true,
      ...inputProps
    },
    ref
  ) => {
    const stateMessage =
      state === TextInputState.Error
        ? errorText
        : state === TextInputState.Success
          ? successText
          : state === TextInputState.Warning
            ? warningText
            : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      if (maxLength != null && next.length > maxLength) return;
      onValueChange(next);
    };

    const handleClear = () => {
      onValueChange("");
    };

    const wrapperClass = cn(
      "kz-text-input-wrapper",
      `kz-text-input-wrapper--${variant}`,
      `kz-text-input-wrapper--${size}`,
      state !== TextInputState.Default && `kz-text-input-wrapper--${state}`
    );

    const inputClass = cn(
      "kz-text-input-input",
      `kz-text-input-input--${size}`,
      inputClassName
    );

    const rootClass = cn("kz-text-input-root", containerClassName);

    return (
      <div className={rootClass}>
        {label != null && label !== "" && (
          <label className="kz-text-input-label">
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
            <span className="kz-text-input-adornment kz-text-input-adornment--start">
              {startAdornment}
            </span>
          )}
          <input
            ref={ref}
            type="text"
            value={value}
            placeholder={placeHolder}
            onChange={handleChange}
            disabled={disabled ?? loading}
            maxLength={maxLength}
            className={inputClass}
            aria-invalid={state === TextInputState.Error}
            aria-describedby={
              stateMessage != null
                ? "text-input-message"
                : helperText != null
                  ? "text-input-helper"
                  : undefined
            }
            {...inputProps}
          />
          {clearable && value.length > 0 && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="kz-text-input-adornment kz-text-input-clear"
              aria-label="Clear"
            >
              ×
            </button>
          )}
          {endAdornment != null && (
            <span className="kz-text-input-adornment kz-text-input-adornment--end">
              {endAdornment}
            </span>
          )}
          {showStateIcon && (
            <span
              className="kz-text-input-adornment kz-text-input-state-icon"
              aria-hidden
            >
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
            id="text-input-message"
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
              id="text-input-helper"
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

TextInput.displayName = "TextInput";

export { TextInput };
