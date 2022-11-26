import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    review(id: ID!): Review
    reviews: [Review]
  }

  type Review {
    id: ID!
    score: Float!
    comments: [String]
  }

  extend type Content @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
  }
`;

export { typeDefs };
