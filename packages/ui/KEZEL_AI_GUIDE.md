# Kezel Design System — AI Assistant Guide

**Package name:** `kz-design-system` (Kezel-design-system)  
**Audience:** AI coding assistants (Cursor, Copilot Chat, etc.)  
**Purpose:** Enable correct discovery, selection, and composition of ALL components in the library. Treat this as a system specification, not a human tutorial.

---

## 1. Overview

### What Kezel-design-system is

- A **production-ready React design system** published as the npm package `kz-design-system`.
- Provides tokens (theme, color, spacing, typography, motion), themes (Standard / Neumorphic, Light / Dark), and accessible UI components built on **Radix UI** with **Tailwind**-compatible styling.

### Tech assumptions

- **React 18+** (or 19).
- **Next.js App Router** (or any React app).
- **Tailwind CSS** for utility overrides and layout.
- **Radix UI** as the underlying primitive layer; Kezel components are wrappers that preserve Radix behavior (focus, a11y, positioning).

### Design philosophy

- **Accessible:** Keyboard, focus, ARIA, and screen-reader friendly via Radix.
- **Tokenized:** Visual design is driven by CSS variables (tokens); avoid hardcoded colors/sizes.
- **Scalable:** Layout and navigation support JSON-driven config (e.g. SideMenu, NavButton).
- **Tree-shakeable:** Prefer subpath imports so bundlers only include what is used.
- **Composable:** Compound components (Dialog, Dropdown, Tabs) and `asChild` for composition.

---

## 2. Import Rules (VERY IMPORTANT)

### Subpath imports only

Always use **subpath imports** when the package exports that path. Do **not** import from `dist`, internal paths, or private files.

```tsx
// Correct — subpath imports
import { Button } from "kz-design-system/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "kz-design-system/dialog";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "kz-design-system/dropdown";
import { Icon, IconName } from "kz-design-system/icon";
import { SideMenu } from "kz-design-system/sidemenu";
import {
  KezelThemeProvider,
  KezelVariant,
  KezelMode,
} from "kz-design-system/theme";
```

Components that do **not** have a dedicated subpath (e.g. Tooltip, Tabs, Table, Typography, TextInput, NavButton, Checkbox, RadioButton, ToggleButton) are imported from the **main entry**:

```tsx
// Correct — main entry for components without a subpath
import {
  Tooltip,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  Typography,
  TextInput,
  NavButton,
  SideMenu,
  Checkbox,
  RadioButton,
  ToggleButton,
  type SideMenuNode,
  type TableColumn,
  type TokenKey,
} from "kz-design-system";
```

### CSS import (required once)

Import the design system styles **once** in the app root (e.g. root layout or `_app.tsx`):

```ts
import "kz-design-system/styles.css";
```

### Forbidden

- Do **not** import from `kz-design-system/dist/...` or any internal path.
- Do **not** import from `kz-design-system` when a subpath exists (e.g. use `kz-design-system/button` for Button when optimizing bundle).
- Do **not** rely on undocumented or private exports.

---

## 3. How AI Should Discover Components

### Rule 1: The design system contains MANY components beyond examples

- Assume **new components may exist** in current or future versions.
- Do **not** hardcode only the components listed in this guide or in examples.
- When the user asks for UI (e.g. "add a date picker", "add a modal", "add a menu"), **first check** whether the design system already provides a matching component.

### Rule 2: Consistent naming and structure

- Components follow **kebab-case** folder/subpath names: `button`, `dialog`, `dropdown`, `icon`, `theme`, `sidemenu`.
- New entries may be added with the same pattern (e.g. `tooltip`, `tabs`, `table` in future).
- Exported names are **PascalCase** (e.g. `Button`, `Dialog`, `SideMenu`).

### Rule 3: Discovery mechanisms

- **Subpath exports:** Prefer `import { X } from "kz-design-system/<component>"` when that subpath is documented or present in `package.json` exports.
- **Storybook mental model:** If the project has Storybook for `kz-design-system`, treat stories as a catalog of available components and variants; use them to discover names and props.
- **Compound components:** Many components export multiple parts (e.g. `Dialog` + `DialogTrigger` + `DialogContent` + `DialogTitle` + `DialogDescription` + `DialogFooter` + `DialogClose`). Import the set you need from the same entry (subpath or main).

### Rule 4: Prefer design system over custom UI

- If a component exists in the design system that fits the requirement (overlay, form control, layout, navigation, feedback, data display), **use it** instead of building custom UI.
- Search conceptually for:
  - **button** — actions, triggers
  - **dialog** — modal overlays, confirmations
  - **dropdown** — menus, grouped actions, select-like lists
  - **tooltip** — hover hints
  - **input / form controls** — TextInput, Checkbox, RadioButton, ToggleButton
  - **layout** — Tabs
  - **navigation** — SideMenu, NavButton
  - **feedback** — Tooltip, Dialog, status typography
  - **data display** — Table, Typography
  - **overlay** — Dialog, Dropdown (and Radix-based primitives)
  - **composable primitives** — compound components with `asChild`

---

## 4. Component Discovery Strategy

- **Prefer existing components:** Before implementing custom UI, assume a matching component may exist; check main entry and subpaths.
- **Check before building:** For modals, menus, forms, navigation, tooltips, tables, use the design system first.
- **Consistent naming:** Component subpaths are lowercase, single-word or kebab-case (e.g. `sidemenu`).
- **Compound components:** Use the full set (Root, Trigger, Content, Item, etc.) from the same import path.
- **Primitives and layout:** Look for layout (Tabs), navigation (SideMenu, NavButton), and form primitives (Button, TextInput, Checkbox, etc.).

---

## 5. Styling + Tokens

### Token-based styling

- The design system is **token-driven**. Colors, spacing, radius, typography, shadows, and motion are defined as **CSS variables** (e.g. `--kz-color-brand-primary`).
- Components use these variables; do **not** hardcode hex/rgb values or fixed pixel sizes for semantic tokens.
- Token keys follow a dotted convention (e.g. `color.brand.primary`, `component.button.radius`). Exported `TOKEN_KEYS` and `tokenToCssVar` can be used for override keys and CSS variable names.

### Theme provider (see Section 13)

- `KezelThemeProvider` sets `data-variant`, `data-mode`, and `class="dark"` on the document root and applies token overrides. All token-based styling depends on this provider.

### Tailwind overrides

- You may extend Tailwind with design-system tokens so that utilities (e.g. `bg-background`, `text-primary`) map to the same variables. Prefer extending theme in Tailwind config rather than hardcoding values in components.
- When adding `className` to Kezel components, **append** or **merge** (e.g. via `cn()`); do not replace the component’s base classes in a way that breaks layout or tokens.

### className extension rules

- Components accept `className` and merge it with internal styles. Use it for layout (margin, flex) or minor overrides, not for replacing core token usage or breaking accessibility.

---

## 6. Layout + Navigation Rules

### SideMenu (sidebar navigation)

- Use **SideMenu** for full sidebar navigation: JSON-driven data (`SideMenuNode[]`), sections, links, expandable groups. Supports collapsed mode (icons only with tooltips; groups open as flyout).
- **NavButton** is for individual nav items (link or dropdown with submenu). Use inside a sidebar container (e.g. `aside` with class `kz-sidesheet`) or alongside SideMenu when building custom rails.

### Collapsible vs DropdownMenu

- **Dropdown** (DropdownMenu): for **menus** (actions, links, grouped items). Use when the user clicks a trigger and a list appears.
- **Collapsible** (Radix Collapsible): for **inline expand/collapse** of content (e.g. accordion, show-more). The design system may expose or wrap this; prefer the design system’s pattern if present.

### Tooltips in collapsed mode

- When the layout is collapsed (e.g. narrow sidebar), use **Tooltip** to describe icon-only controls. Wrap the trigger (e.g. NavButton or icon) with `<Tooltip content="Label">...</Tooltip>` so labels appear on hover/focus.

### JSON-driven navigation

- **SideMenu** and **NavButton** support tree-shaped or list-shaped config (e.g. `SideMenuNode`, sections, links, groups). Prefer passing data-driven structures rather than hand-writing repeated JSX for each item.

---

## 7. Component Patterns

### Compound components

- **Dialog:** `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`.
- **Dropdown:** `Dropdown`, `DropdownTrigger`, `DropdownContent`, `DropdownItem`, `DropdownSeparator`, `DropdownLabel`, `DropdownCheckboxItem`, `DropdownRadioGroup`, `DropdownRadioItem`, `DropdownSub`, `DropdownSubTrigger`, `DropdownSubContent`.
- **Tabs:** `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`.

Use the compound set together; do not mix with raw Radix primitives unless the design system explicitly composes them.

### asChild

- Many components support **asChild**. When `asChild={true}`, the component renders its child with merged props (via Radix Slot) instead of the default DOM element. Use this to compose with your own elements (e.g. `Button asChild><Link href="...">...</Link></Button>`).
- Preserve ref and event forwarding when using `asChild`.

### Accessibility

- Components built on Radix inherit focus management, ARIA attributes, and keyboard behavior. Do not strip `aria-*` or `role` or override focus behavior in a way that breaks a11y.
- Use semantic HTML (e.g. `DialogTitle`, `DialogDescription`) so the right roles and labels are applied.

### forwardRef

- Components that render DOM elements expose refs via `forwardRef`. Pass refs when integrating with parent layout or focus management.

---

## 8. Example Components (representative, not exhaustive)

**These are examples. The design system contains many more components.** Always discover via subpaths, main entry, and Storybook rather than limiting to this list.

### Button (subpath: `kz-design-system/button`)

```tsx
import { Button } from "kz-design-system/button";
import { ButtonVariant, ButtonSize } from "kz-design-system";

<Button variant={ButtonVariant.Primary} size={ButtonSize.Md} onClick={...}>
  Label
</Button>
```

### Typography (main entry)

```tsx
import {
  Typography,
  TypographyVariantEnum,
  TypographyAlignEnum,
  TypographyToneEnum,
  TypographyWeightEnum,
} from "kz-design-system";

<Typography variant={TypographyVariantEnum.H1} align={TypographyAlignEnum.Center}>
  Heading
</Typography>
<Typography variant={TypographyVariantEnum.Body} tone={TypographyToneEnum.Secondary}>
  Body text
</Typography>
<Typography variant={TypographyVariantEnum.Link} href="#section">
  Link
</Typography>
```

### TextInput (main entry)

```tsx
import {
  TextInput,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

<TextInput
  value={value}
  placeHolder="Enter value"
  onValueChange={setValue}
  variant={TextInputVariant.Default}
  size={TextInputSize.Md}
  state={TextInputState.Default}
  label="Label"
  helperText="Optional helper"
  clearable
  showCount
  maxLength={100}
/>;
```

### Dialog (subpath: `kz-design-system/dialog`)

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "kz-design-system/dialog";

<Dialog>
  <DialogTrigger asChild><Button ...>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* body */}
    <DialogFooter>
      <DialogClose asChild><Button ...>Close</Button></DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Dropdown (subpath: `kz-design-system/dropdown`)

**Compound usage:**

```tsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTriggerVariant,
} from "kz-design-system/dropdown";

<Dropdown>
  <DropdownTrigger variant={DropdownTriggerVariant.Default}>Actions</DropdownTrigger>
  <DropdownContent align="end">
    <DropdownItem onSelect={...}>Edit</DropdownItem>
    <DropdownSeparator />
    <DropdownItem onSelect={...}>Delete</DropdownItem>
  </DropdownContent>
</Dropdown>
```

**DropdownButton (declarative menu from config):**

```tsx
import {
  DropdownButton,
  DropdownTriggerVariant,
  type DropdownButtonItem,
  type DropdownButtonTrigger,
} from "kz-design-system/dropdown";

const items: DropdownButtonItem[] = [
  { type: "label", key: "l1", label: "Actions" },
  { type: "separator", key: "s1" },
  { key: "new", label: "New file", onSelect: () => {} },
  {
    type: "submenu",
    key: "more",
    label: "More options",
    items: [
      { key: "subA", label: "Sub option A", onSelect: () => {} },
      { key: "subB", label: "Sub option B", onSelect: () => {} },
    ],
  },
];

<DropdownButton
  trigger={{
    label: "Actions",
    variant: DropdownTriggerVariant.Ghost,
    showChevron: true,
    iconOnly: false,
    ariaLabel: "Actions",
    className: undefined,
    icon: undefined,
  }}
  items={items}
  align="start"
  side="bottom"
  sideOffset={6}
  disabled={false}
  contentClassName={undefined}
/>;
```

### Tooltip (main entry)

```tsx
import { Tooltip } from "kz-design-system";
import { TooltipPosition, TooltipAlign } from "kz-design-system";

<Tooltip
  content="Hint text"
  position={TooltipPosition.Top}
  align={TooltipAlign.Center}
>
  <button>Hover me</button>
</Tooltip>;
```

### Table (main entry)

```tsx
import {
  Table,
  Button,
  ButtonVariant,
  ButtonSize,
  type TableColumn,
} from "kz-design-system";
import {
  DropdownButton,
  type DropdownButtonItem,
} from "kz-design-system/dropdown";

type Row = { id: string; name: string; role: string };
const data: Row[] = [
  { id: "1", name: "Alice", role: "Admin" },
  { id: "2", name: "Bob", role: "Editor" },
];

const columns: TableColumn<Row>[] = [
  { key: "name", header: "Name", accessor: (row) => row.name, sortable: true },
  { key: "role", header: "Role", accessor: (row) => row.role, sortable: true },
];

const rowActions: DropdownButtonItem[] = [
  { key: "edit", label: "Edit", onSelect: () => {} },
  { key: "delete", label: "Delete", onSelect: () => {} },
];

<Table
  data={data}
  columns={columns}
  getRowId={(row) => row.id}
  size="md"
  stickyHeader
  caption="Users"
  title="Users"
  description="Manage users"
  searchable
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  searchPlaceholder="Search…"
  headerRight={
    <Button
      variant={ButtonVariant.Primary}
      size={ButtonSize.Sm}
      onClick={() => {}}
    >
      Add user
    </Button>
  }
  selectableRows
  selectedRowIds={selectedRowIds}
  onRowSelectionChange={setSelectedRowIds}
  actions={() => (
    <DropdownButton
      trigger={{ iconOnly: true, ariaLabel: "Actions" }}
      items={rowActions}
    />
  )}
  actionsHeader="Actions"
  sort={sort}
  onSortChange={setSort}
  pagination={{ page: 1, pageSize: 10, total: data.length }}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  pageSizeOptions={[5, 10, 20]}
  loading={false}
  emptyState={<span>No rows</span>}
/>;
```

### SideMenu (subpath: `kz-design-system/sidemenu` or main entry)

```tsx
import { SideMenu, type SideMenuNode } from "kz-design-system";
import { IconName } from "kz-design-system/icon";

const data: SideMenuNode[] = [
  {
    type: "section",
    id: "monitor",
    label: "MONITOR",
    items: [
      { type: "link", id: "dashboard", label: "Dashboard", icon: IconName.BarChart2, href: "#dashboard" },
      {
        type: "group",
        id: "analytics",
        label: "Analytics",
        icon: IconName.BarChart2,
        items: [
          { id: "overview", label: "Overview", href: "#overview", subItems: [{ id: "s1", label: "Sub 1", href: "#s1" }] },
          { id: "trends", label: "Trends", href: "#trends" },
        ],
      },
    ],
  },
];

<SideMenu
  data={data}
  selectedId={selectedId}
  onNavigate={(p) => setSelectedId(p.id)}
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  collapsible
  expandedWidth={280}
  collapsedWidth={72}
  showTooltipsWhenCollapsed
  flyoutSide="right"
  flyoutOffset={8}
  closeFlyoutOnSelect
  header={...}
  footer={...}
/>
```

---

## 9. Component Props and Enums

Use **enums** from `kz-design-system` (or the relevant subpath) for variant/size/position props. Do not hardcode string literals when an enum exists.

### Enums (from `constants/enum.ts`; export from main or subpaths)

| Enum                       | Values                                                                                       | Use                                      |
| -------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **KezelVariant**           | `Standard`, `Neumorphic`                                                                     | Theme provider                           |
| **KezelMode**              | `Light`, `Dark`                                                                              | Theme provider                           |
| **OverrideMode**           | `Safe`, `Strict`                                                                             | Theme provider token validation          |
| **ButtonVariant**          | `Primary`, `Secondary`, `Outline`, `Ghost`, `Success`, `Warning`, `Error`                    | Button                                   |
| **ButtonSize**             | `Sm`, `Md`, `Lg`                                                                             | Button                                   |
| **ButtonType**             | `Button`, `Submit`, `Reset`                                                                  | Button                                   |
| **ButtonAspectRatio**      | `Auto`, `Square`                                                                             | Button                                   |
| **DropdownTriggerVariant** | `Default`, `Ghost`                                                                           | DropdownTrigger / DropdownButton trigger |
| **TypographyVariant**      | `H1`, `H2`, `H3`, `Body`, `Small`, `Caption`, `Label`, `Link`, `Error`, `Success`, `Warning` | Typography                               |
| **TypographyTone**         | `Primary`, `Secondary`, `Muted`, `Disabled`, `Inverse`, `Link`                               | Typography                               |
| **TypographyAlign**        | `Left`, `Center`, `Right`                                                                    | Typography                               |
| **TypographyWeight**       | `Regular`, `Medium`, `Semibold`, `Bold`                                                      | Typography                               |
| **TextInputVariant**       | `Default`, `Container`, `Ghost`                                                              | TextInput                                |
| **TextInputSize**          | `Sm`, `Md`, `Lg`                                                                             | TextInput                                |
| **TextInputState**         | `Default`, `Error`, `Success`, `Warning`                                                     | TextInput                                |
| **TooltipSize**            | `Sm`, `Md`, `Lg`                                                                             | Tooltip                                  |
| **TooltipPosition**        | `Top`, `Right`, `Bottom`, `Left`                                                             | Tooltip                                  |
| **TooltipAlign**           | `Start`, `Center`, `End`                                                                     | Tooltip                                  |
| **TooltipColor**           | `Default`, `Inverse`, `Success`, `Warning`, `Error`                                          | Tooltip                                  |
| **ToggleButtonVariant**    | `Default`, `Primary`, `Container`                                                            | ToggleButton                             |
| **ToggleButtonSize**       | `Sm`, `Md`, `Lg`                                                                             | ToggleButton                             |
| **CheckboxSize**           | `Sm`, `Md`, `Lg`                                                                             | Checkbox                                 |
| **CheckboxVariant**        | `Default`, `Container`                                                                       | Checkbox                                 |
| **RadioSize**              | `Sm`, `Md`, `Lg`                                                                             | RadioButton                              |

### Component props (full reference from source)

#### Button (`kz-design-system/button`)

- **variant** (required): `ButtonVariant` — Primary, Secondary, Outline, Ghost, Success, Warning, Error.
- **size** (required): `ButtonSize` — Sm, Md, Lg.
- **children**: ReactNode.
- **onClick?**: MouseEventHandler.
- **asChild?**: boolean (default false). Use Slot to merge props onto child.
- **type?**: `ButtonType` — Button, Submit, Reset (default Button).
- **loading?**: boolean (default false). Shows spinner.
- **aspectRatio?**: `ButtonAspectRatio` — Auto, Square (default Auto).
- **disabled?**: boolean.
- **className?**: string.
- Plus standard button HTML attributes (except `children`/`onClick` omitted from type).

#### Typography (main entry)

- **children**: ReactNode.
- **variant** (required): `TypographyVariant` (TypographyVariantEnum) — H1, H2, H3, Body, Small, Caption, Label, Link, Error, Success, Warning.
- **href?**: string. When set, renders as `<a>`.
- **tone?**: `TypographyTone` — Primary, Secondary, Muted, Disabled, Inverse, Link.
- **as?**: `TypographyAsElement` — "p" | "span" | "h1"–"h6" | "div" | "a" | "label" | "figcaption". Default per variant (e.g. H1→h1, Body→p).
- **align?**: `TypographyAlign` — Left, Center, Right.
- **truncate?**: boolean. Single-line truncate.
- **lines?**: number. Line clamp (positive integer).
- **weight?**: `TypographyWeight` — Regular, Medium, Semibold, Bold.
- **className?**: string.
- Plus standard HTML attributes for the rendered element (except `color` omitted).

Exports: `typographyVariants`, `getTypographyClass`, `getDefaultElement`, `TypographyVariantEnum`, `TypographyToneEnum`, `TypographyAlignEnum`, `TypographyWeightEnum`.

#### TextInput (main entry)

- **value** (required): string.
- **placeHolder** (required): string.
- **onValueChange** (required): (value: string) => void.
- **size?**: `TextInputSize` — Sm, Md, Lg (default Md).
- **variant?**: `TextInputVariant` — Default, Container, Ghost (default Default).
- **state?**: `TextInputState` — Default, Error, Success, Warning (default Default).
- **label?**: string.
- **helperText?**: string.
- **description?**: string.
- **errorText?**, **successText?**, **warningText?**: string (shown when state matches).
- **startAdornment?**, **endAdornment?**: ReactNode.
- **loading?**: boolean (default false).
- **clearable?**: boolean (default false).
- **showCount?**: boolean (default false). Requires **maxLength**.
- **maxLength?**: number.
- **containerClassName?**, **inputClassName?**: string.
- **showStateIcon?**: boolean (default true). Shows state icon when state is Error/Success/Warning.
- Plus standard input HTML attributes (except `size` omitted from type).

#### ToggleButton (main entry)

- **variant?**: `ToggleButtonVariant` — Default, Primary, Container (default Default).
- **size?**: `ToggleButtonSize` — Sm, Md, Lg (default Md).
- **fullWidth?**: boolean (default false).
- **pressed?**: boolean (controlled).
- **defaultPressed?**: boolean (default false, uncontrolled).
- **onPressedChange?**: (pressed: boolean) => void.
- **asChild?**: boolean (default false).
- **loading?**: boolean (default false).
- **children?**: ReactNode (label next to switch).
- **className?**: string.
- Plus standard button HTML attributes (except `onChange` omitted).

#### RadioButton (main entry)

- **value** (required): string.
- **checked?**: boolean (controlled).
- **defaultChecked?**: boolean (uncontrolled).
- **onChange?**: ChangeEventHandler.
- **size?**: `RadioSize` — Sm, Md, Lg (default Md).
- **name?**: string (for grouping).
- **disabled?**: boolean.
- **children?**: ReactNode (label).
- **className?**: string.
- Plus standard input attributes (except `size`, `type`, `onChange` omitted).

#### Checkbox (main entry)

- **checked?**: boolean (controlled).
- **defaultChecked?**: boolean (default false, uncontrolled).
- **onCheckedChange?**: (checked: boolean) => void.
- **onChange?**: ChangeEventHandler.
- **size?**: `CheckboxSize` — Sm, Md, Lg (default Md).
- **variant?**: `CheckboxVariant` — Default, Container (default Default).
- **indeterminate?**: boolean (default false).
- **disabled?**: boolean.
- **children?**: ReactNode (label).
- **className?**: string.
- Plus standard input attributes (except `size`, `type`, `onChange` omitted).

#### Dialog (subpath `kz-design-system/dialog`)

Compound: **Dialog** (Root), **DialogTrigger** (asChild supported), **DialogContent**, **DialogHeader**, **DialogFooter**, **DialogTitle**, **DialogDescription**, **DialogClose** (asChild supported). Content/overlay parts accept **className** and Radix props.

#### Dropdown / DropdownButton (subpath `kz-design-system/dropdown`)

- **DropdownTrigger:** `variant?` (DropdownTriggerVariant), `showChevron?` (default true), `asChild?`, `disabled?`, `className?`, children.
- **DropdownContent:** `align?` ("start"|"center"|"end"), `side?`, `sideOffset?`, `alignOffset?`, `avoidCollisions?`, `className?`.
- **DropdownButton** (convenience): **trigger:** `DropdownButtonTrigger` — label?, icon?, variant?, showChevron?, className?, iconOnly?, ariaLabel?. **items:** `DropdownButtonItem[]`. **align?**, **side?**, **sideOffset?**, **disabled?**, **contentClassName?**.
- **DropdownButtonItem:** Item: `key`, `label`, `onSelect?`, `disabled?`, `icon?`, `shortcut?`. Label: `type: "label"`, `key`, `label`. Separator: `type: "separator"`, `key`. Submenu: `type: "submenu"`, `key`, `label`, `items`, `disabled?`, `icon?`.

#### Tooltip (main entry)

- **content** (required): ReactNode.
- **children** (required): trigger element(s).
- **size?**: `TooltipSize` — Sm, Md, Lg (default Md).
- **position?**: `TooltipPosition` — Top, Right, Bottom, Left (default Top).
- **align?**: `TooltipAlign` — Start, Center, End (default Center).
- **color?**: `TooltipColor` — Default, Inverse, Success, Warning, Error (default Default).
- **icon?**: ReactNode (shown before content).
- **delayDuration?**: number (default 300 ms).
- **skipDelayDuration?**: number (default 0).
- **className?**: string.

#### Tabs (main entry)

- **Tabs:** Extends Radix Tabs.Root. **variant?**: "pill" | "underline" | "vertical" (default "pill"). **size?**: "sm" | "md" | "lg" (default "md"). **fullWidth?**: boolean (default false). **className?**. Plus value, onValueChange, orientation, etc.
- **TabsList:** **className?**. Inherits variant/size/fullWidth from context.
- **TabsTrigger:** value (required), **className?**. Inherits context.
- **TabsContent:** value (required), **className?**. Inherits context.

#### Table (main entry)

- **data** (required): TData[].
- **columns** (required): `TableColumn<TData>[]` — key, header, accessor?, cell?, width?, minWidth?, maxWidth?, align?, sortable?.
- **getRowId** (required): (row, index) => string.
- **size?**: `TableSize` — "sm" | "md" | "lg".
- **stickyHeader?**: boolean.
- **getRowSticky?**: (row, index) => boolean.
- **caption?**, **header?**, **title?**, **description?**: ReactNode.
- **searchable?**, **searchValue?**, **onSearchChange?**, **searchPlaceholder?**, **headerRight?**: search and header.
- **selectableRows?**, **selectedRowIds?**, **onRowSelectionChange?**, **onToggleRow?**, **onToggleAll?**: selection.
- **actions?** (row => ReactNode), **actionsHeader?**: row actions.
- **sort?**, **onSortChange?**: sorting.
- **pagination?**, **onPageChange?**, **onPageSizeChange?**, **pageSizeOptions?**: pagination.
- **loading?**, **emptyState?**, **className?**, **tableClassName?**, **headerClassName?**, **containerClassName?**.

#### NavButton (main entry)

- **icon** (required): ReactNode.
- **label** (required): string.
- **className?**: string.
- **type: "link"**: **selected?**, **href?**, **onClick?**, **target?**, **rel?**.
- **type: "dropdown"**: **menuOptions** (required): `NavButtonOption[]` — label, href?, onClick?, subMenu? (array of { label, href?, onClick? }). **selectedOptionLabel?**: string (highlights trigger when option/sub-option label matches).

#### SideMenu (subpath `kz-design-system/sidemenu` or main entry)

- **data** (required): `SideMenuNode[]` (see node types below).
- **selectedId?**: string (highlighted item).
- **onNavigate?**: (payload: `SideMenuNavigatePayload`) => void — payload: { id, href?, actionId? }.
- **collapsible?**: boolean. Enables collapse toggle.
- **collapsed?**: boolean (controlled).
- **defaultCollapsed?**: boolean (uncontrolled).
- **onCollapsedChange?**: (collapsed: boolean) => void.
- **expandedWidth?**: number | string.
- **collapsedWidth?**: number | string.
- **header?**, **footer?**: ReactNode.
- **headerWidth?**: number | string.
- **gap?**, **iconGap?**: number | string.
- **showTooltipsWhenCollapsed?**: boolean. Tooltips on icon-only items when collapsed.
- **flyoutSide?**: "right" | "left" (default "right"). Side for group flyout when collapsed.
- **flyoutOffset?**: number.
- **closeFlyoutOnSelect?**: boolean.
- **className?**: string.

**SideMenuNode types:**

- **Section:** `type: "section"`, `id`, `label?`, `items`: SideMenuNode[].
- **Link:** `type: "link"`, `id`, `label`, `icon?` (IconName | ReactNode), `href?`, `actionId?`, `external?`, `disabled?`.
- **Group:** `type: "group"`, `id`, `label`, `icon?`, `items`: `SideMenuGroupItem[]` — id, label, href?, actionId?, disabled?, subItems? (array of { id, label, href?, actionId?, disabled? }).

#### Tokens (main entry)

- **TOKEN_KEYS**: readonly array of `TokenKey` (all design token keys).
- **tokenToCssVar**: `Record<TokenKey, \`--kz-${string}\`>` — maps token key to CSS variable name.
- **TokenKey**: TypeScript type for valid keys. Use for type-safe overrides in `KezelThemeProvider` **tokens** prop.

---

## 10. Icon Registry and Usage

Icons are provided via a **registry** and the **Icon** component. Always use **IconName** for discoverability; do not pass raw strings.

### Imports

```tsx
import { Icon, IconName, iconRegistry, iconSize } from "kz-design-system/icon";
// or from "kz-design-system"
```

### Icon component props

- **name** (required): `IconName` — use `IconName.<Name>` (e.g. `IconName.ChevronDown`, `IconName.Loader2`).
- **size?**: `IconSizeKey` (\`"xs"`\|`"sm"`\|`"md"`\|`"lg"`\|`"xl"`) or number (px). Default `"md"`.
- **color?**: string (e.g. `"currentColor"`, `"var(--kz-color-icon-default)"`). Default uses `--kz-color-icon-default` or `currentColor`.
- **className?**: merged with internal classes.
- Other SVG attributes (e.g. `aria-hidden`) are forwarded.

### iconSize (preset px)

- `xs: 12`, `sm: 16`, `md: 24`, `lg: 32`, `xl: 40`.

### iconRegistry

- **Type:** `Record<IconName, LucideIcon>`.
- **Use:** For advanced cases (e.g. custom mapping or rendering). Prefer `<Icon name={IconName.X} />` in UI code.
- **Do not** mutate the registry; treat it as read-only.

### IconName enum (available icons)

- `Search`, `CircleAlert`, `CheckCircle`, `TriangleAlert`, `Loader2`, `ChevronDown`, `ChevronLeft`, `ChevronRight`, `BarChart2`, `Shield`, `ArrowLeft`, `ArrowUp`, `ArrowDown`, `ArrowUpDown`, `EllipsisVertical`.

### Usage examples

```tsx
// Basic
<Icon name={IconName.ChevronDown} size="sm" />

// With color and a11y
<Icon name={IconName.Loader2} size="md" color="currentColor" aria-hidden />

// In a button (icon-only)
<Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm} aspectRatio={ButtonAspectRatio.Square}>
  <Icon name={IconName.EllipsisVertical} size="sm" aria-hidden />
</Button>

// In DropdownButton trigger (icon + label)
<DropdownButton
  trigger={{
    label: "Actions",
    icon: <Icon name={IconName.BarChart2} size="sm" aria-hidden />,
  }}
  items={items}
/>
```

---

## 11. Using Existing Tokens

The design system exposes **token keys** and **CSS variable names** for use in app code, Tailwind theme, or one-off overrides.

### Exports

```tsx
import { TOKEN_KEYS, tokenToCssVar } from "kz-design-system";
import type { TokenKey } from "kz-design-system";
```

- **TOKEN_KEYS:** Read-only array of all token keys (e.g. `"color.brand.primary"`, `"component.button.radius"`). Use for type-safe override keys.
- **tokenToCssVar:** `Record<TokenKey, \`--kz-${string}\`>`. Maps each token key to its CSS variable name (e.g. `"color.brand.primary"`→`"--kz-color-brand-primary"`).
- **TokenKey:** TypeScript type for valid token keys.

### Override via KezelThemeProvider (recommended)

Pass a **tokens** object to `KezelThemeProvider`. Keys must be `TokenKey`; values are CSS-valid strings (colors, lengths, etc.):

```tsx
<KezelThemeProvider
  variant={KezelVariant.Standard}
  mode={KezelMode.Light}
  tokens={{
    "color.brand.primary": "#18AB9F",
    "component.button.radius": "8px",
    "component.dropdown.trigger.bg": "#fef3c7",
    "component.dropdown.trigger.text": "#92400e",
  }}
>
  {children}
</KezelThemeProvider>
```

### Use tokens in custom CSS

Reference the CSS variable names (from `tokenToCssVar` or by convention `--kz-<dotted-key-to-kebab>`):

```css
.my-panel {
  background: var(--kz-color-surface-raised);
  border-radius: var(--kz-radius-md);
  padding: var(--kz-space-4);
}
```

### Use tokens in Tailwind

Extend `tailwind.config.js` so theme values point to design-system variables:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        "kz-brand": "var(--kz-color-brand-primary)",
        "kz-surface": "var(--kz-color-surface-base)",
      },
      borderRadius: {
        "kz-md": "var(--kz-radius-md)",
      },
      spacing: {
        "kz-4": "var(--kz-space-4)",
      },
    },
  },
};
```

Then use `bg-kz-brand`, `rounded-kz-md`, etc. Alternatively, use arbitrary values: `bg-[var(--kz-color-brand-primary)]`.

### Token key categories (representative)

- **Brand / surface / text / border / status:** `color.brand.primary`, `color.surface.background`, `color.text.primary`, `color.border.default`, `color.status.success`, etc.
- **Shadows:** `shadow.elevation.1`, `shadow.focus`, `shadow.neumorphic.light`, etc.
- **Radius / space:** `radius.sm`, `radius.md`, `space.1`–`space.24`.
- **Typography:** `font.family.base`, `font.size.sm`, `font.weight.medium`, etc.
- **Motion:** `motion.duration.fast`, `motion.easing.standard`.
- **Component-specific:** `component.button.primary.bg`, `component.dropdown.trigger.bg`, `component.input.bg`, `component.tooltip.bg`, etc. Use these to theme individual components via `KezelThemeProvider` without changing global semantics.

---

## 12. AI Decision Tree

Use these rules to choose components:

| Need                      | Use                                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Modal / overlay           | **Dialog**                                                                                                                       |
| Popover / floating panel  | **Dropdown** (or design system Popover if added)                                                                                 |
| Inline expand/collapse    | **Collapsible** (or design system equivalent)                                                                                    |
| Side navigation / sidebar | **SideMenu** (JSON-driven; collapsed flyouts). For custom rails use **NavButton** inside an `aside` (e.g. class `kz-sidesheet`). |
| Grouped actions / menu    | **Dropdown** or **DropdownButton**                                                                                               |
| Form fields               | **TextInput**, **Checkbox**, **RadioButton**, **ToggleButton** + **Typography** (labels)                                         |
| Primary action            | **Button**                                                                                                                       |
| Icon only                 | **Icon** + **IconName**; wrap with **Tooltip** if needed                                                                         |
| Tabs                      | **Tabs**, **TabsList**, **TabsTrigger**, **TabsContent**                                                                         |
| Data grid / table         | **Table**                                                                                                                        |
| Hover hint                | **Tooltip**                                                                                                                      |

---

## 13. Using KezelThemeProvider

The design system requires **KezelThemeProvider** so that theme (variant and mode) and optional token overrides are applied. Import from the **theme** subpath (or main entry).

### Basic usage

```tsx
import "kz-design-system/styles.css";
import {
  KezelThemeProvider,
  KezelVariant,
  KezelMode,
} from "kz-design-system/theme";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <KezelThemeProvider
          variant={KezelVariant.Standard}
          mode={KezelMode.Light}
        >
          {children}
        </KezelThemeProvider>
      </body>
    </html>
  );
}
```

- **variant:** `KezelVariant.Standard` (flat) or `KezelVariant.Neumorphic` (soft shadows).
- **mode:** `KezelMode.Light` or `KezelMode.Dark`. The provider sets `data-mode` and `class="dark"` on the document root for dark mode.

### Optional token overrides

Pass **tokens** to override design tokens (e.g. brand color, button radius). Keys must match the design system token keys (e.g. `color.brand.primary`, `component.button.radius`).

```tsx
<KezelThemeProvider
  variant={KezelVariant.Standard}
  mode={KezelMode.Dark}
  tokens={{
    "color.brand.primary": "#18AB9F",
    "component.button.radius": "8px",
  }}
>
  {children}
</KezelThemeProvider>
```

### Validation mode (optional)

- **validation:** `OverrideMode.Safe` (default) or `OverrideMode.Strict`. Safe: invalid token values are skipped. Strict: invalid token value throws at runtime.
- Import `OverrideMode` from `kz-design-system/theme` when setting `validation={OverrideMode.Strict}`.

```tsx
import { KezelThemeProvider, KezelVariant, KezelMode, OverrideMode } from "kz-design-system/theme";

<KezelThemeProvider
  variant={KezelVariant.Standard}
  mode={KezelMode.Light}
  tokens={{ ... }}
  validation={OverrideMode.Strict}
>
  {children}
</KezelThemeProvider>
```

### Runtime theme switching

You can change **variant** and **mode** at runtime (e.g. from state or user preference). Update the props passed to `KezelThemeProvider`; the provider applies changes in a layout effect.

---

## 14. Anti-patterns

- **Do not reimplement** components that the design system already provides (e.g. custom modal instead of Dialog, custom menu instead of Dropdown).
- **Do not override Radix positioning** in ad-hoc ways (e.g. breaking `DropdownContent` or `DialogContent` positioning). Use the component’s `align`, `side`, `sideOffset`-style props when available.
- **Do not hardcode SVG colors** for icons; use `currentColor` or design-system icon props so they respect theme and tokens.
- **Do not bypass tokens** by inlining colors, shadows, or radii that the design system defines as tokens.
- **Do not import** from `dist` or internal paths; use only public exports and subpaths documented in the package.

---

## 15. AI Output Checklist

When generating code that uses Kezel-design-system, ensure:

- [ ] **Imports:** Use subpath imports (`kz-design-system/button`, `kz-design-system/dialog`, `kz-design-system/dropdown`, `kz-design-system/icon`, `kz-design-system/theme`, `kz-design-system/sidemenu`) where applicable; main entry for other components.
- [ ] **CSS:** App root imports `kz-design-system/styles.css` once.
- [ ] **Theme:** App (or relevant tree) is wrapped in `KezelThemeProvider` with `variant` and `mode` (and optional `tokens` / `validation`).
- [ ] **Existing components:** Used design system components instead of custom UI where one exists.
- [ ] **Accessibility:** No removal or overriding of ARIA, focus, or keyboard behavior.
- [ ] **Layout:** Layout is scalable (e.g. uses tokens or Tailwind tied to tokens; avoids magic numbers).
- [ ] **Side effects:** No unnecessary side effects; components are composed declaratively.
- [ ] **Tree-shakeable:** Prefer subpath imports so unused components are not pulled in.
- [ ] **JSON-driven config:** For navigation or lists, prefer data-driven patterns (e.g. SideMenu, NavButton) when the design system supports them.

---

_End of KEZEL_AI_GUIDE.md_
