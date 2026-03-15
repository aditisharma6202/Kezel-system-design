import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Skeleton,
  TableSkeleton,
  CardSkeleton,
  Table,
  Button,
  ButtonVariant,
  ButtonSize,
  Card,
} from "kz-design-system";
import { DropdownButton } from "kz-design-system/dropdown";

const meta: Meta<typeof Skeleton> = {
  title: "Design System/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Skeleton loading placeholders for content that is still loading. Includes a base **Skeleton** primitive plus pre-built **TableSkeleton** and **CardSkeleton** composites.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const TextVariant: Story = {
  render: () => (
    <div
      style={{ width: 320, display: "flex", flexDirection: "column", gap: 8 }}
    >
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="60%" />
    </div>
  ),
};

export const MultipleLines: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Skeleton variant="text" lines={4} />
    </div>
  ),
};

export const Static: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}
    >
      <Skeleton variant="text" width="80%" static />
      <Skeleton variant="rectangular" width={120} height={48} static />
      <Skeleton variant="circular" width={48} height={48} static />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "With **static** prop, the shimmer animation is disabled. Useful for reduced-motion contexts or when you want a static placeholder.",
      },
    },
  },
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="rectangular" width={120} height={48} />
      <Skeleton variant="text" width={160} />
    </div>
  ),
};

export const TableDefault: Story = {
  name: "Table Skeleton",
  render: () => (
    <div style={{ width: 640 }}>
      <TableSkeleton />
    </div>
  ),
};

export const TableWithCheckboxAndActions: Story = {
  name: "Table Skeleton (Checkbox + Actions)",
  render: () => (
    <div style={{ width: 640 }}>
      <TableSkeleton columns={3} rows={6} showCheckbox showActions />
    </div>
  ),
};

export const TableSizes: Story = {
  name: "Table Skeleton Sizes",
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 24, width: 640 }}
    >
      <div>
        <p
          style={{
            marginBottom: 8,
            fontSize: 12,
            color: "var(--kz-color-text-tertiary)",
          }}
        >
          Small
        </p>
        <TableSkeleton size="sm" columns={3} rows={3} showPagination={false} />
      </div>
      <div>
        <p
          style={{
            marginBottom: 8,
            fontSize: 12,
            color: "var(--kz-color-text-tertiary)",
          }}
        >
          Medium
        </p>
        <TableSkeleton size="md" columns={3} rows={3} showPagination={false} />
      </div>
      <div>
        <p
          style={{
            marginBottom: 8,
            fontSize: 12,
            color: "var(--kz-color-text-tertiary)",
          }}
        >
          Large
        </p>
        <TableSkeleton size="lg" columns={3} rows={3} showPagination={false} />
      </div>
    </div>
  ),
};

type Row = { id: string; name: string; role: string; status: string };

function TableLoadingDemo() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Row[]>([]);

  const handleLoad = () => {
    setLoading(true);
    setData([]);
    setTimeout(() => {
      setData([
        { id: "1", name: "Alice", role: "Admin", status: "Active" },
        { id: "2", name: "Bob", role: "Editor", status: "Active" },
        { id: "3", name: "Carol", role: "Viewer", status: "Inactive" },
        { id: "4", name: "Dave", role: "Editor", status: "Active" },
        { id: "5", name: "Eve", role: "Admin", status: "Active" },
      ]);
      setLoading(false);
    }, 2000);
  };

  React.useEffect(() => {
    handleLoad();
  }, []);

  const columns = [
    { key: "name", header: "Name", accessor: (r: Row) => r.name },
    { key: "role", header: "Role", accessor: (r: Row) => r.role },
    { key: "status", header: "Status", accessor: (r: Row) => r.status },
  ];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 640 }}
    >
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Sm}
        onClick={handleLoad}
      >
        Reload Data
      </Button>
      {loading ? (
        <TableSkeleton columns={3} rows={5} showActions />
      ) : (
        <Table<Row>
          data={data}
          columns={columns}
          getRowId={(r) => r.id}
          size="md"
          title="Users"
          actions={() => (
            <DropdownButton
              trigger={{ iconOnly: true, ariaLabel: "Actions" }}
              items={[
                { key: "edit", label: "Edit", onSelect: () => {} },
                { key: "delete", label: "Delete", onSelect: () => {} },
              ]}
            />
          )}
          actionsHeader=""
        />
      )}
    </div>
  );
}

export const TableLoadingTransition: Story = {
  name: "Table Loading → Data",
  render: () => <TableLoadingDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Shows how TableSkeleton transitions to a real Table once data loads. Click **Reload Data** to simulate an API call.",
      },
    },
  },
};

export const CardDefault: Story = {
  name: "Card Skeleton",
  render: () => (
    <div style={{ width: 300 }}>
      <CardSkeleton />
    </div>
  ),
};

export const CardHorizontal: Story = {
  name: "Card Skeleton (Horizontal)",
  render: () => (
    <div style={{ width: 400 }}>
      <CardSkeleton layout="horizontal" />
    </div>
  ),
};

export const CardMedia: Story = {
  name: "Card Skeleton (Media)",
  render: () => (
    <div style={{ width: 300 }}>
      <CardSkeleton layout="media" lines={2} showFooter />
    </div>
  ),
};

export const CardGrid: Story = {
  name: "Card Skeleton Grid",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 16,
        width: 720,
      }}
    >
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  ),
};

function CardLoadingDemo() {
  const [loading, setLoading] = React.useState(true);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  React.useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 300 }}
    >
      <Button
        variant={ButtonVariant.Outline}
        size={ButtonSize.Sm}
        onClick={handleLoad}
      >
        Reload
      </Button>
      {loading ? (
        <CardSkeleton showFooter />
      ) : (
        <Card
          header={<span style={{ fontWeight: 600 }}>Project Alpha</span>}
          footer={
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant={ButtonVariant.Primary} size={ButtonSize.Sm}>
                View
              </Button>
              <Button variant={ButtonVariant.Outline} size={ButtonSize.Sm}>
                Edit
              </Button>
            </div>
          }
        >
          <p style={{ fontSize: 14, color: "var(--kz-color-text-secondary)" }}>
            A sample project card that appears after the skeleton loading state.
          </p>
        </Card>
      )}
    </div>
  );
}

export const CardLoadingTransition: Story = {
  name: "Card Loading → Data",
  render: () => <CardLoadingDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Shows CardSkeleton transitioning to a real Card. Click **Reload** to simulate.",
      },
    },
  },
};
