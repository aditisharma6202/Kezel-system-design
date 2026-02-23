import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

export type NavButtonType = "link" | "dropdown";

export interface NavButtonOption {
  label: string;
  href?: string;
  onClick?: () => void;
  subMenu?: Array<{ label: string; href?: string; onClick?: () => void }>;
}

export interface NavButtonPropsBase {
  /** Left-side icon (required). */
  icon: React.ReactNode;
  /** Label text (required). */
  label: string;
  /** Additional class for the trigger/link root. */
  className?: string;
}

export interface NavButtonLinkProps extends NavButtonPropsBase {
  type: "link";
  /** Whether this link is selected (active). */
  selected?: boolean;
  /** Link URL. If set, renders <a>. */
  href?: string;
  /** Click handler when no href (renders <button>). */
  onClick?: () => void;
  /** Link target, e.g. "_blank". */
  target?: string;
  /** Link rel, e.g. "noopener noreferrer". */
  rel?: string;
}

export interface NavButtonDropdownProps extends NavButtonPropsBase {
  type: "dropdown";
  /** Menu options; items with subMenu render a submenu with chevron. */
  menuOptions: NavButtonOption[];
}

export type NavButtonProps = NavButtonLinkProps | NavButtonDropdownProps;

const NavButton = React.forwardRef<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement, NavButtonProps>(
  (props, ref) => {
    const { icon, label, className } = props;

    if (props.type === "link") {
      const { selected = false, href, onClick, target, rel } = props;
      const content = (
        <>
          <span className="kz-nav-button-icon">{icon}</span>
          <span className="kz-nav-button-label">{label}</span>
        </>
      );
      const baseClass = cn(
        "kz-nav-button",
        "kz-nav-button-link",
        selected && "kz-nav-button-selected",
        className
      );
      if (href !== undefined) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={baseClass}
            onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
            target={target}
            rel={rel}
            data-selected={selected || undefined}
          >
            {content}
          </a>
        );
      }
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          className={baseClass}
          onClick={onClick}
          data-selected={selected || undefined}
        >
          {content}
        </button>
      );
    }

    const { menuOptions } = props;
    return (
      <div className="kz-nav-dropdown-root">
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button
              ref={ref as React.Ref<HTMLButtonElement>}
              type="button"
              className={cn("kz-nav-button", "kz-nav-button-dropdown", className)}
            >
              <span className="kz-nav-button-icon" style={{ color: "var(--kz-component-nav-button-icon)" }}>
                {icon}
              </span>
              <span className="kz-nav-button-label">{label}</span>
              <ChevronDown
                className="kz-nav-button-chevron"
                size={16}
                style={{ color: "var(--kz-component-nav-button-chevron)" }}
                aria-hidden
              />
            </button>
          </DropdownMenuPrimitive.Trigger>
          {/* No Portal: render in-flow so menu pushes nav-buttons below down */}
          <DropdownMenuPrimitive.Content
            className="kz-nav-dropdown-menu"
            sideOffset={4}
            align="start"
            alignOffset={0}
          >
            {menuOptions.map((opt, i) =>
              opt.subMenu && opt.subMenu.length > 0 ? (
                <DropdownMenuPrimitive.Sub key={i}>
                  <DropdownMenuPrimitive.SubTrigger className="kz-nav-dropdown-option">
                    {opt.label}
                    <ChevronDown className="kz-nav-dropdown-option-chevron" size={14} aria-hidden />
                  </DropdownMenuPrimitive.SubTrigger>
                  <DropdownMenuPrimitive.SubContent
                    className="kz-nav-dropdown-menu kz-nav-dropdown-sub"
                    sideOffset={2}
                    alignOffset={8}
                    {...({ side: "bottom", align: "start" } as React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>)}
                  >
                    {opt.subMenu.map((sub, j) => (
                      <DropdownMenuPrimitive.Item
                        key={j}
                        className="kz-nav-dropdown-option"
                        onSelect={() => sub.onClick?.()}
                        asChild={!!sub.href}
                      >
                        {sub.href ? <a href={sub.href}>{sub.label}</a> : <span>{sub.label}</span>}
                      </DropdownMenuPrimitive.Item>
                    ))}
                  </DropdownMenuPrimitive.SubContent>
                </DropdownMenuPrimitive.Sub>
              ) : (
                <DropdownMenuPrimitive.Item
                  key={i}
                  className="kz-nav-dropdown-option"
                  onSelect={() => opt.onClick?.()}
                  asChild={!!opt.href}
                >
                  {opt.href ? <a href={opt.href}>{opt.label}</a> : <span>{opt.label}</span>}
                </DropdownMenuPrimitive.Item>
              )
            )}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Root>
      </div>
    );
  }
);

NavButton.displayName = "NavButton";

export { NavButton };
