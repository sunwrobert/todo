import { Schema } from "effect";

export class User extends Schema.Class<User>("User")({
  id: Schema.String,
  email: Schema.String,
  name: Schema.NullOr(Schema.String),
  image: Schema.NullOr(Schema.String),
}) {}

export class Session extends Schema.Class<Session>("Session")({
  user: User,
  expiresAt: Schema.Date,
}) {}
