import * as React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";
import { Icon } from "../../icon";
import type {
  SideMenuSectionNode,
  SideMenuLinkNode,
  SideMenuGroupNode,
  SideMenuGroupItem,
  SideMenuGroupItemSubItem,
  SideMenuProps,
  SideMenuFlyoutSide,
} from "./sidemenu-types";

function resolveIcon(
  icon: IconName | React.ReactNode | undefined,
  className?: string
): React.ReactNode {
  if (icon == null) return null;
  if (typeof icon === "string") {
    return (
      <Icon
        name={icon as IconName}
        size={14}
        color="currentColor"
        className={className}
      />
    );
  }
  return icon;
}

type IconName = import("../../icon").IconName;

const SIDE_MAP: Record<SideMenuFlyoutSide, "left" | "right"> = {
  right: "right",
  left: "left",
};

function SideMenuLinkExpanded({
  node,
  selectedId,
  onNavigate,
  iconGap,
  style,
}: {
  node: SideMenuLinkNode;
  selectedId?: string;
  onNavigate?: SideMenuProps["onNavigate"];
  iconGap: number | string;
  style?: React.CSSProperties;
}) {
  const icon = resolveIcon(node.icon, "kz-sidemenu-item-icon");
  const selected = selectedId === node.id;
  const content = (
    <>
      {icon && <span className="kz-sidemenu-item-icon">{icon}</span>}
      <span className="kz-sidemenu-item-label">{node.label}</span>
    </>
  );
  const rowClass = cn(
    "kz-sidemenu-item",
    "kz-sidemenu-item-row",
    "kz-sidemenu-item--link",
    selected && "kz-sidemenu-item--active",
    node.disabled && "kz-sidemenu-item--disabled"
  );
  const rowStyle = { gap: iconGap, ...style };

  if (node.href && !node.disabled) {
    return (
      <a
        href={node.external ? node.href : undefined}
        target={node.external ? "_blank" : undefined}
        rel={node.external ? "noopener noreferrer" : undefined}
        className={rowClass}
        style={rowStyle}
        onClick={(e) => {
          if (!node.external && node.href && onNavigate) {
            e.preventDefault();
            onNavigate({
              id: node.id,
              href: node.href,
              actionId: node.actionId,
            });
          }
        }}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={rowClass}
      style={rowStyle}
      disabled={node.disabled}
      onClick={() =>
        onNavigate?.({ id: node.id, href: node.href, actionId: node.actionId })
      }
    >
      {content}
    </button>
  );
}

function SideMenuGroupExpanded({
  node,
  selectedId,
  onNavigate,
  iconGap,
  indentBg,
}: {
  node: SideMenuGroupNode;
  selectedId?: string;
  onNavigate?: SideMenuProps["onNavigate"];
  iconGap: number | string;
  indentBg: string;
}) {
  const hasSelectedInGroup = node.items.some(
    (item) =>
      selectedId === item.id ||
      item.subItems?.some((sub) => selectedId === sub.id)
  );
  const icon = resolveIcon(node.icon, "kz-sidemenu-item-icon");
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger
        className={cn(
          "kz-sidemenu-item",
          "kz-sidemenu-item-row",
          "kz-sidemenu-group-trigger",
          hasSelectedInGroup && "kz-sidemenu-item--active",
          node.disabled && "kz-sidemenu-item--disabled"
        )}
        style={{ gap: iconGap }}
        disabled={node.disabled}
      >
        {icon && <span className="kz-sidemenu-item-icon">{icon}</span>}
        <span className="kz-sidemenu-item-label">{node.label}</span>
        <ChevronDown
          className="kz-sidemenu-group-chevron"
          size={14}
          aria-hidden
        />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div
          className="kz-sidemenu-group-content"
          style={{ background: indentBg }}
        >
          {node.items.map((item) => (
            <SideMenuGroupItemRow
              key={item.id}
              item={item}
              selectedId={selectedId}
              onNavigate={onNavigate}
              level={0}
            />
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

function SideMenuGroupItemRow({
  item,
  selectedId,
  onNavigate,
  level,
}: {
  item: SideMenuGroupItem;
  selectedId?: string;
  onNavigate?: SideMenuProps["onNavigate"];
  level: number;
}) {
  const selected = selectedId === item.id;
  const hasSub = item.subItems && item.subItems.length > 0;
  const [subOpen, setSubOpen] = React.useState(false);

  const paddingLeft = 12 + level * 12;

  if (hasSub && item.subItems!.length > 0) {
    return (
      <Collapsible.Root open={subOpen} onOpenChange={setSubOpen}>
        <Collapsible.Trigger
          className={cn(
            "kz-sidemenu-item",
            "kz-sidemenu-item-row",
            "kz-sidemenu-group-item-trigger",
            selected && "kz-sidemenu-item--active",
            item.disabled && "kz-sidemenu-item--disabled"
          )}
          style={{ paddingLeft }}
          disabled={item.disabled}
        >
          <span className="kz-sidemenu-item-label">{item.label}</span>
          <ChevronDown
            className="kz-sidemenu-group-chevron"
            size={12}
            aria-hidden
          />
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div className="kz-sidemenu-sublist">
            {item.subItems!.map((sub) => (
              <SideMenuGroupSubItemRow
                key={sub.id}
                sub={sub}
                selectedId={selectedId}
                onNavigate={onNavigate}
                paddingLeft={paddingLeft + 12}
              />
            ))}
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    );
  }

  const el = item.href ? (
    <a
      href={item.href}
      className={cn(
        "kz-sidemenu-item",
        "kz-sidemenu-item-row",
        selected && "kz-sidemenu-item--active",
        item.disabled && "kz-sidemenu-item--disabled"
      )}
      style={{ paddingLeft }}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.({ id: item.id, href: item.href, actionId: item.actionId });
      }}
    >
      <span className="kz-sidemenu-item-label">{item.label}</span>
    </a>
  ) : (
    <button
      type="button"
      className={cn(
        "kz-sidemenu-item",
        "kz-sidemenu-item-row",
        selected && "kz-sidemenu-item--active",
        item.disabled && "kz-sidemenu-item--disabled"
      )}
      style={{ paddingLeft }}
      disabled={item.disabled}
      onClick={() =>
        onNavigate?.({ id: item.id, href: item.href, actionId: item.actionId })
      }
    >
      <span className="kz-sidemenu-item-label">{item.label}</span>
    </button>
  );
  return el;
}

function SideMenuGroupSubItemRow({
  sub,
  selectedId,
  onNavigate,
  paddingLeft,
}: {
  sub: SideMenuGroupItemSubItem;
  selectedId?: string;
  onNavigate?: SideMenuProps["onNavigate"];
  paddingLeft: number;
}) {
  const selected = selectedId === sub.id;
  const el = sub.href ? (
    <a
      href={sub.href}
      className={cn(
        "kz-sidemenu-item",
        "kz-sidemenu-item-row",
        "kz-sidemenu-subitem",
        selected && "kz-sidemenu-item--active",
        sub.disabled && "kz-sidemenu-item--disabled"
      )}
      style={{ paddingLeft }}
      onClick={(e) => {
        e.preventDefault();
        onNavigate?.({ id: sub.id, href: sub.href, actionId: sub.actionId });
      }}
    >
      <span className="kz-sidemenu-item-label">{sub.label}</span>
    </a>
  ) : (
    <button
      type="button"
      className={cn(
        "kz-sidemenu-item",
        "kz-sidemenu-item-row",
        "kz-sidemenu-subitem",
        selected && "kz-sidemenu-item--active",
        sub.disabled && "kz-sidemenu-item--disabled"
      )}
      style={{ paddingLeft }}
      disabled={sub.disabled}
      onClick={() =>
        onNavigate?.({ id: sub.id, href: sub.href, actionId: sub.actionId })
      }
    >
      <span className="kz-sidemenu-item-label">{sub.label}</span>
    </button>
  );
  return el;
}

function CollapsedFlyout({
  node,
  onNavigate,
  side,
  sideOffset,
  closeOnSelect,
  children,
}: {
  node: SideMenuGroupNode;
  selectedId?: string;
  onNavigate?: SideMenuProps["onNavigate"];
  side: SideMenuFlyoutSide;
  sideOffset: number;
  closeOnSelect: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const sideVal = SIDE_MAP[side];

  return (
    <DropdownMenuPrimitive.Root open={open} onOpenChange={setOpen}>
      <DropdownMenuPrimitive.Trigger asChild>
        {children}
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className="kz-sidemenu-flyout"
          side={sideVal}
          sideOffset={sideOffset}
          align="start"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {node.items.map((item) =>
            item.subItems && item.subItems.length > 0 ? (
              <DropdownMenuPrimitive.Sub key={item.id}>
                <DropdownMenuPrimitive.SubTrigger className="kz-sidemenu-flyout-item">
                  {item.label}
                </DropdownMenuPrimitive.SubTrigger>
                <DropdownMenuPrimitive.SubContent
                  className="kz-sidemenu-flyout kz-sidemenu-flyout-sub"
                  sideOffset={4}
                >
                  {item.subItems.map((sub) => (
                    <DropdownMenuPrimitive.Item
                      key={sub.id}
                      className="kz-sidemenu-flyout-item"
                      disabled={sub.disabled}
                      onSelect={() => {
                        onNavigate?.({
                          id: sub.id,
                          href: sub.href,
                          actionId: sub.actionId,
                        });
                        if (closeOnSelect) setOpen(false);
                      }}
                      asChild={!!sub.href}
                    >
                      {sub.href ? (
                        <a href={sub.href}>{sub.label}</a>
                      ) : (
                        <span>{sub.label}</span>
                      )}
                    </DropdownMenuPrimitive.Item>
                  ))}
                </DropdownMenuPrimitive.SubContent>
              </DropdownMenuPrimitive.Sub>
            ) : (
              <DropdownMenuPrimitive.Item
                key={item.id}
                className="kz-sidemenu-flyout-item"
                disabled={item.disabled}
                onSelect={() => {
                  onNavigate?.({
                    id: item.id,
                    href: item.href,
                    actionId: item.actionId,
                  });
                  if (closeOnSelect) setOpen(false);
                }}
                asChild={!!item.href}
              >
                {item.href ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span>{item.label}</span>
                )}
              </DropdownMenuPrimitive.Item>
            )
          )}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

const SideMenu = React.forwardRef<HTMLDivElement, SideMenuProps>(
  (
    {
      data,
      selectedId,
      onNavigate,
      collapsible = true,
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      onCollapsedChange,
      expandedWidth = 280,
      collapsedWidth = 72,
      header,
      headerWidth,
      footer,
      gap = 4,
      iconGap = 10,
      showTooltipsWhenCollapsed = true,
      flyoutSide = "right",
      flyoutOffset = 8,
      closeFlyoutOnSelect = true,
      className,
    },
    ref
  ) => {
    const [uncontrolledCollapsed, setUncontrolledCollapsed] =
      React.useState(defaultCollapsed);
    const collapsed =
      controlledCollapsed !== undefined
        ? controlledCollapsed
        : uncontrolledCollapsed;
    const setCollapsed = (v: boolean) => {
      if (controlledCollapsed === undefined) setUncontrolledCollapsed(v);
      onCollapsedChange?.(v);
    };

    const width = collapsed ? collapsedWidth : expandedWidth;
    const widthStyle =
      typeof width === "number" ? { width: `${width}px` } : { width };
    const gapStyle = typeof gap === "number" ? { gap: `${gap}px` } : { gap };
    const indentBg =
      "var(--kz-component-sidemenu-group-indent-bg, rgba(0,0,0,0.02))";

    const renderItem = (node: SideMenuLinkNode | SideMenuGroupNode) => {
      if (node.type === "link") {
        if (collapsed) {
          const icon = resolveIcon(node.icon, "kz-sidemenu-item-icon");
          const triggerClass = cn(
            "kz-sidemenu-item",
            "kz-sidemenu-item-row",
            "kz-sidemenu-item--link",
            "kz-sidemenu-item--collapsed",
            "kz-sidemenu-tooltip-trigger",
            selectedId === node.id && "kz-sidemenu-item--active"
          );
          if (node.href && !node.disabled) {
            return (
              <a
                href={node.external ? node.href : undefined}
                target={node.external ? "_blank" : undefined}
                rel={node.external ? "noopener noreferrer" : undefined}
                className={triggerClass}
                onClick={(e) => {
                  if (!node.external && onNavigate) {
                    e.preventDefault();
                    onNavigate({
                      id: node.id,
                      href: node.href,
                      actionId: node.actionId,
                    });
                  }
                }}
              >
                {icon && <span className="kz-sidemenu-item-icon">{icon}</span>}
              </a>
            );
          }
          return (
            <button
              type="button"
              className={triggerClass}
              disabled={node.disabled}
              onClick={() =>
                onNavigate?.({
                  id: node.id,
                  href: node.href,
                  actionId: node.actionId,
                })
              }
            >
              {icon && <span className="kz-sidemenu-item-icon">{icon}</span>}
            </button>
          );
        }
        return (
          <SideMenuLinkExpanded
            node={node}
            selectedId={selectedId}
            onNavigate={onNavigate}
            iconGap={iconGap}
          />
        );
      }

      if (node.type === "group") {
        if (collapsed) {
          const hasSelectedInFlyout = node.items.some(
            (item) =>
              selectedId === item.id ||
              item.subItems?.some((sub) => selectedId === sub.id)
          );
          const icon = resolveIcon(node.icon, "kz-sidemenu-item-icon");
          const trigger = (
            <div
              className={cn(
                "kz-sidemenu-item",
                "kz-sidemenu-item-row",
                "kz-sidemenu-item--collapsed",
                hasSelectedInFlyout && "kz-sidemenu-item--active"
              )}
            >
              {icon && <span className="kz-sidemenu-item-icon">{icon}</span>}
            </div>
          );
          return (
            <CollapsedFlyout
              node={node}
              selectedId={selectedId}
              onNavigate={onNavigate}
              side={flyoutSide}
              sideOffset={flyoutOffset}
              closeOnSelect={closeFlyoutOnSelect}
            >
              <button
                type="button"
                className="kz-sidemenu-tooltip-trigger kz-sidemenu-flyout-trigger"
              >
                {showTooltipsWhenCollapsed ? (
                  <TooltipPrimitive.Root>
                    <TooltipPrimitive.Trigger asChild>
                      <span className="kz-sidemenu-tooltip-trigger-inner">
                        {trigger}
                      </span>
                    </TooltipPrimitive.Trigger>
                    <TooltipPrimitive.Portal>
                      <TooltipPrimitive.Content
                        side="right"
                        sideOffset={8}
                        className="kz-tooltip-content kz-tooltip-content--size-sm"
                      >
                        {node.label}
                      </TooltipPrimitive.Content>
                    </TooltipPrimitive.Portal>
                  </TooltipPrimitive.Root>
                ) : (
                  trigger
                )}
              </button>
            </CollapsedFlyout>
          );
        }
        return (
          <SideMenuGroupExpanded
            node={node}
            selectedId={selectedId}
            onNavigate={onNavigate}
            iconGap={iconGap}
            indentBg={indentBg}
          />
        );
      }

      return null;
    };

    const wrapWithTooltip = (child: React.ReactNode, label: string) => {
      if (!collapsed || !showTooltipsWhenCollapsed) return child;
      return (
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger asChild>{child}</TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              side="right"
              sideOffset={8}
              className="kz-tooltip-content kz-tooltip-content--size-sm"
            >
              {label}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      );
    };

    const renderSection = (section: SideMenuSectionNode) => (
      <div key={section.id} className="kz-sidemenu-section">
        {!collapsed && section.label && (
          <div className="kz-sidemenu-section-label">{section.label}</div>
        )}
        <div className="kz-sidemenu-section-items" style={gapStyle}>
          {section.items.map((node) => {
            if (node.type === "section") {
              return (
                <React.Fragment key={node.id}>
                  {renderSection(node)}
                </React.Fragment>
              );
            }
            const el = renderItem(node as SideMenuLinkNode | SideMenuGroupNode);
            if (
              collapsed &&
              showTooltipsWhenCollapsed &&
              node.type === "link"
            ) {
              return (
                <div key={node.id} className="kz-sidemenu-tooltip-wrapper">
                  {wrapWithTooltip(el, node.label)}
                </div>
              );
            }
            return <React.Fragment key={node.id}>{el}</React.Fragment>;
          })}
        </div>
      </div>
    );

    return (
      <TooltipPrimitive.Provider delayDuration={300}>
        <aside
          ref={ref}
          className={cn(
            "kz-sidemenu",
            collapsed && "kz-sidemenu--collapsed",
            className
          )}
          style={{ ...widthStyle, flexShrink: 0 }}
        >
          {(header || collapsible) && (
            <div
              className={cn(
                "kz-sidemenu-top",
                collapsed &&
                  collapsible &&
                  "kz-sidemenu-top--collapse-on-border"
              )}
            >
              {header && (
                <div
                  className="kz-sidemenu-header"
                  style={
                    headerWidth !== undefined
                      ? typeof headerWidth === "number"
                        ? { width: `${headerWidth}px` }
                        : { width: headerWidth }
                      : undefined
                  }
                >
                  {header}
                </div>
              )}
              {collapsible && (
                <div className="kz-sidemenu-collapse-btn-wrap">
                  <button
                    type="button"
                    className="kz-sidemenu-collapse-btn"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label={
                      collapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                  >
                    <ChevronDown
                      size={16}
                      style={{
                        transform: collapsed
                          ? "rotate(-90deg)"
                          : "rotate(90deg)",
                      }}
                      aria-hidden
                    />
                  </button>
                </div>
              )}
            </div>
          )}
          <nav className="kz-sidemenu-nav" style={gapStyle}>
            {data.map((node) => {
              if (node.type === "section") {
                return (
                  <React.Fragment key={node.id}>
                    {renderSection(node)}
                  </React.Fragment>
                );
              }
              const el = renderItem(
                node as SideMenuLinkNode | SideMenuGroupNode
              );
              if (
                collapsed &&
                showTooltipsWhenCollapsed &&
                node.type === "link"
              ) {
                return (
                  <div key={node.id} className="kz-sidemenu-tooltip-wrapper">
                    {wrapWithTooltip(el, node.label)}
                  </div>
                );
              }
              return <React.Fragment key={node.id}>{el}</React.Fragment>;
            })}
          </nav>
          {footer && <div className="kz-sidemenu-footer">{footer}</div>}
        </aside>
      </TooltipPrimitive.Provider>
    );
  }
);

SideMenu.displayName = "SideMenu";

export { SideMenu };
export type {
  SideMenuProps,
  SideMenuNode,
  SideMenuSectionNode,
  SideMenuLinkNode,
  SideMenuGroupNode,
  SideMenuGroupItem,
  SideMenuGroupItemSubItem,
  SideMenuNavigatePayload,
  SideMenuFlyoutSide,
} from "./sidemenu-types";
