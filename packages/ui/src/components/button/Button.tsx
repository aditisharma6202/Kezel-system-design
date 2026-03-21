import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  ButtonVariant,
  ButtonSize,
  ButtonStatus,
  ButtonType,
  ButtonAspectRatio,
} from "../../constants/enum";
import { buttonVariants, type ButtonVariants } from "./button.variants";
import { Loader2 } from "lucide-react";
import { iconSize } from "../../icon/icon-sizes";
import { cn } from "../../utils/cn";
import { Icon, type IconProps } from "../../icon/Icon";

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "onClick"
> {
  variant: ButtonVariant;
  size: ButtonSize;
  status?: ButtonStatus;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  asChild?: boolean;
  children: React.ReactNode;
  type?: ButtonType;
  loading?: boolean;
  aspectRatio?: ButtonAspectRatio;
  leftIcon?: IconProps;
  rightIcon?: IconProps;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      status,
      onClick,
      asChild = false,
      children,
      type = ButtonType.Button,
      loading = false,
      aspectRatio = ButtonAspectRatio.Auto,
      disabled,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    const buttonClassName = cn(
      buttonVariants({ variant, size, status }),
      loading && "opacity-[var(--kz-component-button-loading-opacity,0.8)]",
      aspectRatio === ButtonAspectRatio.Square && "kz-button--aspect-1-1",
      className
    );

    if (asChild) {
      return (
        <Comp
          ref={ref}
          type={asChild ? undefined : type}
          className={buttonClassName}
          onClick={onClick}
          disabled={isDisabled}
          aria-busy={loading}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        type={type}
        className={buttonClassName}
        onClick={onClick}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <Loader2
            className="kz-button-spinner"
            size={iconSize.md}
            color="currentColor"
          />
        )}
        {leftIcon && <Icon {...leftIcon} />}
        {children}
        {rightIcon && <Icon {...rightIcon} />}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonVariants };
