import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";

export const HelloRoute: FastifyPluginAsyncTypebox = async (app) => {
  /**
   * Get currently logged-in user
   */
  app.get(
    "/hello",
    {
      schema: {
        tags: ["hello"],
        response: {
          // 200: Type.Pick(selectUsersSchema, ["id", "email", "isAdmin", "name"]),
          500: Type.Unknown(),
        },
      },
    },
    async (request, reply) => {
      return reply.code(200).send("hello world!");
    }
  );
};
