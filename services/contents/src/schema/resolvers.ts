import { Context } from '../context';

// TODO: Probably will need codegen for resolve types (any): https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers
const resolvers = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: (_parent: any, args: { readonly id: string }, ctx: Context) =>
      ctx.prisma.content.findUnique({
        where: {
          id: args.id,
        },
      }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contents: (_parent: any, _args: any, ctx: Context) => ctx.prisma.content.findMany(),
  },
  Content: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __resolveReference: (content: any, _args: any, ctx: Context) =>
      ctx.prisma.content.findUnique({
        where: {
          id: content.id,
        },
      }),
  },
};

export { resolvers };
