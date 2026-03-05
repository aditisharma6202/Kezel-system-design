import * as React from "react";
import { cn } from "../../utils/cn";
import {
  TextInputVariant,
  TextInputSize,
  TextInputState,
  TextInputType,
} from "../../constants/enum";
import { Typography } from "../typography";
import { TypographyVariantEnum } from "../typography/typography-variants";
import { TypographyAlignEnum } from "../typography";
import { Icon, IconName } from "../../icon";

export interface TextInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  size?: TextInputSize;
  variant?: TextInputVariant;
  type?: TextInputType;

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

  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];

  /** Email: trim and lowercase value before calling onValueChange */
  normalizeEmail?: boolean;
  /** Number: allow negative values (default false) */
  allowNegative?: boolean;
  /** Number: allow decimal values (default false) */
  allowDecimal?: boolean;
}

const stateIcon: Record<
  TextInputState.Error | TextInputState.Success | TextInputState.Warning,
  IconName
> = {
  [TextInputState.Error]: IconName.CircleAlert,
  [TextInputState.Success]: IconName.CheckCircle,
  [TextInputState.Warning]: IconName.TriangleAlert,
};

/** Regex to strip characters invalid for the configured number mode. */
const buildNumberPattern = (
  allowNegative: boolean,
  allowDecimal: boolean
): RegExp => {
  let allowed = "0-9";
  if (allowNegative) allowed += "\\-";
  if (allowDecimal) allowed += ".";
  return new RegExp(`[^${allowed}]`, "g");
};

/** Returns true if the string is a structurally valid number for the given mode. */
const isValidNumber = (
  val: string,
  allowNegative: boolean,
  allowDecimal: boolean
): boolean => {
  if (val === "" || val === "-") return true;
  let pattern = "^";
  if (allowNegative) pattern += "-?";
  pattern += "\\d*";
  if (allowDecimal) pattern += "(\\.\\d*)?";
  pattern += "$";
  return new RegExp(pattern).test(val);
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      size = TextInputSize.Md,
      variant = TextInputVariant.Default,
      type = TextInputType.Text,
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
      inputMode: inputModeProp,
      normalizeEmail = false,
      allowNegative = false,
      allowDecimal = false,
      ...inputProps
    },
    ref
  ) => {
    const uniqueId = React.useId();
    const inputId = inputProps.id ?? `kz-text-input-${uniqueId}`;
    const messageId = `kz-text-input-message-${uniqueId}`;
    const helperId = `kz-text-input-helper-${uniqueId}`;

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const stateMessage =
      state === TextInputState.Error
        ? errorText
        : state === TextInputState.Success
          ? successText
          : state === TextInputState.Warning
            ? warningText
            : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let next = e.target.value;

      if (maxLength != null && next.length > maxLength) return;

      if (type === TextInputType.Number) {
        next = next.replace(
          buildNumberPattern(allowNegative, allowDecimal),
          ""
        );
        if (!isValidNumber(next, allowNegative, allowDecimal)) return;
      }

      if (type === TextInputType.Email && normalizeEmail) {
        next = next.trim().toLowerCase();
      }

      onValueChange(next);
    };

    const handleClear = () => {
      onValueChange("");
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    // Resolve the actual HTML input type
    let resolvedType: string = type;
    if (type === TextInputType.Password) {
      resolvedType = isPasswordVisible ? "text" : "password";
    }

    // Resolve inputMode: explicit prop wins, otherwise derive from type
    let resolvedInputMode = inputModeProp;
    if (resolvedInputMode == null) {
      if (type === TextInputType.Email) resolvedInputMode = "email";
      else if (type === TextInputType.Tel) resolvedInputMode = "tel";
      else if (type === TextInputType.Url) resolvedInputMode = "url";
      else if (type === TextInputType.Number) resolvedInputMode = "decimal";
      else if (type === TextInputType.Search) resolvedInputMode = "search";
    }

    // Resolve autoComplete for email
    const resolvedAutoComplete =
      type === TextInputType.Email && inputProps.autoComplete == null
        ? "email"
        : inputProps.autoComplete;

    const isDisabled = disabled ?? loading;

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
          <label className="kz-text-input-label" htmlFor={inputId}>
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
            id={inputId}
            type={resolvedType}
            value={value}
            placeholder={placeHolder}
            onChange={handleChange}
            disabled={isDisabled}
            maxLength={maxLength}
            className={inputClass}
            aria-invalid={state === TextInputState.Error}
            aria-describedby={
              stateMessage != null
                ? messageId
                : helperText != null
                  ? helperId
                  : undefined
            }
            {...(resolvedInputMode != null
              ? { inputMode: resolvedInputMode }
              : {})}
            {...(resolvedAutoComplete != null
              ? { autoComplete: resolvedAutoComplete }
              : {})}
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
          {type === TextInputType.Password && !isDisabled && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="kz-text-input-adornment kz-text-input-adornment--end"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              <Icon
                name={isPasswordVisible ? IconName.EyeOff : IconName.Eye}
                size={size === TextInputSize.Sm ? 14 : 16}
              />
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
            id={messageId}
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
            <Typography id={helperId} variant={TypographyVariantEnum.Caption}>
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
