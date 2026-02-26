# Full token reference

Every theme token: **token key** → **CSS variable** → **default value** (with units: px, rem, ms, etc.). Values from Standard light unless noted. Override via `KezelThemeProvider` `tokens` prop. Use in CSS: `var(--kz-...)`.

Source: `packages/ui/src/tokens/themes/default/standard.css`, `standard.dark.css`, `neumorphic.css`, `neumorphic.dark.css`.

---

## Brand

| Token key                    | CSS variable                      | Light (standard)                                                                                                                                                             | Dark (standard)                                                                                                                                                              |
| ---------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color.brand.primary`        | `--kz-color-brand-primary`        | <span style="display:inline-block;width:14px;height:14px;background:#0066cc;border:1px solid #ccc;vertical-align:middle;border-radius:2px" title="#0066cc"></span> `#0066cc` | <span style="display:inline-block;width:14px;height:14px;background:#00a99d;border:1px solid #ccc;vertical-align:middle;border-radius:2px" title="#00a99d"></span> `#00a99d` |
| `color.brand.primary.hover`  | `--kz-color-brand-primary-hover`  | <span style="display:inline-block;width:14px;height:14px;background:#005bb5;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#005bb5`                 | <span style="display:inline-block;width:14px;height:14px;background:#008b81;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#008b81`                 |
| `color.brand.primary.active` | `--kz-color-brand-primary-active` | <span style="display:inline-block;width:14px;height:14px;background:#004c99;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#004c99`                 | <span style="display:inline-block;width:14px;height:14px;background:#006c64;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#006c64`                 |
| `color.brand.secondary`      | `--kz-color-brand-secondary`      | <span style="display:inline-block;width:14px;height:14px;background:#5a6b7a;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#5a6b7a`                 | _(inherited)_                                                                                                                                                                |
| `color.brand.accent`         | `--kz-color-brand-accent`         | <span style="display:inline-block;width:14px;height:14px;background:#009689;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#009689`                 | <span style="display:inline-block;width:14px;height:14px;background:#18AB9F;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#18AB9F`                 |
| `color.brand.accent.hover`   | `--kz-color-brand-accent-hover`   | <span style="display:inline-block;width:14px;height:14px;background:#008a7e;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#008a7e`                 | <span style="display:inline-block;width:14px;height:14px;background:#1fa399;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#1fa399`                 |
| `color.brand.accent.active`  | `--kz-color-brand-accent-active`  | <span style="display:inline-block;width:14px;height:14px;background:#007e73;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#007e73`                 | <span style="display:inline-block;width:14px;height:14px;background:#198a81;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#198a81`                 |
| `color.brand.accent.dark`    | `--kz-color-brand-accent-dark`    | <span style="display:inline-block;width:14px;height:14px;background:#18AB9F;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#18AB9F`                 | <span style="display:inline-block;width:14px;height:14px;background:#00bba7;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#00bba7`                 |
| `color.brand.inverse`        | `--kz-color-brand-inverse`        | <span style="display:inline-block;width:14px;height:14px;background:#ffffff;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#ffffff`                 | _(inherited)_                                                                                                                                                                |

---

## Surface

| Token key                  | CSS variable                    | Light (standard)                                                                                                                                                                         | Dark (standard)                                                                                                                                              |
| -------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `color.surface.background` | `--kz-color-surface-background` | <span style="display:inline-block;width:14px;height:14px;background:#f5f7fa;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#f5f7fa`                             | <span style="display:inline-block;width:14px;height:14px;background:#0a0a0a;border:1px solid #555;vertical-align:middle;border-radius:2px"></span> `#0a0a0a` |
| `color.surface.base`       | `--kz-color-surface-base`       | <span style="display:inline-block;width:14px;height:14px;background:#ffffff;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#ffffff`                             | <span style="display:inline-block;width:14px;height:14px;background:#111827;border:1px solid #555;vertical-align:middle;border-radius:2px"></span> `#111827` |
| `color.surface.raised`     | `--kz-color-surface-raised`     | <span style="display:inline-block;width:14px;height:14px;background:#ffffff;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#ffffff`                             | <span style="display:inline-block;width:14px;height:14px;background:#1f2933;border:1px solid #555;vertical-align:middle;border-radius:2px"></span> `#1f2933` |
| `color.surface.sunken`     | `--kz-color-surface-sunken`     | <span style="display:inline-block;width:14px;height:14px;background:#f0f2f5;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#f0f2f5`                             | <span style="display:inline-block;width:14px;height:14px;background:#374151;border:1px solid #555;vertical-align:middle;border-radius:2px"></span> `#374151` |
| `color.surface.overlay`    | `--kz-color-surface-overlay`    | <span style="display:inline-block;width:14px;height:14px;background:rgba(0,0,0,0.5);border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `rgba(0,0,0,0.5)`             | _(inherited)_                                                                                                                                                |
| `color.surface.glass`      | `--kz-color-surface-glass`      | <span style="display:inline-block;width:14px;height:14px;background:rgba(255,255,255,0.7);border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `rgba(255,255,255,0.7)` | _(inherited)_                                                                                                                                                |
| `color.surface.muted`      | `--kz-color-surface-muted`      | <span style="display:inline-block;width:14px;height:14px;background:#e9edf2;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#e9edf2`                             | <span style="display:inline-block;width:14px;height:14px;background:#1f2933;border:1px solid #555;vertical-align:middle;border-radius:2px"></span> `#1f2933` |
| `color.surface.inverse`    | `--kz-color-surface-inverse`    | <span style="display:inline-block;width:14px;height:14px;background:#1f2933;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#1f2933`                             | _(inherited)_                                                                                                                                                |

---

## Text

| Token key               | CSS variable                 | Light (standard)                                                                                                                                             | Dark (standard)                                                                                                                                              |
| ----------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `color.text.primary`    | `--kz-color-text-primary`    | <span style="display:inline-block;width:14px;height:14px;background:#1f2933;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#1f2933` | <span style="display:inline-block;width:14px;height:14px;background:#f9fafb;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#f9fafb` |
| `color.text.secondary`  | `--kz-color-text-secondary`  | <span style="display:inline-block;width:14px;height:14px;background:#52606d;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#52606d` | <span style="display:inline-block;width:14px;height:14px;background:#d1d5db;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#d1d5db` |
| `color.text.tertiary`   | `--kz-color-text-tertiary`   | <span style="display:inline-block;width:14px;height:14px;background:#7b8794;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#7b8794` | _(inherited)_                                                                                                                                                |
| `color.text.muted`      | `--kz-color-text-muted`      | <span style="display:inline-block;width:14px;height:14px;background:#9aa5b1;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#9aa5b1` | <span style="display:inline-block;width:14px;height:14px;background:#9ca3af;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#9ca3af` |
| `color.text.disabled`   | `--kz-color-text-disabled`   | <span style="display:inline-block;width:14px;height:14px;background:#cbd2d9;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#cbd2d9` | _(inherited)_                                                                                                                                                |
| `color.text.inverse`    | `--kz-color-text-inverse`    | <span style="display:inline-block;width:14px;height:14px;background:#ffffff;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#ffffff` | _(inherited)_                                                                                                                                                |
| `color.text.link`       | `--kz-color-text-link`       | <span style="display:inline-block;width:14px;height:14px;background:#0066cc;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#0066cc` | _(inherited)_                                                                                                                                                |
| `color.text.link.hover` | `--kz-color-text-link-hover` | <span style="display:inline-block;width:14px;height:14px;background:#004c99;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#004c99` | _(inherited)_                                                                                                                                                |

---

## Border

| Token key              | CSS variable                | Light (standard)                                                                                                                                                                         | Dark (standard)                                                                                                                                              |
| ---------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `color.border.subtle`  | `--kz-color-border-subtle`  | <span style="display:inline-block;width:14px;height:14px;background:#e4e7eb;border:1px solid #999;vertical-align:middle;border-radius:2px"></span> `#e4e7eb`                             | <span style="display:inline-block;width:14px;height:14px;background:#2d3748;border:1px solid #555;vertical-align:middle;border-radius:2px"></span> `#2d3748` |
| `color.border.default` | `--kz-color-border-default` | <span style="display:inline-block;width:14px;height:14px;background:#cbd2d9;border:1px solid #999;vertical-align:middle;border-radius:2px"></span> `#cbd2d9`                             | <span style="display:inline-block;width:14px;height:14px;background:#374151;border:1px solid #555;vertical-align:middle;border-radius:2px"></span> `#374151` |
| `color.border.strong`  | `--kz-color-border-strong`  | <span style="display:inline-block;width:14px;height:14px;background:#9aa5b1;border:1px solid #999;vertical-align:middle;border-radius:2px"></span> `#9aa5b1`                             | _(inherited)_                                                                                                                                                |
| `color.border.focus`   | `--kz-color-border-focus`   | _(uses brand accent)_                                                                                                                                                                    | _(inherited)_                                                                                                                                                |
| `color.border.inverse` | `--kz-color-border-inverse` | <span style="display:inline-block;width:14px;height:14px;background:rgba(255,255,255,0.3);border:1px solid #999;vertical-align:middle;border-radius:2px"></span> `rgba(255,255,255,0.3)` | _(inherited)_                                                                                                                                                |

---

## Status

| Token key                     | CSS variable                       | Light (standard)                                                                                                                                             | Dark (standard) |
| ----------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `color.status.success`        | `--kz-color-status-success`        | <span style="display:inline-block;width:14px;height:14px;background:#00c950;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#00c950` | _(inherited)_   |
| `color.status.success.bg`     | `--kz-color-status-success-bg`     | <span style="display:inline-block;width:14px;height:14px;background:#e6f4ea;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#e6f4ea` | _(inherited)_   |
| `color.status.success.border` | `--kz-color-status-success-border` | <span style="display:inline-block;width:14px;height:14px;background:#00c950;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#00c950` | _(inherited)_   |
| `color.status.warning`        | `--kz-color-status-warning`        | <span style="display:inline-block;width:14px;height:14px;background:#f59e0b;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#f59e0b` | _(inherited)_   |
| `color.status.warning.bg`     | `--kz-color-status-warning-bg`     | <span style="display:inline-block;width:14px;height:14px;background:#fef3c7;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#fef3c7` | _(inherited)_   |
| `color.status.warning.border` | `--kz-color-status-warning-border` | <span style="display:inline-block;width:14px;height:14px;background:#f59e0b;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#f59e0b` | _(inherited)_   |
| `color.status.error`          | `--kz-color-status-error`          | <span style="display:inline-block;width:14px;height:14px;background:#fb2c36;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#fb2c36` | _(inherited)_   |
| `color.status.error.bg`       | `--kz-color-status-error-bg`       | <span style="display:inline-block;width:14px;height:14px;background:#fdecec;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#fdecec` | _(inherited)_   |
| `color.status.error.border`   | `--kz-color-status-error-border`   | <span style="display:inline-block;width:14px;height:14px;background:#fb2c36;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#fb2c36` | _(inherited)_   |
| `color.status.info`           | `--kz-color-status-info`           | <span style="display:inline-block;width:14px;height:14px;background:#2563eb;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#2563eb` | _(inherited)_   |
| `color.status.info.bg`        | `--kz-color-status-info-bg`        | <span style="display:inline-block;width:14px;height:14px;background:#e8f1fd;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#e8f1fd` | _(inherited)_   |
| `color.status.info.border`    | `--kz-color-status-info-border`    | <span style="display:inline-block;width:14px;height:14px;background:#b6d4fe;border:1px solid #ccc;vertical-align:middle;border-radius:2px"></span> `#b6d4fe` | _(inherited)_   |

---

## Shadow

Default values are **Standard light**. Standard dark overrides some; Neumorphic uses different values for elevation/inset and defines the neumorphic.\* shadows.

| Token key                     | CSS variable                       | Standard light                        | Standard dark                       | Neumorphic light                                                                |
| ----------------------------- | ---------------------------------- | ------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------- |
| `shadow.elevation.0`          | `--kz-shadow-elevation-0`          | `none`                                | _(inherited)_                       | _(inherited)_                                                                   |
| `shadow.elevation.1`          | `--kz-shadow-elevation-1`          | `0 1px 2px rgba(0, 0, 0, 0.05)`       | `0 1px 2px rgba(0, 0, 0, 0.4)`      | `6px 6px 12px rgba(0,0,0,0.12), -6px -6px 12px rgba(255,255,255,0.8)`           |
| `shadow.elevation.2`          | `--kz-shadow-elevation-2`          | `0 2px 4px rgba(0, 0, 0, 0.08)`       | `0 2px 4px rgba(0, 0, 0, 0.45)`     | `10px 10px 20px rgba(0,0,0,0.14), -10px -10px 20px rgba(255,255,255,0.85)`      |
| `shadow.elevation.3`          | `--kz-shadow-elevation-3`          | `0 4px 8px rgba(0, 0, 0, 0.12)`       | _(inherited)_                       | _(inherited)_                                                                   |
| `shadow.elevation.4`          | `--kz-shadow-elevation-4`          | `0 8px 16px rgba(0, 0, 0, 0.16)`      | _(inherited)_                       | _(inherited)_                                                                   |
| `shadow.elevation.5`          | `--kz-shadow-elevation-5`          | `0 12px 24px rgba(0, 0, 0, 0.2)`      | _(inherited)_                       | _(inherited)_                                                                   |
| `shadow.inset.1`              | `--kz-shadow-inset-1`              | `inset 0 1px 2px rgba(0, 0, 0, 0.05)` | _(inherited)_                       | `inset 4px 4px 8px rgba(0,0,0,0.12), inset -4px -4px 8px rgba(255,255,255,0.8)` |
| `shadow.inset.2`              | `--kz-shadow-inset-2`              | `inset 0 2px 4px rgba(0, 0, 0, 0.08)` | _(inherited)_                       | _(inherited)_                                                                   |
| `shadow.focus`                | `--kz-shadow-focus`                | `0 0 0 3px rgba(0, 102, 204, 0.25)`   | `0 0 0 3px rgba(0, 169, 157, 0.35)` | _(inherited)_                                                                   |
| `shadow.neumorphic.light`     | `--kz-shadow-neumorphic-light`     | `none`                                | _(inherited)_                       | _(inherited)_                                                                   |
| `shadow.neumorphic.dark`      | `--kz-shadow-neumorphic-dark`      | `none`                                | _(inherited)_                       | _(inherited)_                                                                   |
| `shadow.neumorphic.raised.sm` | `--kz-shadow-neumorphic-raised-sm` | `none`                                | `none`                              | `2px 2px 4px 0 #c3cad3, -2px -2px 4px 0 #fff`                                   |
| `shadow.neumorphic.raised.md` | `--kz-shadow-neumorphic-raised-md` | `none`                                | `none`                              | `4px 4px 8px 0 rgba(163,177,198,0.5), -4px -4px 8px 0 #fff`                     |
| `shadow.neumorphic.raised.lg` | `--kz-shadow-neumorphic-raised-lg` | `none`                                | `none`                              | `4px 4px 12px 0 rgba(163,177,198,0.5), -4px -4px 12px 0 #fff`                   |
| `shadow.neumorphic.inset.sm`  | `--kz-shadow-neumorphic-inset-sm`  | `none`                                | `none`                              | `2px 2px 4px 0 #c3cad3 inset, -2px -2px 4px 0 #fff inset`                       |

_(Neumorphic dark uses different shadow values; see `neumorphic.dark.css`.)_

---

## Effect

| Token key                     | CSS variable                       | Default (Standard light) |
| ----------------------------- | ---------------------------------- | ------------------------ |
| `effect.blur.sm`              | `--kz-effect-blur-sm`              | `4px`                    |
| `effect.blur.md`              | `--kz-effect-blur-md`              | `8px`                    |
| `effect.blur.lg`              | `--kz-effect-blur-lg`              | `16px`                   |
| `effect.glass.opacity`        | `--kz-effect-glass-opacity`        | `0.7`                    |
| `effect.glass.border.opacity` | `--kz-effect-glass-border-opacity` | `0.3`                    |

---

## Radius

| Token key     | CSS variable       | Default (Standard light) |
| ------------- | ------------------ | ------------------------ |
| `radius.none` | `--kz-radius-none` | `0`                      |
| `radius.xs`   | `--kz-radius-xs`   | `2px`                    |
| `radius.sm`   | `--kz-radius-sm`   | `4px`                    |
| `radius.md`   | `--kz-radius-md`   | `8px`                    |
| `radius.lg`   | `--kz-radius-lg`   | `12px`                   |
| `radius.xl`   | `--kz-radius-xl`   | `16px`                   |
| `radius.full` | `--kz-radius-full` | `9999px`                 |

---

## Space

| Token key  | CSS variable    | Default (Standard light) |
| ---------- | --------------- | ------------------------ |
| `space.0`  | `--kz-space-0`  | `0`                      |
| `space.1`  | `--kz-space-1`  | `4px`                    |
| `space.2`  | `--kz-space-2`  | `8px`                    |
| `space.3`  | `--kz-space-3`  | `12px`                   |
| `space.4`  | `--kz-space-4`  | `16px`                   |
| `space.5`  | `--kz-space-5`  | `20px`                   |
| `space.6`  | `--kz-space-6`  | `24px`                   |
| `space.8`  | `--kz-space-8`  | `32px`                   |
| `space.10` | `--kz-space-10` | `40px`                   |
| `space.12` | `--kz-space-12` | `48px`                   |
| `space.16` | `--kz-space-16` | `64px`                   |
| `space.20` | `--kz-space-20` | `80px`                   |
| `space.24` | `--kz-space-24` | `96px`                   |

---

## Font

| Token key              | CSS variable                | Default (Standard light)                  |
| ---------------------- | --------------------------- | ----------------------------------------- |
| `font.family.base`     | `--kz-font-family-base`     | `Inter, system-ui, sans-serif`            |
| `font.family.mono`     | `--kz-font-family-mono`     | `ui-monospace, SFMono-Regular, monospace` |
| `font.size.xs`         | `--kz-font-size-xs`         | `12px`                                    |
| `font.size.sm`         | `--kz-font-size-sm`         | `14px`                                    |
| `font.size.md`         | `--kz-font-size-md`         | `16px`                                    |
| `font.size.lg`         | `--kz-font-size-lg`         | `18px`                                    |
| `font.size.xl`         | `--kz-font-size-xl`         | `20px`                                    |
| `font.size.2xl`        | `--kz-font-size-2xl`        | `24px`                                    |
| `font.size.3xl`        | `--kz-font-size-3xl`        | `30px`                                    |
| `font.weight.regular`  | `--kz-font-weight-regular`  | `400`                                     |
| `font.weight.medium`   | `--kz-font-weight-medium`   | `500`                                     |
| `font.weight.semibold` | `--kz-font-weight-semibold` | `600`                                     |
| `font.weight.bold`     | `--kz-font-weight-bold`     | `700`                                     |
| `line.height.sm`       | `--kz-line-height-sm`       | `1.4`                                     |
| `line.height.md`       | `--kz-line-height-md`       | `1.5`                                     |
| `line.height.lg`       | `--kz-line-height-lg`       | `1.6`                                     |

---

## Motion

| Token key                  | CSS variable                    | Default (Standard light)       |
| -------------------------- | ------------------------------- | ------------------------------ |
| `motion.duration.fast`     | `--kz-motion-duration-fast`     | `120ms`                        |
| `motion.duration.normal`   | `--kz-motion-duration-normal`   | `200ms`                        |
| `motion.duration.slow`     | `--kz-motion-duration-slow`     | `300ms`                        |
| `motion.easing.standard`   | `--kz-motion-easing-standard`   | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `motion.easing.emphasized` | `--kz-motion-easing-emphasized` | `cubic-bezier(0.2, 0, 0, 1)`   |

---

## Component — Sidebar

| Token key                            | CSS variable                              | Default (Standard light) |
| ------------------------------------ | ----------------------------------------- | ------------------------ |
| `component.sidebar.bg`               | `--kz-component-sidebar-bg`               | `#ffffff`                |
| `component.sidebar.border`           | `--kz-component-sidebar-border`           | `#e4e7eb`                |
| `component.sidebar.item.bg`          | `--kz-component-sidebar-item-bg`          | `transparent`            |
| `component.sidebar.item.bg.hover`    | `--kz-component-sidebar-item-bg-hover`    | `#f0f2f5`                |
| `component.sidebar.item.bg.active`   | `--kz-component-sidebar-item-bg-active`   | `#e8f1fd`                |
| `component.sidebar.item.text`        | `--kz-component-sidebar-item-text`        | `#1f2933`                |
| `component.sidebar.item.text.active` | `--kz-component-sidebar-item-text-active` | `#0066cc`                |
| `component.sidebar.indicator`        | `--kz-component-sidebar-indicator`        | `#0066cc`                |

---

## Component — Header

| Token key                 | CSS variable                   | Default (Standard light) |
| ------------------------- | ------------------------------ | ------------------------ |
| `component.header.bg`     | `--kz-component-header-bg`     | `#ffffff`                |
| `component.header.border` | `--kz-component-header-border` | `#e4e7eb`                |
| `component.header.text`   | `--kz-component-header-text`   | `#1f2933`                |

---

## Component — Button

| Token key                                 | CSS variable                                   | Default (Standard light)                                                   |
| ----------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------- |
| `component.button.primary.bg`             | `--kz-component-button-primary-bg`             | `var(--kz-color-brand-accent)`                                             |
| `component.button.primary.bg.hover`       | `--kz-component-button-primary-bg-hover`       | `var(--kz-color-brand-accent-hover)`                                       |
| `component.button.primary.bg.active`      | `--kz-component-button-primary-bg-active`      | `var(--kz-color-brand-accent-active)`                                      |
| `component.button.primary.text`           | `--kz-component-button-primary-text`           | `#fff`                                                                     |
| `component.button.primary.shadow`         | `--kz-component-button-primary-shadow`         | _(not set in standard; neumorphic: var(--kz-shadow-neumorphic-raised-sm))_ |
| `component.button.primary.shadow.hover`   | `--kz-component-button-primary-shadow-hover`   | _(neumorphic only)_                                                        |
| `component.button.secondary.bg`           | `--kz-component-button-secondary-bg`           | `#f3f4f6`                                                                  |
| `component.button.secondary.bg.hover`     | `--kz-component-button-secondary-bg-hover`     | `#e5e7eb`                                                                  |
| `component.button.secondary.bg.active`    | `--kz-component-button-secondary-bg-active`    | `#d1d5dc`                                                                  |
| `component.button.secondary.text`         | `--kz-component-button-secondary-text`         | `#101828`                                                                  |
| `component.button.secondary.shadow`       | `--kz-component-button-secondary-shadow`       | _(neumorphic: var(--kz-shadow-neumorphic-raised-sm))_                      |
| `component.button.secondary.shadow.hover` | `--kz-component-button-secondary-shadow-hover` | _(neumorphic: var(--kz-shadow-neumorphic-inset-sm))_                       |
| `component.button.outline.bg`             | `--kz-component-button-outline-bg`             | `#fff`                                                                     |
| `component.button.outline.bg.hover`       | `--kz-component-button-outline-bg-hover`       | `#e8e8e8`                                                                  |
| `component.button.outline.border`         | `--kz-component-button-outline-border`         | `#d1d5dc`                                                                  |
| `component.button.outline.text`           | `--kz-component-button-outline-text`           | `#101828`                                                                  |
| `component.button.outline.shadow`         | `--kz-component-button-outline-shadow`         | _(neumorphic: var(--kz-shadow-neumorphic-raised-sm))_                      |
| `component.button.outline.shadow.hover`   | `--kz-component-button-outline-shadow-hover`   | _(neumorphic: var(--kz-shadow-neumorphic-inset-sm))_                       |
| `component.button.ghost.bg`               | `--kz-component-button-ghost-bg`               | `transparent`                                                              |
| `component.button.ghost.bg.hover`         | `--kz-component-button-ghost-bg-hover`         | _(neumorphic light: #0000000d)_                                            |
| `component.button.ghost.text`             | `--kz-component-button-ghost-text`             | `#364153`                                                                  |
| `component.button.success.bg`             | `--kz-component-button-success-bg`             | `#00a63e`                                                                  |
| `component.button.success.bg.hover`       | `--kz-component-button-success-bg-hover`       | `#008c35`                                                                  |
| `component.button.success.text`           | `--kz-component-button-success-text`           | `#fff`                                                                     |
| `component.button.success.shadow`         | `--kz-component-button-success-shadow`         | _(neumorphic: var(--kz-shadow-neumorphic-raised-sm))_                      |
| `component.button.success.shadow.hover`   | `--kz-component-button-success-shadow-hover`   | _(neumorphic: var(--kz-shadow-neumorphic-inset-sm))_                       |
| `component.button.warning.bg`             | `--kz-component-button-warning-bg`             | `#f59e0b`                                                                  |
| `component.button.warning.bg.hover`       | `--kz-component-button-warning-bg-hover`       | `#d97706`                                                                  |
| `component.button.warning.text`           | `--kz-component-button-warning-text`           | `#fff`                                                                     |
| `component.button.warning.shadow`         | `--kz-component-button-warning-shadow`         | _(neumorphic: var(--kz-shadow-neumorphic-raised-sm))_                      |
| `component.button.warning.shadow.hover`   | `--kz-component-button-warning-shadow-hover`   | _(neumorphic: var(--kz-shadow-neumorphic-inset-sm))_                       |
| `component.button.error.bg`               | `--kz-component-button-error-bg`               | `#e7000b`                                                                  |
| `component.button.error.bg.hover`         | `--kz-component-button-error-bg-hover`         | `#c90009`                                                                  |
| `component.button.error.text`             | `--kz-component-button-error-text`             | `#fff`                                                                     |
| `component.button.error.shadow`           | `--kz-component-button-error-shadow`           | _(neumorphic: var(--kz-shadow-neumorphic-raised-sm))_                      |
| `component.button.error.shadow.hover`     | `--kz-component-button-error-shadow-hover`     | _(neumorphic: var(--kz-shadow-neumorphic-inset-sm))_                       |
| `component.button.radius`                 | `--kz-component-button-radius`                 | `8px`                                                                      |
| `component.button.disabled.opacity`       | `--kz-component-button-disabled-opacity`       | `0.5`                                                                      |
| `component.button.loading.opacity`        | `--kz-component-button-loading-opacity`        | `0.8`                                                                      |

---

## Component — Toggle button

| Token key                                        | CSS variable                                          | Default (Standard light)                                      |
| ------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------- |
| `component.toggle-button.default.bg`             | `--kz-component-toggle-button-default-bg`             | `var(--kz-component-button-secondary-bg)`                     |
| `component.toggle-button.default.bg.pressed`     | `--kz-component-toggle-button-default-bg-pressed`     | `var(--kz-component-button-secondary-bg-active)`              |
| `component.toggle-button.default.text`           | `--kz-component-toggle-button-default-text`           | `var(--kz-component-button-secondary-text)`                   |
| `component.toggle-button.default.text.pressed`   | `--kz-component-toggle-button-default-text-pressed`   | `var(--kz-component-button-secondary-text)`                   |
| `component.toggle-button.primary.bg`             | `--kz-component-toggle-button-primary-bg`             | `var(--kz-component-button-secondary-bg)`                     |
| `component.toggle-button.primary.bg.pressed`     | `--kz-component-toggle-button-primary-bg-pressed`     | `var(--kz-component-button-primary-bg)`                       |
| `component.toggle-button.primary.text`           | `--kz-component-toggle-button-primary-text`           | `var(--kz-component-button-secondary-text)`                   |
| `component.toggle-button.primary.text.pressed`   | `--kz-component-toggle-button-primary-text-pressed`   | `var(--kz-component-button-primary-text)`                     |
| `component.toggle-button.container.bg`           | `--kz-component-toggle-button-container-bg`           | `#99a1af`                                                     |
| `component.toggle-button.container.bg.pressed`   | `--kz-component-toggle-button-container-bg-pressed`   | `var(--kz-color-brand-accent)`                                |
| `component.toggle-button.container.text`         | `--kz-component-toggle-button-container-text`         | `#101828`                                                     |
| `component.toggle-button.container.text.pressed` | `--kz-component-toggle-button-container-text-pressed` | `#101828`                                                     |
| `component.toggle-button.radius`                 | `--kz-component-toggle-button-radius`                 | `var(--kz-component-button-radius)` → `8px`                   |
| `component.toggle-button.disabled.opacity`       | `--kz-component-toggle-button-disabled-opacity`       | `0.5`                                                         |
| `component.toggle-button.loading.opacity`        | `--kz-component-toggle-button-loading-opacity`        | `0.8`                                                         |
| `component.toggle-button.pressed.shadow`         | `--kz-component-toggle-button-pressed-shadow`         | _(neumorphic: var(--kz-shadow-neumorphic-inset-sm))_          |
| `component.toggle-button.track.off.bg`           | `--kz-component-toggle-button-track-off-bg`           | `#99a1af`                                                     |
| `component.toggle-button.track.on.bg`            | `--kz-component-toggle-button-track-on-bg`            | `var(--kz-color-brand-accent)`                                |
| `component.toggle-button.thumb.bg`               | `--kz-component-toggle-button-thumb-bg`               | `#fff`                                                        |
| `component.toggle-button.thumb.shadow`           | `--kz-component-toggle-button-thumb-shadow`           | `0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)` |

---

## Component — Checkbox

| Token key                                 | CSS variable                                   | Default (Standard light)                 |
| ----------------------------------------- | ---------------------------------------------- | ---------------------------------------- |
| `component.checkbox.size.sm`              | `--kz-component-checkbox-size-sm`              | `16px`                                   |
| `component.checkbox.size.md`              | `--kz-component-checkbox-size-md`              | `20px`                                   |
| `component.checkbox.size.lg`              | `--kz-component-checkbox-size-lg`              | `24px`                                   |
| `component.checkbox.radius`               | `--kz-component-checkbox-radius`               | `4px`                                    |
| `component.checkbox.off.bg`               | `--kz-component-checkbox-off-bg`               | `#fff`                                   |
| `component.checkbox.off.border`           | `--kz-component-checkbox-off-border`           | `2px solid #d1d5dc`                      |
| `component.checkbox.off.shadow`           | `--kz-component-checkbox-off-shadow`           | `none`                                   |
| `component.checkbox.on.bg`                | `--kz-component-checkbox-on-bg`                | `var(--kz-color-brand-accent)`           |
| `component.checkbox.on.border`            | `--kz-component-checkbox-on-border`            | `2px solid var(--kz-color-brand-accent)` |
| `component.checkbox.on.shadow`            | `--kz-component-checkbox-on-shadow`            | `none`                                   |
| `component.checkbox.icon.color`           | `--kz-component-checkbox-icon-color`           | `#fff`                                   |
| `component.checkbox.disabled.opacity`     | `--kz-component-checkbox-disabled-opacity`     | `0.5`                                    |
| `component.checkbox.container.off.bg`     | `--kz-component-checkbox-container-off-bg`     | same as off.bg                           |
| `component.checkbox.container.off.border` | `--kz-component-checkbox-container-off-border` | same as off.border                       |
| `component.checkbox.container.off.shadow` | `--kz-component-checkbox-container-off-shadow` | same as off.shadow                       |
| `component.checkbox.container.on.bg`      | `--kz-component-checkbox-container-on-bg`      | same as on.bg                            |
| `component.checkbox.container.on.border`  | `--kz-component-checkbox-container-on-border`  | same as on.border                        |
| `component.checkbox.container.on.shadow`  | `--kz-component-checkbox-container-on-shadow`  | same as on.shadow                        |

---

## Component — Radio

| Token key                          | CSS variable                            | Default (Standard light)                 |
| ---------------------------------- | --------------------------------------- | ---------------------------------------- |
| `component.radio.size.sm`          | `--kz-component-radio-size-sm`          | `16px`                                   |
| `component.radio.size.md`          | `--kz-component-radio-size-md`          | `20px`                                   |
| `component.radio.size.lg`          | `--kz-component-radio-size-lg`          | `24px`                                   |
| `component.radio.radius`           | `--kz-component-radio-radius`           | `50%`                                    |
| `component.radio.off.bg`           | `--kz-component-radio-off-bg`           | `#fff`                                   |
| `component.radio.off.border`       | `--kz-component-radio-off-border`       | `2px solid #d1d5dc`                      |
| `component.radio.off.shadow`       | `--kz-component-radio-off-shadow`       | `none`                                   |
| `component.radio.on.bg`            | `--kz-component-radio-on-bg`            | `#fff`                                   |
| `component.radio.on.border`        | `--kz-component-radio-on-border`        | `2px solid var(--kz-color-brand-accent)` |
| `component.radio.on.shadow`        | `--kz-component-radio-on-shadow`        | `none`                                   |
| `component.radio.dot.bg`           | `--kz-component-radio-dot-bg`           | `var(--kz-color-brand-accent)`           |
| `component.radio.dot.shadow`       | `--kz-component-radio-dot-shadow`       | `none`                                   |
| `component.radio.disabled.opacity` | `--kz-component-radio-disabled-opacity` | `0.5`                                    |

---

## Component — Tabs

| Token key                                   | CSS variable                                     | Default (Standard light)         |
| ------------------------------------------- | ------------------------------------------------ | -------------------------------- |
| `component.tabs.list.bg`                    | `--kz-component-tabs-list-bg`                    | `var(--kz-color-surface-muted)`  |
| `component.tabs.list.radius`                | `--kz-component-tabs-list-radius`                | `10px`                           |
| `component.tabs.list.shadow`                | `--kz-component-tabs-list-shadow`                | `none`                           |
| `component.tabs.list.pill.bg`               | `--kz-component-tabs-list-pill-bg`               | `rgba(0,0,0,0.05)`               |
| `component.tabs.trigger.text`               | `--kz-component-tabs-trigger-text`               | `var(--kz-color-text-secondary)` |
| `component.tabs.trigger.selected.text`      | `--kz-component-tabs-trigger-selected-text`      | `var(--kz-color-brand-accent)`   |
| `component.tabs.trigger.selected.underline` | `--kz-component-tabs-trigger-selected-underline` | `var(--kz-color-brand-accent)`   |
| `component.tabs.trigger.selected.bg`        | `--kz-component-tabs-trigger-selected-bg`        | `var(--kz-color-surface-base)`   |
| `component.tabs.trigger.selected.shadow`    | `--kz-component-tabs-trigger-selected-shadow`    | `none`                           |
| `component.tabs.trigger.radius`             | `--kz-component-tabs-trigger-radius`             | `8px`                            |
| `component.tabs.content.padding`            | `--kz-component-tabs-content-padding`            | `16px`                           |

---

## Component — Input

| Token key                          | CSS variable                            | Default (Standard light) |
| ---------------------------------- | --------------------------------------- | ------------------------ |
| `component.input.bg`               | `--kz-component-input-bg`               | `#f9fafb`                |
| `component.input.border`           | `--kz-component-input-border`           | `#e5e7eb`                |
| `component.input.border.focus`     | `--kz-component-input-border-focus`     | `#0066cc`                |
| `component.input.border.disabled`  | `--kz-component-input-border-disabled`  | `#d1d5dc`                |
| `component.input.text`             | `--kz-component-input-text`             | `#1f2933`                |
| `component.input.placeholder`      | `--kz-component-input-placeholder`      | `#99a1af`                |
| `component.input.icon`             | `--kz-component-input-icon`             | `#99a1af`                |
| `component.input.shadow`           | `--kz-component-input-shadow`           | `none`                   |
| `component.input.radius`           | `--kz-component-input-radius`           | `10px`                   |
| `component.input.container.radius` | `--kz-component-input-container-radius` | `8px`                    |
| `component.input.container.border` | `--kz-component-input-container-border` | `#d1d5dc`                |

---

## Component — Dropdown

| Token key                                  | CSS variable                                    | Default (Standard light)            |
| ------------------------------------------ | ----------------------------------------------- | ----------------------------------- |
| `component.dropdown.trigger.bg`            | `--kz-component-dropdown-trigger-bg`            | `#ffffff`                           |
| `component.dropdown.trigger.border`        | `--kz-component-dropdown-trigger-border`        | `#d1d5dc`                           |
| `component.dropdown.trigger.border.open`   | `--kz-component-dropdown-trigger-border-open`   | `#d1d5dc`                           |
| `component.dropdown.trigger.text`          | `--kz-component-dropdown-trigger-text`          | `#364153`                           |
| `component.dropdown.trigger.text.selected` | `--kz-component-dropdown-trigger-text-selected` | `var(--kz-color-brand-accent-dark)` |
| `component.dropdown.trigger.shadow`        | `--kz-component-dropdown-trigger-shadow`        | `none`                              |
| `component.dropdown.trigger.shadow.open`   | `--kz-component-dropdown-trigger-shadow-open`   | `none`                              |
| `component.dropdown.trigger.radius`        | `--kz-component-dropdown-trigger-radius`        | `8px`                               |
| `component.dropdown.trigger.focus.ring`    | `--kz-component-dropdown-trigger-focus-ring`    | `0 0 0 2px rgba(0,150,137,0.25)`    |
| `component.dropdown.content.bg`            | `--kz-component-dropdown-content-bg`            | `#ffffff`                           |
| `component.dropdown.content.border`        | `--kz-component-dropdown-content-border`        | `#d1d5dc`                           |
| `component.dropdown.content.shadow`        | `--kz-component-dropdown-content-shadow`        | `0 4px 12px rgba(0,0,0,0.1)`        |
| `component.dropdown.content.radius`        | `--kz-component-dropdown-content-radius`        | `8px`                               |
| `component.dropdown.item.text`             | `--kz-component-dropdown-item-text`             | `#364153`                           |
| `component.dropdown.item.text.selected`    | `--kz-component-dropdown-item-text-selected`    | `var(--kz-color-brand-accent-dark)` |
| `component.dropdown.item.bg.hover`         | `--kz-component-dropdown-item-bg-hover`         | `rgba(0,150,137,0.08)`              |

---

## Component — Nav button

| Token key                              | CSS variable                                | Default (Standard light)            |
| -------------------------------------- | ------------------------------------------- | ----------------------------------- |
| `component.nav-button.icon`            | `--kz-component-nav-button-icon`            | `#52606d`                           |
| `component.nav-button.text`            | `--kz-component-nav-button-text`            | `#364153`                           |
| `component.nav-button.gap`             | `--kz-component-nav-button-gap`             | `10px`                              |
| `component.nav-button.chevron`         | `--kz-component-nav-button-chevron`         | `#52606d`                           |
| `component.nav-button.hover.bg`        | `--kz-component-nav-button-hover-bg`        | `rgba(0,0,0,0.05)`                  |
| `component.nav-button.selected.bg`     | `--kz-component-nav-button-selected-bg`     | `rgba(0,150,137,0.08)`              |
| `component.nav-button.selected.shadow` | `--kz-component-nav-button-selected-shadow` | `none`                              |
| `component.nav-button.selected.icon`   | `--kz-component-nav-button-selected-icon`   | `var(--kz-color-brand-accent-dark)` |
| `component.nav-button.selected.text`   | `--kz-component-nav-button-selected-text`   | `var(--kz-color-brand-accent-dark)` |
| `component.nav-button.radius`          | `--kz-component-nav-button-radius`          | `5px`                               |

---

## Component — Nav dropdown

| Token key                                | CSS variable                                  | Default (Standard light)     |
| ---------------------------------------- | --------------------------------------------- | ---------------------------- |
| `component.nav-dropdown.menu.bg`         | `--kz-component-nav-dropdown-menu-bg`         | `#fff`                       |
| `component.nav-dropdown.menu.shadow`     | `--kz-component-nav-dropdown-menu-shadow`     | `0 2px 8px rgba(0,0,0,0.08)` |
| `component.nav-dropdown.menu.radius`     | `--kz-component-nav-dropdown-menu-radius`     | `4px`                        |
| `component.nav-dropdown.option.text`     | `--kz-component-nav-dropdown-option-text`     | `#52606d`                    |
| `component.nav-dropdown.option.hover.bg` | `--kz-component-nav-dropdown-option-hover-bg` | `rgba(0,150,137,0.08)`       |

---

## Component — Sidesheet

| Token key                    | CSS variable                      | Default (Standard light)        |
| ---------------------------- | --------------------------------- | ------------------------------- |
| `component.sidesheet.bg`     | `--kz-component-sidesheet-bg`     | `var(--kz-color-surface-base)`  |
| `component.sidesheet.width`  | `--kz-component-sidesheet-width`  | `260px`                         |
| `component.sidesheet.border` | `--kz-component-sidesheet-border` | `var(--kz-color-border-subtle)` |

---

## Component — Sidemenu

| Token key                                    | CSS variable                                      | Default (Standard light)                           |
| -------------------------------------------- | ------------------------------------------------- | -------------------------------------------------- |
| `component.sidemenu.bg`                      | `--kz-component-sidemenu-bg`                      | `var(--kz-color-surface-base)`                     |
| `component.sidemenu.border`                  | `--kz-component-sidemenu-border`                  | `var(--kz-color-border-subtle)`                    |
| `component.sidemenu.shadow`                  | `--kz-component-sidemenu-shadow`                  | `none`                                             |
| `component.sidemenu.section.label.text`      | `--kz-component-sidemenu-section-label-text`      | `var(--kz-color-text-muted)`                       |
| `component.sidemenu.item.text`               | `--kz-component-sidemenu-item-text`               | `var(--kz-color-text-primary)`                     |
| `component.sidemenu.item.bg.hover`           | `--kz-component-sidemenu-item-bg-hover`           | `rgba(0,0,0,0.05)`                                 |
| `component.sidemenu.item.bg.active`          | `--kz-component-sidemenu-item-bg-active`          | `rgba(0,150,137,0.08)`                             |
| `component.sidemenu.item.active.text`        | `--kz-component-sidemenu-item-active-text`        | `var(--kz-color-brand-accent-dark)`                |
| `component.sidemenu.item.active.link.bg`     | `--kz-component-sidemenu-item-active-link-bg`     | `rgba(0,150,137,0.08)`                             |
| `component.sidemenu.item.active.link.shadow` | `--kz-component-sidemenu-item-active-link-shadow` | `none`                                             |
| `component.sidemenu.group.indent.bg`         | `--kz-component-sidemenu-group-indent-bg`         | `rgba(0,0,0,0.02)`                                 |
| `component.sidemenu.gap`                     | `--kz-component-sidemenu-gap`                     | `4px`                                              |
| `component.sidemenu.icon.gap`                | `--kz-component-sidemenu-icon-gap`                | `10px`                                             |
| `component.sidemenu.flyout.menu.bg`          | `--kz-component-sidemenu-flyout-menu-bg`          | `var(--kz-component-sidemenu-bg)`                  |
| `component.sidemenu.flyout.menu.shadow`      | `--kz-component-sidemenu-flyout-menu-shadow`      | `0 2px 8px rgba(0,0,0,0.08)`                       |
| `component.sidemenu.flyout.menu.radius`      | `--kz-component-sidemenu-flyout-menu-radius`      | `4px`                                              |
| `component.sidemenu.flyout.option.text`      | `--kz-component-sidemenu-flyout-option-text`      | `var(--kz-component-nav-dropdown-option-text)`     |
| `component.sidemenu.flyout.option.hover.bg`  | `--kz-component-sidemenu-flyout-option-hover-bg`  | `var(--kz-component-nav-dropdown-option-hover-bg)` |

---

## Component — Tooltip

| Token key                        | CSS variable                          | Default (Standard light)     |
| -------------------------------- | ------------------------------------- | ---------------------------- |
| `component.tooltip.bg`           | `--kz-component-tooltip-bg`           | `#1f2933`                    |
| `component.tooltip.text`         | `--kz-component-tooltip-text`         | `#ffffff`                    |
| `component.tooltip.border`       | `--kz-component-tooltip-border`       | `transparent`                |
| `component.tooltip.shadow`       | `--kz-component-tooltip-shadow`       | `0 2px 8px rgba(0,0,0,0.15)` |
| `component.tooltip.radius`       | `--kz-component-tooltip-radius`       | `6px`                        |
| `component.tooltip.padding.sm`   | `--kz-component-tooltip-padding-sm`   | `4px 8px`                    |
| `component.tooltip.padding.md`   | `--kz-component-tooltip-padding-md`   | `6px 10px`                   |
| `component.tooltip.padding.lg`   | `--kz-component-tooltip-padding-lg`   | `8px 12px`                   |
| `component.tooltip.maxWidth.sm`  | `--kz-component-tooltip-max-width-sm` | `160px`                      |
| `component.tooltip.maxWidth.md`  | `--kz-component-tooltip-max-width-md` | `220px`                      |
| `component.tooltip.maxWidth.lg`  | `--kz-component-tooltip-max-width-lg` | `320px`                      |
| `component.tooltip.inverse.bg`   | `--kz-component-tooltip-inverse-bg`   | `#ffffff`                    |
| `component.tooltip.inverse.text` | `--kz-component-tooltip-inverse-text` | `#1f2933`                    |
| `component.tooltip.success.bg`   | `--kz-component-tooltip-success-bg`   | `#00a63e`                    |
| `component.tooltip.success.text` | `--kz-component-tooltip-success-text` | `#ffffff`                    |
| `component.tooltip.warning.bg`   | `--kz-component-tooltip-warning-bg`   | `#f59e0b`                    |
| `component.tooltip.warning.text` | `--kz-component-tooltip-warning-text` | `#ffffff`                    |
| `component.tooltip.error.bg`     | `--kz-component-tooltip-error-bg`     | `#e7000b`                    |
| `component.tooltip.error.text`   | `--kz-component-tooltip-error-text`   | `#ffffff`                    |

---

## Component — Card

| Token key               | CSS variable                 | Default (Standard light)       |
| ----------------------- | ---------------------------- | ------------------------------ |
| `component.card.bg`     | `--kz-component-card-bg`     | `#ffffff`                      |
| `component.card.border` | `--kz-component-card-border` | `#e4e7eb`                      |
| `component.card.shadow` | `--kz-component-card-shadow` | `var(--kz-shadow-elevation-1)` |
| `component.card.radius` | `--kz-component-card-radius` | `var(--kz-radius-md)` → `8px`  |

---

## Component — Canvas / Tile

| Token key                    | CSS variable                      | Default (Standard light)       |
| ---------------------------- | --------------------------------- | ------------------------------ |
| `component.canvas.bg`        | `--kz-component-canvas-bg`        | `#f5f7fa`                      |
| `component.canvas.grid.line` | `--kz-component-canvas-grid-line` | `#e4e7eb`                      |
| `component.tile.bg`          | `--kz-component-tile-bg`          | `#ffffff`                      |
| `component.tile.border`      | `--kz-component-tile-border`      | `#e4e7eb`                      |
| `component.tile.shadow`      | `--kz-component-tile-shadow`      | `var(--kz-shadow-elevation-1)` |
| `component.tile.header.bg`   | `--kz-component-tile-header-bg`   | `#f9fafb`                      |
| `component.tile.header.text` | `--kz-component-tile-header-text` | `#1f2933`                      |

---

## Component — Table

| Token key                                  | CSS variable                                    | Default (Standard light)         |
| ------------------------------------------ | ----------------------------------------------- | -------------------------------- |
| `component.table.surface`                  | `--kz-component-table-surface`                  | `var(--kz-color-surface-base)`   |
| `component.table.header.bg`                | `--kz-component-table-header-bg`                | `var(--kz-color-surface-muted)`  |
| `component.table.header.border`            | `--kz-component-table-header-border`            | `var(--kz-color-border-default)` |
| `component.table.row.border`               | `--kz-component-table-row-border`               | `var(--kz-color-border-default)` |
| `component.table.row.hover.bg`             | `--kz-component-table-row-hover-bg`             | `var(--kz-color-surface-sunken)` |
| `component.table.sticky.row.top`           | `--kz-component-table-sticky-row-top`           | `40px`                           |
| `component.table.footer.bg`                | `--kz-component-table-footer-bg`                | `#0000001a`                      |
| `component.table.pagination.bg`            | `--kz-component-table-pagination-bg`            | `#0000001a`                      |
| `component.table.pagination.active.bg`     | `--kz-component-table-pagination-active-bg`     | `var(--kz-color-surface-muted)`  |
| `component.table.pagination.active.shadow` | `--kz-component-table-pagination-active-shadow` | `none`                           |
| `component.table.pagination.hover.shadow`  | `--kz-component-table-pagination-hover-shadow`  | `none`                           |

---

## Component — Filter panel

| Token key                         | CSS variable                           | Default (Standard light) |
| --------------------------------- | -------------------------------------- | ------------------------ |
| `component.filter.panel.bg`       | `--kz-component-filter-panel-bg`       | `#ffffff`                |
| `component.filter.panel.border`   | `--kz-component-filter-panel-border`   | `#e4e7eb`                |
| `component.filter.label.text`     | `--kz-component-filter-label-text`     | `#52606d`                |
| `component.filter.control.bg`     | `--kz-component-filter-control-bg`     | `#ffffff`                |
| `component.filter.control.border` | `--kz-component-filter-control-border` | `#cbd2d9`                |

---

## Typography (status colors)

| Token key                  | CSS variable                    | Default (Standard light) |
| -------------------------- | ------------------------------- | ------------------------ |
| `typography.error.color`   | `--kz-typography-error-color`   | `#e7000b`                |
| `typography.success.color` | `--kz-typography-success-color` | `#00a63e`                |
| `typography.warning.color` | `--kz-typography-warning-color` | `#f59e0b`                |

---

**Preview tip:** Open this file in VS Code and use **Markdown: Open Preview** (or GitHub) to see the color swatches. All values use explicit units (px, ms, etc.) where applicable.
