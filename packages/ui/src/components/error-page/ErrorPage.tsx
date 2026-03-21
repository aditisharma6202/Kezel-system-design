import * as React from "react";
import { cn } from "../../utils/cn";
import { Icon, IconName } from "../../icon";

/* ── Types ── */

export type ErrorPageStatus =
  | "error"
  | "warning"
  | "info"
  | "not-found"
  | "forbidden"
  | "server-error";

export interface ErrorPageProps {
  /** Determines default icon and color scheme. Default: "error" */
  status?: ErrorPageStatus;
  /** Large status code display, e.g. "404", "500". */
  statusCode?: string | number;
  /** Main heading text. */
  title: string;
  /** Body text below the heading. */
  description?: string;
  /** Override the default status icon with any ReactNode. */
  icon?: React.ReactNode;
  /** Slot for action button(s). */
  action?: React.ReactNode;
  /** Optional branding/logo rendered at the top. */
  logo?: React.ReactNode;
  /** If true (default), uses fixed positioning at 100vh. If false, fills parent. */
  fullPage?: boolean;
  /** Additional className on the root element. */
  className?: string;
}

/* ── Status defaults ── */

const STATUS_ICON: Record<ErrorPageStatus, IconName> = {
  error: IconName.CircleAlert,
  warning: IconName.TriangleAlert,
  info: IconName.CircleAlert,
  "not-found": IconName.Search,
  forbidden: IconName.Shield,
  "server-error": IconName.Globe,
};

/* ── Component ── */

const ErrorPage = React.forwardRef<HTMLDivElement, ErrorPageProps>(
  (
    {
      status = "error",
      statusCode,
      title,
      description,
      icon,
      action,
      logo,
      fullPage = true,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "kz-error-page",
          `kz-error-page--${status}`,
          fullPage && "kz-error-page--full",
          className
        )}
        role="main"
        aria-labelledby="kz-error-page-title"
      >
        <div className="kz-error-page__bg" aria-hidden="true" />

        <div className="kz-error-page__content">
          {logo != null && <div className="kz-error-page__logo">{logo}</div>}

          <div className="kz-error-page__icon">
            {icon ?? (
              <Icon name={STATUS_ICON[status]} size={48} color="currentColor" />
            )}
          </div>

          {statusCode != null && (
            <div className="kz-error-page__code">{statusCode}</div>
          )}

          <h1 id="kz-error-page-title" className="kz-error-page__title">
            {title}
          </h1>

          {description != null && description !== "" && (
            <p className="kz-error-page__description">{description}</p>
          )}

          {action != null && (
            <div className="kz-error-page__action">{action}</div>
          )}
        </div>
      </div>
    );
  }
);

ErrorPage.displayName = "ErrorPage";

export { ErrorPage };
