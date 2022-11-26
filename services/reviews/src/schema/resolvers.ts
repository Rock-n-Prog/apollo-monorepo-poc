import { Context } from '../context';

// TODO: Probably will need codegen for resolve types (any): https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers
const resolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    review: (_parent: any, args: { readonly id: string }, ctx: Context) =>
      ctx.prisma.review.findUnique({
        where: {
          id: args.id,
        },
      }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviews: (_parent: any, _args: any, ctx: Context) => ctx.prisma.review.findMany(),
  },
  Review: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    comments: (review: any, _args: any, ctx: Context) =>
      ctx.prisma.comment
        .findMany({
          where: {
            reviewId: review.id,
          },
        })
        .then(comments => comments.map(c => c.title)),
  },
  Content: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviews: (content: any, _args: any, ctx: Context) =>
      ctx.prisma.review.findMany({
        where: {
          contentId: content.id,
        },
      }),
  },
};

export { resolvers };
