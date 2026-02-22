import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
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

type DropdownDemoProps = {
  triggerVariant?: DropdownTriggerVariant;
  showChevron?: boolean;
  triggerLabel?: string;
};

function DropdownDemo({
  triggerVariant = DropdownTriggerVariant.Default,
  showChevron = true,
  triggerLabel = "Open menu",
}: DropdownDemoProps) {
  return (
    <Dropdown>
      <DropdownTrigger variant={triggerVariant} showChevron={showChevron}>
        {triggerLabel}
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
  );
}

const meta: Meta<typeof DropdownDemo> = {
  title: "Design System/Dropdown",
  component: DropdownDemo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dropdown menu with compound components. **Trigger variant**: Default (filled/bordered) or Ghost (minimal, like ghost button). **Show chevron**: toggles the chevron icon on the trigger. Use the Variant and Mode toolbar to see theme-specific styles.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    triggerVariant: DropdownTriggerVariant.Default,
    showChevron: true,
    triggerLabel: "Open menu",
  },
  argTypes: {
    triggerVariant: {
      control: "select",
      options: Object.values(DropdownTriggerVariant),
      description: "Trigger style: default (filled/bordered) or ghost (minimal).",
    },
    showChevron: {
      control: "boolean",
      description: "When true, shows a chevron icon after the trigger label.",
    },
    triggerLabel: {
      control: "text",
      description: "Text (or content) shown on the trigger button.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownDemo>;

export const Default: Story = {
  args: {
    triggerVariant: DropdownTriggerVariant.Default,
    showChevron: true,
    triggerLabel: "Actions",
  },
};

export const Ghost: Story = {
  args: {
    triggerVariant: DropdownTriggerVariant.Ghost,
    showChevron: true,
    triggerLabel: "Ghost trigger",
  },
  parameters: {
    docs: {
      description: {
        story: "Trigger uses ghost style (transparent bg, hover only). Menu is unchanged.",
      },
    },
  },
};

export const NoChevron: Story = {
  args: {
    triggerVariant: DropdownTriggerVariant.Default,
    showChevron: false,
    triggerLabel: "Menu",
  },
  parameters: {
    docs: {
      description: {
        story: "Chevron icon is hidden. Use when the trigger already indicates expandability (e.g. icon button).",
      },
    },
  },
};

export const GhostNoChevron: Story = {
  args: {
    triggerVariant: DropdownTriggerVariant.Ghost,
    showChevron: false,
    triggerLabel: "More",
  },
  parameters: {
    docs: {
      description: {
        story: "Ghost trigger without chevron.",
      },
    },
  },
};

export const WithSubmenu: Story = {
  args: {
    triggerVariant: DropdownTriggerVariant.Default,
    showChevron: true,
    triggerLabel: "Actions (submenu)",
  },
  parameters: {
    docs: {
      description: {
        story: "Full example with label, separator, items, and a submenu (DropdownSub, DropdownSubTrigger, DropdownSubContent).",
      },
    },
  },
};
