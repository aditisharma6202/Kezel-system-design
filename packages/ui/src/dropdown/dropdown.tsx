import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../utils/cn";
import { Icon } from "../icon/Icon";
import { DropdownTriggerVariant } from "../constants/enum";

const Dropdown = DropdownMenuPrimitive.Root;

export interface DropdownTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> {
  /** Visual style: default (filled/bordered) or ghost (minimal, like ghost button). */
  variant?: DropdownTriggerVariant;
  /** When true (default), shows a chevron icon after children. Set false to hide it. */
  showChevron?: boolean;
}

const DropdownTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownTriggerProps
>(
  (
    {
      asChild = false,
      disabled,
      className,
      variant = DropdownTriggerVariant.Default,
      showChevron = true,
      children,
      ...props
    },
    ref
  ) => {
    const isGhost = variant === DropdownTriggerVariant.Ghost;
    const triggerContent =
      asChild || !showChevron ? (
        children
      ) : (
        <>
          {children}
          <Icon
            name="chevron-down"
            className="kz-dropdown-trigger-chevron"
            size="sm"
            aria-hidden
          />
        </>
      );

    return (
      <DropdownMenuPrimitive.Trigger
        ref={ref}
        asChild={asChild}
        disabled={disabled}
        className={cn(
          "kz-dropdown-trigger",
          isGhost && "kz-dropdown-trigger-ghost",
          className
        )}
        {...props}
      >
        {triggerContent}
      </DropdownMenuPrimitive.Trigger>
    );
  }
);
DropdownTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

interface DropdownContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
}

const DropdownContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownContentProps
>(
  (
    {
      className,
      align = "center",
      side = "bottom",
      sideOffset = 4,
      alignOffset = 0,
      avoidCollisions = true,
      ...props
    },
    ref
  ) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        className={cn("kz-dropdown-content", className)}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
);
DropdownContent.displayName = DropdownMenuPrimitive.Content.displayName;

interface DropdownItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  onSelect?: (event: Event) => void;
  disabled?: boolean;
  destructive?: boolean;
  inset?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  shortcut?: string;
  className?: string;
  children: React.ReactNode;
}

const DropdownItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownItemProps
>(
  (
    {
      className,
      onSelect,
      disabled,
      destructive,
      inset,
      startIcon,
      endIcon,
      shortcut,
      children,
      ...props
    },
    ref
  ) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      onSelect={onSelect}
      disabled={disabled}
      className={cn(
        "kz-dropdown-item",
        inset && "kz-dropdown-item-inset",
        destructive && "kz-dropdown-item-destructive",
        className
      )}
      {...props}
    >
      {startIcon ? <span className="kz-dropdown-item-icon-start">{startIcon}</span> : null}
      <span className="kz-dropdown-item-text">{children}</span>
      {shortcut ? <span className="kz-dropdown-item-shortcut">{shortcut}</span> : null}
      {endIcon ? <span className="kz-dropdown-item-icon-end">{endIcon}</span> : null}
    </DropdownMenuPrimitive.Item>
  )
);
DropdownItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> & { className?: string }
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("kz-dropdown-separator", className)}
    {...props}
  />
));
DropdownSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

interface DropdownLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {
  inset?: boolean;
  className?: string;
}

const DropdownLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  DropdownLabelProps
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("kz-dropdown-label", inset && "kz-dropdown-label-inset", className)}
    {...props}
  />
));
DropdownLabel.displayName = DropdownMenuPrimitive.Label.displayName;

interface DropdownCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const DropdownCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  DropdownCheckboxItemProps
>(({ className, checked, onCheckedChange, disabled, children, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    onCheckedChange={onCheckedChange}
    disabled={disabled}
    className={cn("kz-dropdown-checkbox-item", className)}
    {...props}
  >
    <DropdownMenuPrimitive.ItemIndicator className="kz-dropdown-item-indicator">
      {checked === "indeterminate" ? (
        <span className="kz-dropdown-item-indicator-minus">−</span>
      ) : (
        <Check className="kz-dropdown-item-indicator-check" />
      )}
    </DropdownMenuPrimitive.ItemIndicator>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownRadioGroup = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioGroup
    ref={ref}
    className={cn("kz-dropdown-radio-group", className)}
    {...props}
  />
));
DropdownRadioGroup.displayName = DropdownMenuPrimitive.RadioGroup.displayName;

interface DropdownRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const DropdownRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  DropdownRadioItemProps
>(({ className, value, disabled, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    value={value}
    disabled={disabled}
    className={cn("kz-dropdown-radio-item", className)}
    {...props}
  >
    <DropdownMenuPrimitive.ItemIndicator className="kz-dropdown-item-indicator">
      <Circle className="kz-dropdown-item-indicator-dot" />
    </DropdownMenuPrimitive.ItemIndicator>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownSub = DropdownMenuPrimitive.Sub;

interface DropdownSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {
  inset?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const DropdownSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  DropdownSubTriggerProps
>(({ className, inset, disabled, startIcon, endIcon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    disabled={disabled}
    className={cn(
      "kz-dropdown-sub-trigger",
      inset && "kz-dropdown-sub-trigger-inset",
      className
    )}
    {...props}
  >
    {startIcon ? <span className="kz-dropdown-item-icon-start">{startIcon}</span> : null}
    <span className="kz-dropdown-item-text">{children}</span>
    {endIcon ?? (
      <ChevronRight className="kz-dropdown-sub-trigger-chevron" aria-hidden />
    )}
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

interface DropdownSubContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> {
  className?: string;
  sideOffset?: number;
  alignOffset?: number;
  children: React.ReactNode;
}

const DropdownSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  DropdownSubContentProps
>(
  (
    { className, sideOffset = 8, alignOffset, children, ...props },
    ref
  ) => (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      className={cn("kz-dropdown-sub-content", className)}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.SubContent>
  )
);
DropdownSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  DropdownCheckboxItem,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownSub,
  DropdownSubTrigger,
  DropdownSubContent,
};
