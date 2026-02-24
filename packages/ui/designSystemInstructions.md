# kz-design-system — Setup & Component Guide

This file is the single source of truth for **how to set up** and **how to use** each component in the design system. Use it when implementing features that depend on `kz-design-system` (e.g. AI assistants, onboarding, or docs).

---

## 1. Setup (required in every app)

### Install

```bash
npm install kz-design-system
# or: pnpm add kz-design-system   or: yarn add kz-design-system
```

**Peer dependencies:** `react` and `react-dom` (^18.0.0 or ^19.0.0). Install them if missing.

### Import styles once

Import the design system CSS in your app root (e.g. `_app.tsx`, `layout.tsx`, or `main.tsx`):

```tsx
import "kz-design-system/styles.css";
```

### Wrap the app with KezelThemeProvider

All components rely on theme context. Wrap your app (or the subtree that uses the design system) with `KezelThemeProvider`:

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

Optional **token overrides** (e.g. brand color, radii):

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

---

## 2. Import pattern

Prefer importing from the main package:

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
  Dialog,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Typography,
  TextInput,
  Checkbox,
  RadioButton,
  Tooltip,
  SideMenu,
  Sidesheet,
  NavButton,
} from "kz-design-system";
```

Subpath imports are also valid (e.g. for tree-shaking): `kz-design-system/button`, `kz-design-system/dropdown`, `kz-design-system/icon`, `kz-design-system/dialog`, `kz-design-system/theme`, `kz-design-system/sidemenu`.

---

## 3. Components reference

### Button

- **Import:** `Button`, `ButtonVariant`, `ButtonSize`, `ButtonType`, `ButtonAspectRatio` from `kz-design-system`.
- **Required props:** `variant`, `size`, `children`.
- **Optional:** `type` (button | submit | reset), `onClick`, `disabled`, `loading`, `aspectRatio` (e.g. `ButtonAspectRatio.Square` for icon-only), `asChild`, `className`.
- **Variants:** `ButtonVariant.Primary`, `Secondary`, `Outline`, `Ghost`, `Success`, `Warning`, `Error`.
- **Sizes:** `ButtonSize.Sm`, `Md`, `Lg`.

```tsx
<Button variant={ButtonVariant.Primary} size={ButtonSize.Md} onClick={() => {}}>
  Save
</Button>
<Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm} aspectRatio={ButtonAspectRatio.Square} aria-label="Menu">
  <Icon name={IconName.EllipsisVertical} size="sm" />
</Button>
```

---

### ToggleButton

- **Import:** `ToggleButton`, `ToggleButtonVariant`, `ToggleButtonSize` from `kz-design-system`.
- **Use for:** Single or group of toggle options (pressed state).
- **Props:** `variant`, `size`, `pressed`, `onPressedChange`, `children`, `disabled`, `className`.
- **Variants:** `ToggleButtonVariant.Default`, `Primary`, `Container`. **Sizes:** `Sm`, `Md`, `Lg`.

```tsx
<ToggleButton variant={ToggleButtonVariant.Default} size={ToggleButtonSize.Md} pressed={isBold} onPressedChange={setIsBold}>
  Bold
</ToggleButton>
```

---

### Checkbox

- **Import:** `Checkbox`, `CheckboxSize`, `CheckboxVariant` from `kz-design-system`.
- **Props:** `checked`, `onCheckedChange`, `size` (Sm | Md | Lg), `variant` (default | container), `disabled`, `indeterminate`, `className`.
- **Variant:** `CheckboxVariant.Default`, `Container`.

```tsx
<Checkbox checked={checked} onCheckedChange={setChecked} size={CheckboxSize.Md} />
```

---

### RadioButton

- **Import:** `RadioButton`, `RadioSize` from `kz-design-system`.
- **Props:** `name`, `value`, `checked`, `onChange`, `size` (Sm | Md | Lg), `disabled`, `children`, `className`.

```tsx
<RadioButton name="choice" value="a" checked={value === "a"} onChange={() => setValue("a")} size={RadioSize.Md}>
  Option A
</RadioButton>
```

---

### Typography

- **Import:** `Typography`, `TypographyVariantEnum`, `TypographyToneEnum`, `TypographyAlignEnum`, `TypographyWeightEnum` from `kz-design-system`.
- **Required:** `variant`, `children`.
- **Optional:** `as` (p | span | h1–h6 | div | a | label | figcaption), `tone`, `align`, `weight`, `truncate`, `lines`, `href` (when `as="a"`), `className`.
- **Variants:** `TypographyVariantEnum.H1`, `H2`, `H3`, `Body`, `Small`, `Caption`, `Label`, `Link`, `Error`, `Success`, `Warning`.
- **Tones:** `TypographyToneEnum.Primary`, `Secondary`, `Muted`, `Disabled`, `Inverse`, `Link`.

```tsx
<Typography variant={TypographyVariantEnum.H1}>Page title</Typography>
<Typography variant={TypographyVariantEnum.Body} tone={TypographyToneEnum.Secondary}>
  Description text
</Typography>
<Typography variant={TypographyVariantEnum.Link} as="a" href="/docs">Docs</Typography>
```

---

### TextInput

- **Import:** `TextInput`, `TextInputVariant`, `TextInputSize`, `TextInputState` from `kz-design-system`.
- **Required:** `value`, `placeHolder`, `onValueChange`.
- **Optional:** `size` (Sm | Md | Lg), `variant` (default | container | ghost), `label`, `helperText`, `description`, `state` (default | error | success | warning), `errorText`, `successText`, `warningText`, `startAdornment`, `endAdornment`, `loading`, `clearable`, `showCount`, `maxLength`, `showStateIcon`, `disabled`, `containerClassName`, `inputClassName`.
- **Note:** Prop is `placeHolder` (capital H), not `placeholder`.

```tsx
<TextInput
  value={query}
  placeHolder="Search…"
  onValueChange={setQuery}
  size={TextInputSize.Md}
  label="Search"
  state={TextInputState.Error}
  errorText="Invalid input"
/>
```

---

### Icon

- **Import:** `Icon`, `IconName`, `iconSize`, `size` (re-export of iconSize) from `kz-design-system`.
- **Props:** `name` (IconName.*), `size` ("xs" | "sm" | "md" | "lg" | "xl"), `color`, `className`, `aria-hidden`.
- **Available names:** `IconName.Search`, `CircleAlert`, `CheckCircle`, `TriangleAlert`, `Loader2`, `ChevronDown`, `ChevronLeft`, `ChevronRight`, `BarChart2`, `Shield`, `ArrowLeft`, `ArrowUp`, `ArrowDown`, `ArrowUpDown`, `EllipsisVertical`.

```tsx
<Icon name={IconName.ChevronDown} size="sm" color="currentColor" aria-hidden />
<Icon name={IconName.Loader2} size="md" className="animate-spin" />
```

---

### DropdownButton

- **Import:** `DropdownButton`, type `DropdownButtonItem`, `DropdownButtonTrigger` from `kz-design-system`.
- **Props:** `trigger` (object with `label`, `icon`, `variant`, `showChevron`, `iconOnly`, `ariaLabel`, `className`), `items` (array of items), `align` (start | center | end), `side` (top | right | bottom | left), `sideOffset`, `disabled`, `contentClassName`.
- **Trigger with text:** `trigger={{ label: "Actions", variant: "default" }}`.
- **Icon-only (e.g. row actions):** `trigger={{ iconOnly: true, ariaLabel: "Row actions" }}`.
- **Items:** Each item is either:
  - **Item:** `{ key, label, onSelect?, disabled?, icon?, shortcut? }`
  - **Label:** `{ type: "label", key, label }`
  - **Separator:** `{ type: "separator", key }`
  - **Submenu:** `{ type: "submenu", key, label, items: DropdownButtonItem[], disabled?, icon? }`

```tsx
<DropdownButton
  trigger={{ label: "Options", variant: "default" }}
  items={[
    { key: "edit", label: "Edit", onSelect: () => {} },
    { key: "delete", label: "Delete", onSelect: () => {}, disabled: true },
    { type: "separator", key: "sep" },
    { type: "label", key: "more", label: "More" },
    { type: "submenu", key: "export", label: "Export", items: [
      { key: "csv", label: "CSV", onSelect: () => {} },
    ]},
  ]}
  align="end"
  side="bottom"
/>
```

---

### Dropdown (primitives)

- **Import:** `Dropdown`, `DropdownTrigger`, `DropdownContent`, `DropdownItem`, `DropdownSeparator`, `DropdownLabel`, `DropdownSub`, `DropdownSubTrigger`, `DropdownSubContent`, etc. from `kz-design-system`.
- **Use when:** You need full control over structure. Otherwise prefer `DropdownButton`.
- **Pattern:** `<Dropdown><DropdownTrigger>…</DropdownTrigger><DropdownContent>…</DropdownContent></Dropdown>`.

---

### Dialog

- **Import:** `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose` from `kz-design-system`.
- **Pattern:** Wrap content in `Dialog`, use `DialogTrigger` to open, `DialogContent` for the modal panel; put title/description/actions inside `DialogHeader` / `DialogFooter`.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant={ButtonVariant.Primary} size={ButtonSize.Md}>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description text.</DialogDescription>
    </DialogHeader>
    <p>Body content</p>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>Cancel</Button>
      </DialogClose>
      <Button variant={ButtonVariant.Primary} size={ButtonSize.Sm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### Table

- **Import:** `Table`, types `TableProps`, `TableColumn`, `TableSortState`, `TablePaginationState`, `TableSize` from `kz-design-system`.
- **Required:** `data` (array), `columns` (array of column configs), `getRowId(row, index) => string`.
- **Columns:** Each column: `{ key, header, accessor?: (row) => ReactNode, cell?: (row) => ReactNode, sortable?: boolean, width?, minWidth?, maxWidth?, align? }`.
- **Optional:** `size` (sm | md | lg), `stickyHeader`, `getRowSticky(row, index) => boolean`, `title`, `description`, `caption`, `headerRight`, `searchable`, `searchValue`, `onSearchChange`, `searchPlaceholder`, `selectableRows`, `selectedRowIds`, `onRowSelectionChange`, `actions`, `actionsHeader`, `sort`, `onSortChange`, `pagination`, `onPageChange`, `onPageSizeChange`, `pageSizeOptions`, `loading`, `emptyState`, `className`, `tableClassName`, `headerClassName`, `containerClassName`.
- **Pagination:** Pass `pagination={{ page, pageSize, total }}`, `onPageChange`, `onPageSizeChange`, `pageSizeOptions` (e.g. `[5, 10, 20]`).
- **Actions column:** Pass `actions={(row) => <DropdownButton trigger={{ iconOnly: true, ariaLabel: "Actions" }} items={…} />}` and `actionsHeader="Actions"`.

```tsx
type Row = { id: string; name: string; role: string };
const columns: TableColumn<Row>[] = [
  { key: "name", header: "Name", accessor: (r) => r.name, sortable: true },
  { key: "role", header: "Role", accessor: (r) => r.role, sortable: true },
];
<Table<Row>
  data={rows}
  columns={columns}
  getRowId={(r) => r.id}
  size="md"
  stickyHeader
  title="Users"
  searchable
  searchValue={search}
  onSearchChange={setSearch}
  selectableRows
  selectedRowIds={selectedIds}
  onRowSelectionChange={setSelectedIds}
  sort={sort}
  onSortChange={setSort}
  pagination={{ page: 1, pageSize: 10, total: 100 }}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  pageSizeOptions={[10, 20, 50]}
  actions={(row) => <DropdownButton trigger={{ iconOnly: true, ariaLabel: "Actions" }} items={[...]} />}
  actionsHeader="Actions"
/>
```

---

### Tabs

- **Import:** `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` from `kz-design-system`.
- **Props (Tabs):** `variant` (pill | underline | vertical), `size` (sm | md | lg), `fullWidth`, `value`, `onValueChange`, `className`.
- **TabsTrigger:** optional `icon`, `value`, `children`. **TabsContent:** `value`, `children`, `className`.

```tsx
<Tabs variant="pill" size="md" value={tab} onValueChange={setTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>
```

---

### Tooltip

- **Import:** `Tooltip`, `TooltipSize`, `TooltipPosition`, `TooltipAlign`, `TooltipColor` from `kz-design-system`.
- **Props:** `content`, `size`, `position`, `align`, `color`, `children`, `className`.
- **Sizes:** Sm, Md, Lg. **Positions:** Top, Right, Bottom, Left. **Align:** Start, Center, End. **Colors:** Default, Inverse, Success, Warning, Error.

```tsx
<Tooltip content="Save changes" position={TooltipPosition.Top} size={TooltipSize.Sm}>
  <Button variant={ButtonVariant.Ghost} size={ButtonSize.Sm}>Save</Button>
</Tooltip>
```

---

### SideMenu

- **Import:** `SideMenu`, types `SideMenuProps`, `SideMenuNode`, `SideMenuSectionNode`, `SideMenuLinkNode`, `SideMenuGroupNode`, etc. from `kz-design-system`.
- **Use for:** JSON-driven sidebar (sections, links, collapsible groups, flyout when collapsed).
- **Props:** `nodes` (array of section/link/group nodes), `expanded`, `onExpandedChange`, `onNavigate`, `collapseButton`, `className`, etc. See types for full shape.

---

### Sidesheet

- **Import:** `Sidesheet`, `SidesheetProps` from `kz-design-system`.
- **Use for:** Side panel (e.g. nav list). **Props:** Extends `React.HTMLAttributes<HTMLDivElement>`; width and styles are tokenized.

---

### NavButton

- **Import:** `NavButton`, types `NavButtonProps`, `NavButtonLinkProps`, `NavButtonDropdownProps`, `NavButtonOption` from `kz-design-system`.
- **Use for:** Sidesheet nav items — either a link (with optional selected state) or a dropdown trigger with options/submenus.
- **Props:** Depends on type (link vs dropdown). Supports `selectedOptionLabel`, icon, label, hover styles.

---

## 4. Tokens (optional)

- **Import:** `TOKEN_KEYS`, `tokenToCssVar`, type `TokenKey` from `kz-design-system`.
- Override tokens via `KezelThemeProvider`’s `tokens` prop. Keys match the design token contract (e.g. `color.brand.primary`, `component.button.radius`). Use `TOKEN_KEYS` or package token docs for the full list.

---

## 5. Quick checklist for new apps

1. `npm install kz-design-system` (and ensure react/react-dom peer deps).
2. `import "kz-design-system/styles.css";` once at app root.
3. Wrap app (or route tree) with `<KezelThemeProvider variant={…} mode={…}>`.
4. Import components from `kz-design-system` and use as in the examples above.

For AI: when suggesting or generating UI that uses this design system, follow the setup in §1 and use the component patterns and prop names from §3. Prefer the main import path and the exact prop names (e.g. `placeHolder` for TextInput, `getRowId` for Table, `trigger`/`items` for DropdownButton).
