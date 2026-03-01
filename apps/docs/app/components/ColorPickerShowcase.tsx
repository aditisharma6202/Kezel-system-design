"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  ColorPicker,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

export default function ColorPickerShowcase() {
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>(
    undefined
  );

  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-lg">
      <Typography variant={TypographyVariantEnum.H2}>ColorPicker</Typography>

      <div className="flex flex-col gap-6 w-full">
        <Typography variant={TypographyVariantEnum.H3}>Default</Typography>
        <ColorPicker
          label="Brand Color"
          value={selectedColor}
          onChange={setSelectedColor}
          description="Pick a color from the palette or type a hex value"
        />

        <Typography variant={TypographyVariantEnum.H3}>Uncontrolled</Typography>
        <ColorPicker
          label="Uncontrolled"
          helperText="No controlled value — internal state only"
        />

        <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
        <ColorPicker
          label="Small"
          value={selectedColor}
          onChange={setSelectedColor}
          size={TextInputSize.Sm}
        />
        <ColorPicker
          label="Medium"
          value={selectedColor}
          onChange={setSelectedColor}
          size={TextInputSize.Md}
        />
        <ColorPicker
          label="Large"
          value={selectedColor}
          onChange={setSelectedColor}
          size={TextInputSize.Lg}
        />

        <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
        <ColorPicker
          label="Default"
          value={selectedColor}
          onChange={setSelectedColor}
          variant={TextInputVariant.Default}
        />
        <ColorPicker
          label="Container"
          value={selectedColor}
          onChange={setSelectedColor}
          variant={TextInputVariant.Container}
        />
        <ColorPicker
          label="Ghost"
          value={selectedColor}
          onChange={setSelectedColor}
          variant={TextInputVariant.Ghost}
        />

        <Typography variant={TypographyVariantEnum.H3}>States</Typography>
        <ColorPicker
          label="Error"
          value={undefined}
          onChange={() => {}}
          state={TextInputState.Error}
          errorText="Invalid color value."
        />
        <ColorPicker
          label="Disabled"
          value={selectedColor}
          onChange={() => {}}
          disabled
        />
      </div>
    </section>
  );
}
