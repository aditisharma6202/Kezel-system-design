import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SideMenu, IconName } from "kz-design-system";
import type { SideMenuNode } from "kz-design-system";

const defaultData: SideMenuNode[] = [
  {
    type: "section",
    id: "monitor",
    label: "MONITOR",
    items: [
      {
        type: "link",
        id: "dashboard",
        label: "Dashboard",
        icon: IconName.BarChart2,
        href: "#dashboard",
      },
      {
        type: "group",
        id: "analytics",
        label: "Analytics",
        icon: IconName.BarChart2,
        items: [
          {
            id: "overview",
            label: "Overview",
            href: "#overview",
            subItems: [
              { id: "sub1", label: "Sub overview 1", href: "#sub1" },
              { id: "sub2", label: "Sub overview 2", href: "#sub2" },
            ],
          },
          { id: "trends", label: "Trends", href: "#trends" },
          { id: "engagement", label: "Engagement", href: "#engagement" },
        ],
      },
    ],
  },
  {
    type: "section",
    id: "manage",
    label: "MANAGE",
    items: [
      {
        type: "link",
        id: "security",
        label: "Security",
        icon: IconName.Shield,
        href: "#security",
      },
      {
        type: "link",
        id: "settings",
        label: "Settings",
        icon: IconName.CheckCircle,
        href: "#settings",
      },
    ],
  },
];

const meta: Meta<typeof SideMenu> = {
  title: "Design System/SideMenu",
  component: SideMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "JSON-driven sidebar: sections, links, and groups with items/sub-items. **Expanded**: inline collapsible groups (push-down). **Collapsed**: icons only; group icon opens flyout. Selected state uses #18AB9F for text/icon; dropdown triggers get color only (no bg). Collapse button can sit on the border (round, 50% sidebar / 50% content). All styles are tokenized; override via KezelThemeProvider.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: { control: false },
    selectedId: {
      control: "text",
      description: "ID of the selected option (link or group item/sub-item).",
    },
    collapsible: { control: "boolean" },
    collapsed: { control: "boolean" },
    defaultCollapsed: { control: "boolean" },
    showTooltipsWhenCollapsed: { control: "boolean" },
    flyoutSide: { control: "select", options: ["right", "left"] },
    closeFlyoutOnSelect: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          minHeight: 420,
          width: "100%",
          maxWidth: 320,
        }}
      >
        <Story />
        <div
          style={{
            flex: 1,
            minWidth: 200,
            background: "var(--kz-color-surface-base)",
            padding: 16,
            color: "var(--kz-color-text-muted)",
          }}
        >
          Main content
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SideMenu>;

export const Default: Story = {
  args: {
    data: defaultData,
    collapsible: true,
    collapsed: false,
    showTooltipsWhenCollapsed: true,
    header: <span style={{ padding: "8px 12px", fontWeight: 600 }}>_Logo</span>,
  },
};

export const WithSelectedItem: Story = {
  args: {
    data: defaultData,
    selectedId: "trends",
    collapsible: true,
    collapsed: false,
    showTooltipsWhenCollapsed: true,
    header: <span style={{ padding: "8px 12px", fontWeight: 600 }}>_Logo</span>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When a group has a selected option (e.g. Trends), the Analytics trigger shows text and icon in #18AB9F; no background (bg is for hover only).",
      },
    },
  },
};

export const WithSelectedSubItem: Story = {
  args: {
    data: defaultData,
    selectedId: "sub1",
    collapsible: true,
    collapsed: false,
    showTooltipsWhenCollapsed: true,
    header: <span style={{ padding: "8px 12px", fontWeight: 600 }}>_Logo</span>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Selected ID is a sub-option (Sub overview 1); Analytics trigger still shows active color.",
      },
    },
  },
};

export const Collapsed: Story = {
  args: {
    data: defaultData,
    collapsible: true,
    collapsed: true,
    showTooltipsWhenCollapsed: true,
    header: <span style={{ padding: "8px 12px", fontWeight: 600 }}>_Logo</span>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Collapsed sidebar: icons only, collapse button on border (round). Hover over group icon to open flyout; flyout uses same bg as sidemenu with inset shadow.",
      },
    },
  },
};

export const CollapsedWithSelected: Story = {
  args: {
    data: defaultData,
    selectedId: "engagement",
    collapsible: true,
    collapsed: true,
    showTooltipsWhenCollapsed: true,
    header: <span style={{ padding: "8px 12px", fontWeight: 600 }}>_Logo</span>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When collapsed and a flyout option is selected, the group icon is #18AB9F.",
      },
    },
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    data: defaultData,
    collapsible: true,
    collapsed: false,
    showTooltipsWhenCollapsed: true,
    header: <span style={{ padding: "8px 12px", fontWeight: 600 }}>_Logo</span>,
    footer: (
      <span
        style={{
          padding: "8px 12px",
          fontSize: 12,
          color: "var(--kz-color-text-muted)",
        }}
      >
        Footer
      </span>
    ),
  },
};

export const Interactive: Story = {
  render: function InteractiveStory(args) {
    const [selectedId, setSelectedId] = React.useState<string | undefined>(
      "dashboard"
    );
    const [collapsed, setCollapsed] = React.useState(false);
    return (
      <SideMenu
        {...args}
        data={defaultData}
        selectedId={selectedId}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        onNavigate={({ id }) => setSelectedId(id)}
        collapsible
        showTooltipsWhenCollapsed
        header={
          <span style={{ padding: "8px 12px", fontWeight: 600 }}>_Logo</span>
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Click items to set selection; use collapse control to toggle. Demonstrates selected state and flyout when collapsed.",
      },
    },
  },
};
