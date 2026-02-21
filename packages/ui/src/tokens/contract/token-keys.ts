export const TOKEN_KEYS = [
  // Brand
  "color.brand.primary",
  "color.brand.primary.hover",
  "color.brand.primary.active",
  "color.brand.secondary",
  "color.brand.accent",
  "color.brand.accent.hover",
  "color.brand.accent.active",
  "color.brand.inverse",

  // Surface
  "color.surface.background",
  "color.surface.base",
  "color.surface.raised",
  "color.surface.sunken",
  "color.surface.overlay",
  "color.surface.glass",
  "color.surface.muted",
  "color.surface.inverse",

  // Text
  "color.text.primary",
  "color.text.secondary",
  "color.text.tertiary",
  "color.text.muted",
  "color.text.disabled",
  "color.text.inverse",
  "color.text.link",
  "color.text.link.hover",

  // Border
  "color.border.subtle",
  "color.border.default",
  "color.border.strong",
  "color.border.focus",
  "color.border.inverse",

  // Status
  "color.status.success",
  "color.status.success.bg",
  "color.status.success.border",
  "color.status.warning",
  "color.status.warning.bg",
  "color.status.warning.border",
  "color.status.error",
  "color.status.error.bg",
  "color.status.error.border",
  "color.status.info",
  "color.status.info.bg",
  "color.status.info.border",

  // Shadows
  "shadow.elevation.0",
  "shadow.elevation.1",
  "shadow.elevation.2",
  "shadow.elevation.3",
  "shadow.elevation.4",
  "shadow.elevation.5",
  "shadow.inset.1",
  "shadow.inset.2",
  "shadow.focus",
  "shadow.neumorphic.light",
  "shadow.neumorphic.dark",

  // Effects
  "effect.blur.sm",
  "effect.blur.md",
  "effect.blur.lg",
  "effect.glass.opacity",
  "effect.glass.border.opacity",

  // Radius
  "radius.none",
  "radius.xs",
  "radius.sm",
  "radius.md",
  "radius.lg",
  "radius.xl",
  "radius.full",

  // Space
  "space.0",
  "space.1",
  "space.2",
  "space.3",
  "space.4",
  "space.5",
  "space.6",
  "space.8",
  "space.10",
  "space.12",
  "space.16",
  "space.20",
  "space.24",

  // Typography
  "font.family.base",
  "font.family.mono",
  "font.size.xs",
  "font.size.sm",
  "font.size.md",
  "font.size.lg",
  "font.size.xl",
  "font.size.2xl",
  "font.size.3xl",
  "font.weight.regular",
  "font.weight.medium",
  "font.weight.semibold",
  "font.weight.bold",
  "line.height.sm",
  "line.height.md",
  "line.height.lg",

  // Motion
  "motion.duration.fast",
  "motion.duration.normal",
  "motion.duration.slow",
  "motion.easing.standard",
  "motion.easing.emphasized",

  // Component — Sidebar
  "component.sidebar.bg",
  "component.sidebar.border",
  "component.sidebar.item.bg",
  "component.sidebar.item.bg.hover",
  "component.sidebar.item.bg.active",
  "component.sidebar.item.text",
  "component.sidebar.item.text.active",
  "component.sidebar.indicator",

  // Component — Header
  "component.header.bg",
  "component.header.border",
  "component.header.text",

  // Component — Button
  "component.button.primary.bg",
  "component.button.primary.bg.hover",
  "component.button.primary.bg.active",
  "component.button.primary.text",
  "component.button.primary.shadow",
  "component.button.secondary.bg",
  "component.button.secondary.text",
  "component.button.secondary.border",
  "component.button.danger.bg",
  "component.button.danger.text",

  // Component — Input
  "component.input.bg",
  "component.input.border",
  "component.input.border.focus",
  "component.input.text",
  "component.input.placeholder",
  "component.input.shadow",
  "component.input.radius",

  // Component — Card
  "component.card.bg",
  "component.card.border",
  "component.card.shadow",
  "component.card.radius",

  // Component — Canvas / Tile
  "component.canvas.bg",
  "component.canvas.grid.line",
  "component.tile.bg",
  "component.tile.border",
  "component.tile.shadow",
  "component.tile.header.bg",
  "component.tile.header.text",

  // Component — Filter panel
  "component.filter.panel.bg",
  "component.filter.panel.border",
  "component.filter.label.text",
  "component.filter.control.bg",
  "component.filter.control.border",
] as const;

export type TokenKey = (typeof TOKEN_KEYS)[number];
