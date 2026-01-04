import { SqlClient, SqlError } from "@effect/sql";
import { D1Client } from "@effect/sql-d1";
import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import { env } from "@todo/env/server";
import { ConfigError, Effect, Layer, ManagedRuntime } from "effect";

import * as schema from "./schema";

// Re-export types to make them "nameable" for declaration emit
export type { SqlError, SqlClient, ConfigError };

export class Db extends Effect.Service<Db>()("Db", {
  effect: SqliteDrizzle.make<typeof schema>({ schema }),
}) {}

export const dbLayer = Db.Default.pipe(
  Layer.provideMerge(
    D1Client.layer({
      db: env.DB,
    })
  )
);

export const dbRuntime = ManagedRuntime.make(dbLayer);

export const runDbEffect = <A, E>(effect: Effect.Effect<A, E, Db>) =>
  dbRuntime.runPromise(effect);
