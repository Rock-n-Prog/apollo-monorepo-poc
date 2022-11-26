import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

// TODO: Get services URL from env vars
const serviceList = [
  { name: 'content', url: 'http://localhost:4001' },
  { name: 'review', url: 'http://localhost:4002' },
];

const gateway = new ApolloGateway({ serviceList });
const server = new ApolloServer({ gateway });

server.listen().then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
