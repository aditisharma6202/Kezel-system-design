"use client";

import * as React from "react";
import {
  Button,
  ButtonVariant,
  ButtonSize,
  Typography,
  TypographyVariantEnum,
  Skeleton,
  TableSkeleton,
  CardSkeleton,
  Table,
  Card,
} from "kz-design-system";
import { DropdownButton } from "kz-design-system/dropdown";

type Row = { id: string; name: string; role: string; status: string };

function TableLoadingDemo() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Row[]>([]);

  const handleLoad = React.useCallback(() => {
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
  }, []);

  React.useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const columns = [
    { key: "name", header: "Name", accessor: (r: Row) => r.name },
    { key: "role", header: "Role", accessor: (r: Row) => r.role },
    { key: "status", header: "Status", accessor: (r: Row) => r.status },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
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

function CardLoadingDemo() {
  const [loading, setLoading] = React.useState(true);

  const handleLoad = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);

  React.useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <div className="flex flex-col gap-3" style={{ width: 300 }}>
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
            <div className="flex gap-2">
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
            A sample project card after loading.
          </p>
        </Card>
      )}
    </div>
  );
}

export default function SkeletonShowcase() {
  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-3xl">
      <Typography variant={TypographyVariantEnum.H2}>Skeleton</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Skeleton loading placeholders for content that is still loading.
        Includes a base Skeleton primitive plus pre-built TableSkeleton and
        CardSkeleton composites.
      </Typography>

      {/* Base primitives */}
      <Typography variant={TypographyVariantEnum.H3}>
        Base Primitives
      </Typography>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col gap-2">
          <Typography variant={TypographyVariantEnum.Label}>
            Text lines
          </Typography>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="60%" />
        </div>

        <div className="flex flex-col gap-2">
          <Typography variant={TypographyVariantEnum.Label}>
            Multi-line text
          </Typography>
          <Skeleton variant="text" lines={4} />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <Typography variant={TypographyVariantEnum.Label}>
              Circular
            </Typography>
            <Skeleton variant="circular" width={48} height={48} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <Typography variant={TypographyVariantEnum.Label}>
              Rectangular
            </Typography>
            <Skeleton variant="rectangular" width={120} height={48} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <Typography variant={TypographyVariantEnum.Label}>
              Static (no animation)
            </Typography>
            <Skeleton variant="rectangular" width={120} height={48} static />
          </div>
        </div>
      </div>

      {/* Table skeleton */}
      <Typography variant={TypographyVariantEnum.H3}>Table Skeleton</Typography>
      <div className="w-full">
        <TableSkeleton />
      </div>

      <Typography variant={TypographyVariantEnum.Label}>
        With Checkbox & Actions
      </Typography>
      <div className="w-full">
        <TableSkeleton columns={3} rows={4} showCheckbox showActions />
      </div>

      {/* Table sizes */}
      <Typography variant={TypographyVariantEnum.H3}>
        Table Skeleton Sizes
      </Typography>
      <div className="flex flex-col gap-6 w-full">
        <div>
          <Typography variant={TypographyVariantEnum.Caption}>Small</Typography>
          <TableSkeleton
            size="sm"
            columns={3}
            rows={3}
            showPagination={false}
          />
        </div>
        <div>
          <Typography variant={TypographyVariantEnum.Caption}>
            Medium
          </Typography>
          <TableSkeleton
            size="md"
            columns={3}
            rows={3}
            showPagination={false}
          />
        </div>
        <div>
          <Typography variant={TypographyVariantEnum.Caption}>Large</Typography>
          <TableSkeleton
            size="lg"
            columns={3}
            rows={3}
            showPagination={false}
          />
        </div>
      </div>

      {/* Table loading transition */}
      <Typography variant={TypographyVariantEnum.H3}>
        Table Loading → Data
      </Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Click Reload Data to simulate an API call (2s delay).
      </Typography>
      <div className="w-full">
        <TableLoadingDemo />
      </div>

      {/* Card skeleton */}
      <Typography variant={TypographyVariantEnum.H3}>Card Skeleton</Typography>
      <div className="flex flex-wrap gap-4 w-full">
        <div style={{ width: 300 }}>
          <Typography variant={TypographyVariantEnum.Label}>
            Standard
          </Typography>
          <CardSkeleton />
        </div>
        <div style={{ width: 400 }}>
          <Typography variant={TypographyVariantEnum.Label}>
            Horizontal
          </Typography>
          <CardSkeleton layout="horizontal" />
        </div>
        <div style={{ width: 300 }}>
          <Typography variant={TypographyVariantEnum.Label}>
            Media (with footer)
          </Typography>
          <CardSkeleton layout="media" lines={2} showFooter />
        </div>
      </div>

      {/* Card grid */}
      <Typography variant={TypographyVariantEnum.H3}>
        Card Skeleton Grid
      </Typography>
      <div
        className="w-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Card loading transition */}
      <Typography variant={TypographyVariantEnum.H3}>
        Card Loading → Data
      </Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Click Reload to simulate loading (2s delay).
      </Typography>
      <CardLoadingDemo />
    </section>
  );
}
