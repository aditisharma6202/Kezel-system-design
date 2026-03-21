"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  ScreenLoader,
  Button,
  ButtonVariant,
  ButtonSize,
  Icon,
  IconName,
} from "kz-design-system";

export default function ScreenLoaderShowcase() {
  const [basicLoading, setBasicLoading] = React.useState(true);
  const [progressLoading, setProgressLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [logoLoading, setLogoLoading] = React.useState(true);
  const [dotsLoading, setDotsLoading] = React.useState(true);

  // Simulate determinate progress
  React.useEffect(() => {
    if (!progressLoading) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setProgressLoading(false), 400);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [progressLoading]);

  return (
    <section className="flex flex-col items-center gap-8 w-full max-w-2xl">
      <Typography variant={TypographyVariantEnum.H2}>ScreenLoader</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Content-area loader that overlays a section with a loading indicator,
        progress bar, and optional branding.
      </Typography>

      <div className="flex flex-col gap-8 w-full">
        {/* ── Basic Indeterminate ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            Basic (Indeterminate)
          </Typography>
          <Button
            variant={ButtonVariant.Ghost}
            size={ButtonSize.Md}
            onClick={() => setBasicLoading((v) => !v)}
            className="mb-2"
          >
            {basicLoading ? "Stop" : "Start"} Loading
          </Button>
          <ScreenLoader loading={basicLoading} label="Loading content...">
            <div
              className="flex items-center justify-center rounded-lg border"
              style={{
                height: 200,
                background: "var(--kz-color-surface-sunken)",
              }}
            >
              <Typography variant={TypographyVariantEnum.Body}>
                Your content goes here
              </Typography>
            </div>
          </ScreenLoader>
        </div>

        {/* ── Determinate Progress ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            Determinate Progress
          </Typography>
          <Button
            variant={ButtonVariant.Ghost}
            size={ButtonSize.Md}
            onClick={() => setProgressLoading(true)}
            className="mb-2"
            disabled={progressLoading}
          >
            {progressLoading ? `Uploading… ${progress}%` : "Simulate Upload"}
          </Button>
          <ScreenLoader
            loading={progressLoading}
            progress={progress}
            label={`Uploading… ${progress}%`}
          >
            <div
              className="flex items-center justify-center rounded-lg border"
              style={{
                height: 200,
                background: "var(--kz-color-surface-sunken)",
              }}
            >
              <Typography variant={TypographyVariantEnum.Body}>
                File upload area
              </Typography>
            </div>
          </ScreenLoader>
        </div>

        {/* ── Custom Logo ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            Custom Logo
          </Typography>
          <Button
            variant={ButtonVariant.Ghost}
            size={ButtonSize.Md}
            onClick={() => setLogoLoading((v) => !v)}
            className="mb-2"
          >
            {logoLoading ? "Stop" : "Start"} Loading
          </Button>
          <ScreenLoader
            loading={logoLoading}
            label="Preparing dashboard..."
            logo={
              <Icon
                name={IconName.BarChart2}
                size={40}
                color="var(--kz-color-brand-accent)"
              />
            }
          >
            <div
              className="flex items-center justify-center rounded-lg border"
              style={{
                height: 240,
                background: "var(--kz-color-surface-sunken)",
              }}
            >
              <Typography variant={TypographyVariantEnum.Body}>
                Dashboard content
              </Typography>
            </div>
          </ScreenLoader>
        </div>

        {/* ── Dots Variant + Custom Blur ── */}
        <div>
          <Typography variant={TypographyVariantEnum.H3} className="mb-2">
            Dots Variant (blur: 4, opacity: 0.8)
          </Typography>
          <Button
            variant={ButtonVariant.Ghost}
            size={ButtonSize.Md}
            onClick={() => setDotsLoading((v) => !v)}
            className="mb-2"
          >
            {dotsLoading ? "Stop" : "Start"} Loading
          </Button>
          <ScreenLoader
            loading={dotsLoading}
            loaderVariant="dots"
            loaderSize="xl"
            blur={4}
            overlayOpacity={0.8}
            label="Processing..."
          >
            <div
              className="flex items-center justify-center rounded-lg border"
              style={{
                height: 200,
                background: "var(--kz-color-surface-sunken)",
              }}
            >
              <Typography variant={TypographyVariantEnum.Body}>
                Content behind heavy blur
              </Typography>
            </div>
          </ScreenLoader>
        </div>
      </div>
    </section>
  );
}
