import { Context } from '../context';

// TODO: Probably will need codegen for resolve types: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers
const resolvers = {
  Query: {
    // TODO: Remove any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contents: (_parent: any, _args: any, ctx: Context) => ctx.prisma.content.findMany(),
  },
  Content: {
    // TODO: Does this work? Trying to resolve "reviews"
    // TODO: Remove any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __resolveReference: (content: any, _args: any, ctx: Context) => ctx.prisma.content.findUnique({
      where: {
        id: content.id,
      },
    }),
  },
};

export { resolvers };
