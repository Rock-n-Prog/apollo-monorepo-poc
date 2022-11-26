import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import * as dotenv from 'dotenv';

dotenv.config();

const serviceList = [
  { name: 'contents', url: process.env.CONTENTS_URL },
  { name: 'reviews', url: process.env.REVIEWS_URL },
];

const gateway = new ApolloGateway({ serviceList });
const server = new ApolloServer({ gateway });

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
