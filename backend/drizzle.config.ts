import { config } from "./src/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schemas.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: config.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
