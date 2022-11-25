import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

// TODO: Link to db
const contents = [
  { id: '1', title: 'Batman', year: '1989' },
  { id: '2', title: 'Batman Returns', year: '1992' },
  { id: '3', title: 'Batman: The Animated Series', year: '1992' },
];

const typeDefs = gql`
  type Query {
    contents: [Content]
  }

  type Content @key(fields: "id") {
    id: ID!
    title: String
    year: String
  }
`;

// TODO: Probably will need codegen for resolve types: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers
const resolvers = {
  Query: {
    contents: () => contents,
  },
  Content: {
    // TODO: Remove any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __resolveReference: (content: any) => contents.find(c => c.id === content.id),
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

// TODO: Port should come from env
server.listen(4001).then(({ url }) => {
  console.log(`🚀 Content service ready at ${url}`);
});
