import * as schema from "./schemas.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
import { Logger } from "../utils/logger.js";
import { config } from "../config.js";
import { seed } from "./seed.js";
const { Pool } = pg;

// eslint-disable-next-line import/no-mutable-exports
export let db: ReturnType<typeof drizzle<typeof schema>>;

export const initDb = async () => {
  const pool = await new Pool({
    connectionString: config.DATABASE_URL,
  })
    .connect()
    .then((client) => {
      Logger.info("INIT", "Connected to database");

      return client;
    })
    .catch((error) => {
      Logger.error("INIT", `Failed to connect to database ${String(error)}}`);
      throw new Error(`Failed to connect to database ${String(error)}`);
    });

  db = drizzle(pool, {
    schema,
  });

  await migrate(db, {
    migrationsFolder: "./src/db/migrations",
  })
    .then(() => {
      Logger.info("INIT", "Migrated database");
    })
    .catch((error) => {
      Logger.error("INIT", `Failed to migrate database ${String(error)}`);
      throw new Error(`Failed to migrate database ${String(error)}`);
    });

  await db.delete(schema.billionaires);
  await seed();
};
