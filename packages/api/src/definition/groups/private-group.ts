import { Rpc, RpcGroup } from "@effect/rpc";
import { Schema } from "effect";

import { BetterAuthMiddleware } from "../middleware/better-auth-middleware";
import { User } from "../schemas/user";

export class PrivateDataResponse extends Schema.Class<PrivateDataResponse>(
  "PrivateDataResponse"
)({
  message: Schema.String,
  user: User,
}) {}

export class PrivateGroup extends RpcGroup.make(
  Rpc.make("privateData", {
    success: PrivateDataResponse,
  })
).middleware(BetterAuthMiddleware) {}
