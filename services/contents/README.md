# ACME Contents service

GraphQL service for contents subdomain.

This package uses:

- [`packages/db/contents`](../../packages/db/contents): Prisma client and models definitions

## Setup

```bash
pnpm install
```

## Available scripts

**Before starting or building server, remember to generate database client!**

```bash
pnpm -F @acme/contents-db generate
```

### Start

```bash
pnpm dev
```

### Build

```bash
pnpm build

# To --watch
pnpm build:watch
```

### Lint

```bash
pnpm lint

# To fix lint
pnpm lint:fix
```
