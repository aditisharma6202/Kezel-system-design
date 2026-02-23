import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NavButton, Sidesheet, Icon } from "kz-design-system";

const meta: Meta<typeof NavButton> = {
  title: "Design System/NavButton",
  component: NavButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Nav button for sidesheet: **link** (direct link with optional selected state) or **dropdown** (trigger with chevron, menu with options and optional submenus). Icon and label on the left with 10px gap. Hover uses `component.nav-button.hover.bg` (light: rgba(0,0,0,0.05), dark: rgba(255,255,255,0.05)). Dropdown opens in-flow so items below move down; submenus open below their trigger. All styles are tokenized; override via KezelThemeProvider tokens.",
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

const icon = <Icon name="shield" size="sm" color="currentColor" />;

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
    icon: <Icon name="bar-chart-2" size="sm" color="currentColor" />,
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
    icon: <Icon name="bar-chart-2" size="sm" color="currentColor" />,
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
        icon={<Icon name="shield" size="sm" color="currentColor" />}
        label="Security"
        onClick={() => {}}
      />
      <NavButton
        type="link"
        icon={<Icon name="bar-chart-2" size="sm" color="currentColor" />}
        label="Analytics"
        onClick={() => {}}
      />
      <NavButton
        type="dropdown"
        icon={<Icon name="check-circle" size="sm" color="currentColor" />}
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
          icon={<Icon name="bar-chart-2" size="sm" color="currentColor" />}
          label="Analytics"
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
          icon={<Icon name="shield" size="sm" color="currentColor" />}
          label="Security"
          selected
          onClick={() => {}}
        />
        <NavButton
          type="link"
          icon={<Icon name="check-circle" size="sm" color="currentColor" />}
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
