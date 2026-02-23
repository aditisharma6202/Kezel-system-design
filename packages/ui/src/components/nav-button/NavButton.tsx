import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as Collapsible from "@radix-ui/react-collapsible";
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
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export interface NavButtonLinkProps extends NavButtonPropsBase {
  type: "link";
  selected?: boolean;
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export interface NavButtonDropdownProps extends NavButtonPropsBase {
  type: "dropdown";
  menuOptions: NavButtonOption[];
  /** When set and dropdown is closed, trigger icon and text use selected color (#18AB9F) if this matches any option or sub-option label. */
  selectedOptionLabel?: string;
}

export type NavButtonProps = NavButtonLinkProps | NavButtonDropdownProps;

const NavButton = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement | HTMLDivElement,
  NavButtonProps
>((props, ref) => {
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
          onClick={
            onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined
          }
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

  const { menuOptions, selectedOptionLabel } = props;
  const hasSelection =
    selectedOptionLabel != null &&
    selectedOptionLabel !== "" &&
    menuOptions.some(
      (opt) =>
        opt.label === selectedOptionLabel ||
        opt.subMenu?.some((sub) => sub.label === selectedOptionLabel)
    );
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          className={cn(
            "kz-nav-button",
            "kz-nav-button-dropdown",
            hasSelection && "kz-nav-button-dropdown--has-selection",
            className
          )}
          data-has-selection={hasSelection || undefined}
        >
          <span className="kz-nav-button-icon">{icon}</span>
          <span className="kz-nav-button-label">{label}</span>
          <ChevronDown
            className="kz-nav-button-chevron"
            size={16}
            aria-hidden
          />
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className="kz-nav-dropdown-menu"
          sideOffset={4}
          align="start"
          alignOffset={0}
        >
          {menuOptions.map((opt, i) =>
            opt.subMenu && opt.subMenu.length > 0 ? (
              <Collapsible.Root key={i}>
                <Collapsible.Trigger asChild>
                  <button
                    type="button"
                    className="kz-nav-dropdown-option kz-nav-dropdown-option-trigger"
                  >
                    <span>{opt.label}</span>
                    <ChevronDown
                      className="kz-nav-dropdown-option-chevron"
                      size={14}
                      aria-hidden
                    />
                  </button>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <div className="kz-nav-dropdown-sublist">
                    {opt.subMenu.map((sub, j) => (
                      <DropdownMenuPrimitive.Item
                        key={j}
                        className="kz-nav-dropdown-option kz-nav-dropdown-subitem"
                        onSelect={() => sub.onClick?.()}
                        asChild={!!sub.href}
                      >
                        {sub.href ? (
                          <a href={sub.href}>{sub.label}</a>
                        ) : (
                          <span>{sub.label}</span>
                        )}
                      </DropdownMenuPrimitive.Item>
                    ))}
                  </div>
                </Collapsible.Content>
              </Collapsible.Root>
            ) : (
              <DropdownMenuPrimitive.Item
                key={i}
                className="kz-nav-dropdown-option"
                onSelect={() => opt.onClick?.()}
                asChild={!!opt.href}
              >
                {opt.href ? (
                  <a href={opt.href}>{opt.label}</a>
                ) : (
                  <span>{opt.label}</span>
                )}
              </DropdownMenuPrimitive.Item>
            )
          )}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
});

NavButton.displayName = "NavButton";

export { NavButton };
