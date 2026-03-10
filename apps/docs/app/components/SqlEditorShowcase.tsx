"use client";

import * as React from "react";
import { Typography, TypographyVariantEnum, SqlEditor } from "kz-design-system";
import type { SqlEditorQueryResult } from "kz-design-system";

/* ── Sample data (acts as our in-memory "database") ── */

type Row = Record<string, string | number>;

const TABLES: Record<string, { columns: string[]; rows: Row[] }> = {
  users: {
    columns: ["id", "name", "role", "status", "email"],
    rows: [
      {
        id: 1,
        name: "Alice",
        role: "Admin",
        status: "Active",
        email: "alice@example.com",
      },
      {
        id: 2,
        name: "Bob",
        role: "Editor",
        status: "Active",
        email: "bob@example.com",
      },
      {
        id: 3,
        name: "Carol",
        role: "Viewer",
        status: "Inactive",
        email: "carol@example.com",
      },
      {
        id: 4,
        name: "Dave",
        role: "Editor",
        status: "Active",
        email: "dave@example.com",
      },
      {
        id: 5,
        name: "Eve",
        role: "Admin",
        status: "Active",
        email: "eve@example.com",
      },
      {
        id: 6,
        name: "Frank",
        role: "Viewer",
        status: "Inactive",
        email: "frank@example.com",
      },
      {
        id: 7,
        name: "Grace",
        role: "Editor",
        status: "Active",
        email: "grace@example.com",
      },
      {
        id: 8,
        name: "Henry",
        role: "Viewer",
        status: "Active",
        email: "henry@example.com",
      },
    ],
  },
  orders: {
    columns: ["id", "user_id", "product", "amount", "date"],
    rows: [
      {
        id: 1,
        user_id: 1,
        product: "Widget A",
        amount: 29.99,
        date: "2025-01-15",
      },
      {
        id: 2,
        user_id: 2,
        product: "Widget B",
        amount: 49.99,
        date: "2025-02-10",
      },
      {
        id: 3,
        user_id: 1,
        product: "Widget C",
        amount: 19.99,
        date: "2025-03-05",
      },
      {
        id: 4,
        user_id: 3,
        product: "Widget A",
        amount: 29.99,
        date: "2025-03-12",
      },
      {
        id: 5,
        user_id: 5,
        product: "Widget B",
        amount: 49.99,
        date: "2025-04-01",
      },
      {
        id: 6,
        user_id: 4,
        product: "Widget D",
        amount: 99.99,
        date: "2025-04-20",
      },
    ],
  },
};

/* ── Tiny SQL parser (SELECT only, no external deps) ── */

function executeQuery(sql: string): SqlEditorQueryResult {
  const start = performance.now();

  try {
    const trimmed = sql.trim().replace(/;$/, "").trim();
    if (!trimmed) {
      return { columns: [], rows: [], message: "Empty query", error: true };
    }

    const selectMatch = trimmed.match(
      /^SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+(\w+)(?:\s+(ASC|DESC))?)?(?:\s+LIMIT\s+(\d+))?$/i
    );

    if (!selectMatch) {
      return {
        columns: [],
        rows: [],
        message: "Only SELECT queries are supported. Try: SELECT * FROM users",
        error: true,
      };
    }

    const [
      ,
      selectClause,
      tableName,
      whereClause,
      orderCol,
      orderDir,
      limitStr,
    ] = selectMatch;
    const table = TABLES[tableName.toLowerCase()];

    if (!table) {
      const available = Object.keys(TABLES).join(", ");
      return {
        columns: [],
        rows: [],
        message: `Table "${tableName}" not found. Available tables: ${available}`,
        error: true,
      };
    }

    let selectedColumns: string[];
    if (selectClause.trim() === "*") {
      selectedColumns = table.columns;
    } else {
      selectedColumns = selectClause
        .split(",")
        .map((c) => c.trim().toLowerCase());
      for (const col of selectedColumns) {
        if (!table.columns.includes(col)) {
          return {
            columns: [],
            rows: [],
            message: `Column "${col}" not found in "${tableName}". Available: ${table.columns.join(", ")}`,
            error: true,
          };
        }
      }
    }

    let resultRows = [...table.rows];

    if (whereClause) {
      const condMatch = whereClause.match(
        /^(\w+)\s*(=|!=|<>|>|<|>=|<=|LIKE)\s*(?:'([^']*)'|(\d+(?:\.\d+)?))\s*$/i
      );
      if (!condMatch) {
        return {
          columns: [],
          rows: [],
          message: `Cannot parse WHERE clause: "${whereClause}". Supported: column = 'value', column > number, column LIKE '%pattern%'`,
          error: true,
        };
      }
      const [, condCol, operator, strVal, numVal] = condMatch;
      const col = condCol.toLowerCase();
      if (!table.columns.includes(col)) {
        return {
          columns: [],
          rows: [],
          message: `Column "${col}" not found in WHERE clause.`,
          error: true,
        };
      }

      const compareVal = strVal !== undefined ? strVal : Number(numVal);
      const op = operator.toUpperCase();

      resultRows = resultRows.filter((row) => {
        const cellVal = row[col];
        if (op === "LIKE" && typeof compareVal === "string") {
          const pattern = compareVal.replace(/%/g, ".*").replace(/_/g, ".");
          return new RegExp(`^${pattern}$`, "i").test(String(cellVal));
        }
        if (op === "=" || op === "==")
          return String(cellVal) === String(compareVal);
        if (op === "!=" || op === "<>")
          return String(cellVal) !== String(compareVal);
        if (op === ">") return Number(cellVal) > Number(compareVal);
        if (op === "<") return Number(cellVal) < Number(compareVal);
        if (op === ">=") return Number(cellVal) >= Number(compareVal);
        if (op === "<=") return Number(cellVal) <= Number(compareVal);
        return true;
      });
    }

    if (orderCol) {
      const col = orderCol.toLowerCase();
      const dir = orderDir?.toUpperCase() === "DESC" ? -1 : 1;
      resultRows.sort((a, b) => {
        const va = a[col];
        const vb = b[col];
        if (typeof va === "number" && typeof vb === "number")
          return (va - vb) * dir;
        return String(va).localeCompare(String(vb)) * dir;
      });
    }

    if (limitStr) {
      resultRows = resultRows.slice(0, Number(limitStr));
    }

    const projectedRows = resultRows.map((row) => {
      const projected: Row = {};
      for (const col of selectedColumns) {
        projected[col] = row[col];
      }
      return projected;
    });

    const durationMs = performance.now() - start;
    return {
      columns: selectedColumns,
      rows: projectedRows,
      message: `${projectedRows.length} row${projectedRows.length !== 1 ? "s" : ""} returned in ${durationMs.toFixed(1)}ms`,
    };
  } catch (e) {
    return {
      columns: [],
      rows: [],
      message: `Error: ${e instanceof Error ? e.message : String(e)}`,
      error: true,
    };
  }
}

/* ── Showcase ── */

const SAMPLE_QUERIES = [
  "SELECT * FROM users",
  "SELECT name, role FROM users WHERE status = 'Active'",
  "SELECT * FROM orders WHERE amount > 30 ORDER BY amount DESC",
  "SELECT * FROM users WHERE role = 'Admin'",
  "SELECT * FROM orders LIMIT 3",
  "SELECT name, email FROM users WHERE name LIKE 'A%'",
];

export default function SqlEditorShowcase() {
  const [sql, setSql] = React.useState(
    "SELECT * FROM users WHERE status = 'Active'"
  );
  const [result, setResult] = React.useState<SqlEditorQueryResult | null>(null);

  return (
    <section className="flex flex-col items-center gap-6 w-full max-w-3xl">
      <Typography variant={TypographyVariantEnum.H2}>SQL Editor</Typography>
      <Typography variant={TypographyVariantEnum.Caption}>
        Write SQL queries against in-memory tables. Press Cmd/Ctrl + Enter or
        click Run to execute. Available tables: <strong>users</strong>,{" "}
        <strong>orders</strong>.
      </Typography>

      {/* Quick query buttons */}
      <div className="flex flex-wrap gap-2 w-full">
        {SAMPLE_QUERIES.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => {
              setSql(q);
              setResult(executeQuery(q));
            }}
            className="px-2 py-1 text-xs font-mono rounded-[var(--kz-component-input-radius)] border border-[var(--kz-component-input-border)] bg-[var(--kz-component-input-bg)] text-[var(--kz-component-input-text)] hover:border-[var(--kz-component-input-border-focus)] transition-colors cursor-pointer"
          >
            {q.length > 45 ? q.slice(0, 45) + "..." : q}
          </button>
        ))}
      </div>

      {/* SqlEditor component from the design system */}
      <div className="w-full">
        <SqlEditor
          value={sql}
          onValueChange={setSql}
          onExecute={(query) => setResult(executeQuery(query))}
          result={result}
          placeholder="SELECT * FROM users WHERE ..."
          rows={5}
        />
      </div>

      {/* Schema reference */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(TABLES).map(([name, table]) => (
          <div
            key={name}
            className="rounded-[var(--kz-component-input-radius)] border border-[var(--kz-component-input-border)] bg-[var(--kz-component-input-bg)] p-3"
            style={{ boxShadow: "var(--kz-component-input-shadow)" }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-wide mb-2"
              style={{ color: "var(--kz-component-input-placeholder)" }}
            >
              {name}
            </div>
            <div className="flex flex-wrap gap-1">
              {table.columns.map((col) => (
                <span
                  key={col}
                  className="px-2 py-0.5 text-xs font-mono rounded-[var(--kz-component-input-container-radius)] border border-[var(--kz-component-input-container-border)]"
                  style={{ color: "var(--kz-component-input-text)" }}
                >
                  {col}
                </span>
              ))}
            </div>
            <div
              className="mt-1 text-xs"
              style={{ color: "var(--kz-component-input-placeholder)" }}
            >
              {table.rows.length} rows
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
