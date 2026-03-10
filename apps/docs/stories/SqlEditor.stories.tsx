import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SqlEditor } from "kz-design-system";
import type { SqlEditorQueryResult } from "kz-design-system";

const meta: Meta<typeof SqlEditor> = {
  title: "Design System/SqlEditor",
  component: SqlEditor,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A SQL editor with monospace textarea, toolbar, Cmd/Ctrl+Enter execution, Tab-to-indent, status bar, and results table. Adapts to Standard/Neumorphic and Light/Dark themes using existing design tokens.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    rows: { control: "number" },
    placeholder: { control: "text" },
    toolbarLabel: { control: "text" },
    runButtonLabel: { control: "text" },
    resultsMaxHeight: { control: "text" },
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

export default meta;

type Story = StoryObj<typeof SqlEditor>;

/* ── Stateful wrapper ── */

function SqlEditorWithState({
  initialValue = "SELECT * FROM users;",
  initialResult,
  ...props
}: Partial<React.ComponentProps<typeof SqlEditor>> & {
  initialValue?: string;
  initialResult?: SqlEditorQueryResult | null;
}) {
  const [value, setValue] = React.useState(initialValue);
  const [result, setResult] = React.useState<SqlEditorQueryResult | null>(
    initialResult ?? null
  );

  const handleExecute = React.useCallback((sql: string) => {
    // Simulate a query result
    setResult({
      columns: ["id", "name", "role"],
      rows: [
        { id: 1, name: "Alice", role: "Admin" },
        { id: 2, name: "Bob", role: "Editor" },
        { id: 3, name: "Carol", role: "Viewer" },
      ],
      message: `3 rows returned — ${sql.length} chars`,
    });
  }, []);

  return (
    <SqlEditor
      value={value}
      onValueChange={setValue}
      onExecute={handleExecute}
      result={result}
      {...props}
    />
  );
}

/* ── Stories ── */

export const Default: Story = {
  render: () => <SqlEditorWithState />,
  parameters: {
    docs: {
      description: {
        story:
          "Default SQL editor. Click **Run** or press **Cmd/Ctrl+Enter** to execute. Press **Tab** to insert spaces.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <p
          className="mb-2 text-sm font-medium"
          style={{ color: "var(--kz-color-text-secondary)" }}
        >
          Small
        </p>
        <SqlEditorWithState initialValue="SELECT 1;" size="sm" rows={3} />
      </div>
      <div>
        <p
          className="mb-2 text-sm font-medium"
          style={{ color: "var(--kz-color-text-secondary)" }}
        >
          Medium (default)
        </p>
        <SqlEditorWithState
          initialValue="SELECT * FROM users LIMIT 10;"
          size="md"
        />
      </div>
      <div>
        <p
          className="mb-2 text-sm font-medium"
          style={{ color: "var(--kz-color-text-secondary)" }}
        >
          Large
        </p>
        <SqlEditorWithState
          initialValue="SELECT u.name, o.total\nFROM users u\nJOIN orders o ON o.user_id = u.id;"
          size="lg"
          rows={6}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Three size variants: **sm**, **md** (default), and **lg**.",
      },
    },
  },
};

export const WithResult: Story = {
  render: () => (
    <SqlEditorWithState
      initialValue="SELECT * FROM users WHERE role = 'Admin';"
      initialResult={{
        columns: ["id", "name", "email", "role"],
        rows: [
          { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
          { id: 5, name: "Eve", email: "eve@example.com", role: "Admin" },
        ],
        message: "2 rows returned in 12ms",
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Pre-populated with a query result. The results table scrolls when content exceeds **resultsMaxHeight**.",
      },
    },
  },
};

export const ErrorResult: Story = {
  render: () => (
    <SqlEditorWithState
      initialValue="SELCT * FORM users;"
      initialResult={{
        columns: [],
        rows: [],
        message: 'Syntax error near "SELCT"',
        error: true,
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When `result.error` is true, the status bar shows the message in red.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <SqlEditorWithState
      initialValue="-- Read-only query"
      disabled
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The editor and Run button are disabled. Users cannot type or execute.",
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <SqlEditorWithState
      initialValue="SELECT * FROM large_table;"
      loading
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "While loading, the Run button shows \"Running…\" and is disabled.",
      },
    },
  },
};

export const CustomToolbar: Story = {
  render: () => (
    <SqlEditorWithState
      initialValue="SELECT * FROM orders;"
      toolbarLabel="Analytics"
      runButtonLabel="Execute"
      toolbarRight={
        <span
          style={{
            fontSize: 11,
            color: "var(--kz-component-input-placeholder)",
          }}
        >
          Cmd+Enter to run
        </span>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Customize toolbar label, run button text, and add extra content via **toolbarRight**.",
      },
    },
  },
};
