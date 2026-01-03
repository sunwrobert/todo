import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema } from "effect";

export class HealthGroup extends RpcGroup.make(
  Rpc.make("healthCheck", {
    success: Schema.Struct({
      status: Schema.Literal("ok"),
      timestamp: Schema.DateTimeUtc,
    }),
  })
) {}
