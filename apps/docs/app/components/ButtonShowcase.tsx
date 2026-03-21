"use client";

import {
  Button,
  ButtonVariant,
  ButtonSize,
  ButtonStatus,
  ButtonAspectRatio,
  Typography,
  TypographyVariantEnum,
  Icon,
  IconName,
} from "kz-design-system";

const VARIANTS = [
  ButtonVariant.Primary,
  ButtonVariant.Ghost,
  ButtonVariant.Container,
] as const;

const STATUSES = [
  ButtonStatus.Default,
  ButtonStatus.Brand,
  ButtonStatus.Success,
  ButtonStatus.Warning,
  ButtonStatus.Error,
  ButtonStatus.Info,
] as const;

export default function ButtonShowcase() {
  return (
    <>
      <section className="flex flex-col items-center gap-4">
        <Typography variant={TypographyVariantEnum.H2}>
          Button variants &amp; sizes
        </Typography>
      </section>

      {/* ── Variants ── */}
      <section className="flex flex-col items-center gap-4">
        <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Primary, Ghost, Container. Disabled uses reduced opacity; Loading
          shows spinner.
        </Typography>
        <div className="flex flex-wrap gap-3 justify-center">
          {VARIANTS.map((v) => (
            <Button key={v} variant={v} size={ButtonSize.Md} onClick={() => {}}>
              {v}
            </Button>
          ))}
          <Button
            variant={ButtonVariant.Primary}
            size={ButtonSize.Md}
            disabled
            onClick={() => {}}
          >
            Disabled
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            size={ButtonSize.Md}
            loading
            onClick={() => {}}
          >
            Loading
          </Button>
        </div>
      </section>

      {/* ── Sizes ── */}
      <section className="flex flex-col items-center gap-4">
        <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
        <div className="flex flex-wrap items-center gap-3 justify-center">
          <Button
            variant={ButtonVariant.Primary}
            status={ButtonStatus.Brand}
            size={ButtonSize.Sm}
            aspectRatio={ButtonAspectRatio.Square}
            onClick={() => {}}
          >
            <Icon name={IconName.BarChart2} size="sm" color="currentColor" />
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            status={ButtonStatus.Brand}
            size={ButtonSize.Md}
            onClick={() => {}}
          >
            Medium
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            status={ButtonStatus.Brand}
            size={ButtonSize.Lg}
            onClick={() => {}}
          >
            Large
          </Button>
        </div>
      </section>

      {/* ── Status × Variant matrix ── */}
      <section className="flex flex-col items-center gap-4">
        <Typography variant={TypographyVariantEnum.H3}>
          Status &times; Variant
        </Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Each status (Brand, Success, Warning, Error, Info) combined with every
          variant. Ghost + status shows colored text; Container + Brand shows
          brand border.
        </Typography>
        <div className="flex flex-col gap-4 items-center max-w-4xl">
          {STATUSES.map((st) => (
            <div key={st} className="flex flex-wrap gap-2 justify-center">
              {VARIANTS.map((v) => (
                <Button
                  key={`${st}-${v}`}
                  variant={v}
                  status={st}
                  size={ButtonSize.Md}
                  onClick={() => {}}
                >
                  {st} {v}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── All variant × size ── */}
      <section className="flex flex-col items-center gap-4">
        <Typography variant={TypographyVariantEnum.H3}>
          All variant &times; size combinations
        </Typography>
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
          {VARIANTS.map((v) =>
            ([ButtonSize.Sm, ButtonSize.Md, ButtonSize.Lg] as const).map(
              (s) => (
                <Button
                  key={`${v}-${s}`}
                  variant={v}
                  size={s}
                  onClick={() => {}}
                >
                  {v} {s}
                </Button>
              )
            )
          )}
        </div>
      </section>

      {/* ── With Icons ── */}
      <section className="flex flex-col items-center gap-4">
        <Typography variant={TypographyVariantEnum.H3}>With Icons</Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Use leftIcon and rightIcon props to add icons before/after the label.
        </Typography>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant={ButtonVariant.Primary}
            status={ButtonStatus.Brand}
            size={ButtonSize.Md}
            leftIcon={{
              name: IconName.Plus,
              size: "sm",
              color: "currentColor",
            }}
            onClick={() => {}}
          >
            Add Item
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            status={ButtonStatus.Brand}
            size={ButtonSize.Md}
            rightIcon={{
              name: IconName.ChevronRight,
              size: "sm",
              color: "currentColor",
            }}
            onClick={() => {}}
          >
            Continue
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            status={ButtonStatus.Brand}
            size={ButtonSize.Md}
            leftIcon={{
              name: IconName.Plus,
              size: "sm",
              color: "currentColor",
            }}
            rightIcon={{
              name: IconName.ChevronRight,
              size: "sm",
              color: "currentColor",
            }}
            onClick={() => {}}
          >
            Both Icons
          </Button>
          <Button
            variant={ButtonVariant.Ghost}
            size={ButtonSize.Md}
            leftIcon={{
              name: IconName.ArrowLeft,
              size: "sm",
              color: "currentColor",
            }}
            onClick={() => {}}
          >
            Back
          </Button>
          <Button
            variant={ButtonVariant.Container}
            status={ButtonStatus.Brand}
            size={ButtonSize.Md}
            leftIcon={{
              name: IconName.Plus,
              size: "sm",
              color: "currentColor",
            }}
            onClick={() => {}}
          >
            Create
          </Button>
        </div>
      </section>

      {/* ── asChild ── */}
      <section className="flex flex-col items-center gap-4">
        <Typography variant={TypographyVariantEnum.H3}>asChild</Typography>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Sm}
          onClick={() => {}}
          asChild
        >
          <a href="https://www.google.com">Google</a>
        </Button>
      </section>
    </>
  );
}
