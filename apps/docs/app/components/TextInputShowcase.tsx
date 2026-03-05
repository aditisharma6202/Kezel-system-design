"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  TextInput,
  TextInputVariant,
  TextInputSize,
  TextInputState,
  TextInputType,
} from "kz-design-system";

export default function TextInputShowcase() {
  const [defaultValue, setDefaultValue] = React.useState("");
  const [ghostValue, setGhostValue] = React.useState("");
  const [errorValue, setErrorValue] = React.useState("invalid@");
  const [successValue, setSuccessValue] = React.useState("valid@email.com");
  const [clearableValue, setClearableValue] = React.useState("Clear me");
  const [countValue, setCountValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [numberValue, setNumberValue] = React.useState("");
  const [decimalValue, setDecimalValue] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [telValue, setTelValue] = React.useState("");
  const [urlValue, setUrlValue] = React.useState("");

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

      <div className="w-full flex flex-col gap-2">
        <Typography variant={TypographyVariantEnum.H3}>Input Types</Typography>

        <TextInput
          label="Password"
          type={TextInputType.Password}
          value={passwordValue}
          placeHolder="Enter your password"
          onValueChange={setPasswordValue}
          helperText="Click the eye icon to toggle visibility."
        />

        <TextInput
          label="Email (normalized)"
          type={TextInputType.Email}
          value={emailValue}
          placeHolder="user@example.com"
          onValueChange={(v) => {
            setEmailValue(v);
            if (emailError) setEmailError(false);
          }}
          onBlur={() => {
            if (
              emailValue.length > 0 &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)
            ) {
              setEmailError(true);
            }
          }}
          normalizeEmail
          state={emailError ? TextInputState.Error : undefined}
          errorText="Please enter a valid email address."
          helperText="Auto-trims and lowercases as you type."
        />

        <TextInput
          label="Number (integers only)"
          type={TextInputType.Number}
          value={numberValue}
          placeHolder="0"
          onValueChange={setNumberValue}
          helperText="Only digits allowed."
        />

        <TextInput
          label="Number (decimal + negative)"
          type={TextInputType.Number}
          value={decimalValue}
          placeHolder="-12.50"
          onValueChange={setDecimalValue}
          allowDecimal
          allowNegative
          helperText="Allows negative values and decimals."
        />

        <TextInput
          label="Search"
          type={TextInputType.Search}
          value={searchValue}
          placeHolder="Search..."
          onValueChange={setSearchValue}
          clearable
        />

        <TextInput
          label="Telephone"
          type={TextInputType.Tel}
          value={telValue}
          placeHolder="+1 (555) 000-0000"
          onValueChange={setTelValue}
        />

        <TextInput
          label="URL"
          type={TextInputType.Url}
          value={urlValue}
          placeHolder="https://example.com"
          onValueChange={setUrlValue}
        />
      </div>
    </section>
  );
}
