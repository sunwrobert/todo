import { Result } from "@effect-atom/atom-react";
import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { createServerFn } from "@tanstack/react-start";
import { TodoApi } from "@todo/api/definition";
import { env } from "@todo/env/web";
import { Effect, Layer } from "effect";

import { healthCheckAtom } from "@/hooks/use-rpc";
import { dehydrate } from "@/lib/atom-utils";

// Server-side RPC client
const HttpClientLayer = FetchHttpClient.layer;
const RpcProtocolLayer = RpcClient.layerProtocolHttp({
  url: `${env.VITE_SERVER_URL}/rpc`,
}).pipe(
  Layer.provide(HttpClientLayer),
  Layer.provide(RpcSerialization.layerNdjson)
);

export const getHealthCheck = createServerFn({ method: "GET" }).handler(
  async () => {
    const program = Effect.gen(function* () {
      const client = yield* RpcClient.make(TodoApi);
      return yield* client.healthCheck();
    }).pipe(Effect.scoped, Effect.provide(RpcProtocolLayer));

    const exit = await Effect.runPromiseExit(program);

    // Dehydrate the result for client hydration
    const dehydratedState = dehydrate(healthCheckAtom, Result.fromExit(exit));

    return {
      success: exit._tag === "Success",
      dehydratedState,
    };
  }
);
