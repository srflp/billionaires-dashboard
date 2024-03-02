import { createApp } from "./app.js";
import { config } from "./config.js";
import type { FastifyServerOptions } from "fastify";

const envToLogger: Record<string, FastifyServerOptions["logger"]> = {
  development: {
    transport: {
      target: "pino-pretty",
    },
  },
  production: true,
  test: {
    transport: {
      target: "pino-pretty",
      options: {
        singleLine: true,
      },
    },
  },
};

const app = createApp({
  logger: envToLogger[config.ENV] ?? true,
});

app.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
