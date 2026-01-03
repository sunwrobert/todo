import { HealthGroup } from "@todo/api/definition";
import { DateTime, Effect } from "effect";

export const HealthGroupLive = HealthGroup.toLayer({
  healthCheck: () =>
    Effect.succeed({
      status: "ok" as const,
      timestamp: DateTime.unsafeNow(),
    }),
});
