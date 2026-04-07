---
"kz-design-system": patch
---

fix: complete neumorphic dark token set and resolve theme inheritance bugs

- Audited and added ~70 missing tokens to `neumorphic.dark.css` (surface scale, text scale, buttons, card, input, dropdown, tabs, sidemenu, sidesheet, tooltip, pagination, checkbox/radio) so dark neumorphic no longer falls back to light values for table rows, pagination text, card descriptions, toasts, and form controls
- Add raised shadow to neumorphic dropdown trigger (`--kz-component-dropdown-trigger-shadow`) in both light and dark
- Fix ghost input bottom border in standard dark and neumorphic dark (`--kz-component-input-ghost-border` now uses correct `1px solid <color>` shorthand with a dark-mode-visible color)
- Fix sidemenu group-trigger icon defaulting to brand teal: fallback in `sidemenu.css` changed from `var(--kz-color-brand-accent)` to `currentColor`
