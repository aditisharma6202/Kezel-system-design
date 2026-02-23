import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  ToggleButtonVariant,
  ToggleButtonSize,
} from "../../constants/enum";
import { toggleButtonVariants } from "./toggle-button.variants";
import { Icon, IconName } from "../../icon/Icon";
import { cn } from "../../utils/cn";

export interface ToggleButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  variant?: ToggleButtonVariant;
  size?: ToggleButtonSize;
  fullWidth?: boolean;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  asChild?: boolean;
  loading?: boolean;
  className?: string;
}

const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      className,
      variant = ToggleButtonVariant.Default,
      size = ToggleButtonSize.Md,
      fullWidth = false,
      pressed: controlledPressed,
      defaultPressed = false,
      onPressedChange,
      asChild = false,
      loading = false,
      disabled,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledPressed, setUncontrolledPressed] =
      React.useState(defaultPressed);

    const isControlled = controlledPressed !== undefined;
    const pressed = isControlled ? controlledPressed : uncontrolledPressed;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isControlled) {
        setUncontrolledPressed((prev) => !prev);
      }
      const nextPressed = !pressed;
      onPressedChange?.(nextPressed);
      onClick?.(e);
    };

    const isDisabled = disabled || loading;

    const trackClassName = cn(
      toggleButtonVariants({ variant, size, fullWidth }),
      "inline-flex"
    );

    const wrapperClassName = cn(
      "group relative inline-flex items-center gap-2",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--kz-color-border-focus)]",
      "disabled:pointer-events-none disabled:opacity-[var(--kz-component-toggle-button-disabled-opacity,0.5)]",
      fullWidth && "w-full",
      loading &&
        "opacity-[var(--kz-component-toggle-button-loading-opacity,0.8)]",
      className
    );

    const thumbClassName = cn(
      "kz-toggle-button-thumb",
      "absolute top-1 left-1 h-[calc(100%-0.5rem)] aspect-square shrink-0 rounded-full",
      "translate-x-0 group-data-[state=on]:translate-x-4",
      "transition-[background,transform,box-shadow] duration-200 ease-in-out",
      (variant === ToggleButtonVariant.Default ||
        variant === ToggleButtonVariant.Primary) &&
        (variant === ToggleButtonVariant.Default
          ? "kz-toggle-button-thumb--default"
          : "kz-toggle-button-thumb--primary"),
      variant === ToggleButtonVariant.Container &&
        "bg-[var(--kz-color-surface-raised)]"
    );

    if (asChild) {
      const slotProps = {
          ...props,
          ref,
          type: "button" as const,
          role: "switch" as const,
          "aria-pressed": pressed,
          "aria-checked": pressed,
          "data-state": pressed ? "on" : "off",
          className: wrapperClassName,
          onClick: handleClick,
          disabled: isDisabled,
          "aria-busy": loading,
        };
      return (
        <Slot {...(slotProps as React.ComponentProps<typeof Slot>)}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-pressed={pressed}
        aria-checked={pressed}
        data-state={pressed ? "on" : "off"}
        className={wrapperClassName}
        onClick={handleClick}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        <span className={trackClassName}>
          <span className={thumbClassName} aria-hidden />
        </span>
        {children ? (
          <span className="truncate text-sm font-medium text-[var(--kz-color-text-primary)]">
            {children}
          </span>
        ) : null}
        {loading && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-[var(--kz-color-surface-base)]/80">
            <Icon
              name={IconName.Loader2}
              className="kz-button-spinner size-5"
              size="md"
              color="currentColor"
            />
          </span>
        )}
      </button>
    );
  }
);

ToggleButton.displayName = "ToggleButton";

export { ToggleButton, toggleButtonVariants };
export type { ToggleButtonVariants } from "./toggle-button.variants";
