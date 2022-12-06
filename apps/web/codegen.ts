import { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

dotenv.config();

const config: CodegenConfig = {
  schema: process.env.API_URL,
  documents: ['./gql/queries/**/*.gql', './gql/mutations/**/*.gql'],
  generates: {
    './gql/generated/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};

export default config;
