import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  Button,
  ButtonVariant,
  ButtonStatus,
  ButtonSize,
  Select,
} from "kz-design-system";
import {
  DropdownButton,
  type DropdownButtonItem,
} from "kz-design-system/dropdown";
import type { TableSortState, TablePaginationState } from "kz-design-system";

type Row = { id: string; name: string; role: string; status: string };
const sampleData: Row[] = [
  { id: "1", name: "Alice", role: "Admin", status: "Active" },
  { id: "2", name: "Bob", role: "Editor", status: "Active" },
  { id: "3", name: "Carol", role: "Viewer", status: "Inactive" },
  { id: "4", name: "Dave", role: "Editor", status: "Active" },
  { id: "5", name: "Eve", role: "Admin", status: "Active" },
  { id: "6", name: "Frank", role: "Viewer", status: "Inactive" },
  { id: "7", name: "Grace", role: "Editor", status: "Active" },
  { id: "8", name: "Henry", role: "Viewer", status: "Active" },
  { id: "9", name: "Ivy", role: "Admin", status: "Inactive" },
  { id: "10", name: "Jack", role: "Editor", status: "Active" },
];

const columns = [
  {
    key: "name",
    header: "Name",
    accessor: (row: Row) => row.name,
    sortable: true,
  },
  {
    key: "role",
    header: "Role",
    accessor: (row: Row) => row.role,
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    accessor: (row: Row) => row.status,
  },
];

const actions: DropdownButtonItem[] = [
  { key: "edit", label: "Edit", onSelect: () => {} },
  { key: "delete", label: "Delete", onSelect: () => {} },
];

function makeActions(): DropdownButtonItem[] {
  return actions;
}

const meta: Meta<typeof Table<Row>> = {
  title: "Design System/Table",
  component: Table as React.ComponentType<
    React.ComponentProps<typeof Table<Row>>
  >,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Data table with selection, sorting, sticky header, sticky row (getRowSticky), actions column, search, and pagination. **Horizontal scroll**: set **horizontalScroll** when you have many columns so the table scrolls horizontally instead of squeezing. **Column sizes**: use **width**, **minWidth**, and **maxWidth** on each column (e.g. `width: '120px'`, `minWidth: '80px'`, `maxWidth: '300px'`) for customizable column widths; combine with horizontalScroll for wide tables.\n\nThe typings now allow you to specify a generic edit value type per column. Example:\n```ts\ninterface MyRow { id: string; date: Date; }\nconst columns: TableColumn<MyRow, Date>[] = [\n  { key: 'date', header: 'Date', accessor: r => r.date.toLocaleString(), editable: true, getEditValue: r => r.date, editCell: (row, val, onChange) => (\n      <DateTimePicker value={val} onChange={onChange} />\n  ) },\n];\n```\nUse this when you need complex inputs like date pickers. Use the Variant and Mode toolbar to switch themes.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 24,
          background: "var(--kz-color-surface-background)",
          minHeight: "40vh",
          width: "100%",
          maxWidth: 720,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Table<Row>>;

function TableWithState() {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedRowIds, setSelectedRowIds] = React.useState<
    Record<string, boolean>
  >({});
  const [sort, setSort] = React.useState<TableSortState | null>(null);
  const [pagination, setPagination] = React.useState<TablePaginationState>({
    page: 1,
    pageSize: 5,
    total: sampleData.length,
  });

  const filteredData = React.useMemo(() => {
    if (!searchValue.trim()) return sampleData;
    const q = searchValue.toLowerCase();
    return sampleData.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
    );
  }, [searchValue]);

  const paginatedData = React.useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return filteredData.slice(start, start + pagination.pageSize);
  }, [filteredData, pagination.page, pagination.pageSize]);

  const paginationState: TablePaginationState = {
    ...pagination,
    total: filteredData.length,
  };

  return (
    <Table<Row>
      data={paginatedData}
      columns={columns}
      size="md"
      stickyHeader
      caption="Sample users table"
      title="Users"
      description="Manage users and roles"
      searchable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      searchPlaceholder="Search users…"
      headerRight={
        <Button
          variant={ButtonVariant.Primary}
          status={ButtonStatus.Brand}
          size={ButtonSize.Sm}
          onClick={() => {}}
        >
          Add user
        </Button>
      }
      selectableRows
      selectedRowIds={selectedRowIds}
      getRowId={(row) => row.id}
      onRowSelectionChange={setSelectedRowIds}
      getRowSticky={(_row, index) => index === 0}
      actions={() => (
        <DropdownButton
          trigger={{ iconOnly: true, ariaLabel: "Row actions" }}
          items={makeActions()}
        />
      )}
      actionsHeader="Actions"
      sort={sort}
      onSortChange={setSort}
      pagination={paginationState}
      onPageChange={(page) => setPagination((p) => ({ ...p, page }))}
      onPageSizeChange={(pageSize) =>
        setPagination((p) => ({ ...p, pageSize, page: 1 }))
      }
      pageSizeOptions={[5, 10, 20]}
    />
  );
}

export const Default: Story = {
  render: () => <TableWithState />,
  parameters: {
    docs: {
      description: {
        story:
          "Use the **Variant** (Standard / Neumorphic) and **Mode** (Light / Dark) toolbar controls above to switch themes.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm font-medium text-[var(--kz-color-text-secondary)]">
          Small
        </p>
        <Table<Row>
          data={sampleData.slice(0, 3)}
          columns={columns}
          getRowId={(r) => r.id}
          size="sm"
          stickyHeader
          title="Users (sm)"
          actions={() => (
            <DropdownButton
              trigger={{ iconOnly: true, ariaLabel: "Actions" }}
              items={makeActions()}
            />
          )}
          actionsHeader=""
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-[var(--kz-color-text-secondary)]">
          Medium
        </p>
        <Table<Row>
          data={sampleData.slice(0, 3)}
          columns={columns}
          getRowId={(r) => r.id}
          size="md"
          stickyHeader
          title="Users (md)"
          actions={() => (
            <DropdownButton
              trigger={{ iconOnly: true, ariaLabel: "Actions" }}
              items={makeActions()}
            />
          )}
          actionsHeader=""
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-[var(--kz-color-text-secondary)]">
          Large
        </p>
        <Table<Row>
          data={sampleData.slice(0, 3)}
          columns={columns}
          getRowId={(r) => r.id}
          size="lg"
          stickyHeader
          title="Users (lg)"
          actions={() => (
            <DropdownButton
              trigger={{ iconOnly: true, ariaLabel: "Actions" }}
              items={makeActions()}
            />
          )}
          actionsHeader=""
        />
      </div>
    </div>
  ),
};

export const WithStickyRow: Story = {
  render: () => (
    <Table<Row>
      data={sampleData.slice(0, 8)}
      columns={columns}
      getRowId={(r) => r.id}
      size="md"
      stickyHeader
      title="Users (first row sticky)"
      description="Scroll to see the first row stay pinned below the header"
      getRowSticky={(_row, index) => index === 0}
      actions={() => (
        <DropdownButton
          trigger={{ iconOnly: true, ariaLabel: "Actions" }}
          items={makeActions()}
        />
      )}
      actionsHeader=""
      pagination={{
        page: 1,
        pageSize: 5,
        total: 8,
      }}
      onPageChange={() => {}}
      onPageSizeChange={() => {}}
      pageSizeOptions={[5, 10]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "First row is sticky (getRowSticky). Use a scrollable container to see it pin below the header.",
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <Table<Row>
      data={[]}
      columns={columns}
      getRowId={(r) => r.id}
      size="md"
      title="Users"
      loading
      actions={() => (
        <DropdownButton
          trigger={{ iconOnly: true, ariaLabel: "Actions" }}
          items={makeActions()}
        />
      )}
      actionsHeader=""
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <Table<Row>
      data={[]}
      columns={columns}
      getRowId={(r) => r.id}
      size="md"
      title="Users"
      emptyState={<span>No users found. Click Add user to create one.</span>}
      headerRight={
        <Button
          variant={ButtonVariant.Primary}
          status={ButtonStatus.Brand}
          size={ButtonSize.Sm}
          onClick={() => {}}
        >
          Add user
        </Button>
      }
      actions={() => (
        <DropdownButton
          trigger={{ iconOnly: true, ariaLabel: "Actions" }}
          items={makeActions()}
        />
      )}
      actionsHeader=""
    />
  ),
};

export const Minimal: Story = {
  render: () => (
    <Table<Row>
      data={sampleData.slice(0, 4)}
      columns={columns}
      getRowId={(r) => r.id}
      size="md"
      title="Users (no search, selection, or actions)"
    />
  ),
};

type WideRow = Row & {
  email: string;
  department: string;
  location: string;
  joinDate: string;
};
const wideData: WideRow[] = sampleData.slice(0, 5).map((r, i) => ({
  ...r,
  email: `${r.name.toLowerCase()}@example.com`,
  department: ["Engineering", "Product", "Design", "Support", "Sales"][i % 5],
  location: ["NYC", "London", "Berlin", "Tokyo", "SF"][i % 5],
  joinDate: ["2022-01", "2021-06", "2023-03", "2022-09", "2021-11"][i % 5],
}));

const manyColumns = [
  {
    key: "name",
    header: "Name",
    accessor: (r: WideRow) => r.name,
    sortable: true,
    minWidth: "100px",
  },
  {
    key: "email",
    header: "Email",
    accessor: (r: WideRow) => r.email,
    minWidth: "180px",
  },
  {
    key: "role",
    header: "Role",
    accessor: (r: WideRow) => r.role,
    sortable: true,
    minWidth: "90px",
  },
  {
    key: "department",
    header: "Department",
    accessor: (r: WideRow) => r.department,
    minWidth: "110px",
  },
  {
    key: "location",
    header: "Location",
    accessor: (r: WideRow) => r.location,
    minWidth: "90px",
  },
  {
    key: "status",
    header: "Status",
    accessor: (r: WideRow) => r.status,
    minWidth: "90px",
  },
  {
    key: "joinDate",
    header: "Join date",
    accessor: (r: WideRow) => r.joinDate,
    minWidth: "100px",
  },
];

export const HorizontalScroll: Story = {
  render: () => (
    <Table<WideRow>
      data={wideData}
      columns={manyColumns}
      getRowId={(r) => r.id}
      size="md"
      horizontalScroll
      stickyHeader
      title="Wide table (horizontal scroll)"
      description="horizontalScroll is enabled; scroll horizontally to see all columns. Column minWidth keeps columns readable."
      actions={() => (
        <DropdownButton
          trigger={{ iconOnly: true, ariaLabel: "Actions" }}
          items={makeActions()}
        />
      )}
      actionsHeader=""
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use **horizontalScroll** when the table has many columns so it scrolls horizontally instead of squeezing. Set **minWidth** (or **width** / **maxWidth**) on columns for predictable column sizes.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 24,
          background: "var(--kz-color-surface-background)",
          minHeight: "40vh",
          width: "100%",
          maxWidth: 640,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

const customWidthColumns = [
  {
    key: "name",
    header: "Name",
    accessor: (r: Row) => r.name,
    width: "140px",
    sortable: true,
  },
  {
    key: "role",
    header: "Role",
    accessor: (r: Row) => r.role,
    minWidth: "80px",
    maxWidth: "200px",
  },
  {
    key: "status",
    header: "Status",
    accessor: (r: Row) => r.status,
    width: "100px",
  },
];

export const CustomColumnWidths: Story = {
  render: () => (
    <Table<Row>
      data={sampleData.slice(0, 5)}
      columns={customWidthColumns}
      getRowId={(r) => r.id}
      size="md"
      horizontalScroll
      title="Custom column widths"
      description="Columns use width, minWidth, and maxWidth. Name and Status have fixed width; Role has min/max."
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "**width**: fixed or preferred width (e.g. `'120px'`, `'20%'`). **minWidth**: minimum width so columns don’t shrink too much. **maxWidth**: cap wide columns. Use with **horizontalScroll** for wide tables.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 24,
          background: "var(--kz-color-surface-background)",
          width: "100%",
          maxWidth: 520,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

/**
 * Demonstrates customizable edit cells using the `editCell` prop.
 * You can use any input component (TextInput, Select, DateRangePicker, etc.)
 * for editing different column types.
 */
function TableWithCustomEditCells() {
  const [editingCell, setEditingCell] = React.useState<{
    rowId: string;
    columnKey: string;
  } | null>(null);
  const [data, setData] = React.useState(sampleData);

  const editableColumns = [
    {
      key: "name",
      header: "Name",
      accessor: (row: Row) => row.name,
      sortable: true,
      editable: true,
      // Default TextInput (no editCell needed)
    },
    {
      key: "role",
      header: "Role",
      accessor: (row: Row) => row.role,
      sortable: true,
      editable: true,
      // Custom edit cell using Select
      editCell: (row: Row, value: string, onChange: (v: string) => void) => (
        <Select
          label=""
          value={value}
          onChange={onChange as (v: string | string[]) => void}
          options={[
            { value: "Admin", label: "Admin" },
            { value: "Editor", label: "Editor" },
            { value: "Viewer", label: "Viewer" },
          ]}
        />
      ),
    },
    {
      key: "status",
      header: "Status",
      accessor: (row: Row) => row.status,
      editable: true,
      // Custom edit cell using Select
      editCell: (row: Row, value: string, onChange: (v: string) => void) => (
        <Select
          label=""
          value={value}
          onChange={onChange as (v: string | string[]) => void}
          options={[
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
          ]}
        />
      ),
    },
  ];

  const handleSave = (rowId: string, columnKey: string, value: string) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, [columnKey]: value } : row
      )
    );
    setEditingCell(null);
  };

  return (
    <Table<Row>
      data={data}
      columns={editableColumns}
      getRowId={(r) => r.id}
      size="md"
      title="Editable Cells"
      description="Click the pencil icon to edit. Name uses default TextInput. Role and Status use Select dropdowns."
      editingCell={editingCell}
      onEditingCellChange={setEditingCell}
      onSave={handleSave}
      onCancel={() => setEditingCell(null)}
      actions={() => (
        <DropdownButton
          trigger={{ iconOnly: true, ariaLabel: "Actions" }}
          items={makeActions()}
        />
      )}
      actionsHeader=""
    />
  );
}

export const CustomEditCells: Story = {
  render: () => <TableWithCustomEditCells />,
  parameters: {
    docs: {
      description: {
        story:
          "Use the **editCell** prop on a column to customize the edit input. Pass any input component like Select, DateRangePicker, TextArea, etc. The **value** parameter can be any type (string, object, array, etc.), not just strings. Use **getEditValue** if you need to transform the display value for editing.",
      },
    },
  },
};

/**
 * Multi-cell editing: open multiple cells at once, then save all changes in one action.
 */
function TableWithMultiCellEdit() {
  const [data, setData] = React.useState(sampleData);
  const [editingCells, setEditingCells] = React.useState<
    Record<string, Record<string, boolean>>
  >({});
  const [selectedRowIds, setSelectedRowIds] = React.useState<
    Record<string, boolean>
  >({});

  const editableColumns = [
    {
      key: "name",
      header: "Name",
      accessor: (row: Row) => row.name,
      sortable: true,
      editable: true,
    },
    {
      key: "role",
      header: "Role",
      accessor: (row: Row) => row.role,
      sortable: true,
      editable: true,
      editCell: (_row: Row, value: string, onChange: (v: string) => void) => (
        <Select
          label=""
          value={value}
          onChange={onChange as (v: string | string[]) => void}
          options={[
            { value: "Admin", label: "Admin" },
            { value: "Editor", label: "Editor" },
            { value: "Viewer", label: "Viewer" },
          ]}
        />
      ),
    },
    {
      key: "status",
      header: "Status",
      accessor: (row: Row) => row.status,
      editable: true,
      editCell: (_row: Row, value: string, onChange: (v: string) => void) => (
        <Select
          label=""
          value={value}
          onChange={onChange as (v: string | string[]) => void}
          options={[
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
          ]}
        />
      ),
    },
  ];

  return (
    <Table<Row>
      data={data}
      columns={editableColumns}
      getRowId={(r) => r.id}
      size="md"
      title="Multi-Cell Edit"
      description="Click pencil icons on multiple cells, edit them all, then Save once."
      editingCells={editingCells}
      onEditingCellsChange={setEditingCells}
      onSaveAll={(
        changes: { rowId: string; columnKey: string; value: string }[]
      ) => {
        setData((prev) => {
          const next = [...prev];
          for (const { rowId, columnKey, value } of changes) {
            const idx = next.findIndex((r) => r.id === rowId);
            if (idx !== -1) {
              next[idx] = { ...next[idx], [columnKey]: value };
            }
          }
          return next;
        });
      }}
      onCancel={() => {}}
      onDeleteSelected={(ids) => {
        setData((prev) => prev.filter((row) => !ids.includes(row.id)));
        setSelectedRowIds({});
      }}
      selectableRows
      selectedRowIds={selectedRowIds}
      onRowSelectionChange={setSelectedRowIds}
      actions={() => (
        <DropdownButton
          trigger={{ iconOnly: true, ariaLabel: "Actions" }}
          items={makeActions()}
        />
      )}
      actionsHeader="Actions"
    />
  );
}

export const MultiCellEdit: Story = {
  render: () => <TableWithMultiCellEdit />,
  parameters: {
    docs: {
      description: {
        story:
          "Use **editingCells** (multi-cell) instead of **editingCell** (single-cell) to allow editing multiple cells at once. Use **onSaveAll** to receive all changes in a single callback. Great for batch-editing workflows.",
      },
    },
  },
};

type WideRow2 = Row & {
  email: string;
  department: string;
  location: string;
  phone: string;
};

const stickyWideData: WideRow2[] = sampleData.slice(0, 5).map((r, i) => ({
  ...r,
  email: `${r.name.toLowerCase()}@example.com`,
  department: ["Engineering", "Marketing", "Sales", "Design", "Support"][i % 5],
  location: ["New York", "London", "Tokyo", "Berlin", "Sydney"][i % 5],
  phone: [
    "+1-555-0101",
    "+44-20-7946",
    "+81-3-1234",
    "+49-30-5678",
    "+61-2-9876",
  ][i % 5],
}));

function TableWithStickyColumns() {
  const [selectedRowIds, setSelectedRowIds] = React.useState<
    Record<string, boolean>
  >({});

  const wideColumns = [
    {
      key: "name",
      header: "Name",
      accessor: (r: WideRow2) => r.name,
      minWidth: "150px",
    },
    {
      key: "email",
      header: "Email",
      accessor: (r: WideRow2) => r.email,
      minWidth: "200px",
    },
    {
      key: "role",
      header: "Role",
      accessor: (r: WideRow2) => r.role,
      minWidth: "120px",
    },
    {
      key: "department",
      header: "Department",
      accessor: (r: WideRow2) => r.department,
      minWidth: "150px",
    },
    {
      key: "location",
      header: "Location",
      accessor: (r: WideRow2) => r.location,
      minWidth: "150px",
    },
    {
      key: "phone",
      header: "Phone",
      accessor: (r: WideRow2) => r.phone,
      minWidth: "150px",
    },
    {
      key: "status",
      header: "Status",
      accessor: (r: WideRow2) => r.status,
      minWidth: "120px",
    },
  ];

  return (
    <Table<WideRow2>
      data={stickyWideData}
      columns={wideColumns}
      getRowId={(r) => r.id}
      size="md"
      horizontalScroll
      stickyColumns
      title="Team Directory"
      description="Scroll horizontally — checkbox and actions stay pinned"
      selectableRows
      selectedRowIds={selectedRowIds}
      onRowSelectionChange={setSelectedRowIds}
      actions={() => (
        <DropdownButton
          trigger={{ iconOnly: true, ariaLabel: "Actions" }}
          items={makeActions()}
        />
      )}
      actionsHeader="Actions"
    />
  );
}

export const StickyColumns: Story = {
  render: () => <TableWithStickyColumns />,
  parameters: {
    docs: {
      description: {
        story:
          "Use **stickyColumns** with **horizontalScroll** to pin the checkbox column and actions column while the middle columns scroll. Great for wide tables with many fields.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 24,
          background: "var(--kz-color-surface-background)",
          width: "100%",
          maxWidth: 640,
        }}
      >
        <Story />
      </div>
    ),
  ],
};
