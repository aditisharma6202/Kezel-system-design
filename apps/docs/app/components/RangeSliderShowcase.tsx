"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  RangeSlider,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

export default function RangeSliderShowcase() {
  const [single, setSingle] = React.useState(50);
  const [range, setRange] = React.useState<[number, number]>([200, 800]);
  const [errorVal, setErrorVal] = React.useState(10);

  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-md">
      <Typography variant={TypographyVariantEnum.H2}>RangeSlider</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Range slider for filtering. Supports single-thumb and dual-thumb (range)
        modes, all input variants and sizes.
      </Typography>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
        <RangeSlider
          label="Default"
          value={single}
          onValueChange={setSingle}
          variant={TextInputVariant.Default}
          showValue
          showInputs
        />
        <RangeSlider
          label="Container"
          value={single}
          onValueChange={setSingle}
          variant={TextInputVariant.Container}
          showValue
          showInputs
        />
        <RangeSlider
          label="Ghost"
          value={single}
          onValueChange={setSingle}
          variant={TextInputVariant.Ghost}
          showValue
          showInputs
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
        <RangeSlider
          label="Small"
          value={single}
          onValueChange={setSingle}
          size={TextInputSize.Sm}
          showValue
          showInputs
        />
        <RangeSlider
          label="Medium"
          value={single}
          onValueChange={setSingle}
          size={TextInputSize.Md}
          showValue
          showInputs
        />
        <RangeSlider
          label="Large"
          value={single}
          onValueChange={setSingle}
          size={TextInputSize.Lg}
          showValue
          showInputs
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>
          Input Variants
        </Typography>
        <RangeSlider
          label="Default Inputs"
          rangeValue={range}
          onRangeChange={setRange}
          min={0}
          max={1000}
          step={25}
          variant={TextInputVariant.Ghost}
          inputVariant={TextInputVariant.Default}
          showInputs
          showMinMax
          formatValue={(v) => `$${v}`}
        />
        <RangeSlider
          label="Container Inputs"
          rangeValue={range}
          onRangeChange={setRange}
          min={0}
          max={1000}
          step={25}
          variant={TextInputVariant.Ghost}
          inputVariant={TextInputVariant.Container}
          showInputs
          showMinMax
          formatValue={(v) => `$${v}`}
        />
        <RangeSlider
          label="Ghost Inputs"
          rangeValue={range}
          onRangeChange={setRange}
          min={0}
          max={1000}
          step={25}
          variant={TextInputVariant.Ghost}
          inputVariant={TextInputVariant.Ghost}
          showInputs
          showMinMax
          formatValue={(v) => `$${v}`}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>
          Single with Input
        </Typography>
        <RangeSlider
          label="Total Assets"
          value={single}
          onValueChange={setSingle}
          min={1}
          max={1000}
          showInputs
          showMinMax
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>States</Typography>
        <RangeSlider
          label="Error"
          value={errorVal}
          onValueChange={setErrorVal}
          state={TextInputState.Error}
          errorText="Value is too low."
          showValue
        />
        <RangeSlider
          label="Success"
          value={75}
          onValueChange={() => {}}
          state={TextInputState.Success}
          successText="Good range selected."
          showValue
        />
        <RangeSlider
          label="Warning"
          value={90}
          onValueChange={() => {}}
          state={TextInputState.Warning}
          warningText="High value may affect performance."
          showValue
        />
        <RangeSlider
          label="Disabled"
          value={40}
          onValueChange={() => {}}
          disabled
          showValue
        />
      </div>
    </section>
  );
}
