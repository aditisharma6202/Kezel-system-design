import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ButtonVariant, ButtonSize, ButtonType } from "../constants/enum";
import { buttonVariants, type ButtonVariants } from "./button.variants";
import { cn } from "../utils/cn";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick"> {
  variant: ButtonVariant;
  size: ButtonSize;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  asChild?: boolean;
  children: React.ReactNode;
  type?: ButtonType;
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
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(buttonVariants({ variant, size }), className)}
        onClick={onClick}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonVariants };
