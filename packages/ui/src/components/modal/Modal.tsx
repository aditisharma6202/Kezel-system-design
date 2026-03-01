import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "../../utils/cn";
import { Icon, IconName } from "../../icon";

/* ── Enums ── */

export enum ModalSize {
  Sm = "sm",
  Md = "md",
  Lg = "lg",
  Xl = "xl",
  Full = "full",
}

/* ── Types ── */

export interface ModalProps {
  /** Controlled open state. */
  open?: boolean;
  /** Fires when the modal wants to open/close. */
  onOpenChange?: (open: boolean) => void;

  /** Size of the modal. Default: ModalSize.Md */
  size?: ModalSize;

  /** Show the overlay backdrop. Default: true */
  overlay?: boolean;
  /** Close when clicking the overlay. Default: true */
  closeOnOverlayClick?: boolean;
  /** Close when pressing Escape. Default: true */
  closeOnEscape?: boolean;

  /** Accessible title for screen readers. Default: "Modal" */
  title?: string;
  /** Content for the header area (left of close button). */
  header?: React.ReactNode;
  /** Content for the footer area. */
  footer?: React.ReactNode;

  children?: React.ReactNode;
  className?: string;
}

/* ── Component ── */

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onOpenChange,
      size = ModalSize.Md,
      overlay = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      title = "Modal",
      header,
      footer,
      children,
      className,
    },
    ref
  ) => {
    return (
      <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
        <RadixDialog.Portal>
          {overlay && (
            <RadixDialog.Overlay
              className="kz-modal-overlay"
              onClick={
                closeOnOverlayClick ? undefined : (e) => e.preventDefault()
              }
            />
          )}
          <RadixDialog.Content
            ref={ref}
            className={cn("kz-modal", `kz-modal--${size}`, className)}
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
              <div className="kz-modal-header">
                <div className="kz-modal-header-content">{header}</div>
                <RadixDialog.Close asChild>
                  <button
                    type="button"
                    className="kz-modal-close"
                    aria-label="Close modal"
                  >
                    <Icon name={IconName.X} size={16} />
                  </button>
                </RadixDialog.Close>
              </div>
            )}

            <div className="kz-modal-body">{children}</div>

            {footer != null && <div className="kz-modal-footer">{footer}</div>}
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    );
  }
);

Modal.displayName = "Modal";

/* ── Trigger ── */

const ModalTrigger = RadixDialog.Trigger;
ModalTrigger.displayName = "ModalTrigger";

export { Modal, ModalTrigger };
