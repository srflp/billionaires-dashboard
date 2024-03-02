import { FastifyServerOptions, fastify } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { initDb } from "./db/index.js";
import { HelloRoute } from "./routes/v1/hello.js";

export const createApp = (opts: FastifyServerOptions = {}) => {
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>();

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
  app.register(HelloRoute, commonRouteSettings);

  return app;
};
