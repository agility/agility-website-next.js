import "server-only";

import agility, { ApiClientInstance } from '@agility/content-fetch'
import { draftMode } from 'next/headers'



const getAgilitySDK = () => {

	//get the preview data
	const isDevelopmentMode = process.env.NODE_ENV === "development"
	const isPreview = isDevelopmentMode || draftMode().isEnabled

	const apiKey = isPreview ? process.env.AGILITY_API_PREVIEW_KEY : process.env.AGILITY_API_FETCH_KEY

	return agility.getApi({
		guid: process.env.AGILITY_GUID,
		apiKey,
		isPreview
	});

}

/**
 * Get the Agility SDK for non-react endpoints (such as the generateStaticParams function)
 * @returns
 */
export const getAgilitySDK_NonReact = () => {


	const isDevelopmentMode = process.env.NODE_ENV === "development"
	const isPreview = isDevelopmentMode

	const apiKey = isPreview ? process.env.AGILITY_API_PREVIEW_KEY : process.env.AGILITY_API_FETCH_KEY

	return agility.getApi({
		guid: process.env.AGILITY_GUID,
		apiKey,
		isPreview
	});

}

export default getAgilitySDK