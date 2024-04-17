import { Static, Type } from "@sinclair/typebox";
import { envSchema } from "env-schema";

const schema = Type.Object({
  ENV: Type.String(),
  POSTGRES_HOST: Type.String(),
  POSTGRES_PORT: Type.Number(),
  POSTGRES_DB: Type.String(),
  POSTGRES_USER: Type.String(),
  POSTGRES_PASSWORD: Type.String(),
});

type Schema = Static<typeof schema>;

export const config = envSchema<Schema>({
  schema,
});
