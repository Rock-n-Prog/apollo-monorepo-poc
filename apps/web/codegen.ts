import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.API_URL ?? 'http://localhost:4000/graphql/',
  documents: ['./gql/queries/**/*.gql'],
  generates: {
    './gql/generated/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};

export default config;
