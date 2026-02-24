# kz-design-system

Production-ready React design system with tokens, themes (Standard / Neumorphic, Light / Dark), and accessible components.

## Installation

From your app (not this repo), install the published package:

```bash
npm install kz-design-system
```

Or with pnpm:

```bash
pnpm add kz-design-system
```

Or with yarn:

```bash
yarn add kz-design-system
```

**Peer dependencies:** `react` and `react-dom` (^18.0.0 or ^19.0.0). Install them if they are not already in your project.

## Styles

Import the design system CSS once in your app (e.g. in your root layout or `_app.tsx`):

```ts
import "kz-design-system/styles.css";
```

## Theme wrapper (KezelThemeProvider)

Wrap your app (or the part of the tree that uses the design system) with `KezelThemeProvider` so that theme (variant and mode) and optional token overrides are applied.

```tsx
import {
  KezelThemeProvider,
  KezelVariant,
  KezelMode,
} from "kz-design-system";

function App() {
  return (
    <KezelThemeProvider variant={KezelVariant.Standard} mode={KezelMode.Light}>
      {/* Your app */}
    </KezelThemeProvider>
  );
}
```

- **variant:** `KezelVariant.Standard` (flat) or `KezelVariant.Neumorphic` (soft shadows).
- **mode:** `KezelMode.Light` or `KezelMode.Dark`.

You can switch theme at runtime by changing `variant` and `mode` (e.g. from state or context).

### Optional token overrides

Pass a `tokens` object to override design tokens (e.g. colors, radii):

```tsx
<KezelThemeProvider
  variant={KezelVariant.Standard}
  mode={KezelMode.Dark}
  tokens={{
    "color.brand.primary": "#18AB9F",
    "component.button.radius": "8px",
  }}
>
  {/* Your app */}
</KezelThemeProvider>
```

Token keys are defined in the design system; use the same keys as in the theme token tables.

## Usage

Import components and icons from the main entry:

```tsx
import {
  Button,
  KezelThemeProvider,
  KezelVariant,
  KezelMode,
  Icon,
  IconName,
  DropdownButton,
  Table,
} from "kz-design-system";
```

Subpath imports are also supported (e.g. for smaller bundles or explicit entry points):

```tsx
import { DropdownButton } from "kz-design-system/dropdown";
import { Icon, IconName } from "kz-design-system/icon";
```

## Package structure

- **Button, ToggleButton, Checkbox, RadioButton** – form and action controls  
- **Typography, TextInput** – text and inputs  
- **Dropdown, DropdownButton, Dialog** – overlays and menus  
- **Table** – data table with selection, sort, pagination, actions  
- **Tabs, Tooltip, SideMenu, Sidesheet, NavButton** – layout and navigation  
- **Icon, iconRegistry, IconName** – icon set  
- **KezelThemeProvider, KezelVariant, KezelMode** – theme and tokens  

All components live under `packages/ui/src/components/` and consume design tokens from the theme provider.
