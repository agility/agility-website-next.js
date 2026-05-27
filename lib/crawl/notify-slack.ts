/**
 * Post a search-indexing failure alert to Slack (#platform-backend).
 *
 * The webhook URL is read from the SLACK_INDEXING_WEBHOOK_URL env var. If it
 * isn't set, the failure is only logged (so local crawls don't need it).
 * This helper never throws — a broken notification must not mask the original
 * indexing failure.
 */
export const notifyIndexingFailure = async (message: string) => {
	console.error("[indexing failure] " + message)

	const webhookUrl = process.env.SLACK_INDEXING_WEBHOOK_URL
	if (!webhookUrl) {
		console.error("SLACK_INDEXING_WEBHOOK_URL not set; skipping Slack notification.")
		return
	}

	try {
		await fetch(webhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				text: `:rotating_light: *Agility website search indexing failure*\n${message}`
			})
		})
	} catch (e) {
		console.error("Failed to send Slack indexing-failure notification:", e)
	}
}
