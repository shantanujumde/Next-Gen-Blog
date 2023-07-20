import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@components/server/api/trpc";
import { z } from "zod";

export const contactFormRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      return await ctx.prisma.tweet.create({
        data: { content, userId: String(ctx.session?.user.id) },
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
      })
    )
    .query(({ input: { limit = 100 }, ctx }) => {
      return ctx.prisma.tweet.findMany({
        take: limit,
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(async ({ input: { id, content }, ctx }) => {
      return await ctx.prisma.tweet.update({
        where: {
          id,
        },
        data: {
          content,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      return await ctx.prisma.tweet.delete({
        where: {
          id,
        },
      });
    }),
});
