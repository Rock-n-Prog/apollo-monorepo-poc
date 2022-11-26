# ACME Reviews service

GraphQL service for reviews subdomain.

This package uses:

- [`packages/db/reviews`](../../packages/db/reviews): Prisma client and models definitions

## Setup

```bash
pnpm install

# Copy env vars
pnpm env:local
```

## Available scripts

**Before starting or building server, remember to generate database client!**

```bash
pnpm -F @acme/reviews-db generate
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
