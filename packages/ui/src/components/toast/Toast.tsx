"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { cn } from "../../utils/cn";
import { Icon, IconName } from "../../icon";
import { ToastVariant, ToastPosition } from "../../constants/enum";

/* ── Types ── */

export interface ToastData {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
}

export interface ToasterProps {
  position?: ToastPosition;
  className?: string;
}

export interface ToastContextValue {
  toast: (opts: Omit<ToastData, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

/* ── Icon mapping ── */

const TOAST_ICONS: Record<ToastVariant, IconName> = {
  [ToastVariant.Success]: IconName.CheckCircle,
  [ToastVariant.Error]: IconName.CircleAlert,
  [ToastVariant.Warning]: IconName.TriangleAlert,
  [ToastVariant.Info]: IconName.CircleAlert,
};

/* ── Context ── */

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a <ToastProvider>");
  return ctx;
}

/* ── Provider ── */

let toastCounter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);
  const timersRef = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
  }, []);

  const toast = React.useCallback(
    (opts: Omit<ToastData, "id">) => {
      const id = `toast-${++toastCounter}`;
      const data: ToastData = { ...opts, id };
      setToasts((prev) => [...prev, data]);
      const duration = opts.duration ?? 5000;
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timersRef.current.set(id, timer);
      }
      return id;
    },
    [dismiss]
  );

  React.useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const value = React.useMemo(
    () => ({ toast, dismiss, dismissAll }),
    [toast, dismiss, dismissAll]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewportInternal toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

/* ── Internal viewport (rendered inside provider) ── */

function ToastViewportInternal({
  toasts,
  onDismiss,
}: {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}) {
  const [position, setPosition] = React.useState<ToastPosition>(
    ToastPosition.TopRight
  );
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Allow Toaster to set position via a custom event
  React.useEffect(() => {
    const handler = (e: Event) => {
      const pos = (e as CustomEvent<ToastPosition>).detail;
      setPosition(pos);
    };
    window.addEventListener("kz-toast-position", handler);
    return () => window.removeEventListener("kz-toast-position", handler);
  }, []);

  if (!mounted || toasts.length === 0) return null;

  return ReactDOM.createPortal(
    <div
      className={cn("kz-toast-viewport", `kz-toast-viewport--${position}`)}
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} data={t} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body
  );
}

/* ── Toaster (position configurator) ── */

export function Toaster({ position = ToastPosition.TopRight }: ToasterProps) {
  React.useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("kz-toast-position", { detail: position })
    );
  }, [position]);

  return null;
}

/* ── Toast item ── */

function ToastItem({
  data,
  onDismiss,
}: {
  data: ToastData;
  onDismiss: (id: string) => void;
}) {
  return (
    <div className={cn("kz-toast", `kz-toast--${data.variant}`)} role="alert">
      <span className="kz-toast-icon shrink-0 mt-0.5">
        <Icon name={TOAST_ICONS[data.variant]} size={18} color="currentColor" />
      </span>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="text-sm font-medium text-[var(--kz-color-text-primary)]">
          {data.title}
        </span>
        {data.description && (
          <span className="text-xs text-[var(--kz-color-text-secondary)]">
            {data.description}
          </span>
        )}
      </div>
      <button
        type="button"
        className="kz-toast-close shrink-0"
        onClick={() => onDismiss(data.id)}
        aria-label="Dismiss"
      >
        <Icon name={IconName.X} size={14} color="currentColor" />
      </button>
    </div>
  );
}
