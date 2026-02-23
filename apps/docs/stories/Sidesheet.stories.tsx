import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sidesheet, NavButton, Icon } from "kz-design-system";

const meta: Meta<typeof Sidesheet> = {
  title: "Design System/Sidesheet",
  component: Sidesheet,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Side panel for navigation (e.g. NavButton list). Nav dropdowns open in-flow (items below move down); submenus open below their trigger. Width and styles are tokenized (component.sidesheet.*). Override via KezelThemeProvider tokens.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          minHeight: 320,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Story />
        <div
          style={{
            flex: 1,
            background: "var(--kz-color-surface-base)",
            padding: 16,
            color: "var(--kz-color-text-muted)",
          }}
        >
          Main content area
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Sidesheet>;

export const Default: Story = {
  args: {
    children: (
      <>
        <NavButton
          type="dropdown"
          icon={<Icon name="bar-chart-2" size="sm" color="currentColor" />}
          label="Analytics"
          menuOptions={[
            { label: "Trends", onClick: () => {} },
            { label: "Engagement", onClick: () => {} },
          ]}
        />
        <NavButton
          type="link"
          icon={<Icon name="shield" size="sm" color="currentColor" />}
          label="Security"
          selected={false}
          onClick={() => {}}
        />
      </>
    ),
  },
};

export const WithNavButtons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Open the Analytics dropdown to see the menu push items below down; open Overview submenu to see it open below the trigger.",
      },
    },
  },
  render: () => (
    <Sidesheet>
      <NavButton
        type="dropdown"
        icon={<Icon name="bar-chart-2" size="sm" color="currentColor" />}
        label="Analytics"
        menuOptions={[
          {
            label: "Overview",
            subMenu: [
              { label: "Sub 1", onClick: () => {} },
              { label: "Sub 2", onClick: () => {} },
            ],
          },
          { label: "Trends", onClick: () => {} },
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
        onClick={() => {}}
      />
    </Sidesheet>
  ),
};
