# kezel-system-design

Monorepo for **kz-design-system** (React design system) and its documentation app.

## Structure

- `packages/ui` — Published as **kz-design-system** (Button, Dialog, Tailwind-based styles).
- `apps/docs` — Next.js App Router documentation and examples.

## Setup

```bash
pnpm install
```

## Scripts

| Script           | Description                   |
| ---------------- | ----------------------------- |
| `pnpm build`     | Build all packages and apps   |
| `pnpm typecheck` | Type-check all packages       |
| `pnpm lint`      | Lint all packages             |
| `pnpm format`    | Format with Prettier          |
| `pnpm changeset` | Add a changeset               |
| `pnpm version`   | Bump versions from changesets |
| `pnpm publish`   | Build and publish to npm      |
| `pnpm size`      | Run bundle size limits (UI)   |
| `pnpm --filter docs storybook` | Run Storybook (docs app) |
| `pnpm --filter docs build-storybook` | Build static Storybook   |

## Storybook

Component stories live in `apps/docs/stories/`. Run Storybook from the docs app:

```bash
pnpm --filter docs storybook
```

Then open http://localhost:6006. Build a static bundle with `pnpm --filter docs build-storybook` (output in `apps/docs/storybook-static/`).

## Using kz-design-system

```tsx
import { Button } from "kz-design-system/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "kz-design-system/dialog";
import "kz-design-system/styles.css";
```

## Docs

From repo root:

```bash
pnpm --filter docs dev
```

Open [http://localhost:3000](http://localhost:3000).

## Publishing

1. Add a changeset: `pnpm changeset`
2. Version: `pnpm version` (updates versions and changelogs)
3. Commit and push
4. CI (on push to `main`) runs typecheck, lint, build, size-limit, then **changesets/action** creates a version PR or publishes to npm using `NPM_TOKEN`.

# Adding theme

import { KezelThemeProvider, useKezelTheme, Theme, ThemeStyle } from "kz-design-system/theme";
import "kz-design-system/styles.css";

// Wrap app
<KezelThemeProvider defaultMode={Theme.Light} defaultThemeStyle={ThemeStyle.Neumorphic}>
  <App />
</KezelThemeProvider>

// In a component
function Panel() {
  const { mode, toggleMode, themeStyle, setThemeStyle } = useKezelTheme();
  return (
    <div className="bg-[rgb(var(--app-background))] text-[rgb(var(--text-primary))]">
      <button onClick={toggleMode}>Toggle {mode}</button>
      <p>Theme style: {themeStyle}</p>
    </div>
  );
}
