import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // TODO: Env var
  schema: 'http://localhost:4000/graphql',
  documents: [
    './gql/queries/**/*.gql'
  ],
  generates: {
    './gql/generated/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    }
  }
}

export default config