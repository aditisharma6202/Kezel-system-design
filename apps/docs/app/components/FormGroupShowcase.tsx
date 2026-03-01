"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  FormGroup,
  FormGroupDirection,
  TextInput,
  TextInputState,
  Select,
  Button,
  ButtonVariant,
  ButtonSize,
} from "kz-design-system";

const FRUIT_OPTIONS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

export default function FormGroupShowcase() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fruit, setFruit] = React.useState<string | string[]>("");

  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-lg">
      <Typography variant={TypographyVariantEnum.H2}>FormGroup</Typography>

      <div className="flex flex-col gap-8 w-full">
        {/* Single field wrapper */}
        <Typography variant={TypographyVariantEnum.H3}>
          Single field wrapper
        </Typography>
        <FormGroup
          label="Full Name"
          description="Enter your first and last name"
          helperText="This will be displayed on your profile"
          required
        >
          <TextInput
            value={name}
            onValueChange={setName}
            placeHolder="John Doe"
          />
        </FormGroup>

        {/* With error state */}
        <Typography variant={TypographyVariantEnum.H3}>Error state</Typography>
        <FormGroup
          label="Email"
          state={TextInputState.Error}
          errorText="Please enter a valid email address"
          required
        >
          <TextInput
            value={email}
            onValueChange={setEmail}
            placeHolder="you@example.com"
            state={TextInputState.Error}
          />
        </FormGroup>

        {/* Horizontal layout */}
        <Typography variant={TypographyVariantEnum.H3}>
          Horizontal layout
        </Typography>
        <FormGroup label="Actions" direction={FormGroupDirection.Horizontal}>
          <Button variant={ButtonVariant.Primary} size={ButtonSize.Sm}>
            Save
          </Button>
          <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
            Cancel
          </Button>
          <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>
            Reset
          </Button>
        </FormGroup>

        {/* Fieldset grouping */}
        <Typography variant={TypographyVariantEnum.H3}>
          Fieldset (multiple fields)
        </Typography>
        <FormGroup
          label="Shipping Address"
          description="Where should we deliver your order?"
          fieldset
          helperText="We ship to most countries"
        >
          <TextInput
            value=""
            onValueChange={() => {}}
            placeHolder="Street address"
            label="Street"
          />
          <TextInput
            value=""
            onValueChange={() => {}}
            placeHolder="City"
            label="City"
          />
          <Select
            options={[
              { value: "us", label: "United States" },
              { value: "uk", label: "United Kingdom" },
              { value: "ca", label: "Canada" },
            ]}
            placeholder="Country"
            label="Country"
          />
        </FormGroup>

        {/* Disabled */}
        <Typography variant={TypographyVariantEnum.H3}>Disabled</Typography>
        <FormGroup
          label="Preferences"
          description="You cannot change these settings"
          disabled
        >
          <Select
            options={FRUIT_OPTIONS}
            value={fruit}
            onChange={setFruit}
            placeholder="Pick a fruit"
          />
        </FormGroup>

        {/* Custom gap */}
        <Typography variant={TypographyVariantEnum.H3}>
          Custom gap (16px)
        </Typography>
        <FormGroup
          label="Select your interests"
          gap={16}
          direction={FormGroupDirection.Horizontal}
        >
          <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
            Music
          </Button>
          <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
            Sports
          </Button>
          <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
            Tech
          </Button>
          <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
            Art
          </Button>
        </FormGroup>
      </div>
    </section>
  );
}
