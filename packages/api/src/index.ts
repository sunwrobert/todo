import { os } from "@orpc/server";

import type { Context } from "./context";

export const o = os.$context<Context>().errors({
  UNAUTHORIZED: {},
  NOT_FOUND: {},
  BAD_REQUEST: {},
  CONFLICT: {},
});

export const publicProcedure = o;

const requireAuth = o.middleware(async ({ context, next, errors }) => {
  if (!context.session?.user) {
    throw errors.UNAUTHORIZED({
      message: "Sign in required.",
    });
  }
  return next({
    context: {
      session: context.session,
    },
  });
});

export const protectedProcedure = publicProcedure.use(requireAuth);
