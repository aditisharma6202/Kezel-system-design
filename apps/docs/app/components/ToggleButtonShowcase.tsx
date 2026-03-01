"use client";

import {
  ToggleButton,
  ToggleButtonVariant,
  ToggleButtonSize,
  Typography,
  TypographyVariantEnum,
} from "kz-design-system";

export default function ToggleButtonShowcase() {
  return (
    <section className="flex flex-col items-center gap-4">
      <Typography variant={TypographyVariantEnum.H2}>Toggle button</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Default, Primary, and Container variants. Pressed state uses theme
        tokens.
      </Typography>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        <ToggleButton
          variant={ToggleButtonVariant.Default}
          size={ToggleButtonSize.Md}
          onPressedChange={() => {}}
        >
          Default
        </ToggleButton>
        <ToggleButton
          variant={ToggleButtonVariant.Primary}
          size={ToggleButtonSize.Md}
          defaultPressed
          onPressedChange={() => {}}
        >
          Primary (default on)
        </ToggleButton>
        <ToggleButton
          variant={ToggleButtonVariant.Container}
          size={ToggleButtonSize.Md}
          onPressedChange={() => {}}
        >
          Container
        </ToggleButton>
      </div>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        <ToggleButton
          variant={ToggleButtonVariant.Primary}
          size={ToggleButtonSize.Sm}
          onPressedChange={() => {}}
        >
          Sm
        </ToggleButton>
        <ToggleButton
          variant={ToggleButtonVariant.Primary}
          size={ToggleButtonSize.Md}
          onPressedChange={() => {}}
        >
          Md
        </ToggleButton>
        <ToggleButton
          variant={ToggleButtonVariant.Primary}
          size={ToggleButtonSize.Lg}
          onPressedChange={() => {}}
        >
          Lg
        </ToggleButton>
      </div>
      <div className="flex flex-wrap gap-2 justify-center items-center">
        <ToggleButton
          variant={ToggleButtonVariant.Default}
          size={ToggleButtonSize.Md}
          disabled
          onPressedChange={() => {}}
        >
          Disabled (off)
        </ToggleButton>
        <ToggleButton
          variant={ToggleButtonVariant.Primary}
          size={ToggleButtonSize.Md}
          disabled
          defaultPressed
          onPressedChange={() => {}}
        >
          Disabled (on)
        </ToggleButton>
      </div>
    </section>
  );
}
