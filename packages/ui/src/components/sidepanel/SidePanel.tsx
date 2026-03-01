import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "../../utils/cn";
import { Icon, IconName } from "../../icon";

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
  /** Content for the header area (left of close button). */
  header?: React.ReactNode;
  /** Content for the footer area. */
  footer?: React.ReactNode;

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
      children,
      className,
    },
    ref
  ) => {
    const resolvedWidth = typeof width === "number" ? `${width}px` : width;

    return (
      <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
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
              closeOnOverlayClick ? undefined : (e) => e.preventDefault()
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
            {header != null && (
              <div className="kz-sidepanel-header">
                <div className="kz-sidepanel-header-content">{header}</div>
                <RadixDialog.Close asChild>
                  <button
                    type="button"
                    className="kz-sidepanel-close"
                    aria-label="Close panel"
                  >
                    <Icon name={IconName.X} size={16} />
                  </button>
                </RadixDialog.Close>
              </div>
            )}

            <div className="kz-sidepanel-body">{children}</div>

            {footer != null && (
              <div className="kz-sidepanel-footer">{footer}</div>
            )}
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
