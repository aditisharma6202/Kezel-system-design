"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  IconPicker,
  IconName,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

export default function IconPickerShowcase() {
  const [selectedIcon, setSelectedIcon] = React.useState<IconName | undefined>(
    undefined
  );

  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-lg">
      <Typography variant={TypographyVariantEnum.H2}>IconPicker</Typography>

      <div className="flex flex-col gap-6 w-full">
        <Typography variant={TypographyVariantEnum.H3}>Default</Typography>
        <IconPicker
          label="Section Icon"
          value={selectedIcon}
          onChange={setSelectedIcon}
          description="Search and pick an icon"
        />

        <Typography variant={TypographyVariantEnum.H3}>Uncontrolled</Typography>
        <IconPicker
          label="Uncontrolled"
          helperText="No controlled value — internal state only"
        />

        <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
        <IconPicker
          label="Small"
          value={selectedIcon}
          onChange={setSelectedIcon}
          size={TextInputSize.Sm}
        />
        <IconPicker
          label="Medium"
          value={selectedIcon}
          onChange={setSelectedIcon}
          size={TextInputSize.Md}
        />
        <IconPicker
          label="Large"
          value={selectedIcon}
          onChange={setSelectedIcon}
          size={TextInputSize.Lg}
        />

        <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
        <IconPicker
          label="Default"
          value={selectedIcon}
          onChange={setSelectedIcon}
          variant={TextInputVariant.Default}
        />
        <IconPicker
          label="Container"
          value={selectedIcon}
          onChange={setSelectedIcon}
          variant={TextInputVariant.Container}
        />
        <IconPicker
          label="Ghost"
          value={selectedIcon}
          onChange={setSelectedIcon}
          variant={TextInputVariant.Ghost}
        />

        <Typography variant={TypographyVariantEnum.H3}>States</Typography>
        <IconPicker
          label="Error"
          value={undefined}
          onChange={() => {}}
          state={TextInputState.Error}
          errorText="Please select an icon."
        />
        <IconPicker
          label="Disabled"
          value={selectedIcon}
          onChange={() => {}}
          disabled
        />
      </div>
    </section>
  );
}
