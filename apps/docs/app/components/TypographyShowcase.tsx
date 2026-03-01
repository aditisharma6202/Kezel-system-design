"use client";

import { Typography, TypographyVariantEnum } from "kz-design-system";

export default function TypographyShowcase() {
  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-xl">
      <Typography variant={TypographyVariantEnum.H2}>Typography</Typography>
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
  );
}
