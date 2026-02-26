import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../utils/cn";

export type TabsVariant = "pill" | "underline" | "vertical";
export type TabsSize = "sm" | "md" | "lg";

interface TabsContextValue {
  variant: TabsVariant;
  size: TabsSize;
  fullWidth: boolean;
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
    { variant = "pill", size = "md", fullWidth = false, className, ...props },
    ref
  ) => {
    const value: TabsContextValue = React.useMemo(
      () => ({ variant, size, fullWidth }),
      [variant, size, fullWidth]
    );
    return (
      <TabsContext.Provider value={value}>
        <TabsPrimitive.Root
          ref={ref}
          data-tabs-variant={variant}
          data-tabs-size={size}
          data-tabs-full-width={fullWidth ? "" : undefined}
          className={cn("kz-tabs", className)}
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
  return (
    <TabsPrimitive.List
      ref={ref}
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
    className={cn("kz-tabs-content", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
