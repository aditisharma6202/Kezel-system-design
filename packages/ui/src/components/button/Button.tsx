import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ButtonVariant, ButtonSize, ButtonType, ButtonAspectRatio } from "../../constants/enum";
import { buttonVariants, type ButtonVariants } from "./button.variants";
import { Icon, IconName } from "../../icon/Icon";
import { cn } from "../../utils/cn";

export interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "onClick"
> {
  variant: ButtonVariant;
  size: ButtonSize;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  asChild?: boolean;
  children: React.ReactNode;
  type?: ButtonType;
  loading?: boolean;
  aspectRatio?: ButtonAspectRatio;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      onClick,
      asChild = false,
      children,
      type = ButtonType.Button,
      loading = false,
      aspectRatio = ButtonAspectRatio.Auto,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    const buttonClassName = cn(
      buttonVariants({ variant, size }),
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
          <Icon
            name={IconName.Loader2}
            className="kz-button-spinner"
            size="md"
            color="currentColor"
          />
        )}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonVariants };
