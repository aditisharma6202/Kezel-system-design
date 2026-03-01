"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  DateTimePicker,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

export default function DateTimePickerShowcase() {
  const [dateTimeValue, setDateTimeValue] = React.useState<Date | undefined>(
    undefined
  );
  const [dateOnlyValue, setDateOnlyValue] = React.useState<Date | undefined>(
    undefined
  );
  const [timeOnlyValue, setTimeOnlyValue] = React.useState<Date | undefined>(
    undefined
  );
  const [dateTime24Value, setDateTime24Value] = React.useState<
    Date | undefined
  >(undefined);

  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-md">
      <Typography variant={TypographyVariantEnum.H2}>DateTimePicker</Typography>

      <div className="flex flex-col gap-6 w-full">
        <Typography variant={TypographyVariantEnum.H3}>
          DateTime (12h)
        </Typography>
        <DateTimePicker
          label="Date & Time"
          value={dateTimeValue}
          onChange={setDateTimeValue}
          mode="datetime"
          format="12h"
          helperText="Select a date and time"
        />

        <Typography variant={TypographyVariantEnum.H3}>
          DateTime (24h)
        </Typography>
        <DateTimePicker
          label="24-Hour Format"
          value={dateTime24Value}
          onChange={setDateTime24Value}
          mode="datetime"
          format="24h"
        />

        <Typography variant={TypographyVariantEnum.H3}>
          DateTime with Seconds
        </Typography>
        <DateTimePicker
          label="With Seconds"
          value={dateTimeValue}
          onChange={setDateTimeValue}
          mode="datetime"
          format="24h"
          showSeconds
        />

        <Typography variant={TypographyVariantEnum.H3}>Date Only</Typography>
        <DateTimePicker
          label="Date"
          value={dateOnlyValue}
          onChange={setDateOnlyValue}
          mode="date"
          description="Pick a date from the calendar"
        />

        <Typography variant={TypographyVariantEnum.H3}>Time Only</Typography>
        <DateTimePicker
          label="Time"
          value={timeOnlyValue}
          onChange={setTimeOnlyValue}
          mode="time"
          format="12h"
        />

        <Typography variant={TypographyVariantEnum.H3}>Uncontrolled</Typography>
        <DateTimePicker
          label="Uncontrolled"
          defaultValue={new Date()}
          mode="datetime"
          format="12h"
        />

        <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
        <DateTimePicker
          label="Small"
          value={dateTimeValue}
          onChange={setDateTimeValue}
          size={TextInputSize.Sm}
          mode="date"
        />
        <DateTimePicker
          label="Medium"
          value={dateTimeValue}
          onChange={setDateTimeValue}
          size={TextInputSize.Md}
          mode="date"
        />
        <DateTimePicker
          label="Large"
          value={dateTimeValue}
          onChange={setDateTimeValue}
          size={TextInputSize.Lg}
          mode="date"
        />

        <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
        <DateTimePicker
          label="Default"
          value={dateTimeValue}
          onChange={setDateTimeValue}
          variant={TextInputVariant.Default}
          mode="date"
        />
        <DateTimePicker
          label="Container"
          value={dateTimeValue}
          onChange={setDateTimeValue}
          variant={TextInputVariant.Container}
          mode="date"
        />
        <DateTimePicker
          label="Ghost"
          value={dateTimeValue}
          onChange={setDateTimeValue}
          variant={TextInputVariant.Ghost}
          mode="date"
        />

        <Typography variant={TypographyVariantEnum.H3}>States</Typography>
        <DateTimePicker
          label="Error"
          value={undefined}
          onChange={() => {}}
          state={TextInputState.Error}
          errorText="Please select a valid date."
          mode="date"
        />
        <DateTimePicker
          label="Disabled"
          value={new Date()}
          onChange={() => {}}
          disabled
          mode="date"
        />
      </div>
    </section>
  );
}
