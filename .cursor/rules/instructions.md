You are generating code for an npm UI library called Kezel Design System.

Stack:

- Next.js (App Router)
- Tailwind CSS
- Radix UI
- TypeScript
- Storybook
- Token-driven styling via CSS variables (prefix: --kz-\*)

Global theming model:

- Theme switching via <html> attributes:
  data-theme="default"
  data-variant="standard" | "neumorphic"
  data-mode="light" | "dark"
- Also support Tailwind dark class fallback: .dark
- Components must NEVER branch on variant/mode in JS for styling. All visual differences must be achieved by CSS variable overrides in theme CSS files.

Critical requirement:

- ALL TOKENS must be customizable through `tokens` prop on KezelThemeProvider.
- `tokens` is a flat object keyed by backend token names (dot notation) and validated at runtime.

Token contract:

- Backend token names (dot notation) are the public contract, e.g.
  "color.brand.primary"
  "color.surface.base"
  "color.text.primary"
  "color.border.default"
  "shadow.elevation.1"
  "shadow.inset.1"
  "radius.md"
  "space.4"
  "font.size.md"
  "motion.duration.normal"
- Every TokenKey must map 1:1 to a CSS variable via tokenToCssVar mapping, e.g.
  "color.brand.primary" -> "--kz-color-brand-primary"
- No token exists without a mapping entry.
- Theme CSS defines default values for all contract variables.
- User overrides via ThemeProvider apply last and must always win.

Theme CSS layout (CSS vars only, no component styles):
src/tokens/themes/default/
standard.css
standard.dark.css
neumorphic.css
neumorphic.dark.css

Base styles:
src/styles/base.css

- @layer base for typography/reset
- Uses only --kz-\* tokens (no hardcoded colors/shadows/radius)

Provider:
src/providers/KezelThemeProvider.tsx

- Sets document.documentElement.dataset.theme / variant / mode
- Toggles `dark` class when mode === "dark"
- Applies token overrides from `tokens` prop by setting CSS variables on :root via style.setProperty
- Validates values:
  - Use CSS.supports where possible (color, box-shadow)
  - Use regex for lengths, numbers, durations, cubic-bezier
  - In `safe` mode: ignore invalid + console.warn
  - In `strict` mode: throw error
- API:
  tokens?: Partial<Record<TokenKey, string>>
  validation?: "safe" | "strict"

Coding standards (very strict):

- TypeScript only, no any, no implicit any
- No comments in generated code
- Use forwardRef for DOM components
- Use Radix Slot for asChild where appropriate
- Do not hardcode colors/shadows/radius/padding/typography values; use CSS vars only
- Tailwind utilities for structure/layout; visuals via arbitrary values:
  bg-[var(--kz-color-surface-base)]
  text-[var(--kz-color-text-primary)]
  border-[var(--kz-color-border-default)]
  shadow-[var(--kz-shadow-elevation-1)]
  rounded-[var(--kz-radius-md)]
- Provide a local cn() helper (no external deps)
- Prefer string union types for public props (tree-shake friendly). If enums are requested, use them only internally, never in exported public types.

Component design rules:

- One core primitive per category; common variants are wrappers only.
  - TextInput is the core
  - PasswordInput/SearchInput are thin wrappers composed from TextInput
- Controlled + uncontrolled support for inputs:
  - If `value` prop provided -> controlled
  - Else internal state starting from defaultValue
  - Provide `onValueChange(value: string)` convenience in addition to onChange
- Accessibility:
  - Inputs: aria-invalid when error, aria-describedby links helper/error, label htmlFor links id
  - Buttons: focus-visible uses --kz-shadow-focus, disabled is keyboard-safe
- No routing/data-fetch logic inside components

Component folder structure:
src/components/<component>/
<Component>.tsx
index.ts
<Component>.stories.tsx

Exports:

- Each component exports from its folder index.ts
- Themes exported from src/tokens/themes/index.ts (side-effect imports)

Storybook requirements:

- Each component story must demonstrate:
  - standard light + dark
  - neumorphic light + dark
  - main variants + states (hover/active/disabled where relevant)

When generating any component:

- Use ONLY tokens for visuals
- Ensure it looks correct under both variants because tokens change in theme CSS
- Do not invent new token names unless you also add them to TokenKey union and tokenToCssVar mapping and theme CSS defaults
- Keep APIs minimal, stable, and composable
