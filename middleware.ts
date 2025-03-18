import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getDynamicPageURL } from "@agility/nextjs/node"
import { checkRedirect } from 'lib/cms-content/checkRedirect'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

	//host level redirect
	//ONLY allow requests to the correct domain (localhost, netlify.app, agilitycms.com)
	const host = request.nextUrl.host
	const pathAndQuery = request.nextUrl.pathname + request.nextUrl.search

	if (host !== "localhost:3000" //local
		&& !host.endsWith("netlify.app") //netlify
		&& !host.endsWith("publishwithagility.com") //vercel
		&& !host.endsWith("agilitycms.com")) //prod
	{
		return NextResponse.redirect(`https://agilitycms.com${pathAndQuery}`, {
			status: 301
		})
	}

	//don't allow subdomains of agilitycms.com - redriect to the top level domain
	if (host.endsWith("agilitycms.com") && host !== "agilitycms.com") {
		return NextResponse.redirect(`https://agilitycms.com${pathAndQuery}`, {
			status: 301
		})
	}


	const ext = request.nextUrl.pathname.includes(".") ? request.nextUrl.pathname.split('.').pop() : null

	/*****************************
	 * *** AGILITY MIDDLEWARE ***
	 * 1: Check if this is a preview request,
	 * 2: Check if we are exiting preview
	 * 3: Check if this is a direct to a dynamic page
	 *    based on a content id
	 * 4: Check if this is a redirect
	 * 5: Check if this is a forbidden request (403)
	 * 6: Check if this is a request for the homepage from CANADA region
	 *******************************/
	const previewQ = request.nextUrl.searchParams.get("AgilityPreview")
	let contentIDStr = request.nextUrl.searchParams.get("ContentID") as string || ""
	const referer = request.headers.get("referer")

	//all the other possible search params...
	const paramsNames: string[] = ["subscribed", "industry", "challenge", "category", "topic", "region", "resource", "integration"]
	const otherSearchParams: { [id: string]: string; } = {}
	let hasOtherSearchParams = false

	paramsNames.forEach(paramName => {
		const val = request.nextUrl.searchParams.get(paramName)
		if (val) {
			otherSearchParams[paramName] = val
			hasOtherSearchParams = true
		}
	})

	if (request.nextUrl.searchParams.has("agilitypreviewkey")) {
		//*** this is a preview request ***
		const agilityPreviewKey = request.nextUrl.searchParams.get("agilitypreviewkey") || ""

		//locale is also passed in the querystring on preview requests
		const locale = request.nextUrl.searchParams.get("lang")
		const slug = request.nextUrl.pathname

		//valid preview key: we need to redirect to the correct url for preview
		let redirectUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/api/preview?locale=${locale}&ContentID=${contentIDStr}&slug=${encodeURIComponent(slug)}&agilitypreviewkey=${encodeURIComponent(agilityPreviewKey)}`

		return NextResponse.rewrite(redirectUrl)

	} else if (previewQ === "0") {
		//*** exit preview
		const locale = request.nextUrl.searchParams.get("lang")

		//we need to redirect to the correct url for preview
		const slug = request.nextUrl.pathname
		let redirectUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/api/preview/exit?locale=${locale}&ContentID=${contentIDStr}&slug=${encodeURIComponent(slug)}`

		return NextResponse.redirect(redirectUrl)
	} else if (contentIDStr) {
		const contentID = parseInt(contentIDStr)
		if (!isNaN(contentID) && contentID > 0) {
			//*** this is a dynamic page request ***

			let dynredirectUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}/api/dynamic-redirect?ContentID=${contentID}`
			return NextResponse.rewrite(dynredirectUrl)

		}
	}

	if (referer) {
		//*** check for bad/banned referers ***
		const badReferers = [
			"trafficpeak.io"
		]

		const found = badReferers.find(bad => referer.includes(bad))

		if (found) {
			//*** this is a request from trafficpeak.io ***
			//redirect to the homepage
			return NextResponse.rewrite(`${request.nextUrl.protocol}//${request.nextUrl.host}/403`, {
				status: 403,
				headers: {
					"Cache-Control": "public,maxage=3600, stale-while-revalidate"
				}
			})
		}

	}

	if (hasOtherSearchParams) {
		//*** this is a request with other search params ***

		/****
			In order to preserve caching, we need to rewrite the url to a new url that includes the search params in the path.

			We will do a rewrite to the same url without the search params, except we will add a special path segement
			to the end of the path to indicate that this is a search request
			which the page can parse to get the query param values/

			eg:  /resources?category=foo&topic=bar => /resources/~~~category=%3Dfoo%26topic%3Dbar
		****/

		//get the path name
		let pathName = request.nextUrl.pathname

		//generate the special path segment
		const extraSegment = Object.keys(otherSearchParams).map(key => `${key}%3D${encodeURIComponent(otherSearchParams[key])}`).join("%26")

		//add the special path segment to a new URL
		const adjustedUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}${pathName}/~~~${extraSegment}`

		//rewrite the path
		return NextResponse.rewrite(adjustedUrl)

	}


	//check for a redirect
	if ((!ext || ext.length === 0)) {

		const redirection = await checkRedirect({ path: request.nextUrl.pathname })

		if (redirection) {
			//redirect to the destination url
			//cache the redirect for 10 minutes
			if (redirection.destinationUrl.startsWith("/")) {
				//handle relative paths
				const url = request.nextUrl.clone()
				url.pathname = redirection.destinationUrl
				return NextResponse.redirect(url, {
					status: redirection.statusCode,
					headers: {
						"Cache-Control": "public,maxage=600, stale-while-revalidate"
					}
				})
			} else {
				//handle absolute paths
				return NextResponse.redirect(redirection.destinationUrl, {
					status: redirection.statusCode,
					headers: {
						"Cache-Control": "public,maxage=3600, stale-while-revalidate"
					}
				})
			}
		}
	}

	//check for a request for the homepage from CANADA
	if (request.nextUrl.pathname === "/" || request.geo?.country === "CA") {

		const url = `${request.nextUrl.protocol}//${request.nextUrl.host}/home/home-canada`
		console.log("CANADA", url)
		//rewrite to the Canadian homepage
		return NextResponse.rewrite(url, {
			status: 301
		})
	}


}


export const config = {
	// https://nextjs.org/docs/messages/edge-dynamic-code-evaluation
	unstable_allowDynamic: [
		'**/node_modules/lodash/lodash.js',
		'**/node_modules/reflect-metadata/Reflect.js',
	],
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - assets (public assets)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|assets|_next/static|_next/image|favicon.ico).*)',
	],
}
