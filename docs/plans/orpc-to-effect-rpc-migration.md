# Migration Plan: oRPC to @effect/rpc with @effect-atom/atom-react

## Overview

Replace oRPC with @effect/rpc for type-safe RPC, using @effect-atom/atom-react for React state management instead of TanStack Query. Follows folder structure conventions from effect-api-example.

## Key Decisions

| Decision           | Choice                  | Rationale                                                      |
| ------------------ | ----------------------- | -------------------------------------------------------------- |
| State management   | @effect-atom/atom-react | Effect ecosystem consistency                                   |
| Auth service down  | Fail closed (503)       | Security over availability                                     |
| Serialization      | NDJSON                  | Effect RPC default, enables streaming                          |
| Migration strategy | Big bang                | Small codebase, cleaner result                                 |
| Loading states     | Result.match            | Effect's Result type sufficient                                |
| Route auth guards  | Loader pattern          | Check before render via Better-Auth SDK                        |
| Auth client        | Keep separate           | Better-Auth SDK for signIn/signOut, RPC for session validation |
| Testing            | @effect/vitest          | Effect-specific test utilities                                 |
| Bundle size        | Not a concern           | Paid Cloudflare tier                                           |

## Future Enhancements

- [ ] Sentry/OpenTelemetry integration for Effect error logging
- [ ] Auto-refetch on focus (evaluate if needed)
- [ ] Additional RPC endpoints as features are built

## Dependencies

### Remove

```
@orpc/client, @orpc/openapi, @orpc/server, @orpc/zod, @orpc/tanstack-query
@tanstack/react-query, @tanstack/react-query-devtools
```

### Add (to root package.json catalog)

```json
{
  "effect": "^3.19.0",
  "@effect/rpc": "^0.73.0",
  "@effect/platform": "^0.94.0",
  "@effect/vitest": "^0.22.0",
  "@effect-atom/atom-react": "^0.4.4"
}
```

> **Note:** `@effect/rpc-http` is legacy - HTTP functionality is now built into `@effect/rpc` via `RpcClient.layerProtocolHttp`.

---

## New File Structure (following effect-api-example conventions)

### packages/api/src/definition/

```
index.ts                           # Re-exports all definitions
todo-api.ts                        # Main RpcGroup.merge(...) export
groups/
  index.ts                         # Re-exports all groups
  health-group.ts                  # HealthRpc group (public)
  private-group.ts                 # PrivateRpc group (authenticated)
middleware/
  better-auth-middleware.ts        # Auth middleware definition
schemas/
  user.ts                          # User schema definitions
  errors.ts                        # Shared error types
```

### apps/server/src/api/

```
groups/
  index.ts                         # Exports HttpGroupsLive layer
  health-group-live.ts             # Health check handler implementation
  private-group-live.ts            # Private data handler implementation
middleware/
  better-auth-middleware-live.ts   # Auth middleware implementation
```

### apps/server/src/

```
main.ts                            # Server entry point with RpcServer
```

### apps/web/src/

```
utils/
  rpc-client.ts                    # RPC protocol layer setup
hooks/
  use-rpc.ts                       # AtomRpc.Tag client + query/mutation atoms
providers/
  registry-provider.tsx            # RegistryProvider wrapper
```

---

## Implementation Steps

### Phase 1: Setup Effect Infrastructure

1. Add Effect dependencies to package.json catalog
2. Create directory structure in `packages/api/src/definition/`

### Phase 2: Define RPC Schemas (packages/api/src/definition/)

1. Create `schemas/errors.ts` - UnauthorizedError
2. Create `schemas/user.ts` - User, Session schemas
3. Create `middleware/better-auth-middleware.ts` - Auth middleware definition
4. Create `groups/health-group.ts` - HealthRpc (public)
5. Create `groups/private-group.ts` - PrivateRpc with AuthMiddleware
6. Create `groups/index.ts` - Re-exports
7. Create `todo-api.ts` - RpcGroup.merge(...)
8. Create `index.ts` - Re-export all

### Phase 3: Implement Server Handlers (apps/server/src/api/)

1. Create `middleware/better-auth-middleware-live.ts` - Better-Auth integration
2. Create `groups/health-group-live.ts` - health check handler
3. Create `groups/private-group-live.ts` - private data handler
4. Create `groups/index.ts` - RpcGroupsLive layer composition
5. Update `main.ts` - mount RPC server with Hono

### Phase 4: Setup Client (apps/web/src/)

1. Create `utils/rpc-client.ts` - RPC protocol layer
2. Create `hooks/use-rpc.ts` - AtomRpc.Tag client with query atoms
3. Create `providers/registry-provider.tsx` - RegistryProvider wrapper

### Phase 5: Migrate React Components

1. Update `routes/__root.tsx` - replace QueryClientProvider with RegistryProvider
2. Update `routes/index.tsx` - useAtomValue(healthCheckAtom) with Result.match
3. Update `routes/dashboard.tsx` - useAtomValue(privateDataAtom) with Result.match
4. Keep route loaders using Better-Auth SDK for auth checks

### Phase 6: Cleanup

1. Remove oRPC files from packages/api and apps/server
2. Remove oRPC client and TanStack Query from apps/web
3. Remove unused dependencies from package.json files

---

## Key Code Patterns

### RPC Group Definition (packages/api/src/definition/groups/health-group.ts)

```typescript
import { Rpc, RpcGroup } from "@effect/rpc"
import { Schema as S } from "effect"

export class HealthGroup extends RpcGroup.make(
  Rpc.make("healthCheck", {
    success: S.Struct({
      status: S.Literal("ok"),
      timestamp: S.DateTimeUtc,
    }),
  })
) {}
```

### Auth Middleware Definition (packages/api/src/definition/middleware/better-auth-middleware.ts)

```typescript
import { RpcMiddleware } from "@effect/rpc"
import { Context, Schema as S } from "effect"
import { Session } from "../schemas/user"
import { UnauthorizedError } from "../schemas/errors"

export class BetterAuthContext extends Context.Tag("BetterAuthContext")<
  BetterAuthContext,
  { readonly session: Session }
>() {}

export class BetterAuthMiddleware extends RpcMiddleware.Tag<BetterAuthMiddleware>()(
  "BetterAuthMiddleware",
  {
    failure: UnauthorizedError,
    provides: BetterAuthContext,
  }
) {}
```

### Protected RPC Group (packages/api/src/definition/groups/private-group.ts)

```typescript
import { Rpc, RpcGroup } from "@effect/rpc"
import { Schema as S } from "effect"
import { BetterAuthMiddleware } from "../middleware/better-auth-middleware"
import { User } from "../schemas/user"
import { UnauthorizedError } from "../schemas/errors"

export class PrivateDataResponse extends S.Class<PrivateDataResponse>("PrivateDataResponse")({
  message: S.String,
  user: User,
}) {}

export class PrivateGroup extends RpcGroup.make(
  Rpc.make("privateData", {
    success: PrivateDataResponse,
    error: UnauthorizedError,
  })
).middleware(BetterAuthMiddleware) {}
```

### Combined API (packages/api/src/definition/todo-api.ts)

```typescript
import { HealthGroup } from "./groups/health-group"
import { PrivateGroup } from "./groups/private-group"

// merge is an instance method, not static
export const TodoApi = HealthGroup.merge(PrivateGroup)
export type TodoApi = typeof TodoApi
```

### Handler Implementation (apps/server/src/api/groups/health-group-live.ts)

```typescript
import { DateTime, Effect } from "effect"
import { HealthGroup } from "@todo/api/definition"

export const HealthGroupLive = HealthGroup.toLayer({
  healthCheck: () =>
    Effect.succeed({
      status: "ok" as const,
      timestamp: DateTime.unsafeNow(),
    }),
})
```

### Auth Middleware Implementation (apps/server/src/api/middleware/better-auth-middleware-live.ts)

```typescript
import { Effect, Layer } from "effect"
import { RpcMiddleware } from "@effect/rpc"
import { BetterAuthMiddleware, BetterAuthContext, UnauthorizedError } from "@todo/api/definition"
import { auth } from "@todo/auth"

export const BetterAuthMiddlewareLive = Layer.effect(
  BetterAuthMiddleware,
  Effect.gen(function* () {
    return RpcMiddleware.of(BetterAuthMiddleware)({
      provide: Effect.gen(function* () {
        const headers = yield* RpcMiddleware.Headers
        const session = yield* Effect.tryPromise({
          try: () => auth.api.getSession({ headers: new Headers(headers) }),
          catch: () => new UnauthorizedError({ message: "Failed to validate session" }),
        })
        if (!session?.user) {
          return yield* new UnauthorizedError({ message: "Not authenticated" })
        }
        return BetterAuthContext.of({ session: convertToSession(session) })
      }),
    })
  })
)
```

### Groups Layer Composition (apps/server/src/api/groups/index.ts)

```typescript
import { Layer } from "effect"
import { HealthGroupLive } from "./health-group-live"
import { PrivateGroupLive } from "./private-group-live"
import { BetterAuthMiddlewareLive } from "../middleware/better-auth-middleware-live"

export const RpcGroupsLive = Layer.mergeAll(HealthGroupLive, PrivateGroupLive).pipe(
  Layer.provide(BetterAuthMiddlewareLive)
)
```

### Server Entry Point (apps/server/src/main.ts)

```typescript
import { RpcServer, RpcSerialization } from "@effect/rpc"
import { HttpApp } from "@effect/platform"
import { Layer, ManagedRuntime } from "effect"
import { Hono } from "hono"
import { TodoApi } from "@todo/api/definition"
import { RpcGroupsLive } from "./api/groups"

const app = new Hono()

// Create RPC web handler
const ServerLayer = RpcGroupsLive.pipe(
  Layer.provide(RpcSerialization.layerNdjson)
)

const runtime = ManagedRuntime.make(ServerLayer)

app.post("/rpc/*", async (c) => {
  const httpApp = await runtime.runPromise(RpcServer.toHttpApp(TodoApi))
  const handler = HttpApp.toWebHandler(httpApp)
  return handler(c.req.raw)
})
```

### RPC Client Setup (apps/web/src/utils/rpc-client.ts)

```typescript
import { Layer } from "effect"
import { RpcClient, RpcSerialization } from "@effect/rpc"
import { FetchHttpClient } from "@effect/platform"
import { env } from "@todo/env/web"

// Protocol layer for HTTP transport
export const RpcProtocolLayer = RpcClient.layerProtocolHttp({
  url: `${env.VITE_SERVER_URL}/rpc`,
  fetchOptions: { credentials: "include" },
}).pipe(
  Layer.provide(FetchHttpClient.layer),
  Layer.provide(RpcSerialization.layerNdjson)
)
```

### RPC Atom Client (apps/web/src/hooks/use-rpc.ts)

```typescript
import { AtomRpc } from "@effect-atom/atom"
import { TodoApi } from "@todo/api/definition"
import { RpcProtocolLayer } from "@/utils/rpc-client"

// AtomRpc.Tag uses `protocol` layer (not runtime)
export class TodoClient extends AtomRpc.Tag<TodoClient>()(
  "TodoClient",
  {
    group: TodoApi,
    protocol: RpcProtocolLayer,
  }
) {}

// Queries - use reactivityKeys for cache invalidation
export const healthCheckAtom = TodoClient.query("healthCheck", undefined, {
  reactivityKeys: ["health"],
})

export const privateDataAtom = TodoClient.query("privateData", undefined, {
  reactivityKeys: ["user"],
})

// Example mutation pattern (for future use):
// export const updateUserAtom = TodoClient.mutation("updateUser")
// Usage: updateUser({ payload: data, reactivityKeys: ["user"] })
```

### Registry Provider (apps/web/src/providers/registry-provider.tsx)

```typescript
import { RegistryProvider } from "@effect-atom/atom-react"

export function AtomRegistryProvider({ children }: { children: React.ReactNode }) {
  return (
    <RegistryProvider defaultIdleTTL={400}>
      {children}
    </RegistryProvider>
  )
}
```

### React Component Usage (apps/web/src/routes/index.tsx)

```typescript
import { useAtomValue } from "@effect-atom/atom-react"
import { Result } from "effect"
import { healthCheckAtom } from "@/hooks/use-rpc"

function HomeComponent() {
  const healthCheck = useAtomValue(healthCheckAtom)

  return (
    <div>
      {Result.match(healthCheck, {
        onSuccess: (data) => (
          <span className="text-green-500">Connected: {data.status}</span>
        ),
        onFailure: (error) => (
          <span className="text-red-500">Error: {error._tag}</span>
        ),
      })}
    </div>
  )
}
```

### Mutation Example (future pattern)

```typescript
import { useAtomValue, useAtomSet } from "@effect-atom/atom-react"
import { TodoClient } from "@/hooks/use-rpc"

function TodoComponent() {
  // Query with reactivity key
  const todos = useAtomValue(TodoClient.query("listTodos", undefined, {
    reactivityKeys: ["todos"]
  }))

  // Mutation - invalidates queries with matching reactivityKeys
  const createTodo = useAtomSet(TodoClient.mutation("createTodo"))

  const handleCreate = () => {
    createTodo({
      payload: { title: "New todo" },
      reactivityKeys: ["todos"]  // Invalidates listTodos query
    })
  }
}
```

---

## Files to Modify

| File                                | Action                                                               |
| ----------------------------------- | -------------------------------------------------------------------- |
| `package.json` (root)               | Update catalog dependencies                                          |
| `packages/api/package.json`         | Add effect, @effect/rpc, @effect/platform                            |
| `packages/api/src/index.ts`         | Re-export from definition/                                           |
| `apps/server/package.json`          | Add effect, @effect/rpc, @effect/platform                            |
| `apps/server/src/index.ts`          | Rename to main.ts, mount RPC server                                  |
| `apps/web/package.json`             | Add effect, @effect-atom/\*, @effect/platform; remove TanStack Query |
| `apps/web/src/router.tsx`           | Remove QueryClient setup                                             |
| `apps/web/src/routes/__root.tsx`    | Replace QueryClientProvider with RegistryProvider                    |
| `apps/web/src/routes/index.tsx`     | Use useAtomValue instead of useQuery                                 |
| `apps/web/src/routes/dashboard.tsx` | Use useAtomValue instead of useQuery                                 |

---

## Files to Create

### packages/api/src/definition/

- `index.ts`
- `todo-api.ts`
- `groups/index.ts`
- `groups/health-group.ts`
- `groups/private-group.ts`
- `middleware/better-auth-middleware.ts`
- `schemas/errors.ts`
- `schemas/user.ts`

### apps/server/src/api/

- `groups/index.ts`
- `groups/health-group-live.ts`
- `groups/private-group-live.ts`
- `middleware/better-auth-middleware-live.ts`

### apps/web/src/

- `utils/rpc-client.ts`
- `hooks/use-rpc.ts`
- `providers/registry-provider.tsx`

---

## Files to Delete

- `apps/web/src/utils/orpc.ts`
- `packages/api/src/context.ts`
- `packages/api/src/routers/index.ts`
- `packages/api/src/routers/` (directory)

---

## Testing Strategy

1. **Unit tests** for RPC schemas using `@effect/vitest` (test.effect, test.scoped)
2. **Integration tests** for handlers using `RpcTest.make()` for mock clients
3. **E2E tests** for full HTTP round-trip (Playwright against deployed URL)
4. **Component tests** with mocked atoms via RegistryProvider initialValues

### Example Test with @effect/vitest

```typescript
import { it } from "@effect/vitest"
import { Effect } from "effect"
import { HealthGroup } from "@todo/api/definition"
import { HealthGroupLive } from "./health-group-live"

it.effect("healthCheck returns ok status", () =>
  Effect.gen(function* () {
    const result = yield* HealthGroup.healthCheck()
    expect(result.status).toBe("ok")
  }).pipe(Effect.provide(HealthGroupLive))
)
```
