"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  TextArea,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

export default function TextAreaShowcase() {
  const [textareaDefault, setTextareaDefault] = React.useState("");
  const [textareaGhost, setTextareaGhost] = React.useState("");
  const [textareaError, setTextareaError] = React.useState("Invalid input");
  const [textareaSuccess, setTextareaSuccess] = React.useState("Looks good!");
  const [textareaClearable, setTextareaClearable] = React.useState("Clear me");
  const [textareaCount, setTextareaCount] = React.useState("");

  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-md">
      <Typography variant={TypographyVariantEnum.H2}>TextArea</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Same tokens and theme support as TextInput. Auto-resize grows vertically
        with content.
      </Typography>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
        <TextArea
          label="Default"
          value={textareaDefault}
          placeHolder="Type something…"
          onValueChange={setTextareaDefault}
          variant={TextInputVariant.Default}
          size={TextInputSize.Md}
        />
        <TextArea
          label="Container"
          value={textareaDefault}
          placeHolder="Transparent background"
          onValueChange={setTextareaDefault}
          variant={TextInputVariant.Container}
          size={TextInputSize.Md}
        />
        <TextArea
          label="Ghost"
          value={textareaGhost}
          placeHolder="No border"
          onValueChange={setTextareaGhost}
          variant={TextInputVariant.Ghost}
          size={TextInputSize.Md}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
        <TextArea
          value={textareaDefault}
          placeHolder="Small"
          onValueChange={setTextareaDefault}
          variant={TextInputVariant.Default}
          size={TextInputSize.Sm}
          rows={2}
        />
        <TextArea
          value={textareaDefault}
          placeHolder="Medium"
          onValueChange={setTextareaDefault}
          variant={TextInputVariant.Default}
          size={TextInputSize.Md}
        />
        <TextArea
          value={textareaDefault}
          placeHolder="Large"
          onValueChange={setTextareaDefault}
          variant={TextInputVariant.Default}
          size={TextInputSize.Lg}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>States</Typography>
        <TextArea
          label="Error"
          value={textareaError}
          placeHolder="Description"
          onValueChange={setTextareaError}
          state={TextInputState.Error}
          errorText="This field is required."
          variant={TextInputVariant.Default}
        />
        <TextArea
          label="Success"
          value={textareaSuccess}
          placeHolder="Bio"
          onValueChange={setTextareaSuccess}
          state={TextInputState.Success}
          successText="Looks good!"
          variant={TextInputVariant.Default}
        />
        <TextArea
          label="Warning"
          value={textareaDefault}
          placeHolder="Optional notes"
          onValueChange={setTextareaDefault}
          state={TextInputState.Warning}
          warningText="Consider adding more detail."
          variant={TextInputVariant.Default}
        />
        <TextArea
          label="Disabled"
          value="Cannot edit this"
          placeHolder="Placeholder"
          onValueChange={() => {}}
          variant={TextInputVariant.Default}
          disabled
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>Options</Typography>
        <TextArea
          label="Clearable"
          value={textareaClearable}
          placeHolder="Type then clear"
          onValueChange={setTextareaClearable}
          clearable
          variant={TextInputVariant.Default}
        />
        <TextArea
          label="Character count"
          value={textareaCount}
          placeHolder="Max 200 characters"
          onValueChange={setTextareaCount}
          showCount
          maxLength={200}
          variant={TextInputVariant.Default}
        />
        <TextArea
          label="With description"
          description="Write a short bio about yourself."
          value={textareaDefault}
          placeHolder="Tell us about you…"
          onValueChange={setTextareaDefault}
          variant={TextInputVariant.Default}
        />
        <TextArea
          label="Manual resize (autoResize off)"
          value={textareaDefault}
          placeHolder="Drag to resize"
          onValueChange={setTextareaDefault}
          autoResize={false}
          variant={TextInputVariant.Default}
          rows={4}
        />
      </div>
    </section>
  );
}
