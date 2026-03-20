"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  Table,
  Button,
  ButtonVariant,
  ButtonStatus,
  ButtonSize,
} from "kz-design-system";
import { DropdownButton } from "kz-design-system/dropdown";

type Row = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
};

const FIRST_NAMES = [
  "Alice",
  "Bob",
  "Carol",
  "Dave",
  "Eve",
  "Frank",
  "Grace",
  "Henry",
  "Ivy",
  "Jack",
  "Karen",
  "Leo",
  "Mia",
  "Noah",
  "Olivia",
  "Paul",
  "Quinn",
  "Rita",
  "Sam",
  "Tina",
  "Uma",
  "Vic",
  "Wendy",
  "Xander",
  "Yara",
];

const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
];

const ROLES = ["Admin", "Editor", "Viewer", "Moderator"];
const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Sales",
  "Design",
  "Support",
  "Product",
  "Finance",
  "HR",
];
const STATUSES = ["Active", "Inactive", "Pending"];

const ROWS_50: Row[] = Array.from({ length: 50 }, (_, i) => {
  const first = FIRST_NAMES[i % FIRST_NAMES.length];
  const last = LAST_NAMES[i % LAST_NAMES.length];
  return {
    id: String(i + 1),
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${i > 24 ? i : ""}@example.com`,
    role: ROLES[i % ROLES.length],
    department: DEPARTMENTS[i % DEPARTMENTS.length],
    status: STATUSES[i % STATUSES.length],
  };
});

export default function TableFullShowcase() {
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedRowIds, setSelectedRowIds] = React.useState<
    Record<string, boolean>
  >({});
  const [sort, setSort] = React.useState<{
    key: string;
    direction: "asc" | "desc" | null;
  } | null>(null);
  const [pagination, setPagination] = React.useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  const columns = [
    {
      key: "name",
      header: "Name",
      accessor: (r: Row) => r.name,
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      accessor: (r: Row) => r.email,
      sortable: true,
    },
    {
      key: "role",
      header: "Role",
      accessor: (r: Row) => r.role,
      sortable: true,
    },
    {
      key: "department",
      header: "Department",
      accessor: (r: Row) => r.department,
      sortable: true,
    },
    {
      key: "status",
      header: "Status",
      accessor: (r: Row) => r.status,
    },
  ];

  const filteredData = React.useMemo(() => {
    if (!searchValue.trim()) return ROWS_50;
    const q = searchValue.toLowerCase();
    return ROWS_50.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.role.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
    );
  }, [searchValue]);

  const paginatedData = React.useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return filteredData.slice(start, start + pagination.pageSize);
  }, [filteredData, pagination.page, pagination.pageSize]);

  const paginationState = React.useMemo(
    () => ({ ...pagination, total: filteredData.length }),
    [pagination, filteredData.length]
  );

  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-5xl">
      <Typography variant={TypographyVariantEnum.H2}>
        Table (50 Rows)
      </Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Full-height table with 50 rows, pagination at 10/20/30 per page, search,
        sorting, selection, and row actions.
      </Typography>

      <div className="w-full">
        <Table<Row>
          data={paginatedData}
          columns={columns}
          size="md"
          stickyHeader
          caption="50 users table"
          title="Users"
          description={`${filteredData.length} users total`}
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
          sort={sort}
          onSortChange={setSort}
          pagination={paginationState}
          onPageChange={(page) => setPagination((p) => ({ ...p, page }))}
          onPageSizeChange={(pageSize) =>
            setPagination((p) => ({ ...p, pageSize, page: 1 }))
          }
          pageSizeOptions={[10, 20, 30]}
        />
      </div>
    </section>
  );
}
