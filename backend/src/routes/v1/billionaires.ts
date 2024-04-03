import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { db } from "../../db/index.js";
import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { billionaires } from "../../db/schemas.js";
import { asc, count, desc, eq, ilike, or } from "drizzle-orm";
import { AscDesc } from "../../utils/enums.js";

export const BillionairesRoute: FastifyPluginAsyncTypebox = async (app) => {
  const selectSchema = createSelectSchema(billionaires);
  const insertSchema = createInsertSchema(billionaires);
  const tags = ["billionaires"];

  /**
   * Get billionaires
   */
  app.get(
    "/billionaires",
    {
      schema: {
        tags,
        response: {
          200: Type.Array(selectSchema),
          500: Type.Unknown(),
        },
        querystring: Type.Optional(
          Type.Object({
            page: Type.Integer(),
            perPage: Type.Integer(),
            personName: Type.Optional(Type.String()),
            field: Type.Optional(Type.String()),
            order: Type.Optional(Type.Enum(AscDesc)),
          })
        ),
      },
    },
    async (request, reply) => {
      const { personName, page, perPage = 9999, order, field } = request.query;
      const filteredBillionaires = await db
        .select()
        .from(billionaires)
        .offset((page - 1) * perPage)
        .limit(perPage)
        .orderBy(
          (order === "ASC" ? asc : desc)(
            // @ts-expect-error
            billionaires[field]
          )
        )
        .where(
          personName
            ? ilike(billionaires.personName, `%${personName}%`)
            : undefined
        );
      const [{ total }] = await db
        .select({ total: count() })
        .from(billionaires)
        .where(
          personName
            ? ilike(billionaires.personName, `%${personName}%`)
            : undefined
        );
      return reply
        .header("accept-ranges", "items")
        .header("access-control-expose-headers", "content-range")
        .header(
          "content-range",
          `items ${(page - 1) * perPage}-${Math.min(page * perPage - 1, total)}/${total}`
        )
        .code(200)
        .send(filteredBillionaires);
    }
  );

  /**
   * Get billionaire by id
   */
  app.get(
    "/billionaires/:id",
    {
      schema: {
        tags,
        params: Type.Pick(selectSchema, ["id"]),
        response: {
          200: selectSchema,
          500: Type.Unknown(),
        },
      },
    },
    async (request, reply) => {
      const billionaire = await db.query.billionaires.findFirst({
        where: eq(billionaires.id, request.params.id),
      });
      return reply.code(200).send(billionaire);
    }
  );

  /**
   * Create a billionaire
   */
  app.post(
    "/billionaires",
    {
      schema: {
        tags,
        body: insertSchema,
        response: {
          200: selectSchema,
          500: Type.Unknown(),
        },
      },
    },
    async (request, reply) => {
      const { body } = request;
      const [result] = await db.insert(billionaires).values(body).returning();
      return reply.code(200).send(result);
    }
  );

  /**
   * Update a billionaire
   */
  app.put(
    "/billionaires/:id",
    {
      schema: {
        tags,
        params: Type.Pick(selectSchema, ["id"]),
        body: insertSchema,
        response: {
          200: selectSchema,
          500: Type.Unknown(),
        },
      },
    },
    async (request, reply) => {
      const [result] = await db
        .update(billionaires)
        .set(request.body)
        .where(eq(billionaires.id, request.params.id))
        .returning();
      if (!result) {
        return reply.code(404).send();
      }
      return reply.code(200).send(result);
    }
  );

  /**
   * Delete billionaires by id
   */
  app.delete(
    "/billionaires",
    {
      schema: {
        tags,
        response: {
          200: Type.Array(Type.String()),
          500: Type.Unknown(),
        },
        querystring: Type.Object({
          "ids[]": Type.Array(Type.String()),
        }),
      },
    },
    async (request, reply) => {
      const deletedIds = (
        await db
          .delete(billionaires)
          .where(
            or(...request.query["ids[]"].map((id) => eq(billionaires.id, id)))
          )
          .returning({ id: billionaires.id })
      ).map((row) => row.id);
      if (!deletedIds.length) {
        return reply.code(404).send();
      }
      return reply.code(200).send(deletedIds);
    }
  );

  /**
   * Delete a billionaire
   */
  app.delete(
    "/billionaires/:id",
    {
      schema: {
        tags,
        params: Type.Pick(selectSchema, ["id"]),
        response: {
          200: selectSchema,
          500: Type.Unknown(),
        },
      },
    },
    async (request, reply) => {
      const [result] = await db
        .delete(billionaires)
        .where(eq(billionaires.id, request.params.id))
        .returning();
      if (!result) {
        return reply.code(404).send();
      }
      return reply.code(200).send(result);
    }
  );
};
