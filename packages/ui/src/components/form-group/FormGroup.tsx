import * as React from "react";
import { cn } from "../../utils/cn";
import { TextInputState } from "../../constants/enum";
import { Typography } from "../typography";
import { TypographyVariantEnum } from "../typography/typography-variants";

/* ── Enums ── */

export enum FormGroupDirection {
  Vertical = "vertical",
  Horizontal = "horizontal",
}

/* ── Types ── */

export interface FormGroupProps {
  /** Label text rendered above the group. */
  label?: string;
  /** Description text below the label. */
  description?: string;

  /** Validation state. */
  state?: TextInputState;
  errorText?: string;
  successText?: string;
  warningText?: string;
  helperText?: string;

  /** Layout direction for children. Default: FormGroupDirection.Vertical */
  direction?: FormGroupDirection;
  /** Gap between children. Accepts any CSS value. Default: uses CSS token. */
  gap?: string | number;

  /** Render as <fieldset> + <legend>. Default: false */
  fieldset?: boolean;
  /** Show required asterisk after label. Default: false */
  required?: boolean;
  /** Disable the group visually. Default: false */
  disabled?: boolean;

  children?: React.ReactNode;
  className?: string;
}

/* ── Component ── */

const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  (
    {
      label,
      description,
      state = TextInputState.Default,
      errorText,
      successText,
      warningText,
      helperText,
      direction = FormGroupDirection.Vertical,
      gap,
      fieldset = false,
      required = false,
      disabled = false,
      children,
      className,
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

    const Root = fieldset ? "fieldset" : "div";
    const LabelTag = fieldset ? "legend" : "label";

    const resolvedGap =
      gap != null ? (typeof gap === "number" ? `${gap}px` : gap) : undefined;

    return (
      <Root
        ref={ref as React.Ref<HTMLFieldSetElement & HTMLDivElement>}
        className={cn(
          "kz-form-group",
          required && "kz-form-group--required",
          disabled && "kz-form-group--disabled",
          className
        )}
        disabled={fieldset ? disabled : undefined}
      >
        {label != null && label !== "" && (
          <LabelTag className="kz-form-group-legend">
            <Typography variant={TypographyVariantEnum.Label}>
              {label}
            </Typography>
          </LabelTag>
        )}

        {description != null && description !== "" && (
          <Typography variant={TypographyVariantEnum.Caption}>
            {description}
          </Typography>
        )}

        <div
          className={cn(
            "kz-form-group-content",
            `kz-form-group-content--${direction}`
          )}
          style={resolvedGap != null ? { gap: resolvedGap } : undefined}
        >
          {children}
        </div>

        {stateMessage != null && stateMessage !== "" && (
          <Typography
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
            <Typography variant={TypographyVariantEnum.Caption}>
              {helperText}
            </Typography>
          )}
      </Root>
    );
  }
);

FormGroup.displayName = "FormGroup";

export { FormGroup };
