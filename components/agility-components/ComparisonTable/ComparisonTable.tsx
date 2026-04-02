import { UnloadedModuleProps } from "@agility/nextjs"
import { Container } from "components/micro/Container"
import { getContentItem } from "lib/cms/getContentItem"
import { ComparisonTableClient, ComparisonRow, Platform } from "./ComparisonTable.client"

/**
 * The comparisonData field uses a pipe-delimited text format:
 *
 * PLATFORMS: Agility CMS | Contentful | Contentstack | Sanity | WordPress | Sitecore
 *
 * ## CONTENT MANAGEMENT
 *
 * Visual page builder: full | none | full | partial | full | full
 * > Tooltip text shown on hover for this feature.
 *
 * Reusable content modules: full | full | full | full | partial | full
 *
 * ## DEVELOPER EXPERIENCE
 *
 * Headless / API-first: full | full | full | full | partial | partial
 * > Agility positions as Headless+...
 *
 * Rules:
 * - PLATFORMS: line defines column headers (pipe-separated)
 * - ## lines are category headers
 * - Feature name: val | val | val lines define rows
 * - > lines are optional tooltips for the feature above
 * - Values: full = green check, partial = yellow dash, none = red X,
 *           or any other text (e.g. "4.5 / 5") shown as-is.
 */

interface IComparisonTable {
	label?: string
	heading: string
	highlightedText?: string
	description?: string
	anchorId?: string
	comparisonData?: string
	footnote?: string
}

interface ParsedData {
	platforms: string[]
	categories: {
		name: string
		features: {
			name: string
			tooltip?: string
			values: Record<string, string>
		}[]
	}[]
}

function parseComparisonData(raw: string): ParsedData | null {
	const lines = raw.split("\n").map((l) => l.trimEnd())
	let platforms: string[] = []
	const categories: ParsedData["categories"] = []
	let currentCategory: (typeof categories)[0] | null = null
	let lastFeature: { name: string; tooltip?: string; values: Record<string, string> } | null = null

	for (const line of lines) {
		const trimmed = line.trim()
		if (!trimmed) continue

		// PLATFORMS line
		if (/^PLATFORMS\s*:/i.test(trimmed)) {
			platforms = trimmed
				.replace(/^PLATFORMS\s*:\s*/i, "")
				.split("|")
				.map((s) => s.trim())
				.filter(Boolean)
			continue
		}

		// Category header (## HEADING)
		if (trimmed.startsWith("##")) {
			currentCategory = {
				name: trimmed.replace(/^#+\s*/, "").trim(),
				features: [],
			}
			categories.push(currentCategory)
			lastFeature = null
			continue
		}

		// Tooltip line (> text)
		if (trimmed.startsWith(">") && lastFeature) {
			lastFeature.tooltip = trimmed.replace(/^>\s*/, "").trim()
			continue
		}

		// Feature line (name: val | val | val ...)
		const colonIdx = trimmed.indexOf(":")
		if (colonIdx > 0 && currentCategory) {
			const name = trimmed.slice(0, colonIdx).trim()
			const valuesStr = trimmed.slice(colonIdx + 1).trim()
			const values: Record<string, string> = {}
			const vals = valuesStr.split("|").map((s) => s.trim())
			platforms.forEach((p, i) => {
				values[p] = vals[i] || "none"
			})
			lastFeature = { name, values }
			currentCategory.features.push(lastFeature)
		}
	}

	if (!platforms.length || !categories.length) return null
	return { platforms, categories }
}

export const ComparisonTable = async ({ module, languageCode }: UnloadedModuleProps) => {
	const { fields, contentID } = await getContentItem<IComparisonTable>({
		contentID: module.contentid,
		languageCode,
		contentLinkDepth: 0,
	})

	// Parse the comparison data (text format or legacy JSON)
	let data: ParsedData | null = null
	if (fields.comparisonData) {
		const trimmed = fields.comparisonData.trim()
		if (trimmed.startsWith("{")) {
			// Legacy JSON — convert to ParsedData
			try {
				data = JSON.parse(trimmed)
			} catch {
				console.error("ComparisonTable: Invalid JSON in comparisonData field")
			}
		} else {
			data = parseComparisonData(trimmed)
		}
	}

	if (!data || !data.platforms?.length || !data.categories?.length) {
		return (
			<Container id={fields.anchorId || `${contentID}`} data-agility-component={contentID} className="bg-[#f8f4ff]">
				<div className="mx-auto max-w-7xl pb-14 text-center">
					<p className="text-gray-500">Comparison table data not configured yet.</p>
				</div>
			</Container>
		)
	}

	// Build platform list
	const platformList: Platform[] = data.platforms.map((name) => ({
		name,
		isAgility: name.toLowerCase().includes("agility"),
	}))

	// Build rows from categories and features
	const rows: ComparisonRow[] = []
	for (const category of data.categories) {
		rows.push({ type: "category", label: category.name })

		for (const feature of category.features) {
			const cells: Record<string, { status: "full" | "partial" | "none"; text?: string }> = {}
			for (const platform of data.platforms) {
				const val = feature.values[platform] || "none"
				if (val === "full") {
					cells[platform] = { status: "full" }
				} else if (val === "partial") {
					cells[platform] = { status: "partial" }
				} else if (val === "none") {
					cells[platform] = { status: "none" }
				} else {
					// Any other string is displayed as text
					cells[platform] = { status: "full", text: val }
				}
			}
			rows.push({
				type: "feature",
				name: feature.name,
				tooltip: feature.tooltip,
				cells,
			})
		}
	}

	return (
		<Container id={fields.anchorId || `${contentID}`} data-agility-component={contentID} className="bg-[#f8f4ff]">
			<div className="mx-auto max-w-7xl pb-14">
				<div className="mb-10 text-center">
					{fields.label && (
						<p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-highlight-light/70">
							{fields.label}
						</p>
					)}
					{fields.heading && (
						<h2 className="mb-3 text-balance text-3xl font-extrabold text-primary sm:text-4xl">
							{fields.heading}{" "}
							{fields.highlightedText && (
								<span className="italic text-highlight-light">{fields.highlightedText}</span>
							)}
						</h2>
					)}
					{fields.description && (
						<p className="mx-auto mb-6 max-w-xl text-gray-500">{fields.description}</p>
					)}
				</div>

				<ComparisonTableClient
					platforms={platformList}
					rows={rows}
					footnote={fields.footnote}
				/>
			</div>
		</Container>
	)
}
