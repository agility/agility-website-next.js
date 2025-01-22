import Highlighter from 'react-highlight-words'

export function HighlightQuery({ text, query }: { text: string; query: string }) {
	return (
		<Highlighter
			highlightClassName="bg-transparent text-highlight-light"
			searchWords={[query]}
			autoEscape={true}
			textToHighlight={text}
		/>
	)
}