"use client";

import {
  Checkbox,
  CheckboxSize,
  CheckboxVariant,
  Typography,
  TypographyVariantEnum,
} from "kz-design-system";

export default function CheckboxShowcase() {
  return (
    <section className="flex flex-col items-center gap-4">
      <Typography variant={TypographyVariantEnum.H2}>Checkbox</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Standard and neumorphic styles; use Variant toolbar. Sizes: sm (16px),
        md (20px), lg (24px). All tokens overridable via KezelThemeProvider.
      </Typography>
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <Checkbox
          size={CheckboxSize.Sm}
          variant={CheckboxVariant.Default}
          onCheckedChange={() => {}}
        >
          Sm unchecked
        </Checkbox>
        <Checkbox
          size={CheckboxSize.Md}
          variant={CheckboxVariant.Default}
          defaultChecked
          onCheckedChange={() => {}}
        >
          Md checked
        </Checkbox>
        <Checkbox
          size={CheckboxSize.Lg}
          variant={CheckboxVariant.Default}
          indeterminate
          onCheckedChange={() => {}}
        >
          Lg indeterminate
        </Checkbox>
      </div>
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <Checkbox
          size={CheckboxSize.Md}
          variant={CheckboxVariant.Container}
          onCheckedChange={() => {}}
        >
          Container unchecked
        </Checkbox>
        <Checkbox
          size={CheckboxSize.Md}
          variant={CheckboxVariant.Default}
          disabled
          onCheckedChange={() => {}}
        >
          Disabled off
        </Checkbox>
        <Checkbox
          size={CheckboxSize.Md}
          variant={CheckboxVariant.Default}
          disabled
          defaultChecked
          onCheckedChange={() => {}}
        >
          Disabled on
        </Checkbox>
      </div>
    </section>
  );
}
