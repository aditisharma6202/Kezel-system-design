"use client";

import * as React from "react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  Typography,
  TypographyVariantEnum,
  TypographyAlignEnum,
  TextInput,
  TextInputVariant,
  TextInputSize,
  TextInputState,
  KezelThemeProvider,
  KezelVariant,
  KezelMode,
} from "kz-design-system";

export default function App() {
  const [mode, setMode] = React.useState<KezelMode>(KezelMode.Light);
  const [variant, setVariant] = React.useState<KezelVariant>(KezelVariant.Neumorphic);
  const [defaultValue, setDefaultValue] = React.useState("");
  const [ghostValue, setGhostValue] = React.useState("");
  const [errorValue, setErrorValue] = React.useState("invalid@");
  const [successValue, setSuccessValue] = React.useState("valid@email.com");
  const [clearableValue, setClearableValue] = React.useState("Clear me");
  const [countValue, setCountValue] = React.useState("");

  return (
    <KezelThemeProvider variant={variant} mode={mode}>
      <main
        className="min-h-screen flex flex-col items-center justify-center gap-12 p-8 transition-colors bg-[var(--kz-color-surface-background)]"
      >
        <Typography variant={TypographyVariantEnum.H1} align={TypographyAlignEnum.Center}>
          Design system
        </Typography>

        {/* Typography showcase */}
        <section className="flex flex-col items-center gap-4 w-full max-w-xl">
          <Typography variant={TypographyVariantEnum.H2}>
            Typography
          </Typography>
          <div className="flex flex-col gap-2 w-full text-left">
            <Typography variant={TypographyVariantEnum.H1}>Heading 1</Typography>
            <Typography variant={TypographyVariantEnum.H2}>Heading 2</Typography>
            <Typography variant={TypographyVariantEnum.H3}>Heading 3</Typography>
            <Typography variant={TypographyVariantEnum.Body}>
              Body — The quick brown fox jumps over the lazy dog.
            </Typography>
            <Typography variant={TypographyVariantEnum.Small}>
              Small — 14px text for secondary content.
            </Typography>
            <Typography variant={TypographyVariantEnum.Caption}>
              Caption — Secondary/muted caption text.
            </Typography>
            <Typography variant={TypographyVariantEnum.Label}>
              Label — Form labels, 16px.
            </Typography>
            <Typography variant={TypographyVariantEnum.Link} href="#typography">
              Link — With href (renders as anchor).
            </Typography>
            <Typography variant={TypographyVariantEnum.Error}>
              Error — Validation or error message.
            </Typography>
            <Typography variant={TypographyVariantEnum.Success}>
              Success — Confirmation or success message.
            </Typography>
            <Typography variant={TypographyVariantEnum.Warning}>
              Warning — Caution or warning message.
            </Typography>
          </div>
        </section>

        <Typography variant={TypographyVariantEnum.H2} align={TypographyAlignEnum.Center}>
          Button variants & sizes
        </Typography>

        {/* Theme: variant + mode */}
        <section className="flex flex-col items-center gap-3">
          <Typography variant={TypographyVariantEnum.Caption}>
            Theme: {variant} · {mode === KezelMode.Light ? "light" : "dark"}
          </Typography>
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
          <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
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
          <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
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
          <Typography variant={TypographyVariantEnum.H3}>All combinations</Typography>
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

        <section className="flex flex-col items-center gap-6 w-full max-w-md">
          <Typography variant={TypographyVariantEnum.H2}>TextInput</Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Switch theme (Standard / Neumorphic) and mode (Light / Dark) above to see input styles change.
          </Typography>

          <div className="w-full flex flex-col gap-2">
            <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
            <TextInput
              label="Default"
              value={defaultValue}
              placeHolder="Placeholder"
              onValueChange={setDefaultValue}
              variant={TextInputVariant.Default}
              size={TextInputSize.Md}
            />
            <TextInput
              label="Container"
              value={defaultValue}
              placeHolder="Transparent background"
              onValueChange={setDefaultValue}
              variant={TextInputVariant.Container}
              size={TextInputSize.Md}
            />
            <TextInput
              label="Ghost"
              value={ghostValue}
              placeHolder="Border bottom only"
              onValueChange={setGhostValue}
              variant={TextInputVariant.Ghost}
              size={TextInputSize.Md}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
            <TextInput
              value={defaultValue}
              placeHolder="Small"
              onValueChange={setDefaultValue}
              variant={TextInputVariant.Default}
              size={TextInputSize.Sm}
            />
            <TextInput
              value={defaultValue}
              placeHolder="Medium"
              onValueChange={setDefaultValue}
              variant={TextInputVariant.Default}
              size={TextInputSize.Md}
            />
            <TextInput
              value={defaultValue}
              placeHolder="Large"
              onValueChange={setDefaultValue}
              variant={TextInputVariant.Default}
              size={TextInputSize.Lg}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <Typography variant={TypographyVariantEnum.H3}>States</Typography>
            <TextInput
              label="Error"
              value={errorValue}
              placeHolder="Email"
              onValueChange={setErrorValue}
              state={TextInputState.Error}
              errorText="Please enter a valid email address."
              variant={TextInputVariant.Default}
            />
            <TextInput
              label="Success"
              value={successValue}
              placeHolder="Email"
              onValueChange={setSuccessValue}
              state={TextInputState.Success}
              successText="Looks good!"
              variant={TextInputVariant.Default}
            />
            <TextInput
              label="Warning"
              value={defaultValue}
              placeHolder="Optional field"
              onValueChange={setDefaultValue}
              state={TextInputState.Warning}
              warningText="This field is recommended."
              variant={TextInputVariant.Default}
            />
            <TextInput
              label="Disabled"
              value="Disabled value"
              placeHolder="Placeholder"
              onValueChange={() => {}}
              variant={TextInputVariant.Default}
              disabled
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <Typography variant={TypographyVariantEnum.H3}>Options</Typography>
            <TextInput
              label="Clearable"
              value={clearableValue}
              placeHolder="Type then clear"
              onValueChange={setClearableValue}
              clearable
              variant={TextInputVariant.Default}
            />
            <TextInput
              label="With character count"
              value={countValue}
              placeHolder="Max 50 characters"
              onValueChange={setCountValue}
              showCount
              maxLength={50}
              variant={TextInputVariant.Default}
            />
            <TextInput
              label="With description"
              description="We'll never share this with anyone."
              value={defaultValue}
              placeHolder="Description below label"
              onValueChange={setDefaultValue}
              variant={TextInputVariant.Default}
            />
          </div>
        </section>
      </main>
    </KezelThemeProvider>
  );
}
