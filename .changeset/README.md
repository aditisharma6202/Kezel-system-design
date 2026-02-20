# Changesets

We use [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

- Run `pnpm changeset` to add a new changeset (describe your change and which packages to bump).
- Run `pnpm version` to consume changesets and update versions/changelogs.
- Run `pnpm publish` to build and publish packages to npm (requires `NPM_TOKEN`).

CI uses `changesets/action` to create version PRs and publish on push to `main`.
