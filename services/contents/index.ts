import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { PrismaClient } from '.prisma/client/contents';

const typeDefs = gql`
  type Query {
    contents: [Content]
  }

  type Content @key(fields: "id") {
    id: ID!
    title: String
    year: Int
  }
`;

// TODO: Probably will need codegen for resolve types: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers
const resolvers = {
  Query: {
    // TODO: Remove any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contents: (_parent: any, _args: any, ctx: { prisma: PrismaClient }) => ctx.prisma.content.findMany(),
  },
  Content: {
    // TODO: Does this work? Trying to resolve "reviews"
    // TODO: Remove any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __resolveReference: (content: any, _args: any, ctx: { prisma: PrismaClient }) => ctx.prisma.content.findUnique({
      where: {
        id: content.id,
      },
    }),
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: {
    prisma: new PrismaClient(),
  },
});

// TODO: Port should come from env
server.listen(4001).then(({ url }) => {
  console.log(`🚀 Content service ready at ${url}`);
});
