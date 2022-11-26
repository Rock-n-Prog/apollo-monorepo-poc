import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // TODO: Env var
  schema: 'http://localhost:4000/graphql',
  documents: [
    './gql/queries/**/*.gql'
  ],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './gql/generated/': {
      preset: 'client',
      plugins: []
    }
  }
}

export default config