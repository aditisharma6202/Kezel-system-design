import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  KezelThemeProvider,
  KezelVariant,
  KezelMode,
  Button,
  ButtonVariant,
  ButtonSize,
} from "kz-design-system";
import { DropdownButton, type DropdownButtonItem } from "kz-design-system/dropdown";
import type {
  TableSortState,
  TablePaginationState,
} from "kz-design-system";

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

function makeActions(row: Row): DropdownButtonItem[] {
  return [
    { key: "edit", label: "Edit", onSelect: () => {} },
    { key: "delete", label: "Delete", onSelect: () => {} },
  ];
}

const meta: Meta<typeof Table<Row>> = {
  title: "Design System/Table",
  component: Table as React.ComponentType<React.ComponentProps<typeof Table<Row>>>,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Data table with selection, sorting (arrow-up/arrow-down icons), sticky header, sticky row (getRowSticky), actions column (icon-only ellipsis-vertical button), search, and pagination (chevron prev/next, page size dropdown, active and hover inset in neumorphic). Table surface is flat; only checkbox and action buttons have shadows in neumorphic.",
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
  const [selectedRowIds, setSelectedRowIds] = React.useState<Record<string, boolean>>({});
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
      actions={(row) => (
        <DropdownButton
          trigger={{ iconOnly: true, ariaLabel: "Row actions" }}
          items={makeActions(row)}
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

export const StandardLight: Story = {
  render: () => (
    <KezelThemeProvider variant={KezelVariant.Standard} mode={KezelMode.Light}>
      <TableWithState />
    </KezelThemeProvider>
  ),
};

export const StandardDark: Story = {
  render: () => (
    <KezelThemeProvider variant={KezelVariant.Standard} mode={KezelMode.Dark}>
      <TableWithState />
    </KezelThemeProvider>
  ),
};

export const NeumorphicLight: Story = {
  render: () => (
    <KezelThemeProvider
      variant={KezelVariant.Neumorphic}
      mode={KezelMode.Light}
    >
      <TableWithState />
    </KezelThemeProvider>
  ),
};

export const NeumorphicDark: Story = {
  render: () => (
    <KezelThemeProvider
      variant={KezelVariant.Neumorphic}
      mode={KezelMode.Dark}
    >
      <TableWithState />
    </KezelThemeProvider>
  ),
};

export const Sizes: Story = {
  render: () => (
    <KezelThemeProvider variant={KezelVariant.Standard} mode={KezelMode.Light}>
      <div className="flex flex-col gap-8">
        <div>
          <p className="mb-2 text-sm font-medium text-[var(--kz-color-text-secondary)]">Small</p>
          <Table<Row>
            data={sampleData.slice(0, 3)}
            columns={columns}
            getRowId={(r) => r.id}
            size="sm"
            stickyHeader
            title="Users (sm)"
            actions={(row) => (
              <DropdownButton
                trigger={{ iconOnly: true, ariaLabel: "Actions" }}
                items={makeActions(row)}
              />
            )}
            actionsHeader=""
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-[var(--kz-color-text-secondary)]">Medium</p>
          <Table<Row>
            data={sampleData.slice(0, 3)}
            columns={columns}
            getRowId={(r) => r.id}
            size="md"
            stickyHeader
            title="Users (md)"
            actions={(row) => (
              <DropdownButton
                trigger={{ iconOnly: true, ariaLabel: "Actions" }}
                items={makeActions(row)}
              />
            )}
            actionsHeader=""
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-[var(--kz-color-text-secondary)]">Large</p>
          <Table<Row>
            data={sampleData.slice(0, 3)}
            columns={columns}
            getRowId={(r) => r.id}
            size="lg"
            stickyHeader
            title="Users (lg)"
            actions={(row) => (
              <DropdownButton
                trigger={{ iconOnly: true, ariaLabel: "Actions" }}
                items={makeActions(row)}
              />
            )}
            actionsHeader=""
          />
        </div>
      </div>
    </KezelThemeProvider>
  ),
};

export const WithStickyRow: Story = {
  render: () => (
    <KezelThemeProvider variant={KezelVariant.Standard} mode={KezelMode.Light}>
      <Table<Row>
        data={sampleData.slice(0, 8)}
        columns={columns}
        getRowId={(r) => r.id}
        size="md"
        stickyHeader
        title="Users (first row sticky)"
        description="Scroll to see the first row stay pinned below the header"
        getRowSticky={(_row, index) => index === 0}
        actions={(row) => (
          <DropdownButton
            trigger={{ iconOnly: true, ariaLabel: "Actions" }}
            items={makeActions(row)}
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
    </KezelThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "First row is sticky (getRowSticky). Use a scrollable container to see it pin below the header.",
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <KezelThemeProvider variant={KezelVariant.Standard} mode={KezelMode.Light}>
      <Table<Row>
        data={[]}
        columns={columns}
        getRowId={(r) => r.id}
        size="md"
        title="Users"
        loading
        actions={(row) => (
          <DropdownButton
            trigger={{ iconOnly: true, ariaLabel: "Actions" }}
            items={makeActions(row)}
          />
        )}
        actionsHeader=""
      />
    </KezelThemeProvider>
  ),
};

export const Empty: Story = {
  render: () => (
    <KezelThemeProvider variant={KezelVariant.Standard} mode={KezelMode.Light}>
      <Table<Row>
        data={[]}
        columns={columns}
        getRowId={(r) => r.id}
        size="md"
        title="Users"
        emptyState={<span>No users found. Click Add user to create one.</span>}
        headerRight={
          <Button variant={ButtonVariant.Primary} size={ButtonSize.Sm} onClick={() => {}}>
            Add user
          </Button>
        }
        actions={(row) => (
          <DropdownButton
            trigger={{ iconOnly: true, ariaLabel: "Actions" }}
            items={makeActions(row)}
          />
        )}
        actionsHeader=""
      />
    </KezelThemeProvider>
  ),
};

export const Minimal: Story = {
  render: () => (
    <KezelThemeProvider variant={KezelVariant.Standard} mode={KezelMode.Light}>
      <Table<Row>
        data={sampleData.slice(0, 4)}
        columns={columns}
        getRowId={(r) => r.id}
        size="md"
        title="Users (no search, selection, or actions)"
      />
    </KezelThemeProvider>
  ),
};
