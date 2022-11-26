import { ApolloServer } from 'apollo-server';
import * as dotenv from 'dotenv';
import { schema } from './schema';
import { createContext } from './context';

dotenv.config();

const server = new ApolloServer({
  schema,
  context: createContext(),
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀 Reviews service ready at ${url}`);
});
