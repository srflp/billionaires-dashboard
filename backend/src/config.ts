import { Static, Type } from "@sinclair/typebox";
import { envSchema } from "env-schema";

const schema = Type.Object({
  ENV: Type.String(),
  DATABASE_URL: Type.String(),
});

type Schema = Static<typeof schema>;

export const config = envSchema<Schema>({
  schema,
});
