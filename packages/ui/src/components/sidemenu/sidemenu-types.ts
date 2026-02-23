import type React from "react";
import type { IconName } from "../../icon";

export interface BaseNode {
  id: string;
  label: string;
  icon?: IconName | React.ReactNode;
  disabled?: boolean;
}

export interface SideMenuLinkNode extends BaseNode {
  type: "link";
  href?: string;
  actionId?: string;
  external?: boolean;
}

export interface SideMenuGroupItemSubItem {
  id: string;
  label: string;
  href?: string;
  actionId?: string;
  disabled?: boolean;
}

export interface SideMenuGroupItem {
  id: string;
  label: string;
  href?: string;
  actionId?: string;
  disabled?: boolean;
  subItems?: SideMenuGroupItemSubItem[];
}

export interface SideMenuGroupNode extends BaseNode {
  type: "group";
  items: SideMenuGroupItem[];
}

export interface SideMenuSectionNode {
  type: "section";
  id: string;
  label?: string;
  items: SideMenuNode[];
}

export type SideMenuNode =
  | SideMenuSectionNode
  | SideMenuLinkNode
  | SideMenuGroupNode;

export interface SideMenuNavigatePayload {
  id: string;
  href?: string;
  actionId?: string;
}

export type SideMenuFlyoutSide = "right" | "left";

export interface SideMenuProps {
  data: SideMenuNode[];
  selectedId?: string;
  onNavigate?: (payload: SideMenuNavigatePayload) => void;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  expandedWidth?: number | string;
  collapsedWidth?: number | string;
  header?: React.ReactNode;
  headerWidth?: number | string;
  footer?: React.ReactNode;
  gap?: number | string;
  iconGap?: number | string;
  showTooltipsWhenCollapsed?: boolean;
  flyoutSide?: SideMenuFlyoutSide;
  flyoutOffset?: number;
  closeFlyoutOnSelect?: boolean;
  className?: string;
}
