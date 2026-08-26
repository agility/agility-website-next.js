import { NextResponse } from 'next/server'
import type { NextRequest, NextFetchEvent } from 'next/server'
import { getDynamicPageURL } from "@agility/nextjs/node"
import { checkRedirect } from 'lib/cms-content/checkRedirect'
import { classifyAIBot } from 'lib/analytics/aiBots'
import { captureServerEvent } from 'lib/analytics/posthogServer'

//Files that AI crawlers hit most, and which must be served untouched.
//They are inside the matcher only so bot hits on them get counted — the
//early return below keeps the rest of the middleware away from them.
const PASSTHROUGH_PATHS = new Set([
	'/robots.txt',
	'/sitemap.xml',
	'/llms.txt',
	'/llms-full.txt',
])

/**
 * Sampling lever for training-crawl telemetry, 0..1.
 *
 * Training crawls are the high-volume, low-information population, and a user
 * agent is self-reported: `curl -A GPTBot` in a loop is an unauthenticated way
 * for anyone to run up billable PostHog event volume. Setting
 * AI_BOT_TRAINING_SAMPLE_RATE=0.1 records 1 in 10 without a code change; 0 turns
 * training capture off entirely.
 *
 * Defaults to 1 (record everything) so the first weeks show real volume. Every
 * event carries `sample_rate`, so counts stay recoverable at any setting —
 * estimate with sum(1 / sample_rate), never count().
 *
 * Retrieval and scraper hits are never sampled: retrieval is the number that
 * actually matters and its volume is low by nature.
 *
 * Note this is inlined at build time in the edge runtime — changing it needs a
 * redeploy, not just an env var edit.
 */
const TRAINING_SAMPLE_RATE = (() => {
	const raw = process.env.AI_BOT_TRAINING_SAMPLE_RATE
	//Number("") is 0, so an empty env var would silently mean "send nothing".
	const n = raw ? Number(raw) : NaN
	return Number.isFinite(n) ? n : 1
})()

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, event: NextFetchEvent) {

	//host level redirect
	//ONLY allow requests to the correct domain (localhost, netlify.app, agilitycms.com)
	const host = request.nextUrl.host
	const pathAndQuery = request.nextUrl.pathname + request.nextUrl.search

	/*****************************
	 * *** AI BOT TELEMETRY ***
	 * GA4 cannot see AI crawlers — it needs JS, and they don't run it. This
	 * records them server-side so training crawls and live retrieval fetches
	 * can be separated from AI-referred humans.
	 *
	 * Fire-and-forget via waitUntil: never awaited, never blocks the response,
	 * and captureServerEvent swallows its own failures.
	 *
	 * This runs BEFORE the host canonicalization below, but `host` is passed to
	 * captureServerEvent, which DROPS anything that is not the production host.
	 * That is deliberate and it fails closed:
	 *
	 *   - preview / branch / localhost traffic never reaches the production
	 *     PostHog project. The previous env-var guard did not work — Netlify does
	 *     not surface CONTEXT into the edge bundle, and 1,546 preview events
	 *     landed in production stamped `deploy_context: production`.
	 *   - a crawler that follows our 301 can no longer be double counted, since
	 *     only the apex hit is recorded.
	 *
	 * The cost is that a bot which hits www (or a netlify.app alias) and never
	 * follows the redirect is invisible. Accepted: anything that follows the 301
	 * is still counted at the apex, which is the number we report.
	 *
	 * See SKILL.md, Source 4.
	 *******************************/
	const aiBot = classifyAIBot(request.headers.get('user-agent'))
	if (aiBot) {
		//Optional-chained: Next always supplies the event in the edge runtime,
		//but this keeps the module importable from a plain test harness.
		event?.waitUntil?.(
			captureServerEvent({
				event: 'ai_bot_request',
				distinctId: `ai-bot:${aiBot.bot}`,
				//The POST leaves from the edge, so pass the crawler's own IP or
				//PostHog geo-stamps every event with the serving PoP instead.
				//x-nf-client-connection-ip is set by Netlify and trustworthy;
				//the x-forwarded-for fallback is caller-controllable, so treat
				//$ip as advisory when reconciling against published crawler
				//ranges off-Netlify.
				ip: request.headers.get('x-nf-client-connection-ip')
					|| request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
					|| null,
				//Environment gate: captureServerEvent drops anything that is not
				//the production host. Passing it is what makes previews safe.
				host,
				sampleRate: aiBot.category === 'training' ? TRAINING_SAMPLE_RATE : 1,
				properties: {
					ai_bot: aiBot.bot,
					ai_category: aiBot.category,
					ai_vendor: aiBot.vendor,
					path: request.nextUrl.pathname,
					host,
				},
			})
		)
	}

	//Serve robots/sitemap/llms files without any further middleware processing.
	if (PASSTHROUGH_PATHS.has(request.nextUrl.pathname)) {
		return NextResponse.next()
	}

	//*** IndexNow key verification file ***
	//Serve the IndexNow key at the site root (/<key>.txt) so search engines can
	//verify ownership before accepting URL submissions. Must run before the host
	//canonicalization below so it responds on whatever host the crawler requests.
	const indexNowKey = process.env.INDEXNOW_KEY
	if (indexNowKey && request.nextUrl.pathname === `/${indexNowKey}.txt`) {
		return new NextResponse(indexNowKey, {
			status: 200,
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
				"Cache-Control": "public, max-age=86400"
			}
		})
	}

	if (!host.startsWith("localhost:") //local (any port)
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

	//MOD JOELV - MAY 15/2025 - Remove the canadian specific homepage.
	// //check for a request for the homepage from CANADA
	// if (request.nextUrl.pathname === "/" && request.geo?.country === "CA") {
	// 	const url = new URL('/home/home-canada', request.url)
	// 	//rewrite to the Canadian homepage
	// 	return NextResponse.rewrite(url, {
	// 		status: 301
	// 	})
	// }


}


export const config = {
	// https://nextjs.org/docs/messages/edge-dynamic-code-evaluation
	unstable_allowDynamic: [
		'**/node_modules/lodash/lodash.js',
		'**/node_modules/reflect-metadata/Reflect.js',
	],
	matcher: [
		/*
		 * Match all request paths except for:
		 * - api (API routes)
		 * - assets (public assets)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico
		 * - any path ending in a static asset extension (images, fonts, css/js)
		 *
		 * robots.txt, sitemap.xml, llms.txt and llms-full.txt are intentionally
		 * INSIDE the matcher so AI crawler hits on them are counted. They return
		 * early via PASSTHROUGH_PATHS, so no other middleware logic touches them.
		 */
		'/((?!api|assets|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|js|css|map)).*)',
	],
}
