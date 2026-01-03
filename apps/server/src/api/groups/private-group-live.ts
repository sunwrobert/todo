import {
  BetterAuthContext,
  PrivateDataResponse,
  PrivateGroup,
} from "@todo/api/definition";
import { Effect } from "effect";

export const PrivateGroupLive = PrivateGroup.toLayer({
  privateData: () =>
    Effect.gen(function* () {
      const { session } = yield* BetterAuthContext;

      return new PrivateDataResponse({
        message: "Hello from private endpoint!",
        user: session.user,
      });
    }),
});
