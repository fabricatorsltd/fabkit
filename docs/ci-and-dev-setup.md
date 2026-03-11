# CI and local dev setup (GitHub Packages)

This repo publishes the package to **GitHub Packages** (npm registry: `npm.pkg.github.com`).


## Local development

### Requirements

- Node.js 20+
- pnpm

Recommended:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Install dependencies:

```bash
pnpm install
```

Run checks/build:

```bash
pnpm run check
pnpm run build
```


### Installing from GitHub Packages

GitHub Packages requires authentication for npm installs.

1) Create a GitHub Personal Access Token (PAT) with:

- `read:packages`

2) Add an `.npmrc` (user-level recommended: `~/.npmrc`):

```ini
@fabricatorsltd:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

3) Install:

```bash
pnpm add @fabricatorsltd/fabkit
```


## CI (GitHub Actions)

### What triggers publish

The workflow publishes **only** on:

- `release: published`


### Required permissions

The publish job uses `GITHUB_TOKEN` and needs:

- `packages: write`
- `contents: read`


### Workflow behavior

- `check` job runs `pnpm install`, `pnpm run check`, `pnpm run build`.
- `publish` job runs on release publish and executes `pnpm publish` to GitHub Packages.


## Making a release (recommended flow)

1) Bump version in `package.json`.

2) Merge to `main`.

3) Create a GitHub Release with a `vX.Y.Z` tag.

That release event triggers the publish job.
