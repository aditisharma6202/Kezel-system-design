# Changesets

We use [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

- Run `pnpm changeset` to add a new changeset (describe your change and which packages to bump).
- Run `pnpm version` to consume changesets and update versions/changelogs.
- Run `pnpm publish` to build and publish packages to npm (requires `NPM_TOKEN`).

**CI (push to main):** `changesets/action` runs on every push to `main`. If there are unmerged changesets, it opens a **"chore: version packages"** PR that bumps versions and updates CHANGELOGs. **Merge that PR** to complete the release; after merging, the action runs again and publishes the new version(s) to npm. Ensure `NPM_TOKEN` is set in the repo secrets for publishing.
