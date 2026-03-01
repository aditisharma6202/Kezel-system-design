"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  TextInput,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

export default function TextInputShowcase() {
  const [defaultValue, setDefaultValue] = React.useState("");
  const [ghostValue, setGhostValue] = React.useState("");
  const [errorValue, setErrorValue] = React.useState("invalid@");
  const [successValue, setSuccessValue] = React.useState("valid@email.com");
  const [clearableValue, setClearableValue] = React.useState("Clear me");
  const [countValue, setCountValue] = React.useState("");

  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-md">
      <Typography variant={TypographyVariantEnum.H2}>TextInput</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Switch theme (Standard / Neumorphic) and mode (Light / Dark) above to
        see input styles change.
      </Typography>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
        <TextInput
          label="Default"
          value={defaultValue}
          placeHolder="Placeholder"
          onValueChange={setDefaultValue}
          variant={TextInputVariant.Default}
          size={TextInputSize.Md}
        />
        <TextInput
          label="Container"
          value={defaultValue}
          placeHolder="Transparent background"
          onValueChange={setDefaultValue}
          variant={TextInputVariant.Container}
          size={TextInputSize.Md}
        />
        <TextInput
          label="Ghost"
          value={ghostValue}
          placeHolder="Border bottom only"
          onValueChange={setGhostValue}
          variant={TextInputVariant.Ghost}
          size={TextInputSize.Md}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
        <TextInput
          value={defaultValue}
          placeHolder="Small"
          onValueChange={setDefaultValue}
          variant={TextInputVariant.Default}
          size={TextInputSize.Sm}
        />
        <TextInput
          value={defaultValue}
          placeHolder="Medium"
          onValueChange={setDefaultValue}
          variant={TextInputVariant.Default}
          size={TextInputSize.Md}
        />
        <TextInput
          value={defaultValue}
          placeHolder="Large"
          onValueChange={setDefaultValue}
          variant={TextInputVariant.Default}
          size={TextInputSize.Lg}
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>States</Typography>
        <TextInput
          label="Error"
          value={errorValue}
          placeHolder="Email"
          onValueChange={setErrorValue}
          state={TextInputState.Error}
          errorText="Please enter a valid email address."
          variant={TextInputVariant.Default}
        />
        <TextInput
          label="Success"
          value={successValue}
          placeHolder="Email"
          onValueChange={setSuccessValue}
          state={TextInputState.Success}
          successText="Looks good!"
          variant={TextInputVariant.Default}
        />
        <TextInput
          label="Warning"
          value={defaultValue}
          placeHolder="Optional field"
          onValueChange={setDefaultValue}
          state={TextInputState.Warning}
          warningText="This field is recommended."
          variant={TextInputVariant.Default}
        />
        <TextInput
          label="Disabled"
          value="Disabled value"
          placeHolder="Placeholder"
          onValueChange={() => {}}
          variant={TextInputVariant.Default}
          disabled
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>Options</Typography>
        <TextInput
          label="Clearable"
          value={clearableValue}
          placeHolder="Type then clear"
          onValueChange={setClearableValue}
          clearable
          variant={TextInputVariant.Default}
        />
        <TextInput
          label="With character count"
          value={countValue}
          placeHolder="Max 50 characters"
          onValueChange={setCountValue}
          showCount
          maxLength={50}
          variant={TextInputVariant.Default}
        />
        <TextInput
          label="With description"
          description="We'll never share this with anyone."
          value={defaultValue}
          placeHolder="Description below label"
          onValueChange={setDefaultValue}
          variant={TextInputVariant.Default}
        />
      </div>
    </section>
  );
}
