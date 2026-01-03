import {
  BetterAuthContext,
  BetterAuthMiddleware,
  Session,
  UnauthorizedError,
  User,
} from "@todo/api/definition";
import { auth } from "@todo/auth";
import { Effect, Layer } from "effect";

export const BetterAuthMiddlewareLive = Layer.succeed(
  BetterAuthMiddleware,
  (options) =>
    Effect.gen(function* () {
      const headers = new Headers(options.headers as HeadersInit);

      const result = yield* Effect.tryPromise({
        try: () => auth.api.getSession({ headers }),
        catch: () =>
          new UnauthorizedError({ message: "Failed to validate session" }),
      });

      if (!result?.user) {
        return yield* new UnauthorizedError({ message: "Not authenticated" });
      }

      const user = new User({
        id: result.user.id,
        email: result.user.email,
        name: result.user.name ?? null,
        image: result.user.image ?? null,
      });

      const session = new Session({
        user,
        expiresAt: result.session.expiresAt,
      });

      return BetterAuthContext.of({ session });
    })
);
