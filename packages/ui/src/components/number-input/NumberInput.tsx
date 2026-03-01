import * as React from "react";
import { cn } from "../../utils/cn";
import {
  TextInputVariant,
  TextInputSize,
  TextInputState,
  ButtonVariant,
  ButtonSize,
  ButtonAspectRatio,
} from "../../constants/enum";
import { Typography } from "../typography";
import { TypographyVariantEnum } from "../typography/typography-variants";
import { Button } from "../button";

const sizeToButtonSize: Record<TextInputSize, ButtonSize> = {
  [TextInputSize.Sm]: ButtonSize.Sm,
  [TextInputSize.Md]: ButtonSize.Sm,
  [TextInputSize.Lg]: ButtonSize.Md,
};

export interface NumberInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "onChange" | "type"
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

  value: number | undefined;
  onValueChange: (value: number | undefined) => void;

  min?: number;
  max?: number;
  step?: number;
  allowNegative?: boolean;
  allowDecimal?: boolean;

  containerClassName?: string;
  inputClassName?: string;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
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
      onValueChange,
      min,
      max,
      step = 1,
      allowNegative = true,
      allowDecimal = true,
      containerClassName,
      inputClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      value?.toString() ?? ""
    );

    React.useEffect(() => {
      setInternalValue(value?.toString() ?? "");
    }, [value]);

    const clamp = (num: number) => {
      if (min != null && num < min) return min;
      if (max != null && num > max) return max;
      return num;
    };

    const parseAndUpdate = (val: string) => {
      if (val === "") {
        onValueChange(undefined);
        return;
      }

      const parsed = allowDecimal ? parseFloat(val) : parseInt(val, 10);
      if (!isNaN(parsed)) {
        onValueChange(clamp(parsed));
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;

      const regex = allowDecimal
        ? allowNegative
          ? /^-?\d*\.?\d*$/
          : /^\d*\.?\d*$/
        : allowNegative
          ? /^-?\d*$/
          : /^\d*$/;

      if (!regex.test(next)) return;

      setInternalValue(next);
      parseAndUpdate(next);
    };

    const increment = () => {
      const current = value ?? 0;
      const next = clamp(current + step);
      onValueChange(next);
    };

    const decrement = () => {
      const current = value ?? 0;
      const next = clamp(current - step);
      onValueChange(next);
    };

    const stateMessage =
      state === TextInputState.Error
        ? errorText
        : state === TextInputState.Success
          ? successText
          : state === TextInputState.Warning
            ? warningText
            : undefined;

    const rootClass = cn("kz-number-input-root", containerClassName);

    const wrapperClass = cn(
      "kz-number-input-wrapper",
      `kz-number-input-wrapper--${variant}`,
      `kz-number-input-wrapper--${size}`,
      state !== TextInputState.Default && `kz-number-input-wrapper--${state}`
    );

    const inputClass = cn(
      "kz-number-input-input",
      `kz-number-input-input--${size}`,
      inputClassName
    );

    return (
      <div className={rootClass}>
        {label != null && label !== "" && (
          <label className="kz-number-input-label">
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
          <Button
            variant={ButtonVariant.Ghost}
            size={sizeToButtonSize[size]}
            aspectRatio={ButtonAspectRatio.Square}
            onClick={decrement}
            disabled={disabled}
            className="kz-number-input-stepper"
            aria-label="Decrease value"
          >
            −
          </Button>

          <input
            ref={ref}
            type="text"
            inputMode={allowDecimal ? "decimal" : "numeric"}
            value={internalValue}
            onChange={handleChange}
            disabled={disabled}
            className={inputClass}
            aria-invalid={state === TextInputState.Error}
            aria-describedby={
              stateMessage != null
                ? "number-input-message"
                : helperText != null
                  ? "number-input-helper"
                  : undefined
            }
            {...props}
          />

          <Button
            variant={ButtonVariant.Ghost}
            size={sizeToButtonSize[size]}
            aspectRatio={ButtonAspectRatio.Square}
            onClick={increment}
            disabled={disabled}
            className="kz-number-input-stepper"
            aria-label="Increase value"
          >
            +
          </Button>
        </div>

        {stateMessage != null && stateMessage !== "" && (
          <Typography
            id="number-input-message"
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
              id="number-input-helper"
              variant={TypographyVariantEnum.Caption}
            >
              {helperText}
            </Typography>
          )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput };
