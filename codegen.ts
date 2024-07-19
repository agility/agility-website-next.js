/**
 * This file is used to configure the code generation process for GraphQL types
 */

import { CodegenConfig } from '@graphql-codegen/cli';
require('@dotenvx/dotenvx').config()

console.log("codegen.ts -> process.env.AGILITY_API_PREVIEW_KEY", process.env.AGILITY_API_PREVIEW_KEY)

const config: CodegenConfig = {
	schema: [{
		'https://api.aglty.io/v1/80dc0987-be84-4405-a572-aba199832f68/preview/en-ca/graphql': {
			headers: {
				apikey: process.env.AGILITY_API_PREVIEW_KEY || ""
			}
		}
	}],
	// this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
	documents: ['components/**/*.{ts,tsx}'],
	generates: {
		'./lib/__generated__/': {
			preset: 'client',
			plugins: [],

			presetConfig: {
				avoidOptionals: true,
				gqlTagName: 'gql',
			}
		}
	},
	ignoreNoDocuments: true,
};

export default config;