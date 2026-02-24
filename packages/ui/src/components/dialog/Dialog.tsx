import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "../../utils/cn";

const Dialog: typeof RadixDialog.Root = RadixDialog.Root;
const DialogTrigger: typeof RadixDialog.Trigger = RadixDialog.Trigger;
const DialogPortal = RadixDialog.Portal;
const DialogClose: typeof RadixDialog.Close = RadixDialog.Close;

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => (
  <RadixDialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 transition-opacity data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = RadixDialog.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <RadixDialog.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100 sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </RadixDialog.Content>
  </DialogPortal>
));
DialogContent.displayName = RadixDialog.Content.displayName;

const DialogHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      props.className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      props.className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = RadixDialog.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = RadixDialog.Description.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
