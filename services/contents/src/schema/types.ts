import {gql} from "apollo-server";

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

export { typeDefs };
