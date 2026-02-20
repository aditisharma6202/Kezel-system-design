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

| Script       | Description                    |
| ------------ | ------------------------------ |
| `pnpm build` | Build all packages and apps    |
| `pnpm typecheck` | Type-check all packages    |
| `pnpm lint`  | Lint all packages             |
| `pnpm format` | Format with Prettier          |
| `pnpm changeset` | Add a changeset           |
| `pnpm version` | Bump versions from changesets |
| `pnpm publish` | Build and publish to npm  |
| `pnpm size`  | Run bundle size limits (UI)   |

## Using kz-design-system

```tsx
import { Button } from "kz-design-system/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "kz-design-system/dialog";
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

Ensure `NPM_TOKEN` is set in the repo secrets for publishing.
