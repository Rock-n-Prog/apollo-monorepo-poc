# Apollo Monorepo POC

Example monorepo to use Apollo Federation in a Turborepo codebase.

**See the [docs](./docs/README.md), for list of features, guides, explanations.**

Made with love by [Fabien Roy](https://github.com/ExiledNarwal28).

## Status

| Name              | Type    | Status                                                                                                                                                                                                                                                   |
| ----------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| General           | General | [![General](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/general.yml/badge.svg)](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/general.yml)                                                               |
| Web               | App     | [![Build Web App](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-apps-web.yml/badge.svg)](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-apps-web.yml)                                           |
| API Gateway       | Service | [![Build API Gateway](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-services-api-gateway.yml/badge.svg)](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-services-api-gateway.yml)               |
| Contents Service  | Service | [![Build Contents Service Gateway](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-services-contents.yml/badge.svg)](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-services-contents.yml)        |
| Reviews Service   | Service | [![Build Reviews Service Gateway](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-services-reviews.yml/badge.svg)](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-services-reviews.yml)           |
| Contents Database | Package | [![Build Contents Database Package](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-contents-db.yml/badge.svg)](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-contents-db.yml) |
| Reviews Database  | Package | [![Build Reviews Database Package](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-reviews-db.yml/badge.svg)](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-reviews-db.yml)    |
| Theme             | Package | [![Build Theme Package](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-theme.yml/badge.svg)](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-theme.yml)                         |
| Web UI            | Package | [![Build Web UI Package](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-web-ui.yml/badge.svg)](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-web-ui.yml)                      |
| Web Forms         | Package | [![Build Web Forms Package](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-web-forms.yml/badge.svg)](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-web-forms.yml)             |
| Web Locales       | Package | [![Build Web Locales Package](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-web-locales.yml/badge.svg)](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-web-locales.yml)       |
| Web Storage       | Package | [![Build Web Storage Package](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-web-storage.yml/badge.svg)](https://github.com/Rock-n-Prog/apollo-monorepo-poc/actions/workflows/build-packages-web-storage.yml)       |

## Apps

- [`apps/web`](apps/docs): Next.js web app

## Services

- [`services/api-gateway`](services/api-gateway): GraphQL Apollo gateway for producing supergraph
- [`services/reviews`](services/reviews): GraphQL Apollo server for reviews service
- [`services/contents`](services/contents): GraphQL Apollo server for reviews service

## Packages

- [`packages/theme`](packages/theme): Theme definition
- [`packages/db/contents`](packages/db/contents): Prisma client and models definitions for contents data
- [`packages/db/reviews`](packages/db/reviews): Prisma client and models definitions for reviews data
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
pnpm env:local

# Run databases
docker compose up

# Generate Prisma client
pnpm db:generate

# Apply migrations
pnpm db:migrate:dev

# If wanted, generate example data
pnpm db:seed
```

### Setup web GraphQL types and hooks

Be sure that services and API Gateway are running first!

```bash
pnpm web:generate
```

## Available scripts

### Run services

```bash
pnpm dev

# Running a single app and its deps
pnpm dev:web
pnpm dev:mobile
```

### Run services / apps

```bash
pnpm dev

pnpm dev:services

# Run after services
pnpm dev:api
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
