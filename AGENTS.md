# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
bun install              # Install dependencies
bun run dev              # Start all apps (web on :3001, server on :3000)
bun run dev:web          # Start only web app
bun run dev:server       # Start only server

# Code quality
bun run check            # Lint with Ultracite (type-aware)
bun run fix              # Auto-fix lint/format issues
bun run check-types      # TypeScript type checking (uses tsgo)

# Testing
bun run test:unit        # Run unit tests
bun run storybook        # Start Storybook on :6006

# Database
bun run db:push          # Push schema to database
bun run db:studio        # Open Drizzle Studio

# Deployment (Cloudflare)
bun run deploy           # Deploy via Alchemy
bun run destroy          # Tear down deployment
```

## Architecture

This is a monorepo using Bun workspaces with a Better-T-Stack architecture.

### Apps

- **`apps/web`** - React frontend using TanStack Start (SSR), TanStack Router, TailwindCSS v4, shadcn/ui components. Runs on Cloudflare Workers.
- **`apps/server`** - Hono API server with oRPC for type-safe endpoints. Exposes `/rpc` for RPC calls and `/api/auth/*` for Better-Auth.

### Packages

- **`packages/api`** - oRPC router definitions and procedures. Exports `publicProcedure` and `protectedProcedure` (requires auth).
- **`packages/auth`** - Better-Auth configuration
- **`packages/db`** - Drizzle ORM with D1/SQLite schema. Schema lives in `src/schema/`.
- **`packages/env`** - Typed environment variables (separate exports for `server` and `web`)
- **`packages/config`** - Shared TypeScript config
- **`packages/infra`** - Alchemy deployment configuration

### Data Flow

1. Web app uses `@orpc/tanstack-query` to call server via `orpc` client (`apps/web/src/utils/orpc.ts`)
2. Server handles requests in `apps/server/src/index.ts`, routing to oRPC handlers
3. Procedures in `packages/api` access database via `@todo/db` and auth via `@todo/auth`

### Type Safety

The stack provides end-to-end type safety:

- oRPC generates typed client from server router (`AppRouter` type)
- Drizzle provides typed database queries
- Zod v4 for runtime validation with `@orpc/zod`

## Conventions

- Use Bun for all operations (not npm/pnpm/node)
- Use `tsgo` for type checking (experimental native TypeScript)
- Pre-commit hook runs `bun fix` via Lefthook
- Follow conventional commit format: `type(scope): description`
