import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import * as schema from './schema';
import { createContext } from './context';

const server = new ApolloServer({
  schema: buildFederatedSchema([schema]),
  context: createContext(),
});

// TODO: Port should come from env
server.listen(4002).then(({ url }) => {
  console.log(`🚀 Reviews service ready at ${url}`);
});
