import * as React from "react";
import { RadioSize } from "../../constants/enum";
import { radioButtonVariants } from "./radio-button.variants";
import { cn } from "../../utils/cn";

export interface RadioButtonProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "onChange"
> {
  size?: RadioSize;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      className,
      size = RadioSize.Md,
      value,
      checked,
      defaultChecked,
      onChange,
      disabled,
      children,
      name,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = (el: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
        el;
      if (typeof ref === "function") ref(el);
      else if (ref)
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };

    const rootClassName = cn(radioButtonVariants({ size }), className);

    const circleSizeClass = {
      [RadioSize.Sm]: "kz-radio-button-circle--sm",
      [RadioSize.Md]: "kz-radio-button-circle--md",
      [RadioSize.Lg]: "kz-radio-button-circle--lg",
    }[size];

    return (
      <label className={rootClassName}>
        <input
          ref={mergedRef}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          aria-checked={checked}
          aria-disabled={disabled}
          className="sr-only peer"
          {...props}
        />
        <span
          className={cn("kz-radio-button-circle", circleSizeClass)}
          aria-hidden
        >
          <span className="kz-radio-button-dot" aria-hidden />
        </span>
        {children != null && (
          <span className="text-sm font-medium text-[var(--kz-color-text-primary)] select-none">
            {children}
          </span>
        )}
      </label>
    );
  }
);

RadioButton.displayName = "RadioButton";

export { RadioButton, radioButtonVariants };
export type { RadioButtonVariants } from "./radio-button.variants";
