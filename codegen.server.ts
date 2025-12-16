import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    // This array lists all the source files that contain your schema definitions
    schema: 'http://localhost:4000/graphql',
    generates: {
        // This is the single output file that Codegen will create for you
        './server/src/graphql/generated/serverTypes.ts': {
            plugins: [
                'typescript',
                'typescript-resolvers'
            ],
            config: {
                useTypeImports: true,
                contextType: '../context.js#Context',
                useIndexSignature: true,
            },
        },
    },
};

export default config;
