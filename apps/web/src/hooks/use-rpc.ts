import { Atom, AtomRpc, Result } from "@effect-atom/atom-react";
import { RpcClient } from "@effect/rpc";
import { RpcClientError } from "@effect/rpc/RpcClientError";
import { TodoApi } from "@todo/api/definition";
import { Effect, Schema } from "effect";

import { serializable } from "@/lib/atom-utils";
import { RpcProtocolLayer } from "@/utils/rpc-client";

// AtomRpc client for standard queries
export class TodoClient extends AtomRpc.Tag<TodoClient>()("TodoClient", {
  group: TodoApi,
  protocol: RpcProtocolLayer,
}) {}

// Service wrapper for custom atom patterns
class TodoApi_ extends Effect.Service<TodoApi_>()("@todo/TodoApi_", {
  dependencies: [RpcProtocolLayer],
  scoped: Effect.gen(function* () {
    const client = yield* RpcClient.make(TodoApi);
    return {
      healthCheck: () => client.healthCheck(),
      privateData: () => client.privateData(),
    } as const;
  }),
}) {}

// Runtime for custom atoms with serialization
const runtime = Atom.runtime(TodoApi_.Default);

// Health check response schema for serialization
const HealthCheckSchema = Schema.Struct({
  status: Schema.Literal("ok"),
  timestamp: Schema.DateTimeUtc,
});

// Health check atom with explicit serializable key for SSR hydration
export const healthCheckAtom = runtime
  .atom(
    Effect.gen(function* () {
      const api = yield* TodoApi_;
      return yield* api.healthCheck();
    })
  )
  .pipe(
    serializable({
      key: "@todo/healthCheck",
      schema: Result.Schema({
        success: HealthCheckSchema,
        error: RpcClientError,
      }),
    })
  );

// Private data atom (client-only, no SSR)
export const privateDataAtom = TodoClient.query("privateData", undefined, {
  reactivityKeys: ["user"],
});
