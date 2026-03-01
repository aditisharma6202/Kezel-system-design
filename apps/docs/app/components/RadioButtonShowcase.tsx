"use client";

import * as React from "react";
import {
  RadioButton,
  RadioSize,
  Typography,
  TypographyVariantEnum,
} from "kz-design-system";

export default function RadioButtonShowcase() {
  const [radioValue, setRadioValue] = React.useState<string>("a");

  return (
    <section className="flex flex-col items-center gap-4">
      <Typography variant={TypographyVariantEnum.H2}>Radio button</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Standard and neumorphic; sm 16px, md 20px, lg 24px. Disabled 50%
        opacity. All tokens overridable via KezelThemeProvider.
      </Typography>
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <RadioButton
          name="radio-demo"
          value="a"
          size={RadioSize.Sm}
          checked={radioValue === "a"}
          onChange={(e) => setRadioValue(e.target.value)}
        >
          Sm A
        </RadioButton>
        <RadioButton
          name="radio-demo"
          value="b"
          size={RadioSize.Md}
          checked={radioValue === "b"}
          onChange={(e) => setRadioValue(e.target.value)}
        >
          Md B
        </RadioButton>
        <RadioButton
          name="radio-demo"
          value="c"
          size={RadioSize.Lg}
          checked={radioValue === "c"}
          onChange={(e) => setRadioValue(e.target.value)}
        >
          Lg C
        </RadioButton>
      </div>
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <RadioButton
          name="radio-disabled"
          value="off"
          size={RadioSize.Md}
          disabled
          onChange={() => {}}
        >
          Disabled off
        </RadioButton>
        <RadioButton
          name="radio-disabled"
          value="on"
          size={RadioSize.Md}
          disabled
          defaultChecked
          onChange={() => {}}
        >
          Disabled on
        </RadioButton>
      </div>
    </section>
  );
}
