import { HttpLink } from "@apollo/client";

import {
	registerApolloClient,
	ApolloClient,
	InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { getAgilityContext } from "./useAgilityContext";
import { cacheConfig } from "./cacheConfig";

interface Props {
	referenceNames: string[]
	filter?: string

}

export const getAgilityGraphQLClient = ({ referenceNames, filter }: Props) => {

	const { getClient, query, PreloadQuery } = registerApolloClient(() => {


		const { isPreview, locale } = getAgilityContext()

		const uri = `https://api.aglty.io/v1/${process.env.AGILITY_GUID}/${isPreview ? "preview" : "fetch"}/${process.env.AGILITY_LOCALES}/graphql`

		const apiKey = isPreview ? process.env.AGILITY_API_PREVIEW_KEY : process.env.AGILITY_API_FETCH_KEY

		let tags = referenceNames.map((referenceName) => `agility-content-${referenceName}-${locale}`)
		if (filter) {
			tags.push(`agility-content-${filter}-${locale}`)
		}

		return new ApolloClient({
			cache: new InMemoryCache({

			}),
			link: new HttpLink({
				// this needs to be an absolute url, as relative urls cannot be used in SSR
				uri: uri,
				headers: {
					"apikey": apiKey || "",
				},
				//set up the caching...

				fetchOptions: isPreview ? { cache: "no-store" } : {
					next: {
						tags,
						revalidate: 0 //HACK cacheConfig.cacheDuration,
					},
				},
			}),
		});
	});

	return {
		getClient,
		query,
		PreloadQuery
	}
}