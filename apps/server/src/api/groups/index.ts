import { Layer } from "effect";

import { BetterAuthMiddlewareLive } from "../middleware/better-auth-middleware-live";
import { HealthGroupLive } from "./health-group-live";
import { PrivateGroupLive } from "./private-group-live";

// Merge all layers and include middleware in output
export const RpcGroupsLive = Layer.mergeAll(
  HealthGroupLive,
  PrivateGroupLive,
  BetterAuthMiddlewareLive
);
