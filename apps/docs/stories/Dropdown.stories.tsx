import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownButton,
  type DropdownButtonItem,
} from "kz-design-system/dropdown";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  DropdownSub,
  DropdownSubTrigger,
  DropdownSubContent,
  DropdownTriggerVariant,
} from "kz-design-system/dropdown";

const actionsItems: DropdownButtonItem[] = [
  { type: "label", key: "menu", label: "Menu" },
  { type: "separator", key: "sep1" },
  { key: "new", label: "New file", onSelect: () => {} },
  { key: "copy", label: "Copy link", onSelect: () => {} },
  { key: "edit", label: "Edit", onSelect: () => {} },
  { type: "separator", key: "sep2" },
  {
    type: "submenu",
    key: "more",
    label: "More options",
    items: [
      { key: "subA", label: "Sub option A", onSelect: () => {} },
      { key: "subB", label: "Sub option B", onSelect: () => {} },
    ],
  },
];

const meta: Meta<typeof DropdownButton> = {
  title: "Design System/Dropdown",
  component: DropdownButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Use **DropdownButton** for a simple config-driven API, or the compound components (Dropdown, DropdownTrigger, DropdownContent, etc.) for full control. Trigger variant: **default** or **ghost**. Use the Variant and Mode toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    trigger: { label: "Open menu" },
    items: actionsItems,
    align: "start",
    sideOffset: 6,
  },
  argTypes: {
    trigger: {
      description: "Trigger config: label, icon, variant (default | ghost), showChevron.",
    },
    items: {
      description: "Array of item, label, separator, or submenu descriptors.",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    sideOffset: {
      control: "number",
    },
    disabled: {
      control: "boolean",
    },
    contentClassName: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownButton>;

export const ActionsWithLabelSeparatorsSubmenu: Story = {
  args: {
    trigger: { label: "Actions" },
    items: actionsItems,
    align: "start",
    sideOffset: 6,
  },
  parameters: {
    docs: {
      description: {
        story:
          "DropdownButton with label, separators, items, and a submenu. Same look as compound API.",
      },
    },
  },
};

export const GhostTrigger: Story = {
  args: {
    trigger: {
      label: "Ghost trigger",
      variant: "ghost",
    },
    items: [
      { key: "1", label: "Item one", onSelect: () => {} },
      { key: "2", label: "Item two", onSelect: () => {} },
    ],
    align: "start",
    sideOffset: 6,
  },
  parameters: {
    docs: {
      description: {
        story: "Trigger uses ghost style (transparent bg, hover only).",
      },
    },
  },
};

export const NoChevron: Story = {
  args: {
    trigger: { label: "Menu", showChevron: false },
    items: [
      { key: "a", label: "Option A", onSelect: () => {} },
      { key: "b", label: "Option B", onSelect: () => {} },
    ],
    align: "start",
    sideOffset: 6,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Chevron icon hidden. Use when the trigger already indicates expandability (e.g. icon button).",
      },
    },
  },
};

export const CompoundAPI: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger variant={DropdownTriggerVariant.Default} showChevron>
        Compound API
      </DropdownTrigger>
      <DropdownContent align="start" sideOffset={6}>
        <DropdownLabel>Menu</DropdownLabel>
        <DropdownSeparator />
        <DropdownItem onSelect={() => {}}>New file</DropdownItem>
        <DropdownItem onSelect={() => {}}>Copy link</DropdownItem>
        <DropdownItem onSelect={() => {}}>Edit</DropdownItem>
        <DropdownSeparator />
        <DropdownSub>
          <DropdownSubTrigger>More options</DropdownSubTrigger>
          <DropdownSubContent>
            <DropdownItem onSelect={() => {}}>Sub option A</DropdownItem>
            <DropdownItem onSelect={() => {}}>Sub option B</DropdownItem>
          </DropdownSubContent>
        </DropdownSub>
      </DropdownContent>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Original compound component API. Use when you need full control over structure or custom item rendering.",
      },
    },
  },
};
