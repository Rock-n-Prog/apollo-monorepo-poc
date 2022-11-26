# ACME API Gateway

Apollo Federation supergraph generator and API Gateway.

Consumes the following services:

- [`services/contents`](../contents)
- [`services/reviews`](../reviews)

## Setup

```bash
pnpm install

# Copy env vars
pnpm env:local
```

## Start server

```bash
pnpm dev
```

## Available scripts

### Lint

```bash
pnpm lint

# To fix lint
pnpm lint:fix
```
