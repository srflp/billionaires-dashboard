import { config } from "./src/config.js";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schemas.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    database: config.POSTGRES_DB,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
  },
  verbose: true,
  strict: true,
});
