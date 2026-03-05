"use client";

import * as React from "react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  Typography,
  TypographyVariantEnum,
  Table,
  Select,
} from "kz-design-system";
import { DropdownButton } from "kz-design-system/dropdown";

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

export default function TableShowcase() {
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
    () => ({ ...tablePagination, total: filteredTableData.length }),
    [tablePagination, filteredTableData.length]
  );

  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-3xl">
      <Typography variant={TypographyVariantEnum.H2}>Table</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Selection, sorting UI, actions, sticky header, and pagination. Switch
        theme and mode to see flat table styles.
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
          onPageChange={(page) => setTablePagination((p) => ({ ...p, page }))}
          onPageSizeChange={(pageSize) =>
            setTablePagination((p) => ({ ...p, pageSize, page: 1 }))
          }
          pageSizeOptions={[5, 10, 20]}
        />
      </div>

      {/* ── Sticky Columns Table ── */}
      <Typography variant={TypographyVariantEnum.H3}>
        Sticky Columns (Horizontal Scroll)
      </Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Checkbox and Actions columns stay fixed while the rest scrolls
        horizontally. Resize the browser or use a narrow container to see it in
        action.
      </Typography>
      <StickyColumnsTableDemo />

      {/* ── Editable Table ── */}
      <Typography variant={TypographyVariantEnum.H3}>Editable Table</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Hover over a cell to see the edit icon. Click it to edit that cell. Name
        uses a text input, while Role and Status use Select dropdowns.
      </Typography>
      <EditableTableDemo />
    </section>
  );
}

function EditableTableDemo() {
  const [data, setData] = React.useState<TableRow[]>(TABLE_DATA);
  const [editingCell, setEditingCell] = React.useState<{
    rowId: string;
    columnKey: string;
  } | null>(null);
  const [pagination, setPagination] = React.useState({
    page: 1,
    pageSize: 5,
    total: 0,
  });
  const [selectedRowIds, setSelectedRowIds] = React.useState<
    Record<string, boolean>
  >({});
  const [sort, setSort] = React.useState<{
    key: string;
    direction: "asc" | "desc" | null;
  } | null>(null);

  const editableColumns = [
    {
      key: "name",
      header: "Name",
      accessor: (row: TableRow) => row.name,
      sortable: true,
      editable: true,
      // Default TextInput
    },
    {
      key: "role",
      header: "Role",
      accessor: (row: TableRow) => row.role,
      sortable: true,
      editable: true,
      // Custom edit cell using Select
      editCell: (
        row: TableRow,
        value: string,
        onChange: (v: string) => void
      ) => (
        <Select
          label=""
          value={value}
          // Select.onChange expects string|string[]; our handler accepts string,
          // so cast to satisfy signature since we only use single select here.
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
      accessor: (row: TableRow) => row.status,
      editable: true,
      // Custom edit cell using Select
      editCell: (
        row: TableRow,
        value: string,
        onChange: (v: string) => void
      ) => (
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

  const paginatedData = React.useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return data.slice(start, start + pagination.pageSize);
  }, [data, pagination.page, pagination.pageSize]);

  const paginationState = React.useMemo(
    () => ({ ...pagination, total: data.length }),
    [pagination, data.length]
  );

  return (
    <div className="w-full">
      <Table<TableRow>
        data={paginatedData}
        columns={editableColumns}
        size="md"
        caption="Editable users table"
        title="Editable Users"
        description="Click the pencil icon to edit. Name uses TextInput, Role and Status use Select dropdowns."
        getRowId={(row) => row.id}
        editingCell={editingCell}
        onEditingCellChange={setEditingCell}
        onSave={(rowId, columnKey, value) => {
          setData((prev) =>
            prev.map((row) =>
              row.id === rowId ? { ...row, [columnKey]: value } : row
            )
          );
        }}
        onCancel={() => {}}
        onDeleteSelected={(ids) => {
          setData((prev) => prev.filter((row) => !ids.includes(row.id)));
          setSelectedRowIds({});
        }}
        selectableRows
        selectedRowIds={selectedRowIds}
        onRowSelectionChange={setSelectedRowIds}
        sort={sort}
        onSortChange={setSort}
        actions={(row) => (
          <DropdownButton
            trigger={{ iconOnly: true, ariaLabel: "Row actions" }}
            items={[
              {
                key: "edit",
                label: "Edit",
                onSelect: () =>
                  setEditingCell({ rowId: row.id, columnKey: "name" }),
              },
              {
                key: "delete",
                label: "Delete",
                onSelect: () =>
                  setData((prev) => prev.filter((r) => r.id !== row.id)),
              },
            ]}
          />
        )}
        actionsHeader="Actions"
        pagination={paginationState}
        onPageChange={(page) => setPagination((p) => ({ ...p, page }))}
        onPageSizeChange={(pageSize) =>
          setPagination((p) => ({ ...p, pageSize, page: 1 }))
        }
        pageSizeOptions={[5, 10, 20]}
      />
    </div>
  );
}

type WideRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  location: string;
  phone: string;
  status: string;
};

const WIDE_DATA: WideRow[] = [
  {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    role: "Admin",
    department: "Engineering",
    location: "New York",
    phone: "+1-555-0101",
    status: "Active",
  },
  {
    id: "2",
    name: "Bob",
    email: "bob@example.com",
    role: "Editor",
    department: "Marketing",
    location: "London",
    phone: "+44-20-7946",
    status: "Active",
  },
  {
    id: "3",
    name: "Carol",
    email: "carol@example.com",
    role: "Viewer",
    department: "Sales",
    location: "Tokyo",
    phone: "+81-3-1234",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Dave",
    email: "dave@example.com",
    role: "Editor",
    department: "Design",
    location: "Berlin",
    phone: "+49-30-5678",
    status: "Active",
  },
  {
    id: "5",
    name: "Eve",
    email: "eve@example.com",
    role: "Admin",
    department: "Engineering",
    location: "Sydney",
    phone: "+61-2-9876",
    status: "Active",
  },
];

function StickyColumnsTableDemo() {
  const [selectedRowIds, setSelectedRowIds] = React.useState<
    Record<string, boolean>
  >({});

  const wideColumns = [
    {
      key: "name",
      header: "Name",
      accessor: (r: WideRow) => r.name,
      minWidth: "150px",
    },
    {
      key: "email",
      header: "Email",
      accessor: (r: WideRow) => r.email,
      minWidth: "200px",
    },
    {
      key: "role",
      header: "Role",
      accessor: (r: WideRow) => r.role,
      minWidth: "120px",
    },
    {
      key: "department",
      header: "Department",
      accessor: (r: WideRow) => r.department,
      minWidth: "150px",
    },
    {
      key: "location",
      header: "Location",
      accessor: (r: WideRow) => r.location,
      minWidth: "150px",
    },
    {
      key: "phone",
      header: "Phone",
      accessor: (r: WideRow) => r.phone,
      minWidth: "150px",
    },
    {
      key: "status",
      header: "Status",
      accessor: (r: WideRow) => r.status,
      minWidth: "120px",
    },
  ];

  return (
    <div className="w-full max-w-2xl">
      <Table<WideRow>
        data={WIDE_DATA}
        columns={wideColumns}
        size="md"
        horizontalScroll
        stickyColumns
        caption="Wide users table with sticky columns"
        title="Team Directory"
        description="Scroll horizontally — checkbox and actions stay pinned"
        selectableRows
        selectedRowIds={selectedRowIds}
        getRowId={(row) => row.id}
        onRowSelectionChange={setSelectedRowIds}
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
      />
    </div>
  );
}
