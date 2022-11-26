import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { createContext } from './context';

const server = new ApolloServer({
  schema,
  context: createContext(),
});

// TODO: Port should come from env
server.listen(4001).then(({ url }) => {
  console.log(`🚀 Contents service ready at ${url}`);
});
