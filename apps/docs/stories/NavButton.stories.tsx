import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavButton, Sidesheet, Icon, IconName } from "kz-design-system";

const meta: Meta<typeof NavButton> = {
  title: "Design System/NavButton",
  component: NavButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Nav button for sidesheet: **link** (direct link with optional selected state) or **dropdown** (trigger with chevron, menu with options and optional submenus). When dropdown is closed but an option/sub-option is selected, pass `selectedOptionLabel` to show trigger icon and text in #18AB9F. Icon and label on the left with 10px gap. Hover uses `component.nav-button.hover.bg`. Dropdown opens in-flow; submenus open below their trigger. All styles tokenized; override via KezelThemeProvider.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["link", "dropdown"],
      description: "Link (direct) or dropdown (menu with optional submenu).",
    },
    icon: { control: false },
    label: { control: "text" },
    selected: {
      control: "boolean",
      description: "Link only: active/selected state.",
    },
    menuOptions: {
      control: false,
      description: "Dropdown only: array of options; use subMenu for submenu.",
    },
    selectedOptionLabel: {
      control: "text",
      description:
        "Dropdown only: when set and matches an option or sub-option label, trigger icon and text use #18AB9F when closed.",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 260,
          padding: 12,
          background: "var(--kz-color-surface-background)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NavButton>;

const icon = <Icon name={IconName.Shield} size="sm" color="currentColor" />;

export const DirectLink: Story = {
  args: {
    type: "link",
    icon,
    label: "Security",
    selected: false,
    onClick: () => {},
  },
};

export const DirectLinkSelected: Story = {
  args: {
    type: "link",
    icon,
    label: "Security",
    selected: true,
    onClick: () => {},
  },
};

export const Dropdown: Story = {
  args: {
    type: "dropdown",
    icon: <Icon name={IconName.BarChart2} size="sm" color="currentColor" />,
    label: "Analytics",
    menuOptions: [
      { label: "Trends", onClick: () => {} },
      { label: "Engagement", onClick: () => {} },
      { label: "Conversion", onClick: () => {} },
    ],
  },
};

export const DropdownWithSubmenu: Story = {
  args: {
    type: "dropdown",
    icon: <Icon name={IconName.BarChart2} size="sm" color="currentColor" />,
    label: "Analytics",
    menuOptions: [
      {
        label: "Overview",
        subMenu: [
          { label: "Sub 1", onClick: () => {} },
          { label: "Sub 2", onClick: () => {} },
        ],
      },
      { label: "Trends", onClick: () => {} },
      { label: "Engagement", onClick: () => {} },
    ],
  },
};

export const DropdownWithSelectedOption: Story = {
  args: {
    type: "dropdown",
    icon: <Icon name={IconName.BarChart2} size="sm" color="currentColor" />,
    label: "Analytics",
    selectedOptionLabel: "Trends",
    menuOptions: [
      {
        label: "Overview",
        subMenu: [
          { label: "Sub overview 1", onClick: () => {} },
          { label: "Sub overview 2", onClick: () => {} },
        ],
      },
      { label: "Trends", onClick: () => {} },
      { label: "Engagement", onClick: () => {} },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "When dropdown is closed and an option is selected, pass selectedOptionLabel (e.g. \"Trends\") so the trigger icon and text use #18AB9F.",
      },
    },
  },
};

export const Hover: Story = {
  render: () => (
    <div
      style={{
        width: 260,
        padding: 12,
        background: "var(--kz-color-surface-background)",
      }}
    >
      <p
        style={{
          margin: "0 0 8px",
          fontSize: 12,
          color: "var(--kz-color-text-muted)",
        }}
      >
        Hover over any item to see hover background (token:
        component.nav-button.hover.bg).
      </p>
      <NavButton
        type="link"
        icon={<Icon name={IconName.Shield} size="sm" color="currentColor" />}
        label="Security"
        onClick={() => {}}
      />
      <NavButton
        type="link"
        icon={<Icon name={IconName.BarChart2} size="sm" color="currentColor" />}
        label="Analytics"
        onClick={() => {}}
      />
      <NavButton
        type="dropdown"
        icon={<Icon name={IconName.CheckCircle} size="sm" color="currentColor" />}
        label="Settings"
        menuOptions={[{ label: "Option", onClick: () => {} }]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Hover over nav buttons to see the hover background (light: rgba(0,0,0,0.05), dark: rgba(255,255,255,0.05)). Override via token component.nav-button.hover.bg.",
      },
    },
  },
};

export const InSidesheet: Story = {
  render: () => (
    <div style={{ display: "flex", minHeight: 280 }}>
      <Sidesheet>
        <NavButton
          type="dropdown"
          icon={<Icon name={IconName.BarChart2} size="sm" color="currentColor" />}
          label="Analytics"
          selectedOptionLabel="Trends"
          menuOptions={[
            {
              label: "Overview",
              subMenu: [
                { label: "Sub overview 1", onClick: () => {} },
                { label: "Sub overview 2", onClick: () => {} },
              ],
            },
            { label: "Trends", onClick: () => {} },
            { label: "Engagement", onClick: () => {} },
          ]}
        />
        <NavButton
          type="link"
          icon={<Icon name={IconName.Shield} size="sm" color="currentColor" />}
          label="Security"
          selected
          onClick={() => {}}
        />
        <NavButton
          type="link"
          icon={<Icon name={IconName.CheckCircle} size="sm" color="currentColor" />}
          label="Settings"
          selected={false}
          onClick={() => {}}
        />
      </Sidesheet>
      <div
        style={{
          flex: 1,
          background: "var(--kz-color-surface-base)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--kz-color-text-muted)",
        }}
      >
        Main content
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "NavButton used inside Sidesheet with dropdown (Analytics), selected link (Security), and unselected link (Settings).",
      },
    },
  },
};
