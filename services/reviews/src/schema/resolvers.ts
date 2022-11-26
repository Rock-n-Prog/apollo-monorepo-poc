import { Context } from '../context';

// TODO: Probably will need codegen for resolve types (any): https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers
const resolvers = {
  Query: {
    // TODO: Comments?
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviews: (_parent: any, _args: any, ctx: Context) => ctx.prisma.review.findMany(),
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
