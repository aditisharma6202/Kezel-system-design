"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  Select,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";
import type { SelectOption } from "kz-design-system";

const FRUIT_OPTIONS: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
  { value: "orange", label: "Orange" },
  { value: "peach", label: "Peach" },
  { value: "strawberry", label: "Strawberry" },
];

export default function SelectShowcase() {
  const [single, setSingle] = React.useState<string>("");
  const [multi, setMulti] = React.useState<string[]>([]);
  const [multiActions, setMultiActions] = React.useState<string[]>([]);
  const [multiTall, setMultiTall] = React.useState<string[]>([]);

  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-lg">
      <Typography variant={TypographyVariantEnum.H2}>Select</Typography>

      <div className="flex flex-col gap-6 w-full">
        <Typography variant={TypographyVariantEnum.H3}>Single</Typography>
        <Select
          label="Favorite fruit"
          options={FRUIT_OPTIONS}
          value={single}
          onChange={(v) => setSingle(v as string)}
          description="Pick one fruit"
        />

        <Typography variant={TypographyVariantEnum.H3}>Multi</Typography>
        <Select
          label="Fruits you like"
          options={FRUIT_OPTIONS}
          multiple
          value={multi}
          onChange={(v) => setMulti(v as string[])}
          description="Pick multiple fruits"
        />

        <Typography variant={TypographyVariantEnum.H3}>
          Multi with Select All / Remove All
        </Typography>
        <Select
          label="Fruits (with actions)"
          options={FRUIT_OPTIONS}
          multiple
          value={multiActions}
          onChange={(v) => setMultiActions(v as string[])}
          onSelectAll={() => setMultiActions(FRUIT_OPTIONS.map((o) => o.value))}
          onRemoveAll={() => setMultiActions([])}
          description="Use the footer buttons to select or remove all options"
          helperText="Pass onSelectAll / onRemoveAll to show footer actions."
        />

        <Typography variant={TypographyVariantEnum.H3}>
          Custom Panel Height
        </Typography>
        <Select
          label="Tall panel (400px)"
          options={FRUIT_OPTIONS}
          multiple
          value={multiTall}
          onChange={(v) => setMultiTall(v as string[])}
          panelHeight={400}
          onSelectAll={() => setMultiTall(FRUIT_OPTIONS.map((o) => o.value))}
          onRemoveAll={() => setMultiTall([])}
          description="panelHeight={400} with onSelectAll / onRemoveAll"
        />

        <Typography variant={TypographyVariantEnum.H3}>Searchable</Typography>
        <Select
          label="Searchable"
          options={FRUIT_OPTIONS}
          value={single}
          onChange={(v) => setSingle(v as string)}
          searchable
        />

        <Typography variant={TypographyVariantEnum.H3}>
          Searchable Multi
        </Typography>
        <Select
          label="Searchable Multi"
          options={FRUIT_OPTIONS}
          multiple
          searchable
          value={multi}
          onChange={(v) => setMulti(v as string[])}
        />

        <Typography variant={TypographyVariantEnum.H3}>Uncontrolled</Typography>
        <Select
          label="Uncontrolled"
          options={FRUIT_OPTIONS}
          helperText="No controlled value — internal state only"
        />

        <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
        <Select
          label="Small"
          options={FRUIT_OPTIONS}
          value={single}
          onChange={(v) => setSingle(v as string)}
          size={TextInputSize.Sm}
        />
        <Select
          label="Medium"
          options={FRUIT_OPTIONS}
          value={single}
          onChange={(v) => setSingle(v as string)}
          size={TextInputSize.Md}
        />
        <Select
          label="Large"
          options={FRUIT_OPTIONS}
          value={single}
          onChange={(v) => setSingle(v as string)}
          size={TextInputSize.Lg}
        />

        <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
        <Select
          label="Default"
          options={FRUIT_OPTIONS}
          value={single}
          onChange={(v) => setSingle(v as string)}
          variant={TextInputVariant.Default}
        />
        <Select
          label="Container"
          options={FRUIT_OPTIONS}
          value={single}
          onChange={(v) => setSingle(v as string)}
          variant={TextInputVariant.Container}
        />
        <Select
          label="Ghost"
          options={FRUIT_OPTIONS}
          value={single}
          onChange={(v) => setSingle(v as string)}
          variant={TextInputVariant.Ghost}
        />

        <Typography variant={TypographyVariantEnum.H3}>States</Typography>
        <Select
          label="Error"
          options={FRUIT_OPTIONS}
          value=""
          onChange={() => {}}
          state={TextInputState.Error}
          errorText="Please select an option."
        />
        <Select
          label="Disabled"
          options={FRUIT_OPTIONS}
          value={single}
          onChange={() => {}}
          disabled
        />
      </div>
    </section>
  );
}
