"use client"
import clsx from "clsx"
import { LinkButton } from "components/micro/LinkButton"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { MotionBlur } from "components/micro/loaders/MotionBlur"

interface Props {
	onLoadMore: () => void
	isLoading: boolean
	hasMore: boolean
}

export const InfiniteLoadMore = (props: Props) => {
	const { onLoadMore, isLoading, hasMore } = props
	const refContainer = useRef<HTMLDivElement>(null)
	const refIsLoading = useRef(isLoading)
	const refHasMore = useRef(hasMore)

	const [isLoadingInternal, setIsLoadingInternal] = useState(isLoading)

	useEffect(() => {
		refIsLoading.current = isLoading
		refHasMore.current = hasMore
	}, [hasMore, isLoading])

	useEffect(() => {
		let to: any = null
		if (refIsLoading.current !== isLoading) {
			if (isLoading) {
				clearTimeout(to)
				setIsLoadingInternal(isLoading)
			} else {
				to = setTimeout(() => {
					setIsLoadingInternal(isLoading)
				}, 500)
			}
		}
	}, [isLoading])

	useLayoutEffect(() => {
		if (!refContainer.current) return
		const elem1 = refContainer.current

		let options = {
			root: null,
			rootMargin: "0px",
			threshold: 0
		}

		const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
			//check if the first element is visible (intersecting)
			if (entries.length === 0) return
			const entry = entries[0]

			if (entry.isIntersecting) {
				if (refHasMore.current && !refIsLoading.current) {
					refIsLoading.current = true
					setIsLoadingInternal(true)
					onLoadMore()
				}
			}
		}

		let observer = new IntersectionObserver(callback, options)
		observer.observe(elem1)

		return () => {
			observer.disconnect()
		}
	}, [onLoadMore])

	return (
		<div ref={refContainer} className={clsx("my-10 flex w-full justify-center", hasMore ? "" : "hidden")}>
			<LinkButton
				size="md"
				onClick={() => onLoadMore()}
				type="secondary"
				disabled={isLoadingInternal}
				className="w-40 dark:!bg-secondary dark:!text-gray-900 dark:hover:!bg-secondary"
			>
				{isLoadingInternal ? (
					<div className="h-6 w-6">
						<MotionBlur />
					</div>
				) : (
					<div>Load More</div>
				)}
			</LinkButton>
		</div>
	)
}
