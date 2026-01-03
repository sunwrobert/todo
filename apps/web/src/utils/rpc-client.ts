import { FetchHttpClient } from "@effect/platform";
import { RpcClient, RpcSerialization } from "@effect/rpc";
import { env } from "@todo/env/web";
import { Layer } from "effect";

// HTTP client layer with credentials
const HttpClientLayer = FetchHttpClient.layer.pipe(
  Layer.provide(
    Layer.succeed(FetchHttpClient.RequestInit, { credentials: "include" })
  )
);

// Protocol layer for HTTP transport
export const RpcProtocolLayer = RpcClient.layerProtocolHttp({
  url: `${env.VITE_SERVER_URL}/rpc`,
}).pipe(
  Layer.provide(HttpClientLayer),
  Layer.provide(RpcSerialization.layerNdjson)
);
