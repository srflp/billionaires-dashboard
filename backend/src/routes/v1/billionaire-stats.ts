import { db } from "../../db/index.js";
import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { billionaires } from "../../db/schemas.js";
import { asc, count, desc, sql } from "drizzle-orm";
import { AscDesc } from "../../utils/enums.js";

export const BillionaireStatsRoute: FastifyPluginAsyncTypebox = async (app) => {
  const tags = ["billionaire-stats"];

  /**
   * Get stats
   */
  app.get(
    "/billionaire-stats",
    {
      schema: {
        tags,
        querystring: Type.Optional(
          Type.Object({
            field: Type.Optional(Type.String()),
            order: Type.Optional(Type.Enum(AscDesc)),
          })
        ),
        response: {
          200: Type.Array(
            Type.Object({
              id: Type.String(),
              countryOfCitizenship: Type.String(),
              count: Type.Integer(),
              averageAge: Type.Number(),
              averageFinalWorth: Type.Number(),
            })
          ),
          500: Type.Unknown(),
        },
      },
    },
    async (request, reply) => {
      const { order, field = "count" } = request.query;
      const stats = await db
        .select({
          id: billionaires.countryOfCitizenship,
          countryOfCitizenship: billionaires.countryOfCitizenship,
          count: count(),
          averageAge: sql<number>`cast(AVG(${billionaires.age}) as int)`,
          averageFinalWorth: sql<number>`cast(AVG(${billionaires.finalWorth}) as int)`,
        })
        .from(billionaires)
        .groupBy(billionaires.countryOfCitizenship)
        .orderBy((aliases) =>
          (order === "ASC" ? asc : desc)(
            // @ts-expect-error
            aliases[field]
          )
        );
      const total = stats.length;
      return reply
        .header("accept-ranges", "items")
        .header("access-control-expose-headers", "content-range")
        .header("content-range", `items 0-${total - 1}/${total}`)
        .code(200)
        .send(stats);
    }
  );
};
