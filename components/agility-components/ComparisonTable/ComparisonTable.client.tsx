"use client"

import { IconCheck, IconX, IconMinus, IconInfoCircle, IconChevronDown } from "@tabler/icons-react"
import clsx from "clsx"
import { useState, useEffect, useRef } from "react"

export interface Platform {
	name: string
	isAgility: boolean
}

export type ComparisonRow =
	| { type: "category"; label: string }
	| {
			type: "feature"
			name: string
			tooltip?: string
			cells: Record<string, { status: "full" | "partial" | "none"; text?: string }>
	  }

interface Props {
	platforms: Platform[]
	rows: ComparisonRow[]
	footnote?: string
}

function StatusCell({ status, text }: { status: "full" | "partial" | "none"; text?: string }) {
	if (text) {
		return <span className="block text-center text-sm font-semibold text-primary">{text}</span>
	}

	if (status === "full") {
		return (
			<span className="flex justify-center">
				<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-50">
					<IconCheck className="h-4 w-4 text-green-600" stroke={3} />
				</span>
			</span>
		)
	}

	if (status === "partial") {
		return (
			<span className="flex justify-center">
				<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-50">
					<IconMinus className="h-4 w-4 text-amber-500" stroke={3} />
				</span>
			</span>
		)
	}

	return (
		<span className="flex justify-center">
			<span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-50">
				<IconX className="h-4 w-4 text-red-400" stroke={3} />
			</span>
		</span>
	)
}

export function ComparisonTableClient({ platforms, rows, footnote }: Props) {
	const [openTooltip, setOpenTooltip] = useState<string | null>(null)
	const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())
	const tableRef = useRef<HTMLDivElement>(null)

	// Close tooltip when clicking outside
	useEffect(() => {
		if (!openTooltip) return
		const handleClick = (e: MouseEvent) => {
			if (tableRef.current && !tableRef.current.contains(e.target as Node)) {
				setOpenTooltip(null)
			}
		}
		document.addEventListener("click", handleClick)
		return () => document.removeEventListener("click", handleClick)
	}, [openTooltip])

	const toggleCategory = (label: string) => {
		setCollapsedCategories((prev) => {
			const next = new Set(prev)
			if (next.has(label)) next.delete(label)
			else next.add(label)
			return next
		})
	}

	// Build a map of which category each feature belongs to
	let currentCategory = ""

	return (
		<div ref={tableRef}>
			{/* Legend */}
			<div className="mb-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
				<div className="flex items-center gap-2">
					<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-50">
						<IconCheck className="h-3 w-3 text-green-600" stroke={3} />
					</span>
					<span>Fully supported</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-50">
						<IconMinus className="h-3 w-3 text-amber-500" stroke={3} />
					</span>
					<span>Partial / add-on / plugin required</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-50">
						<IconX className="h-3 w-3 text-red-400" stroke={3} />
					</span>
					<span>Not available</span>
				</div>
			</div>

			{/* Table */}
			<div className="mx-auto max-w-6xl overflow-x-auto rounded-2xl border border-gray-200/40 bg-white shadow-lg">
				<table className="w-full min-w-[800px] border-collapse">
					<thead>
						<tr className="bg-[#1a1a2e]">
							<th className="sticky left-0 z-10 w-52 bg-[#1a1a2e] px-5 py-4 text-left text-xs font-semibold text-white/50">
								Feature
							</th>
							{platforms.map((p) => (
								<th
									key={p.name}
									className="min-w-[110px] border-l border-white/10 px-4 py-4 text-center"
								>
									{p.isAgility ? (
										<>
											<span className="block text-sm font-bold text-white">{p.name}</span>
											<span className="block text-xs font-normal text-white/60">
												Headless CMS+
											</span>
										</>
									) : (
										<span className="text-xs font-semibold text-white/60">{p.name}</span>
									)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.map((row, idx) => {
							if (row.type === "category") {
								currentCategory = row.label
								const isCollapsed = collapsedCategories.has(row.label)
								return (
									<tr
										key={`cat-${idx}`}
										className="border-t border-gray-200/30 bg-[#f4f0fd] cursor-pointer"
										onClick={() => toggleCategory(row.label)}
									>
										<td
											colSpan={platforms.length + 1}
											className="sticky left-0 bg-[#f4f0fd] px-5 py-3"
										>
											<div className="flex items-center justify-between">
												<span className="text-sm font-bold uppercase tracking-wide text-gray-700/80">
													{row.label}
												</span>
												<IconChevronDown
													className={clsx(
														"h-4 w-4 text-gray-500 transition-transform duration-200",
														isCollapsed && "-rotate-90"
													)}
													stroke={2}
												/>
											</div>
										</td>
									</tr>
								)
							}

							if (collapsedCategories.has(currentCategory)) return null

							return (
								<tr
									key={`row-${idx}`}
									className="border-t border-gray-200/20 bg-white transition-colors hover:bg-gray-50"
								>
									<td className="sticky left-0 z-10 bg-white px-5 py-3.5 hover:bg-gray-50">
										<div className="flex items-start gap-2">
											<span className="text-sm font-medium text-gray-800">
												{row.name}
											</span>
											{row.tooltip && (
												<div className="relative">
													<button
														type="button"
														className="text-gray-400 transition-colors hover:text-highlight-light"
														onClick={() =>
															setOpenTooltip(
																openTooltip === row.name ? null : row.name
															)
														}
													>
														<IconInfoCircle className="h-4 w-4" stroke={2} />
													</button>
													{openTooltip === row.name && (
														<div className="absolute left-6 top-0 z-20 w-64 rounded-lg border border-gray-200 bg-white p-3 text-xs text-gray-600 shadow-lg">
															{row.tooltip}
															<button
																className="mt-2 block text-highlight-light hover:underline"
																onClick={() => setOpenTooltip(null)}
															>
																Close
															</button>
														</div>
													)}
												</div>
											)}
										</div>
									</td>
									{platforms.map((p) => {
										const cell = row.cells[p.name] || {
											status: "none" as const,
										}
										return (
											<td
												key={p.name}
												className={clsx(
													"border-l border-gray-200/10 px-4 py-3.5 text-center",
													p.isAgility && "bg-highlight-light/5"
												)}
											>
												<StatusCell
													status={cell.status}
													text={cell.text}
												/>
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>

			{/* Footnote */}
			{footnote && (
				<div className="mt-4 space-y-2 text-xs text-gray-500">
					<p>{footnote}</p>
				</div>
			)}
		</div>
	)
}
