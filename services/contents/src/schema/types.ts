import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    content(id: ID!): Content
    contents: [Content]
  }

  type Content @key(fields: "id") {
    id: ID!
    title: String!
    year: Int!
  }
`;

export { typeDefs };
