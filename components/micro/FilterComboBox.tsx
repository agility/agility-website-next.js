"use client"
import { Combobox, Label, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from "@headlessui/react"
import { IconCheck, IconChevronDown } from "@tabler/icons-react"
import { useMemo, useState } from "react"

export interface ComboboItem {
	text: string
	value: any
}

interface Props {
	items: ComboboItem[]
	selectedItem?: ComboboItem | null
	onChange: (item: ComboboItem | null) => void
	label: string
}

export const FilterComboBox = ({ items, onChange, selectedItem, label }: Props) => {
	const [query, setQuery] = useState("")

	const filteredItems = useMemo(
		() =>
			query === ""
				? items
				: items.filter((item) => {
						return item.text.toLowerCase().includes(query.toLowerCase())
					}),
		[query, items]
	)

	return (
		<Combobox
			as="div"
			value={selectedItem || { text: label, value: null }}
			onChange={(item) => {
				setQuery("")
				onChange(item)
			}}
			className="group"
			immediate
		>
			<div className="relative mt-2">
				<ComboboxInput
					className="w-full border-0 bg-background py-2 pl-3 pr-10 text-base font-medium text-highlight shadow-sm focus:ring-2 focus:ring-inset focus:ring-highlight sm:text-sm sm:leading-6"
					onChange={(event) => setQuery(event.target.value)}
					onBlur={() => setQuery("")}
					displayValue={(item: ComboboItem) => item.text}
				/>
				<ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
					<IconChevronDown
						className="h-5 w-5 text-highlight transition-transform group-data-[open]:rotate-180"
						aria-hidden="true"
					/>
				</ComboboxButton>

				{filteredItems.length > 0 && (
					<ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						<ComboboxOption
							key={label}
							value={{
								text: label,
								value: ""
							}}
							className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
						>
							<span className="block truncate group-data-[selected]:font-semibold">{label}</span>

							<span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
								<IconCheck className="h-5 w-5" aria-hidden="true" />
							</span>
						</ComboboxOption>

						{filteredItems.map((item) => (
							<ComboboxOption
								key={item.value || item.text}
								value={item}
								className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
							>
								<span className="block truncate group-data-[selected]:font-semibold">{item.text}</span>

								<span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-indigo-600 group-data-[selected]:flex group-data-[focus]:text-white">
									<IconCheck className="h-5 w-5" aria-hidden="true" />
								</span>
							</ComboboxOption>
						))}
					</ComboboxOptions>
				)}
			</div>
		</Combobox>
	)
}
