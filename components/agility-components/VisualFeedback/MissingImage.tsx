import React from "react"

interface IMissingImageProps {
	isPreview: boolean
}

const MissingImage: React.FC<IMissingImageProps> = ({ isPreview }) => {
	if (isPreview) {
		return (
			<div className="flex w-full items-center justify-center rounded border-2 border-red-400 bg-red-50 p-4 text-center text-lg text-slate-500">
				<div>
					<h1 className="mb-2 font-medium">
						Image Not Found <span>😢</span>
					</h1>
					<p className="text-sm">Please double check the content item before publishing.</p>
				</div>
			</div>
		)
	} else {
		return null
	}
}

export { MissingImage }
