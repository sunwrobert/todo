import { RpcMiddleware } from "@effect/rpc";
import { Context } from "effect";

import type { Session } from "../schemas/user";

import { UnauthorizedError } from "../schemas/errors";

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
