"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  DateRangePicker,
  TextInputVariant,
  TextInputSize,
  TextInputState,
  type DateRange,
} from "kz-design-system";

export default function DateRangePickerShowcase() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  );

  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-lg">
      <Typography variant={TypographyVariantEnum.H2}>
        DateRangePicker
      </Typography>

      <div className="flex flex-col gap-6 w-full">
        <Typography variant={TypographyVariantEnum.H3}>Default</Typography>
        <DateRangePicker
          label="Date Range"
          value={dateRange}
          onChange={setDateRange}
          description="Select a start and end date"
        />

        <Typography variant={TypographyVariantEnum.H3}>Uncontrolled</Typography>
        <DateRangePicker
          label="Uncontrolled Range"
          helperText="No controlled value — internal state only"
        />

        <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
        <DateRangePicker
          label="Small"
          value={dateRange}
          onChange={setDateRange}
          size={TextInputSize.Sm}
        />
        <DateRangePicker
          label="Medium"
          value={dateRange}
          onChange={setDateRange}
          size={TextInputSize.Md}
        />
        <DateRangePicker
          label="Large"
          value={dateRange}
          onChange={setDateRange}
          size={TextInputSize.Lg}
        />

        <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
        <DateRangePicker
          label="Default"
          value={dateRange}
          onChange={setDateRange}
          variant={TextInputVariant.Default}
        />
        <DateRangePicker
          label="Container"
          value={dateRange}
          onChange={setDateRange}
          variant={TextInputVariant.Container}
        />
        <DateRangePicker
          label="Ghost"
          value={dateRange}
          onChange={setDateRange}
          variant={TextInputVariant.Ghost}
        />

        <Typography variant={TypographyVariantEnum.H3}>States</Typography>
        <DateRangePicker
          label="Error"
          value={undefined}
          onChange={() => {}}
          state={TextInputState.Error}
          errorText="Please select a valid date range."
        />
        <DateRangePicker
          label="Disabled"
          value={dateRange}
          onChange={() => {}}
          disabled
        />
      </div>
    </section>
  );
}
