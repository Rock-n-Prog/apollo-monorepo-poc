import { ApolloServer } from 'apollo-server';
import { schema } from './schema-pothos';
import { createContext } from './context';

const server = new ApolloServer({
  schema,
  context: createContext(),
});

// TODO: Port should come from env
server.listen(4002).then(({ url }) => {
  console.log(`🚀 Reviews service ready at ${url}`);
});
