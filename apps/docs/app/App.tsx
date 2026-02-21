"use client";

import * as React from "react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  KezelThemeProvider,
  KezelVariant,
  KezelMode,
} from "kz-design-system";

export default function App() {
  const [mode, setMode] = React.useState<KezelMode>(KezelMode.Light);
  const [variant, setVariant] = React.useState<KezelVariant>(KezelVariant.Neumorphic);

  return (
    <KezelThemeProvider variant={variant} mode={mode}>
      <main
        className="min-h-screen flex flex-col items-center justify-center gap-12 p-8 transition-colors bg-[var(--kz-color-surface-background)]"
      >
        <h1 className="text-2xl font-semibold" style={{ color: "var(--kz-color-text-primary)" }}>
          Button variants & sizes
        </h1>

        {/* Theme: variant + mode */}
        <section className="flex flex-col items-center gap-3">
          <p className="text-sm" style={{ color: "var(--kz-color-text-secondary)" }}>
            Theme: {variant} · {mode === KezelMode.Light ? "light" : "dark"}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Sm}
              onClick={() => setVariant(KezelVariant.Standard)}
            >
              Standard
            </Button>
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Sm}
              onClick={() => setVariant(KezelVariant.Neumorphic)}
            >
              Neumorphic
            </Button>
            <Button
              variant={ButtonVariant.Container}
              size={ButtonSize.Sm}
              onClick={() => setMode(mode === KezelMode.Light ? KezelMode.Dark : KezelMode.Light)}
            >
              {mode === KezelMode.Light ? "Switch to dark" : "Switch to light"}
            </Button>
            <Button
              variant={ButtonVariant.Container}
              size={ButtonSize.Sm}
              onClick={() => { }}
              asChild
            >
              <a href="https://www.google.com">Google</a>
            </Button>
          </div>
        </section>

        {/* Variants: Accent, Primary, Container */}
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-medium" style={{ color: "var(--kz-color-text-primary)" }}>
            Variants
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant={ButtonVariant.Accent} size={ButtonSize.Md} onClick={() => { }}>
              Accent
            </Button>
            <Button variant={ButtonVariant.Primary} size={ButtonSize.Md} onClick={() => { }}>
              Primary
            </Button>
            <Button variant={ButtonVariant.Container} size={ButtonSize.Md} onClick={() => { }}>
              Container
            </Button>
          </div>
        </section>

        {/* Sizes */}
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-medium" style={{ color: "var(--kz-color-text-primary)" }}>
            Sizes
          </h2>
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <Button variant={ButtonVariant.Primary} size={ButtonSize.Sm} onClick={() => { }}>
              Small
            </Button>
            <Button variant={ButtonVariant.Primary} size={ButtonSize.Md} onClick={() => { }}>
              Medium
            </Button>
            <Button variant={ButtonVariant.Primary} size={ButtonSize.Lg} onClick={() => { }}>
              Large
            </Button>
          </div>
        </section>

        {/* All variants × sizes (compact) */}
        <section className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-medium" style={{ color: "var(--kz-color-text-primary)" }}>
            All combinations
          </h2>
          <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
            {([ButtonVariant.Accent, ButtonVariant.Primary, ButtonVariant.Container] as const).map(
              (v) =>
                ([ButtonSize.Sm, ButtonSize.Md, ButtonSize.Lg] as const).map((s) => (
                  <Button key={`${v}-${s}`} variant={v} size={s} onClick={() => { }}>
                    {v} {s}
                  </Button>
                ))
            )}
          </div>
        </section>
      </main>
    </KezelThemeProvider>
  );
}
