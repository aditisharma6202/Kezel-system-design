"use client";

import * as React from "react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  ButtonAspectRatio,
  ToggleButton,
  ToggleButtonVariant,
  ToggleButtonSize,
  Checkbox,
  CheckboxSize,
  CheckboxVariant,
  RadioButton,
  RadioSize,
  Typography,
  TypographyVariantEnum,
  TypographyAlignEnum,
  TextInput,
  TextInputVariant,
  TextInputSize,
  TextInputState,
  KezelThemeProvider,
  KezelVariant,
  KezelMode,
  NavButton,
  SideMenu,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  Icon,
  IconName,
  type TokenKey,
  type SideMenuNode,
} from "kz-design-system";
import {
  DropdownButton,
  DropdownTriggerVariant,
  type DropdownButtonItem,
} from "kz-design-system/dropdown";

type TableRow = { id: string; name: string; role: string; status: string };
const TABLE_DATA: TableRow[] = [
  { id: "1", name: "Alice", role: "Admin", status: "Active" },
  { id: "2", name: "Bob", role: "Editor", status: "Active" },
  { id: "3", name: "Carol", role: "Viewer", status: "Inactive" },
  { id: "4", name: "Dave", role: "Editor", status: "Active" },
  { id: "5", name: "Eve", role: "Admin", status: "Active" },
  { id: "6", name: "Frank", role: "Viewer", status: "Inactive" },
  { id: "7", name: "Grace", role: "Editor", status: "Active" },
  { id: "8", name: "Henry", role: "Viewer", status: "Active" },
];

export default function App() {
  const [mode, setMode] = React.useState<KezelMode>(KezelMode.Light);
  const [variant, setVariant] = React.useState<KezelVariant>(
    KezelVariant.Neumorphic
  );
  const [defaultValue, setDefaultValue] = React.useState("");
  const [ghostValue, setGhostValue] = React.useState("");
  const [errorValue, setErrorValue] = React.useState("invalid@");
  const [successValue, setSuccessValue] = React.useState("valid@email.com");
  const [clearableValue, setClearableValue] = React.useState("Clear me");
  const [countValue, setCountValue] = React.useState("");
  const [dropdownTokenOverrides, setDropdownTokenOverrides] = React.useState<
    Partial<Record<TokenKey, string>> | undefined
  >(undefined);
  const actionsDropdownItems: DropdownButtonItem[] = [
    { type: "label", key: "l1", label: "Actions" },
    { type: "separator", key: "s1" },
    { key: "new", label: "New file", onSelect: () => {} },
    { key: "copy", label: "Copy link", onSelect: () => {} },
    { key: "edit", label: "Edit", onSelect: () => {} },
    { type: "separator", key: "s2" },
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
  const [navSelected, setNavSelected] = React.useState<
    "analytics" | "security" | null
  >("analytics");
  const [sidemenuSelectedId, setSidemenuSelectedId] = React.useState<
    string | undefined
  >(undefined);
  const [sidemenuCollapsed, setSidemenuCollapsed] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState<string>("a");
  const [tableSearchValue, setTableSearchValue] = React.useState("");
  const [tableSelectedRowIds, setTableSelectedRowIds] = React.useState<
    Record<string, boolean>
  >({});
  const [tableSort, setTableSort] = React.useState<{
    key: string;
    direction: "asc" | "desc" | null;
  } | null>(null);
  const [tablePagination, setTablePagination] = React.useState({
    page: 1,
    pageSize: 5,
    total: 0,
  });

  const tableColumns = [
    {
      key: "name",
      header: "Name",
      accessor: (row: TableRow) => row.name,
      sortable: true,
    },
    {
      key: "role",
      header: "Role",
      accessor: (row: TableRow) => row.role,
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      accessor: (row: TableRow) => row.status,
    },
  ];
  const filteredTableData = React.useMemo(() => {
    if (!tableSearchValue.trim()) return TABLE_DATA;
    const q = tableSearchValue.toLowerCase();
    return TABLE_DATA.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
    );
  }, [tableSearchValue]);
  const paginatedTableData = React.useMemo(() => {
    const start = (tablePagination.page - 1) * tablePagination.pageSize;
    return filteredTableData.slice(start, start + tablePagination.pageSize);
  }, [filteredTableData, tablePagination.page, tablePagination.pageSize]);
  const tablePaginationState = React.useMemo(
    () => ({
      ...tablePagination,
      total: filteredTableData.length,
    }),
    [tablePagination, filteredTableData.length]
  );

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
    <KezelThemeProvider
      variant={variant}
      mode={mode}
      tokens={dropdownTokenOverrides}
    >
      <main className="min-h-screen flex flex-col items-center justify-center gap-12 p-8 transition-colors bg-[var(--kz-color-surface-background)]">
        <Typography
          variant={TypographyVariantEnum.H1}
          align={TypographyAlignEnum.Center}
        >
          Design system
        </Typography>

        {/* Typography showcase */}
        <section className="flex flex-col items-center gap-4 w-full max-w-xl">
          <Typography variant={TypographyVariantEnum.H2}>Typography</Typography>
          <div className="flex flex-col gap-2 w-full text-left">
            <Typography variant={TypographyVariantEnum.H1}>
              Heading 1
            </Typography>
            <Typography variant={TypographyVariantEnum.H2}>
              Heading 2
            </Typography>
            <Typography variant={TypographyVariantEnum.H3}>
              Heading 3
            </Typography>
            <Typography variant={TypographyVariantEnum.Body}>
              Body — The quick brown fox jumps over the lazy dog.
            </Typography>
            <Typography variant={TypographyVariantEnum.Small}>
              Small — 14px text for secondary content.
            </Typography>
            <Typography variant={TypographyVariantEnum.Caption}>
              Caption — Secondary/muted caption text.
            </Typography>
            <Typography variant={TypographyVariantEnum.Label}>
              Label — Form labels, 16px.
            </Typography>
            <Typography variant={TypographyVariantEnum.Link} href="#typography">
              Link — With href (renders as anchor).
            </Typography>
            <Typography variant={TypographyVariantEnum.Error}>
              Error — Validation or error message.
            </Typography>
            <Typography variant={TypographyVariantEnum.Success}>
              Success — Confirmation or success message.
            </Typography>
            <Typography variant={TypographyVariantEnum.Warning}>
              Warning — Caution or warning message.
            </Typography>
          </div>
        </section>

        <Typography
          variant={TypographyVariantEnum.H2}
          align={TypographyAlignEnum.Center}
        >
          Button variants & sizes
        </Typography>

        {/* Theme: variant + mode */}
        <section className="flex flex-col items-center gap-3">
          <Typography variant={TypographyVariantEnum.Caption}>
            Theme: {variant} · {mode === KezelMode.Light ? "light" : "dark"}
          </Typography>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Sm}
              onClick={() => setVariant(KezelVariant.Standard)}
            >
              Standard
            </Button>
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Sm}
              onClick={() => setVariant(KezelVariant.Neumorphic)}
            >
              Neumorphic
            </Button>
            <Button
              variant={ButtonVariant.Outline}
              size={ButtonSize.Sm}
              onClick={() =>
                setMode(
                  mode === KezelMode.Light ? KezelMode.Dark : KezelMode.Light
                )
              }
            >
              {mode === KezelMode.Light ? "Switch to dark" : "Switch to light"}
            </Button>
            <Button
              variant={ButtonVariant.Ghost}
              size={ButtonSize.Sm}
              onClick={() => {}}
              asChild
            >
              <a href="https://www.google.com">Google</a>
            </Button>
          </div>
        </section>

        <section className="flex flex-col items-center gap-4">
          <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Primary, Secondary, Outline, Ghost, Success, Warning, Error.
            Disabled uses 0.5 opacity; Loading shows spinner.
          </Typography>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Md}
              onClick={() => {}}
            >
              Primary
            </Button>
            <Button
              variant={ButtonVariant.Secondary}
              size={ButtonSize.Md}
              onClick={() => {}}
            >
              Secondary
            </Button>
            <Button
              variant={ButtonVariant.Outline}
              size={ButtonSize.Md}
              onClick={() => {}}
            >
              Outline
            </Button>
            <Button
              variant={ButtonVariant.Ghost}
              size={ButtonSize.Md}
              onClick={() => {}}
            >
              Ghost
            </Button>
            <Button
              variant={ButtonVariant.Success}
              size={ButtonSize.Md}
              onClick={() => {}}
            >
              Success
            </Button>
            <Button
              variant={ButtonVariant.Warning}
              size={ButtonSize.Md}
              onClick={() => {}}
            >
              Warning
            </Button>
            <Button
              variant={ButtonVariant.Error}
              size={ButtonSize.Md}
              onClick={() => {}}
            >
              Error
            </Button>
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Md}
              disabled
              onClick={() => {}}
            >
              Disabled
            </Button>
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Md}
              loading
              onClick={() => {}}
            >
              Loading
            </Button>
          </div>
        </section>

        {/* Sizes */}
        <section className="flex flex-col items-center gap-4">
          <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Sm}
              aspectRatio={ButtonAspectRatio.Square}
              onClick={() => {}}
            >
              <Icon name={IconName.BarChart2} size="sm" color="currentColor" />
            </Button>
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Md}
              onClick={() => {}}
            >
              Medium
            </Button>
            <Button
              variant={ButtonVariant.Primary}
              size={ButtonSize.Lg}
              onClick={() => {}}
            >
              Large
            </Button>
          </div>
        </section>

        {/* All variants × sizes (compact) */}
        <section className="flex flex-col items-center gap-4">
          <Typography variant={TypographyVariantEnum.H3}>
            All combinations
          </Typography>
          <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
            {(
              [
                ButtonVariant.Primary,
                ButtonVariant.Secondary,
                ButtonVariant.Outline,
                ButtonVariant.Ghost,
                ButtonVariant.Success,
                ButtonVariant.Warning,
                ButtonVariant.Error,
              ] as const
            ).map((v) =>
              ([ButtonSize.Sm, ButtonSize.Md, ButtonSize.Lg] as const).map(
                (s) => (
                  <Button
                    key={`${v}-${s}`}
                    variant={v}
                    size={s}
                    onClick={() => {}}
                  >
                    {v} {s}
                  </Button>
                )
              )
            )}
          </div>
        </section>

        {/* Toggle button */}
        <section className="flex flex-col items-center gap-4">
          <Typography variant={TypographyVariantEnum.H2}>
            Toggle button
          </Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Default, Primary, and Container variants. Pressed state uses theme
            tokens.
          </Typography>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <ToggleButton
              variant={ToggleButtonVariant.Default}
              size={ToggleButtonSize.Md}
              onPressedChange={() => {}}
            >
              Default
            </ToggleButton>
            <ToggleButton
              variant={ToggleButtonVariant.Primary}
              size={ToggleButtonSize.Md}
              defaultPressed
              onPressedChange={() => {}}
            >
              Primary (default on)
            </ToggleButton>
            <ToggleButton
              variant={ToggleButtonVariant.Container}
              size={ToggleButtonSize.Md}
              onPressedChange={() => {}}
            >
              Container
            </ToggleButton>
          </div>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <ToggleButton
              variant={ToggleButtonVariant.Primary}
              size={ToggleButtonSize.Sm}
              onPressedChange={() => {}}
            >
              Sm
            </ToggleButton>
            <ToggleButton
              variant={ToggleButtonVariant.Primary}
              size={ToggleButtonSize.Md}
              onPressedChange={() => {}}
            >
              Md
            </ToggleButton>
            <ToggleButton
              variant={ToggleButtonVariant.Primary}
              size={ToggleButtonSize.Lg}
              onPressedChange={() => {}}
            >
              Lg
            </ToggleButton>
          </div>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <ToggleButton
              variant={ToggleButtonVariant.Default}
              size={ToggleButtonSize.Md}
              disabled
              onPressedChange={() => {}}
            >
              Disabled (off)
            </ToggleButton>
            <ToggleButton
              variant={ToggleButtonVariant.Primary}
              size={ToggleButtonSize.Md}
              disabled
              defaultPressed
              onPressedChange={() => {}}
            >
              Disabled (on)
            </ToggleButton>
          </div>
        </section>

        {/* Checkbox */}
        <section className="flex flex-col items-center gap-4">
          <Typography variant={TypographyVariantEnum.H2}>Checkbox</Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Standard and neumorphic styles; use Variant toolbar. Sizes: sm
            (16px), md (20px), lg (24px). All tokens overridable via
            KezelThemeProvider.
          </Typography>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <Checkbox
              size={CheckboxSize.Sm}
              variant={CheckboxVariant.Default}
              onCheckedChange={() => {}}
            >
              Sm unchecked
            </Checkbox>
            <Checkbox
              size={CheckboxSize.Md}
              variant={CheckboxVariant.Default}
              defaultChecked
              onCheckedChange={() => {}}
            >
              Md checked
            </Checkbox>
            <Checkbox
              size={CheckboxSize.Lg}
              variant={CheckboxVariant.Default}
              indeterminate
              onCheckedChange={() => {}}
            >
              Lg indeterminate
            </Checkbox>
          </div>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <Checkbox
              size={CheckboxSize.Md}
              variant={CheckboxVariant.Container}
              onCheckedChange={() => {}}
            >
              Container unchecked
            </Checkbox>
            <Checkbox
              size={CheckboxSize.Md}
              variant={CheckboxVariant.Default}
              disabled
              onCheckedChange={() => {}}
            >
              Disabled off
            </Checkbox>
            <Checkbox
              size={CheckboxSize.Md}
              variant={CheckboxVariant.Default}
              disabled
              defaultChecked
              onCheckedChange={() => {}}
            >
              Disabled on
            </Checkbox>
          </div>
        </section>

        <section className="flex flex-col items-center gap-4">
          <Typography variant={TypographyVariantEnum.H2}>
            Radio button
          </Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Standard and neumorphic; sm 16px, md 20px, lg 24px. Disabled 50%
            opacity. All tokens overridable via KezelThemeProvider.
          </Typography>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <RadioButton
              name="radio-demo"
              value="a"
              size={RadioSize.Sm}
              checked={radioValue === "a"}
              onChange={(e) => setRadioValue(e.target.value)}
            >
              Sm A
            </RadioButton>
            <RadioButton
              name="radio-demo"
              value="b"
              size={RadioSize.Md}
              checked={radioValue === "b"}
              onChange={(e) => setRadioValue(e.target.value)}
            >
              Md B
            </RadioButton>
            <RadioButton
              name="radio-demo"
              value="c"
              size={RadioSize.Lg}
              checked={radioValue === "c"}
              onChange={(e) => setRadioValue(e.target.value)}
            >
              Lg C
            </RadioButton>
          </div>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <RadioButton
              name="radio-disabled"
              value="off"
              size={RadioSize.Md}
              disabled
              onChange={() => {}}
            >
              Disabled off
            </RadioButton>
            <RadioButton
              name="radio-disabled"
              value="on"
              size={RadioSize.Md}
              disabled
              defaultChecked
              onChange={() => {}}
            >
              Disabled on
            </RadioButton>
          </div>
        </section>

        <section className="flex flex-col items-center gap-8 w-full max-w-2xl">
          <Typography variant={TypographyVariantEnum.H2}>Tabs</Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Pill, underline, and vertical variants in sm, md, lg. Switch theme
            and mode to see styles.
          </Typography>

          <div className="flex flex-col gap-6 w-full">
            <div>
              <Typography variant={TypographyVariantEnum.H3} className="mb-2">
                Pill
              </Typography>
              <Tabs variant="pill" size="md" defaultValue="p1">
                <TabsList>
                  <TabsTrigger value="p1">Tab 1</TabsTrigger>
                  <TabsTrigger value="p2">Tab 2</TabsTrigger>
                  <TabsTrigger value="p3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="p1">Pill tab 1 content.</TabsContent>
                <TabsContent value="p2">Pill tab 2 content.</TabsContent>
                <TabsContent value="p3">Pill tab 3 content.</TabsContent>
              </Tabs>
            </div>

            <div>
              <Typography variant={TypographyVariantEnum.H3} className="mb-2">
                Underline
              </Typography>
              <Tabs variant="underline" size="md" defaultValue="u1">
                <TabsList>
                  <TabsTrigger value="u1">Tab 1</TabsTrigger>
                  <TabsTrigger value="u2">Tab 2</TabsTrigger>
                  <TabsTrigger value="u3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="u1">Underline tab 1 content.</TabsContent>
                <TabsContent value="u2">Underline tab 2 content.</TabsContent>
                <TabsContent value="u3">Underline tab 3 content.</TabsContent>
              </Tabs>
            </div>

            <div className="flex gap-12 flex-wrap">
              <div>
                <Typography variant={TypographyVariantEnum.H3} className="mb-2">
                  Vertical
                </Typography>
                <Tabs variant="vertical" size="md" defaultValue="v1">
                  <TabsList>
                    <TabsTrigger value="v1">Tab 1</TabsTrigger>
                    <TabsTrigger value="v2">Tab 2</TabsTrigger>
                    <TabsTrigger value="v3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="v1">Vertical tab 1 content.</TabsContent>
                  <TabsContent value="v2">Vertical tab 2 content.</TabsContent>
                  <TabsContent value="v3">Vertical tab 3 content.</TabsContent>
                </Tabs>
              </div>
              <div>
                <Typography variant={TypographyVariantEnum.H3} className="mb-2">
                  Sizes
                </Typography>
                <div className="flex flex-col gap-4">
                  <Tabs variant="pill" size="sm" defaultValue="s1">
                    <TabsList>
                      <TabsTrigger value="s1">Sm 1</TabsTrigger>
                      <TabsTrigger value="s2">Sm 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="s1">Small tabs content.</TabsContent>
                    <TabsContent value="s2">Tab 2.</TabsContent>
                  </Tabs>
                  <Tabs variant="pill" size="md" defaultValue="m1">
                    <TabsList>
                      <TabsTrigger value="m1">Md 1</TabsTrigger>
                      <TabsTrigger value="m2">Md 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="m1">Medium tabs content.</TabsContent>
                    <TabsContent value="m2">Tab 2.</TabsContent>
                  </Tabs>
                  <Tabs variant="pill" size="lg" defaultValue="l1">
                    <TabsList>
                      <TabsTrigger value="l1">Lg 1</TabsTrigger>
                      <TabsTrigger value="l2">Lg 2</TabsTrigger>
                    </TabsList>
                    <TabsContent value="l1">Large tabs content.</TabsContent>
                    <TabsContent value="l2">Tab 2.</TabsContent>
                  </Tabs>
                </div>
              </div>
              <div>
                <Typography variant={TypographyVariantEnum.H3} className="mb-2">
                  With icon
                </Typography>
                <Tabs variant="pill" size="md" defaultValue="i1">
                  <TabsList>
                    <TabsTrigger
                      value="i1"
                      icon={
                        <Icon
                          name={IconName.Search}
                          size="sm"
                          color="currentColor"
                        />
                      }
                    >
                      Search
                    </TabsTrigger>
                    <TabsTrigger
                      value="i2"
                      icon={
                        <Icon
                          name={IconName.BarChart2}
                          size="sm"
                          color="currentColor"
                        />
                      }
                    >
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger
                      value="i3"
                      icon={
                        <Icon
                          name={IconName.Shield}
                          size="sm"
                          color="currentColor"
                        />
                      }
                    >
                      Security
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="i1">Search content.</TabsContent>
                  <TabsContent value="i2">Analytics content.</TabsContent>
                  <TabsContent value="i3">Security content.</TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="w-full max-w-md">
              <Typography variant={TypographyVariantEnum.H3} className="mb-2">
                Full width
              </Typography>
              <Tabs variant="pill" size="md" fullWidth defaultValue="f1">
                <TabsList>
                  <TabsTrigger value="f1">Tab 1</TabsTrigger>
                  <TabsTrigger value="f2">Tab 2</TabsTrigger>
                  <TabsTrigger value="f3">Tab 3</TabsTrigger>
                </TabsList>
                <TabsContent value="f1">Full width tab 1 content.</TabsContent>
                <TabsContent value="f2">Full width tab 2 content.</TabsContent>
                <TabsContent value="f3">Full width tab 3 content.</TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center gap-6 w-full max-w-3xl">
          <Typography variant={TypographyVariantEnum.H2}>Table</Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Selection, sorting UI, actions, sticky header, and pagination.
            Switch theme and mode to see flat table styles.
          </Typography>
          <div className="w-full">
            <Table<TableRow>
              data={paginatedTableData}
              columns={tableColumns}
              size="md"
              stickyHeader
              caption="Sample users table"
              title="Users"
              description="Manage users and roles"
              searchable
              searchValue={tableSearchValue}
              onSearchChange={setTableSearchValue}
              searchPlaceholder="Search users…"
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
              selectedRowIds={tableSelectedRowIds}
              getRowId={(row) => row.id}
              onRowSelectionChange={setTableSelectedRowIds}
              actions={() => (
                <DropdownButton
                  trigger={{ iconOnly: true, ariaLabel: "Row actions" }}
                  items={[
                    { key: "edit", label: "Edit", onSelect: () => {} },
                    { key: "delete", label: "Delete", onSelect: () => {} },
                  ]}
                />
              )}
              actionsHeader="Actions"
              sort={tableSort}
              onSortChange={setTableSort}
              pagination={tablePaginationState}
              onPageChange={(page) =>
                setTablePagination((p) => ({ ...p, page }))
              }
              onPageSizeChange={(pageSize) =>
                setTablePagination((p) => ({
                  ...p,
                  pageSize,
                  page: 1,
                }))
              }
              pageSizeOptions={[5, 10, 20]}
            />
          </div>
        </section>

        <section className="flex flex-col items-center gap-6 w-full max-w-md">
          <Typography variant={TypographyVariantEnum.H2}>TextInput</Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Switch theme (Standard / Neumorphic) and mode (Light / Dark) above
            to see input styles change.
          </Typography>

          <div className="w-full flex flex-col gap-2">
            <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
            <TextInput
              label="Default"
              value={defaultValue}
              placeHolder="Placeholder"
              onValueChange={setDefaultValue}
              variant={TextInputVariant.Default}
              size={TextInputSize.Md}
            />
            <TextInput
              label="Container"
              value={defaultValue}
              placeHolder="Transparent background"
              onValueChange={setDefaultValue}
              variant={TextInputVariant.Container}
              size={TextInputSize.Md}
            />
            <TextInput
              label="Ghost"
              value={ghostValue}
              placeHolder="Border bottom only"
              onValueChange={setGhostValue}
              variant={TextInputVariant.Ghost}
              size={TextInputSize.Md}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
            <TextInput
              value={defaultValue}
              placeHolder="Small"
              onValueChange={setDefaultValue}
              variant={TextInputVariant.Default}
              size={TextInputSize.Sm}
            />
            <TextInput
              value={defaultValue}
              placeHolder="Medium"
              onValueChange={setDefaultValue}
              variant={TextInputVariant.Default}
              size={TextInputSize.Md}
            />
            <TextInput
              value={defaultValue}
              placeHolder="Large"
              onValueChange={setDefaultValue}
              variant={TextInputVariant.Default}
              size={TextInputSize.Lg}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <Typography variant={TypographyVariantEnum.H3}>States</Typography>
            <TextInput
              label="Error"
              value={errorValue}
              placeHolder="Email"
              onValueChange={setErrorValue}
              state={TextInputState.Error}
              errorText="Please enter a valid email address."
              variant={TextInputVariant.Default}
            />
            <TextInput
              label="Success"
              value={successValue}
              placeHolder="Email"
              onValueChange={setSuccessValue}
              state={TextInputState.Success}
              successText="Looks good!"
              variant={TextInputVariant.Default}
            />
            <TextInput
              label="Warning"
              value={defaultValue}
              placeHolder="Optional field"
              onValueChange={setDefaultValue}
              state={TextInputState.Warning}
              warningText="This field is recommended."
              variant={TextInputVariant.Default}
            />
            <TextInput
              label="Disabled"
              value="Disabled value"
              placeHolder="Placeholder"
              onValueChange={() => {}}
              variant={TextInputVariant.Default}
              disabled
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <Typography variant={TypographyVariantEnum.H3}>Options</Typography>
            <TextInput
              label="Clearable"
              value={clearableValue}
              placeHolder="Type then clear"
              onValueChange={setClearableValue}
              clearable
              variant={TextInputVariant.Default}
            />
            <TextInput
              label="With character count"
              value={countValue}
              placeHolder="Max 50 characters"
              onValueChange={setCountValue}
              showCount
              maxLength={50}
              variant={TextInputVariant.Default}
            />
            <TextInput
              label="With description"
              description="We'll never share this with anyone."
              value={defaultValue}
              placeHolder="Description below label"
              onValueChange={setDefaultValue}
              variant={TextInputVariant.Default}
            />
          </div>
        </section>

        {/* Dropdown with submenu — tokenized; override via KezelThemeProvider tokens */}
        <section className="flex flex-col items-center gap-4 w-full max-w-md">
          <Typography variant={TypographyVariantEnum.H2}>Dropdown</Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Default, Ghost variant, and no-chevron. All styles use design
            tokens; override via{" "}
            <code className="text-xs bg-black/10 dark:bg-white/10 px-1 rounded">
              KezelThemeProvider tokens
            </code>
            .
          </Typography>
          <div className="flex flex-wrap gap-3 justify-center items-center">
            <DropdownButton
              trigger={{ label: "Actions" }}
              items={actionsDropdownItems}
              align="start"
              sideOffset={6}
            />
            <DropdownButton
              trigger={{
                label: "Ghost trigger",
                variant: DropdownTriggerVariant.Ghost,
              }}
              items={[
                { key: "1", label: "Item one", onSelect: () => {} },
                { key: "2", label: "Item two", onSelect: () => {} },
              ]}
              align="start"
              sideOffset={6}
            />
            <DropdownButton
              trigger={{ label: "No chevron", showChevron: false }}
              items={[
                { key: "a", label: "Option A", onSelect: () => {} },
                { key: "b", label: "Option B", onSelect: () => {} },
              ]}
              align="start"
              sideOffset={6}
            />
            <Button
              variant={ButtonVariant.Outline}
              size={ButtonSize.Sm}
              onClick={() =>
                setDropdownTokenOverrides((prev) =>
                  prev
                    ? undefined
                    : ({
                        "component.dropdown.trigger.bg": "#fef3c7",
                        "component.dropdown.trigger.text": "#92400e",
                        "component.dropdown.item.text.selected": "#b45309",
                        "component.dropdown.item.bg.hover":
                          "rgba(245, 158, 11, 0.15)",
                      } as Partial<Record<TokenKey, string>>)
                )
              }
            >
              {dropdownTokenOverrides
                ? "Reset dropdown tokens"
                : "Override dropdown tokens"}
            </Button>
          </div>
          {dropdownTokenOverrides && (
            <Typography variant={TypographyVariantEnum.Caption}>
              Custom tokens applied: trigger bg/text, selected item color, item
              hover bg.
            </Typography>
          )}
        </section>

        {/* NavButton — direct link, selected link, dropdown with submenu (use SideMenu for full sidebar) */}
        <section className="flex flex-col items-center gap-4 w-full">
          <Typography variant={TypographyVariantEnum.H2}>NavButton</Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            Nav buttons: direct link, selected link, dropdown with submenu. For
            full sidebar navigation use SideMenu. All tokenized.
          </Typography>
          <div
            className="flex w-full max-w-md rounded-xl overflow-hidden border border-[var(--kz-color-border-subtle)]"
            style={{
              minHeight: 320,
              background: "var(--kz-color-surface-background)",
            }}
          >
            <aside className="kz-sidesheet" style={{ minWidth: 240 }}>
              <NavButton
                type="dropdown"
                icon={
                  <Icon
                    name={IconName.BarChart2}
                    size="sm"
                    color="currentColor"
                  />
                }
                label="Analytics"
                menuOptions={[
                  {
                    label: "Overview",
                    subMenu: [
                      { label: "Sub overview 1", onClick: () => {} },
                      { label: "Sub overview 2", onClick: () => {} },
                    ],
                  },
                  { label: "Trends", onClick: () => setNavSelected(null) },
                  { label: "Engagement", onClick: () => setNavSelected(null) },
                  { label: "Conversion", onClick: () => setNavSelected(null) },
                ]}
              />
              <NavButton
                type="link"
                icon={
                  <Icon name={IconName.Shield} size="sm" color="currentColor" />
                }
                label="Security"
                selected={navSelected === "security"}
                onClick={() => setNavSelected("security")}
              />
              <NavButton
                type="link"
                icon={
                  <Icon
                    name={IconName.CheckCircle}
                    size="sm"
                    color="currentColor"
                  />
                }
                label="Direct link (unselected)"
                selected={false}
                onClick={() => setNavSelected(null)}
              />
            </aside>
            <div
              className="flex-1 p-4 flex items-center justify-center text-[var(--kz-color-text-muted)]"
              style={{ background: "var(--kz-color-surface-base)" }}
            >
              Main content area
            </div>
          </div>
        </section>

        {/* SideMenu — JSON-driven sidebar with sections, links, inline groups (expanded) and flyout (collapsed) */}
        <section className="flex flex-col items-center gap-4 w-full">
          <Typography variant={TypographyVariantEnum.H2}>SideMenu</Typography>
          <Typography variant={TypographyVariantEnum.Caption}>
            JSON-driven sidebar: sections, links, dropdown groups. Expanded:
            groups open inline (push down). Collapsed: icons only with tooltips;
            group icon opens flyout to the right. Toggle collapse below.
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
                <>
                  <div
                    className="flex items-center justify-start p-3 text-sm font-medium"
                    style={{ color: "var(--kz-color-text-muted)" }}
                  >
                    Logo
                  </div>
                </>
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
      </main>
    </KezelThemeProvider>
  );
}
