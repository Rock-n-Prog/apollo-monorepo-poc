# ACME Web App

Next.js app for ACME.

This app uses:

- [`packages/web/ui`](../../packages/web/ui): UI library
- [`packages/web/forms`](../../packages/web/forms): Form field logic
- [`packages/web/locales`](../../packages/web/locales): Locale translations library

## Setup

```bash
pnpm install

# Copy env vars
pnpm env:local
```

## Available scripts

### Generate GraphQL types and hooks

```bash
pnpm generate

# To --watch
pnpm generate:watch
```

### Run

```bash
pnpm dev
pnpm start # server
```

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint

# To fix lint
pnpm lint:fix
```
