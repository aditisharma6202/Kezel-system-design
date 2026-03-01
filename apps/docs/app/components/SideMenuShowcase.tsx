"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  SideMenu,
  IconName,
  type SideMenuNode,
} from "kz-design-system";

export default function SideMenuShowcase() {
  const [sidemenuSelectedId, setSidemenuSelectedId] = React.useState<
    string | undefined
  >(undefined);
  const [sidemenuCollapsed, setSidemenuCollapsed] = React.useState(false);

  const sidemenuData: SideMenuNode[] = [
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

  return (
    <section className="flex flex-col items-center gap-4 w-full">
      <Typography variant={TypographyVariantEnum.H2}>SideMenu</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        JSON-driven sidebar: sections, links, dropdown groups. Expanded: groups
        open inline (push down). Collapsed: icons only with tooltips; group icon
        opens flyout to the right. Toggle collapse below.
      </Typography>
      <div
        className="flex rounded-xl overflow-hidden border border-[var(--kz-color-border-subtle)]"
        style={{
          minHeight: 400,
          width: "100%",
          maxWidth: 900,
          background: "var(--kz-color-surface-background)",
        }}
      >
        <SideMenu
          data={sidemenuData}
          selectedId={sidemenuSelectedId}
          onNavigate={(p) => setSidemenuSelectedId(p.id)}
          collapsed={sidemenuCollapsed}
          onCollapsedChange={setSidemenuCollapsed}
          collapsible
          expandedWidth={280}
          collapsedWidth={72}
          header={
            <div
              className="flex items-center justify-start p-3 text-sm font-medium"
              style={{ color: "var(--kz-color-text-muted)" }}
            >
              Logo
            </div>
          }
          showTooltipsWhenCollapsed
          flyoutSide="right"
          flyoutOffset={8}
          closeFlyoutOnSelect
        />
        <div
          className="flex-1 p-6 flex flex-col gap-4"
          style={{
            background: "var(--kz-color-surface-base)",
            color: "var(--kz-color-text-muted)",
          }}
        >
          <Typography variant={TypographyVariantEnum.Body}>
            Main content. Sidebar uses neumorphic/standard tokens (border,
            background, shadow).
          </Typography>
        </div>
      </div>
    </section>
  );
}
