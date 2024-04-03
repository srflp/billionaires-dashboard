import { FastifyServerOptions, fastify } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import cors from "@fastify/cors";

import { initDb } from "./db/index.js";
import { BillionairesRoute } from "./routes/v1/billionaires.js";
import { BillionaireStatsRoute } from "./routes/v1/billionaire-stats.js";

export const createApp = (opts: FastifyServerOptions = {}) => {
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

  app.register(cors, {
    origin: true,
    credentials: true,
  });

  initDb();

  // Swagger must be registered before registering routes
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Billionaires Dashboard API",
        version: process.env.npm_package_version ?? "unknown",
      },
      host: "localhost:8080",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      basePath: "/api/v1",
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });

  const commonRouteSettings = { prefix: "api/v1" };
  app.register(BillionairesRoute, commonRouteSettings);
  app.register(BillionaireStatsRoute, commonRouteSettings);

  return app;
};
