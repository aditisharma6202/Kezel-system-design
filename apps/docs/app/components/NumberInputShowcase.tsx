"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  NumberInput,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

export default function NumberInputShowcase() {
  const [numberDefault, setNumberDefault] = React.useState<number | undefined>(
    0
  );
  const [numberDecimal, setNumberDecimal] = React.useState<number | undefined>(
    1.5
  );
  const [numberClamped, setNumberClamped] = React.useState<number | undefined>(
    5
  );
  const [numberError, setNumberError] = React.useState<number | undefined>(
    undefined
  );

  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-md">
      <Typography variant={TypographyVariantEnum.H2}>NumberInput</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Stepper buttons with +/− controls. Same tokens as TextInput. Supports
        min/max clamping, decimal/integer modes.
      </Typography>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
        <NumberInput
          label="Default"
          value={numberDefault}
          onValueChange={setNumberDefault}
          variant={TextInputVariant.Default}
          size={TextInputSize.Md}
        />
        <NumberInput
          label="Container"
          value={numberDefault}
          onValueChange={setNumberDefault}
          variant={TextInputVariant.Container}
          size={TextInputSize.Md}
        />
        <NumberInput
          label="Ghost"
          value={numberDefault}
          onValueChange={setNumberDefault}
          variant={TextInputVariant.Ghost}
          size={TextInputSize.Md}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
        <NumberInput
          value={numberDefault}
          onValueChange={setNumberDefault}
          variant={TextInputVariant.Default}
          size={TextInputSize.Sm}
        />
        <NumberInput
          value={numberDefault}
          onValueChange={setNumberDefault}
          variant={TextInputVariant.Default}
          size={TextInputSize.Md}
        />
        <NumberInput
          value={numberDefault}
          onValueChange={setNumberDefault}
          variant={TextInputVariant.Default}
          size={TextInputSize.Lg}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>Options</Typography>
        <NumberInput
          label="Decimal (step 0.5)"
          value={numberDecimal}
          onValueChange={setNumberDecimal}
          step={0.5}
          allowDecimal
          variant={TextInputVariant.Default}
          size={TextInputSize.Md}
        />
        <NumberInput
          label="Clamped (0–10)"
          value={numberClamped}
          onValueChange={setNumberClamped}
          min={0}
          max={10}
          variant={TextInputVariant.Default}
          size={TextInputSize.Md}
          helperText="Value is clamped between 0 and 10."
        />
        <NumberInput
          label="Integer only, no negative"
          value={numberDefault}
          onValueChange={setNumberDefault}
          allowDecimal={false}
          allowNegative={false}
          variant={TextInputVariant.Default}
          size={TextInputSize.Md}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>States</Typography>
        <NumberInput
          label="Error"
          value={numberError}
          onValueChange={setNumberError}
          state={TextInputState.Error}
          errorText="A value is required."
          variant={TextInputVariant.Default}
        />
        <NumberInput
          label="Disabled"
          value={42}
          onValueChange={() => {}}
          variant={TextInputVariant.Default}
          disabled
        />
      </div>
    </section>
  );
}
