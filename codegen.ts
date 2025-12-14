import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // Use 'overwrite: true' if you want codegen to clear the output folder every time
  // overwrite: true, // You can remove this as the client-preset handles output management
  schema: "http://localhost:4000/graphql",
  // Matches all tsx/ts files in your src directory
  documents: ["client/src/**/*.{ts,tsx,graphql}"],
  ignoreNoDocuments: true,

  // 👇 The change is here: Use the 'client' preset
  generates: {
    './client/src/graphql/generated/': { // This defines the output directory (e.g., src/gql/ directory created)
      preset: 'client',
      // The 'client-preset' automatically includes the necessary plugins:
      // ['typescript', 'typescript-operations', 'typescript-react-apollo'] in a smart way.
      config: {
        // You can keep some of your original type configuration options here:
        avoidOptionals: {
          field: true, // Use `null` for nullable fields
          inputValue: false,
        },
        defaultScalarType: "unknown",
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,

        // This setting ensures the generated 'graphql()' function is compatible with AC4
        gqlTagName: 'graphql',
      },
    },
  },
};

export default config;
