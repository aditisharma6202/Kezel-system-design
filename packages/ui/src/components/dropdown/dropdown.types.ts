import type * as React from "react";

export type DropdownButtonVariant = "default" | "ghost";
export type DropdownButtonAlign = "start" | "center" | "end";
export type DropdownButtonSide = "top" | "right" | "bottom" | "left";

export type DropdownButtonItem =
  | {
      type?: "item";
      key: string;
      label: React.ReactNode;
      onSelect?: () => void;
      disabled?: boolean;
      icon?: React.ReactNode;
      endIcon?: React.ReactNode;
      shortcut?: string;
    }
  | { type: "label"; key: string; label: React.ReactNode }
  | { type: "separator"; key: string }
  | {
      type: "submenu";
      key: string;
      label: React.ReactNode;
      items: DropdownButtonItem[];
      disabled?: boolean;
      icon?: React.ReactNode;
      endIcon?: React.ReactNode;
    };

export interface DropdownButtonTrigger {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: DropdownButtonVariant;
  showChevron?: boolean;
  className?: string;
  iconOnly?: boolean;
  ariaLabel?: string;
}

export interface DropdownButtonProps {
  trigger: DropdownButtonTrigger;
  items: DropdownButtonItem[];
  align?: DropdownButtonAlign;
  side?: DropdownButtonSide;
  sideOffset?: number;
  disabled?: boolean;
  contentClassName?: string;
}
