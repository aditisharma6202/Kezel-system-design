import * as React from "react";
import { CheckboxSize, CheckboxVariant } from "../../constants/enum";
import { checkboxVariants } from "./checkbox.variants";
import { cn } from "../../utils/cn";

const CheckIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 12 12"
    fill="none"
    stroke="var(--kz-component-checkbox-icon-color)"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="kz-checkbox-icon kz-checkbox-icon--check"
    aria-hidden
  >
    <path d="M2 6l3 3 5-6" />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 12 12"
    fill="none"
    stroke="var(--kz-component-checkbox-icon-color)"
    strokeWidth="2"
    strokeLinecap="round"
    className="kz-checkbox-icon kz-checkbox-icon--minus"
    aria-hidden
  >
    <path d="M2 6h8" />
  </svg>
);

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "onChange"
> {
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size = CheckboxSize.Md,
      variant = CheckboxVariant.Default,
      checked: controlledChecked,
      defaultChecked = false,
      indeterminate = false,
      onCheckedChange,
      onChange,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] =
      React.useState(defaultChecked);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = (el: HTMLInputElement | null) => {
      (inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
        el;
      if (typeof ref === "function") ref(el);
      else if (ref)
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };

    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    React.useEffect(() => {
      const el = inputRef.current;
      if (el) el.indeterminate = indeterminate;
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setUncontrolledChecked(e.target.checked);
      onCheckedChange?.(e.target.checked);
      onChange?.(e);
    };

    const state = indeterminate
      ? "indeterminate"
      : checked
        ? "checked"
        : "unchecked";

    const rootClassName = cn(checkboxVariants({ size, variant }), className);

    const boxSizeClass = {
      [CheckboxSize.Sm]: "kz-checkbox-box--sm",
      [CheckboxSize.Md]: "kz-checkbox-box--md",
      [CheckboxSize.Lg]: "kz-checkbox-box--lg",
    }[size];

    return (
      <label className={rootClassName}>
        <input
          ref={mergedRef}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-checked={indeterminate ? "mixed" : checked}
          aria-disabled={disabled}
          className="sr-only peer"
          {...props}
        />
        <span
          className={cn("kz-checkbox-box", boxSizeClass)}
          data-state={state}
          aria-hidden
        >
          {checked && !indeterminate && <CheckIcon />}
          {indeterminate && <MinusIcon />}
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

Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
export type { CheckboxVariants } from "./checkbox.variants";
