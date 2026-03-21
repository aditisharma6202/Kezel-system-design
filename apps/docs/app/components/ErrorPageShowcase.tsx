"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  ErrorPage,
  Button,
  ButtonVariant,
  ButtonSize,
  ButtonStatus,
  Icon,
  IconName,
} from "kz-design-system";

export default function ErrorPageShowcase() {
  return (
    <section className="flex flex-col items-center gap-8 w-full max-w-3xl">
      <Typography variant={TypographyVariantEnum.H2}>ErrorPage</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Full-screen error, warning, and info pages with status code, icon,
        description, and action buttons.
      </Typography>

      <div className="flex flex-col gap-8 w-full">
        {/* ── 404 Not Found ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            404 Not Found
          </Typography>
          <div
            className="rounded-lg border overflow-hidden"
            style={{ height: 420 }}
          >
            <ErrorPage
              status="not-found"
              statusCode={404}
              title="Page Not Found"
              description="The page you are looking for does not exist or has been moved."
              fullPage={false}
              action={
                <Button
                  variant={ButtonVariant.Primary}
                  status={ButtonStatus.Brand}
                  size={ButtonSize.Md}
                >
                  Go Home
                </Button>
              }
            />
          </div>
        </div>

        {/* ── 500 Server Error ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            500 Server Error
          </Typography>
          <div
            className="rounded-lg border overflow-hidden"
            style={{ height: 420 }}
          >
            <ErrorPage
              status="server-error"
              statusCode={500}
              title="Internal Server Error"
              description="Something went wrong on our end. Please try again later."
              fullPage={false}
              action={
                <Button
                  variant={ButtonVariant.Primary}
                  status={ButtonStatus.Error}
                  size={ButtonSize.Md}
                >
                  Retry
                </Button>
              }
            />
          </div>
        </div>

        {/* ── 403 Forbidden ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            403 Forbidden
          </Typography>
          <div
            className="rounded-lg border overflow-hidden"
            style={{ height: 420 }}
          >
            <ErrorPage
              status="forbidden"
              statusCode={403}
              title="Access Denied"
              description="You don't have permission to view this resource."
              fullPage={false}
              action={
                <div className="flex gap-3">
                  <Button
                    variant={ButtonVariant.Primary}
                    status={ButtonStatus.Brand}
                    size={ButtonSize.Md}
                  >
                    Go Home
                  </Button>
                  <Button variant={ButtonVariant.Ghost} size={ButtonSize.Md}>
                    Contact Support
                  </Button>
                </div>
              }
            />
          </div>
        </div>

        {/* ── Generic Error ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            Generic Error
          </Typography>
          <div
            className="rounded-lg border overflow-hidden"
            style={{ height: 400 }}
          >
            <ErrorPage
              status="error"
              title="Something Went Wrong"
              description="An unexpected error occurred. Please try again."
              fullPage={false}
              action={
                <Button
                  variant={ButtonVariant.Primary}
                  status={ButtonStatus.Error}
                  size={ButtonSize.Md}
                >
                  Retry
                </Button>
              }
            />
          </div>
        </div>

        {/* ── Warning ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            Warning
          </Typography>
          <div
            className="rounded-lg border overflow-hidden"
            style={{ height: 400 }}
          >
            <ErrorPage
              status="warning"
              title="Service Degraded"
              description="Some features may be temporarily unavailable. We're working on it."
              fullPage={false}
              action={
                <Button variant={ButtonVariant.Ghost} size={ButtonSize.Md}>
                  Check Status
                </Button>
              }
            />
          </div>
        </div>

        {/* ── Info ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            Info
          </Typography>
          <div
            className="rounded-lg border overflow-hidden"
            style={{ height: 400 }}
          >
            <ErrorPage
              status="info"
              title="Maintenance Scheduled"
              description="We'll be performing maintenance on March 25 from 2:00 AM to 4:00 AM UTC."
              fullPage={false}
            />
          </div>
        </div>

        {/* ── Custom Logo ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            With Custom Logo
          </Typography>
          <div
            className="rounded-lg border overflow-hidden"
            style={{ height: 450 }}
          >
            <ErrorPage
              status="not-found"
              statusCode={404}
              title="Page Not Found"
              description="We couldn't find what you were looking for."
              fullPage={false}
              logo={
                <Icon
                  name={IconName.BarChart2}
                  size={32}
                  color="var(--kz-color-brand-accent)"
                />
              }
              action={
                <Button
                  variant={ButtonVariant.Primary}
                  status={ButtonStatus.Brand}
                  size={ButtonSize.Md}
                >
                  Back to Dashboard
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
