import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  RangeSlider,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

function SingleControlled(
  props: Omit<
    React.ComponentProps<typeof RangeSlider>,
    "value" | "onValueChange"
  > & { value?: number }
) {
  const [value, setValue] = React.useState(props.value ?? 50);
  return <RangeSlider {...props} value={value} onValueChange={setValue} />;
}

function DualControlled(
  props: Omit<
    React.ComponentProps<typeof RangeSlider>,
    "rangeValue" | "onRangeChange"
  > & { rangeValue?: [number, number] }
) {
  const [range, setRange] = React.useState<[number, number]>(
    props.rangeValue ?? [20, 80]
  );
  return <RangeSlider {...props} rangeValue={range} onRangeChange={setRange} />;
}

const meta: Meta<typeof RangeSlider> = {
  title: "Design System/RangeSlider",
  component: RangeSlider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Range slider for filtering numeric values. Supports single-thumb and dual-thumb (range) modes, all input variants, sizes, and validation states. Use the **Variant** and **Mode** toolbar to see theme-specific styles (neumorphic inset shadow, dark mode, etc.).",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    variant: TextInputVariant.Default,
    size: TextInputSize.Md,
    state: TextInputState.Default,
    min: 0,
    max: 100,
    step: 1,
    showValue: false,
    showMinMax: false,
    showInputs: false,
    disabled: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: Object.values(TextInputSize),
      description: "Height and padding: Sm, Md, or Lg.",
    },
    variant: {
      control: "select",
      options: Object.values(TextInputVariant),
      description: "Visual style: Default, Container, or Ghost.",
    },
    label: { control: "text", description: "Label shown above the slider." },
    helperText: {
      control: "text",
      description: "Helper text below the slider.",
    },
    state: {
      control: "select",
      options: Object.values(TextInputState),
      description: "Validation state: Default, Error, Success, or Warning.",
    },
    errorText: {
      control: "text",
      description: "Message shown when state is Error.",
    },
    min: { control: "number", description: "Minimum value." },
    max: { control: "number", description: "Maximum value." },
    step: { control: "number", description: "Step increment." },
    showValue: {
      control: "boolean",
      description: "Show current value tooltip above thumb.",
    },
    showMinMax: {
      control: "boolean",
      description: "Show min/max labels below track.",
    },
    showInputs: {
      control: "boolean",
      description:
        "Show manual input fields above the slider for direct value entry.",
    },
    inputVariant: {
      control: "select",
      options: Object.values(TextInputVariant),
      description:
        "Visual variant for the manual input fields. Defaults to the slider's variant.",
    },
    disabled: { control: "boolean", description: "Disables the slider." },
  },
};

export default meta;

type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <SingleControlled
        {...args}
        variant={args.variant ?? TextInputVariant.Default}
        size={args.size ?? TextInputSize.Md}
      />
    </div>
  ),
};

export const WithValueTooltip: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <SingleControlled
        label="Volume"
        showValue
        showMinMax
        helperText="Drag to adjust volume."
      />
    </div>
  ),
};

export const DualThumbRange: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <DualControlled
        label="Price Range"
        showValue
        showMinMax
        showInputs
        min={0}
        max={1000}
        step={10}
        formatValue={(v) => `$${v}`}
        helperText="Select a price range to filter results."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dual-thumb mode for selecting a range. Use `rangeValue` and `onRangeChange` instead of `value`/`onValueChange`.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}
    >
      <SingleControlled
        label="Default"
        variant={TextInputVariant.Default}
        showValue
      />
      <SingleControlled
        label="Container"
        variant={TextInputVariant.Container}
        showValue
      />
      <SingleControlled
        label="Ghost"
        variant={TextInputVariant.Ghost}
        showValue
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default, Container, and Ghost variants. Use the toolbar to switch **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark).",
      },
    },
  },
};

export const InputVariants: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}
    >
      <DualControlled
        label="Default Inputs"
        variant={TextInputVariant.Ghost}
        inputVariant={TextInputVariant.Default}
        showInputs
        showMinMax
        min={0}
        max={1000}
        step={10}
      />
      <DualControlled
        label="Container Inputs"
        variant={TextInputVariant.Ghost}
        inputVariant={TextInputVariant.Container}
        showInputs
        showMinMax
        min={0}
        max={1000}
        step={10}
      />
      <DualControlled
        label="Ghost Inputs"
        variant={TextInputVariant.Ghost}
        inputVariant={TextInputVariant.Ghost}
        showInputs
        showMinMax
        min={0}
        max={1000}
        step={10}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use `inputVariant` to independently control the input field style. Here the slider is Ghost while inputs cycle through Default, Container, and Ghost.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 320 }}
    >
      <SingleControlled label="Small" size={TextInputSize.Sm} showValue />
      <SingleControlled label="Medium" size={TextInputSize.Md} showValue />
      <SingleControlled label="Large" size={TextInputSize.Lg} showValue />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}
    >
      <SingleControlled
        label="Error"
        value={10}
        state={TextInputState.Error}
        errorText="Value is too low."
      />
      <SingleControlled
        label="Success"
        value={75}
        state={TextInputState.Success}
        successText="Good range selected."
      />
      <SingleControlled
        label="Warning"
        value={90}
        state={TextInputState.Warning}
        warningText="High value may affect performance."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <SingleControlled label="Disabled" value={40} disabled showValue />
    </div>
  ),
};

export const CustomStep: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <SingleControlled
        label="Rating (step 0.5)"
        min={0}
        max={5}
        step={0.5}
        value={3.5}
        showValue
        showMinMax
      />
    </div>
  ),
};

export const WithInputs: Story = {
  render: function WithInputsStory() {
    const [value, setValue] = React.useState(50);
    return (
      <div style={{ width: 320 }}>
        <RangeSlider
          label="Total Assets"
          value={value}
          onValueChange={setValue}
          min={1}
          max={1000}
          showInputs
          showMinMax
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single-thumb slider with a manual input field. Type a value or drag the thumb.",
      },
    },
  },
};

export const FilterExample: Story = {
  render: function FilterExampleStory() {
    const [range, setRange] = React.useState<[number, number]>([200, 800]);
    return (
      <div style={{ width: 320 }}>
        <RangeSlider
          label="Filter by Price"
          description="Adjust the range to filter products."
          rangeValue={range}
          onRangeChange={setRange}
          min={0}
          max={1000}
          step={25}
          showValue
          showMinMax
          showInputs
          formatValue={(v) => `$${v}`}
        />
        <div
          style={{
            marginTop: 12,
            fontFamily: "var(--kz-typography-font-family)",
            fontSize: 13,
            color: "var(--kz-component-input-text)",
          }}
        >
          Showing products from <strong>${range[0]}</strong> to{" "}
          <strong>${range[1]}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Real-world filter example with dual-thumb range slider, price formatting, and live filter output.",
      },
    },
  },
};
