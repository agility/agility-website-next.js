import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from "react"
import { EmblaCarouselType } from "embla-carousel"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean
	nextBtnDisabled: boolean
	onPrevButtonClick: () => void
	onNextButtonClick: () => void
}

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return
		emblaApi.scrollPrev()
	}, [emblaApi])

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return
		emblaApi.scrollNext()
	}, [emblaApi])

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev())
		setNextBtnDisabled(!emblaApi.canScrollNext())
	}, [])

	useEffect(() => {
		if (!emblaApi) return

		onSelect(emblaApi)
		emblaApi.on("reInit", onSelect).on("select", onSelect)
	}, [emblaApi, onSelect])

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick
	}
}

type PropType = ComponentPropsWithRef<"button">

export const PrevButton: React.FC<PropType> = (props) => {
	const { children, ...restProps } = props

	return (
		<button
			className="pointer-events-auto group rounded-full p-1 hover:bg-gray-100/25 transition-all -ml-12 lg:ml-0 hover:scale-110"
			type="button"
			{...restProps}
		>
			<IconChevronLeft className="h-10 w-10 group-hover:text-highlight-light transition-all" />
			{children}
		</button>
	)
}

export const NextButton: React.FC<PropType> = (props) => {
	const { children, ...restProps } = props

	return (
		<button
			className="pointer-events-auto group rounded-full p-1 hover:bg-gray-100/25 transition-all -mr-12 lg:mr-0 hover:scale-110"
			type="button"
			{...restProps}
		>
			<IconChevronRight className="h-10 w-10 group-hover:text-highlight-light transition-all" />
			{children}
		</button>
	)
}
