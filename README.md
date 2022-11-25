# Apollo Monorepo POC


Feature-heavy monorepo boilerplate for web and mobile apps, packed with tons of reusable code snippets and defined
through a strong software architecture. Kind of inspired by
[create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).

**See the [docs](./docs/README.md), for list of features, guides, explanations.**

Made with love by [Fabien Roy](https://github.com/ExiledNarwal28).

Check the [project board](https://github.com/orgs/treeview-app/projects/1/views/1) for what we want to do next.

## Status

| Name             | Type    | Status                                                                                                                                                                                                                                  |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| General          | General | [![General](https://github.com/treeview-app/treeview/actions/workflows/general.yml/badge.svg)](https://github.com/treeview-app/treeview/actions/workflows/general.yml)                                                                  |
| Web              | App     | [![Build Web App](https://github.com/treeview-app/treeview/actions/workflows/build-apps-web.yml/badge.svg)](https://github.com/treeview-app/treeview/actions/workflows/build-apps-web.yml)                                              |
| Database         | Package | [![Build Database Package](https://github.com/treeview-app/treeview/actions/workflows/build-packages-db.yml/badge.svg)](https://github.com/treeview-app/treeview/actions/workflows/build-packages-db.yml)                               |
| Theme            | Package | [![Build Theme Package](https://github.com/treeview-app/treeview/actions/workflows/build-packages-theme.yml/badge.svg)](https://github.com/treeview-app/treeview/actions/workflows/build-packages-theme.yml)                            |
| Web UI           | Package | [![Build Web UI Package](https://github.com/treeview-app/treeview/actions/workflows/build-packages-web-ui.yml/badge.svg)](https://github.com/treeview-app/treeview/actions/workflows/build-packages-web-ui.yml)                         |
| Web Forms        | Package | [![Build Web Forms Package](https://github.com/treeview-app/treeview/actions/workflows/build-packages-web-forms.yml/badge.svg)](https://github.com/treeview-app/treeview/actions/workflows/build-packages-web-forms.yml)                |
| Web Locales      | Package | [![Build Web Locales Package](https://github.com/treeview-app/treeview/actions/workflows/build-packages-web-locales.yml/badge.svg)](https://github.com/treeview-app/treeview/actions/workflows/build-packages-web-locales.yml)          |
| Web Storage      | Package | [![Build Web Storage Package](https://github.com/treeview-app/treeview/actions/workflows/build-packages-web-storage.yml/badge.svg)](https://github.com/treeview-app/treeview/actions/workflows/build-packages-web-storage.yml)          |

## Apps

- [`apps/web`](apps/docs): Next.js web app

## Services

- [`services/api-gateway`](services/api-gateway): GraphQL Apollo gateway for producing supergraph
- [`services/reviews`](services/reviews): GraphQL Apollo server for reviews service
- [`services/contents`](services/contents): GraphQL Apollo server for reviews service

## Packages

- [`packages/db`](packages/db): Prisma client and models definitions
- [`packages/theme`](packages/theme): Theme definition
- [`packages/web/ui`](packages/web/ui): React components for web app
- [`packages/web/forms`](packages/web/forms): React form-specific components for forms app
- [`packages/web/locales`](packages/web/locales): Locale translations for web app
- [`packages/web/storage`](packages/web/storage): Storage utilities for web app
- [`packages/config/eslint/`](packages/config/eslint): Shared eslint config
- [`packages/confgi/stylelint`](packages/config/stylelint): Shared stylelint config
- [`packages/config/tsconfig`](packages/config/tsconfig): Shared tsconfig

## Setup

### Install dependencies

```bash
pnpm install
```

### Prepare pre-commit hook

```bash
pnpm prepare
```

### Setup database

```bash
# Copy env file
cp packages/db/.env.example packages/db/.env

# Run database
docker compose up

# Generate Prisma client
pnpm db:generate

# If wanted, generate example data
pnpm db:seed
```

## Available scripts

### Run apps

```bash
pnpm dev

# Running a single app and its deps
pnpm dev:web
pnpm dev:mobile
```

### Run storybook

#### Web UI Library

Storybook will be running on [http://localhost:6006](http://localhost:6006);

```bash
pnpm storybook:web
```

#### Mobile UI Library

Storybook will be running on [Expo Go](https://expo.dev/client).

```bash
pnpm storybook:mobile
```

### Build all

```bash
pnpm build
```

### Lint all

```bash
pnpm lint

# To fix lint
pnpm lint:fix

# For file names
pnpm lint:ls

# To only apply to root
pnpm lint:root
pnpm lint:root:fix

# Fix lint on staged files
pnpm lint:staged
```

### Format

```bash
pnpm format

# To fix format
pnpm format:fix
```

### Cleanup files

```bash
pnpm yeet
```
