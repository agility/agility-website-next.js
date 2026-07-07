export {}

/**
 * Third-party globals injected by external scripts.
 *
 * These were previously typed (accidentally) by @next/third-parties, whose
 * types declare a `[key: string]: any` index signature on Window. Now that
 * GTM is loaded via a plain script snippet instead of that package's
 * component, the globals the codebase actually uses are declared here.
 */
declare global {
	interface Window {
		/** Google Tag Manager data layer */
		dataLayer?: Object[]
		/** HubSpot tracking queue (js.hs-scripts.com) */
		_hsq?: any[]
		/** Gartner Peer Insights / G2 review widget */
		GartnerPI_Widget?: any
	}
}
