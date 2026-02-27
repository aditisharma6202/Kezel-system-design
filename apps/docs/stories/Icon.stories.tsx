import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon, IconName, iconSize } from "kz-design-system";

const meta: Meta<typeof Icon> = {
  title: "Design System/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Icons are driven by the **icon registry** (`packages/ui/src/icon/icon-registry.tsx`): add entries to the **IconName** enum and **iconRegistry** there; they appear here and across the design system. Use **IconName** for the `name` prop for autocomplete and type safety. Sizes: xs, sm, md, lg. Use the **Variant** and **Mode** toolbar to see theme context.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    name: IconName.Search,
    size: "md",
    color: "currentColor",
  },
  argTypes: {
    name: {
      control: "select",
      options: Object.values(IconName),
      description:
        "Icon from IconName enum (search, circle-alert, check-circle, etc.).",
    },
    size: {
      control: "select",
      options: Object.keys(iconSize) as (keyof typeof iconSize)[],
      description: "xs, sm, md, or lg.",
    },
    color: {
      control: "color",
      description: "CSS color (e.g. currentColor, #18AB9F).",
    },
    className: {
      control: "text",
    },
    "aria-hidden": {
      control: "boolean",
      description: "Set true for decorative icons.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: IconName.Search,
    size: "md",
  },
};

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 16,
        alignItems: "center",
      }}
    >
      {(Object.values(IconName) as IconName[]).map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: 12,
            background: "var(--kz-color-surface-raised)",
            borderRadius: 8,
          }}
        >
          <Icon name={name} size="md" color="currentColor" aria-hidden />
          <span style={{ fontSize: 11, color: "var(--kz-color-text-muted)" }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All icons from the registry (icon-registry.tsx). Add new icons there to IconName and iconRegistry; they will appear here and in the Icon component.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Icon
          name={IconName.CheckCircle}
          size="xs"
          color="currentColor"
          aria-hidden
        />
        <span style={{ fontSize: 11 }}>xs</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Icon
          name={IconName.CheckCircle}
          size="sm"
          color="currentColor"
          aria-hidden
        />
        <span style={{ fontSize: 11 }}>sm</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Icon
          name={IconName.CheckCircle}
          size="md"
          color="currentColor"
          aria-hidden
        />
        <span style={{ fontSize: 11 }}>md</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Icon
          name={IconName.CheckCircle}
          size="lg"
          color="currentColor"
          aria-hidden
        />
        <span style={{ fontSize: 11 }}>lg</span>
      </div>
    </div>
  ),
};

const chartAndKanbanIcons: IconName[] = [
  IconName.ChartArea,
  IconName.ChartBar,
  IconName.ChartBarBig,
  IconName.ChartBarDecreasing,
  IconName.ChartBarIncreasing,
  IconName.ChartBarStacked,
  IconName.ChartCandlestick,
  IconName.ChartColumn,
  IconName.ChartColumnBig,
  IconName.ChartColumnDecreasing,
  IconName.ChartColumnIncreasing,
  IconName.ChartColumnStacked,
  IconName.ChartGantt,
  IconName.ChartLine,
  IconName.ChartNetwork,
  IconName.ChartNoAxesColumn,
  IconName.ChartNoAxesColumnDecreasing,
  IconName.ChartNoAxesColumnIncreasing,
  IconName.ChartNoAxesCombined,
  IconName.ChartNoAxesGantt,
  IconName.ChartPie,
  IconName.ChartScatter,
  IconName.ChartSpline,
  IconName.FolderKanban,
  IconName.Kanban,
  IconName.SquareChartGantt,
  IconName.SquareDashedKanban,
  IconName.SquareKanban,
  IconName.TrendingDown,
  IconName.TrendingUp,
  IconName.TrendingUpDown,
];

export const ChartsAndKanban: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 16,
        alignItems: "center",
      }}
    >
      {chartAndKanbanIcons.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: 12,
            background: "var(--kz-color-surface-raised)",
            borderRadius: 8,
          }}
        >
          <Icon name={name} size="md" color="currentColor" aria-hidden />
          <span style={{ fontSize: 11, color: "var(--kz-color-text-muted)" }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Chart, kanban, and trending icons added to the registry. Covers area, bar, column, candlestick, gantt, line, network, pie, scatter, spline, no-axes variants, folder-kanban, kanban, square variants, and trending directions.",
      },
    },
  },
};

export const WithColor: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Icon
        name={IconName.CheckCircle}
        size="md"
        color="var(--kz-color-status-success)"
        aria-hidden
      />
      <Icon
        name={IconName.CircleAlert}
        size="md"
        color="var(--kz-color-status-error)"
        aria-hidden
      />
      <Icon
        name={IconName.TriangleAlert}
        size="md"
        color="var(--kz-color-status-warning)"
        aria-hidden
      />
      <Icon name={IconName.BarChart2} size="md" color="#18AB9F" aria-hidden />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Use token or hex color. currentColor inherits text color.",
      },
    },
  },
};
