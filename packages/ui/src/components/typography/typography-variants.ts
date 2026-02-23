import { TypographyVariant as TypographyVariantEnum } from "../../constants/enum";

export { TypographyVariant as TypographyVariantEnum } from "../../constants/enum";

export type TypographyVariant = TypographyVariantEnum;

export const typographyVariants: TypographyVariant[] = [
  TypographyVariantEnum.H1,
  TypographyVariantEnum.H2,
  TypographyVariantEnum.H3,
  TypographyVariantEnum.Body,
  TypographyVariantEnum.Small,
  TypographyVariantEnum.Caption,
  TypographyVariantEnum.Label,
  TypographyVariantEnum.Link,
  TypographyVariantEnum.Error,
  TypographyVariantEnum.Success,
  TypographyVariantEnum.Warning,
];

const variantToClass: Record<TypographyVariant, string> = {
  [TypographyVariantEnum.H1]: "kz-typography-h1",
  [TypographyVariantEnum.H2]: "kz-typography-h2",
  [TypographyVariantEnum.H3]: "kz-typography-h3",
  [TypographyVariantEnum.Body]: "kz-typography-body",
  [TypographyVariantEnum.Small]: "kz-typography-small",
  [TypographyVariantEnum.Caption]: "kz-typography-caption",
  [TypographyVariantEnum.Label]: "kz-typography-label",
  [TypographyVariantEnum.Link]: "kz-typography-link",
  [TypographyVariantEnum.Error]: "kz-typography-error",
  [TypographyVariantEnum.Success]: "kz-typography-success",
  [TypographyVariantEnum.Warning]: "kz-typography-warning",
};

export function getTypographyClass(variant: TypographyVariant): string {
  return variantToClass[variant];
}

const defaultElement: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  [TypographyVariantEnum.H1]: "h1",
  [TypographyVariantEnum.H2]: "h2",
  [TypographyVariantEnum.H3]: "h3",
  [TypographyVariantEnum.Body]: "p",
  [TypographyVariantEnum.Small]: "span",
  [TypographyVariantEnum.Caption]: "span",
  [TypographyVariantEnum.Label]: "span",
  [TypographyVariantEnum.Link]: "a",
  [TypographyVariantEnum.Error]: "span",
  [TypographyVariantEnum.Success]: "span",
  [TypographyVariantEnum.Warning]: "span",
};

export function getDefaultElement(
  variant: TypographyVariant
): keyof JSX.IntrinsicElements {
  return defaultElement[variant];
}
