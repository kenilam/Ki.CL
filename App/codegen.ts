import appRoot from 'app-root-path';

import { type CodegenConfig } from '@graphql-codegen/cli';

import * as dotenv from 'dotenv';

dotenv.config({ path: `${appRoot.path}/.env` });

const config: CodegenConfig = {
  schema: process.env.LOCI_API_URL,
  generates: {
    './API/Client/Types/': {
      plugins: [
        'typescript-operations',
        'typescript-document-nodes',
        'typescript-resolvers',
      ],
      config: {
        addDocBlocks: true,
        addOperationExport: true,
        arrayInputCoercion: false,
        defaultScalarType: 'unknown',
        emitLegacyCommonJSImports: false,
        flattenGeneratedTypes: true,
        flattenGeneratedTypesIncludeFragments: true,
        identifierName: 'ListAllOperations',
        namingConvention: { enumValues: 'keep' },
        noSchemaStitching: false,
        pureMagicComment: true,
        scalars: true,
        skipTypename: true,
        strictScalars: false,
        useIndexSignature: true,
        useTypeImports: true,
        withHooks: true,
        withMutationFn: true,
        withMutationOptionsType: true,
        withRefetchFn: false,
        withResultType: true,
      },
      preset: 'client',
    },
    './API/Client/Types/helper.ts': {
      plugins: ['typescript-apollo-client-helpers'],
    },
    './API/Client/Types/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        federation: true,
        includeDirectives: true,
        sort: false,
      },
    },
    './API/Client/Types/introspection.json': {
      plugins: ['introspection'],
      config: {
        federation: true,
        includeDirectives: true,
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
  require: ['ts-node/register'],
  debug: true,
  verbose: true,
};

export default config;
