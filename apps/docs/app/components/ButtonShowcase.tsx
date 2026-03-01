"use client";

import {
  Button,
  ButtonVariant,
  ButtonSize,
  ButtonAspectRatio,
  Typography,
  TypographyVariantEnum,
  Icon,
  IconName,
} from "kz-design-system";

export default function ButtonShowcase() {
  return (
    <>
      <section className="flex flex-col items-center gap-4">
        <Typography variant={TypographyVariantEnum.H2}>
          Button variants &amp; sizes
        </Typography>
      </section>

      <section className="flex flex-col items-center gap-4">
        <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
        <Typography variant={TypographyVariantEnum.Caption}>
          Primary, Secondary, Outline, Ghost, Success, Warning, Error. Disabled
          uses 0.5 opacity; Loading shows spinner.
        </Typography>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant={ButtonVariant.Primary}
            size={ButtonSize.Md}
            onClick={() => {}}
          >
            Primary
          </Button>
          <Button
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Md}
            onClick={() => {}}
          >
            Secondary
          </Button>
          <Button
            variant={ButtonVariant.Outline}
            size={ButtonSize.Md}
            onClick={() => {}}
          >
            Outline
          </Button>
          <Button
            variant={ButtonVariant.Ghost}
            size={ButtonSize.Md}
            onClick={() => {}}
          >
            Ghost
          </Button>
          <Button
            variant={ButtonVariant.Success}
            size={ButtonSize.Md}
            onClick={() => {}}
          >
            Success
          </Button>
          <Button
            variant={ButtonVariant.Warning}
            size={ButtonSize.Md}
            onClick={() => {}}
          >
            Warning
          </Button>
          <Button
            variant={ButtonVariant.Error}
            size={ButtonSize.Md}
            onClick={() => {}}
          >
            Error
          </Button>
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

      <section className="flex flex-col items-center gap-4">
        <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
        <div className="flex flex-wrap items-center gap-3 justify-center">
          <Button
            variant={ButtonVariant.Primary}
            size={ButtonSize.Sm}
            aspectRatio={ButtonAspectRatio.Square}
            onClick={() => {}}
          >
            <Icon name={IconName.BarChart2} size="sm" color="currentColor" />
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            size={ButtonSize.Md}
            onClick={() => {}}
          >
            Medium
          </Button>
          <Button
            variant={ButtonVariant.Primary}
            size={ButtonSize.Lg}
            onClick={() => {}}
          >
            Large
          </Button>
        </div>
      </section>

      <section className="flex flex-col items-center gap-4">
        <Typography variant={TypographyVariantEnum.H3}>
          All combinations
        </Typography>
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
          {(
            [
              ButtonVariant.Primary,
              ButtonVariant.Secondary,
              ButtonVariant.Outline,
              ButtonVariant.Ghost,
              ButtonVariant.Success,
              ButtonVariant.Warning,
              ButtonVariant.Error,
            ] as const
          ).map((v) =>
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
