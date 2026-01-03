import type { HttpRouter } from "@effect/platform";

import { RpcSerialization, RpcServer } from "@effect/rpc";
import { TodoApi } from "@todo/api/definition";
import { auth } from "@todo/auth";
import { env } from "@todo/env/server";
import { Layer } from "effect";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { RpcGroupsLive } from "./api/groups";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: env.CORS_ORIGIN,
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "traceparent",
      "tracestate",
      "b3",
      "x-b3-traceid",
      "x-b3-spanid",
      "x-b3-sampled",
    ],
    credentials: true,
  })
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

// Create RPC server layer with all dependencies
// Type assertion needed because toWebHandler requires HttpRouter.DefaultServices
// (FileSystem/Path) which don't exist in Workers, but RPC doesn't use them
const ServerLayer = RpcGroupsLive.pipe(
  Layer.provideMerge(RpcSerialization.layerNdjson)
) as Layer.Layer<
  | Layer.Layer.Success<typeof RpcGroupsLive>
  | RpcSerialization.RpcSerialization
  | HttpRouter.HttpRouter.DefaultServices
>;

// Create web handler - properly manages scope lifecycle
const { handler: rpcHandler } = RpcServer.toWebHandler(TodoApi, {
  layer: ServerLayer,
});

app.post("/rpc", async (c) => {
  return rpcHandler(c.req.raw);
});

app.get("/", (c) => {
  return c.text("OK");
});

export default app;
