import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../utils/cn";
import { Icon, IconName } from "../../icon";

export type TabsVariant = "pill" | "underline" | "vertical";
export type TabsSize = "sm" | "md" | "lg";

interface TabsContextValue {
  variant: TabsVariant;
  size: TabsSize;
  fullWidth: boolean;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue>({
  variant: "pill",
  size: "md",
  fullWidth: false,
});

function useTabsContext(): TabsContextValue {
  return React.useContext(TabsContext);
}

export interface TabsProps extends React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Root
> {
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
  className?: string;
}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(
  (
    {
      variant = "pill",
      size = "md",
      fullWidth = false,
      className,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const ctx: TabsContextValue = React.useMemo(
      () => ({ variant, size, fullWidth, onValueChange }),
      [variant, size, fullWidth, onValueChange]
    );
    return (
      <TabsContext.Provider value={ctx}>
        <TabsPrimitive.Root
          ref={ref}
          activationMode="manual"
          data-tabs-variant={variant}
          data-tabs-size={size}
          data-tabs-full-width={fullWidth ? "" : undefined}
          className={cn("kz-tabs", className)}
          onValueChange={onValueChange}
          {...props}
        />
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = TabsPrimitive.Root.displayName;

export interface TabsListProps extends React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.List
> {
  className?: string;
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => {
  const { variant, size, fullWidth } = useTabsContext();
  const listRef = React.useRef<HTMLDivElement>(null);

  // Override Radix's roving tabindex so Tab key moves between triggers.
  // Radix sets tabIndex={-1} on inactive triggers; we force them all to 0.
  React.useEffect(() => {
    const node = listRef.current;
    if (!node) return;

    const forceTabIndex = () => {
      node.querySelectorAll<HTMLElement>('[role="tab"]').forEach((el) => {
        if (el.getAttribute("tabindex") !== "0") {
          el.setAttribute("tabindex", "0");
        }
      });
    };

    forceTabIndex();

    const observer = new MutationObserver(forceTabIndex);
    observer.observe(node, {
      attributes: true,
      attributeFilter: ["tabindex"],
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <TabsPrimitive.List
      ref={(node) => {
        (listRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      data-tabs-variant={variant}
      data-tabs-size={size}
      data-tabs-full-width={fullWidth ? "" : undefined}
      className={cn("kz-tabs-list", className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> {
  icon?: React.ReactNode;
  className?: string;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, icon, children, ...props }, ref) => {
  const { variant, size } = useTabsContext();
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-tabs-variant={variant}
      data-tabs-size={size}
      className={cn("kz-tabs-trigger", className)}
      {...props}
    >
      {icon != null ? (
        <span className="kz-tabs-trigger-icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      {children}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export interface TabsContentProps extends React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
> {
  className?: string;
}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    tabIndex={-1}
    className={cn("kz-tabs-content", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

/* ── SubTabsTrigger ── */

export interface SubTabOption {
  value: string;
  label: string;
}

export interface SubTabsTriggerProps {
  label: string;
  subTabs: SubTabOption[];
  activeValue?: string;
  className?: string;
}

const SubTabsTrigger = React.forwardRef<HTMLButtonElement, SubTabsTriggerProps>(
  ({ label, subTabs, activeValue, className }, ref) => {
    const { variant, size, onValueChange } = useTabsContext();
    const isActive = subTabs.some((st) => st.value === activeValue);

    const [open, setOpen] = React.useState(false);
    const btnRef = React.useRef<HTMLButtonElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Merge refs
    const mergedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        (btnRef as React.MutableRefObject<HTMLButtonElement | null>).current =
          node;
        if (typeof ref === "function") ref(node);
        else if (ref)
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
            node;
      },
      [ref]
    );

    // Position menu relative to button, close on scroll
    const [menuStyle, setMenuStyle] = React.useState<React.CSSProperties>({});

    const updatePosition = React.useCallback(() => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      setMenuStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        minWidth: rect.width,
      });
    }, []);

    React.useEffect(() => {
      if (!open) return;
      updatePosition();

      // Close on scroll so the menu doesn't float in wrong position
      const closeOnScroll = () => setOpen(false);
      window.addEventListener("scroll", closeOnScroll, { capture: true });
      return () =>
        window.removeEventListener("scroll", closeOnScroll, {
          capture: true,
        } as EventListenerOptions);
    }, [open, updatePosition]);

    // Close on outside click or Escape
    React.useEffect(() => {
      if (!open) return;
      const handleClick = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          btnRef.current?.contains(target) ||
          menuRef.current?.contains(target)
        )
          return;
        setOpen(false);
      };
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
          btnRef.current?.focus();
        }
      };
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);
      return () => {
        document.removeEventListener("mousedown", handleClick);
        document.removeEventListener("keydown", handleKey);
      };
    }, [open]);

    const handleSelect = (value: string) => {
      onValueChange?.(value);
      setOpen(false);
      btnRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "ArrowDown" && open && menuRef.current) {
        e.preventDefault();
        const first = menuRef.current.querySelector<HTMLElement>(
          ".kz-tabs-subtrigger-option"
        );
        first?.focus();
      }
    };

    const handleOptionKeyDown = (
      e: React.KeyboardEvent,
      value: string,
      index: number
    ) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect(value);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = menuRef.current?.querySelectorAll<HTMLElement>(
          ".kz-tabs-subtrigger-option"
        )[index + 1];
        next?.focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (index === 0) {
          btnRef.current?.focus();
        } else {
          const prev = menuRef.current?.querySelectorAll<HTMLElement>(
            ".kz-tabs-subtrigger-option"
          )[index - 1];
          prev?.focus();
        }
      }
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };

    return (
      <>
        <button
          ref={mergedRef}
          type="button"
          className={cn("kz-tabs-subtrigger-group", className)}
          data-tabs-variant={variant}
          data-tabs-size={size}
          data-state={isActive ? "active" : "inactive"}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
        >
          <span className="kz-tabs-subtrigger-label">{label}</span>
          <span
            className="kz-tabs-subtrigger-chevron"
            data-open={open ? "" : undefined}
          >
            <Icon name={IconName.ChevronDown} size={14} color="currentColor" />
          </span>
        </button>

        {open &&
          ReactDOM.createPortal(
            <div
              ref={menuRef}
              className="kz-tabs-subtrigger-menu"
              role="listbox"
              style={menuStyle}
            >
              {subTabs.map((st, i) => (
                <div
                  key={st.value}
                  className={cn(
                    "kz-tabs-subtrigger-option",
                    st.value === activeValue &&
                      "kz-tabs-subtrigger-option--active"
                  )}
                  role="option"
                  tabIndex={0}
                  aria-selected={st.value === activeValue}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(st.value);
                  }}
                  onKeyDown={(e) => handleOptionKeyDown(e, st.value, i)}
                >
                  {st.label}
                </div>
              ))}
            </div>,
            document.body
          )}
      </>
    );
  }
);
SubTabsTrigger.displayName = "SubTabsTrigger";

export { Tabs, TabsList, TabsTrigger, TabsContent, SubTabsTrigger };
