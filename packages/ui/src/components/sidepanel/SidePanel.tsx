import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Icon, IconName } from "../../icon";
import { cn } from "../../utils/cn";

/* ── Types ── */

export type SidePanelSide = "left" | "right";

export interface SidePanelProps {
  /** Controlled open state. */
  open?: boolean;
  /** Fires when the panel wants to open/close. */
  onOpenChange?: (open: boolean) => void;

  /** Which side to slide from. Default: "right" */
  side?: SidePanelSide;
  /** Width of the panel. Accepts any CSS value: "50%", "400px", "30vw", etc. Default: "400px" */
  width?: string | number;

  /** Show the overlay backdrop. Default: true */
  overlay?: boolean;
  /** Close when clicking the overlay. Default: true */
  closeOnOverlayClick?: boolean;
  /** Close when pressing Escape. Default: true */
  closeOnEscape?: boolean;

  /** Accessible title for screen readers. Default: "Panel" */
  title?: string;
  /** Fully customisable header area — accepts any ReactNode (buttons, breadcrumbs, etc.). Rendered left of the close button. */
  header?: React.ReactNode;
  /** Fully customisable footer area — accepts any ReactNode. */
  footer?: React.ReactNode;
  /** Keep the header pinned at the top while the body scrolls. Default: true */
  stickyHeader?: boolean;
  /** Keep the footer pinned at the bottom while the body scrolls. Default: true */
  stickyFooter?: boolean;
  /** Hide the built-in close button. Default: false */
  hideCloseButton?: boolean;

  children?: React.ReactNode;
  className?: string;
}

/* ── Component ── */

const SidePanel = React.forwardRef<HTMLDivElement, SidePanelProps>(
  (
    {
      open,
      onOpenChange,
      side = "right",
      width = "400px",
      overlay = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      title = "Panel",
      header,
      footer,
      stickyHeader = true,
      stickyFooter = true,
      hideCloseButton = false,
      children,
      className,
    },
    ref
  ) => {
    const resolvedWidth = typeof width === "number" ? `${width}px` : width;

    const headerEl =
      header != null || !hideCloseButton ? (
        <div className="kz-sidepanel-header">
          <div className="kz-sidepanel-header-content">{header}</div>
          {!hideCloseButton && (
            <RadixDialog.Close asChild>
              <button
                type="button"
                className="kz-sidepanel-close"
                aria-label="Close panel"
              >
                <Icon name={IconName.X} size={16} />
              </button>
            </RadixDialog.Close>
          )}
        </div>
      ) : null;

    const footerEl =
      footer != null ? (
        <div className="kz-sidepanel-footer">{footer}</div>
      ) : null;

    return (
      <RadixDialog.Root open={open} onOpenChange={onOpenChange} modal={overlay}>
        <RadixDialog.Portal>
          {overlay && (
            <RadixDialog.Overlay
              className="kz-sidepanel-overlay"
              onClick={
                closeOnOverlayClick ? undefined : (e) => e.preventDefault()
              }
            />
          )}
          <RadixDialog.Content
            ref={ref}
            className={cn(
              "kz-sidepanel",
              `kz-sidepanel--${side}`,
              !overlay && "kz-sidepanel--no-overlay",
              className
            )}
            style={{ width: resolvedWidth }}
            aria-describedby={undefined}
            onEscapeKeyDown={
              closeOnEscape ? undefined : (e) => e.preventDefault()
            }
            onInteractOutside={
              !overlay || !closeOnOverlayClick
                ? (e) => e.preventDefault()
                : undefined
            }
          >
            <RadixDialog.Title
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: "hidden",
                clip: "rect(0,0,0,0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            >
              {title}
            </RadixDialog.Title>
            {stickyHeader && headerEl}
            <div className="kz-sidepanel-scroll">
              {!stickyHeader && headerEl}
              <div className="kz-sidepanel-body">{children}</div>
              {!stickyFooter && footerEl}
            </div>
            {stickyFooter && footerEl}
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    );
  }
);

SidePanel.displayName = "SidePanel";

/* ── Trigger ── */

const SidePanelTrigger = RadixDialog.Trigger;
SidePanelTrigger.displayName = "SidePanelTrigger";

export { SidePanel, SidePanelTrigger };
