import { ImageField } from "@agility/nextjs"
import React, { FC } from "react"


interface AgilityImageSourceProps
	extends Omit<React.DetailedHTMLProps<React.SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>, "srcSet"> { }

/**
 * The AgilityPic component allows you to specify different image sizes for different css media selectors.
 * @exports
 * @interface AgilityImageProps
 */
export interface AgilityPicProps {
	/**
	 * An image from Agility.
	 */
	image: ImageField
	/**
	 * optional: the fallback width of the image to output in the <img> tag after the sources.
	 * This will render if no sources are selected, or if the browser does not support the <picture> tag.
	 */
	fallbackWidth?: number

	/**
	 * optional: the alt text for the image if you don't want to use the one defined on the image from Agility.
	 */
	alt?: string

	/**
	 * optional: the sources for the image.  This allows you to specify different image sizes for different css media selectors.
	 */
	sources?: AgilityImageSourceProps[]

	/**
	 * optional: if true, the fallback  <img> as eager instead of lazy.
	 */
	priority?: boolean

	/**
	 * The class name to apply to the <img>. You do NOT have to apply classNames to the source tags, as they inherit the class from the img.
	 */
	className?: string
}

/**
 * This will output a picture tag with the image and sources provided, using the Agility Image API.
 * The sources property allows you to specify different image sizes for different css media selectors.
 *
 * @param {AgilityPicProps} props
 */
export const AgilityPic: FC<AgilityPicProps> = ({ image, alt, priority, className, sources, fallbackWidth }) => {
	let src = image.url

	let imgHeight: number | undefined = undefined
	let imgWidth: number | undefined = undefined

	if (fallbackWidth !== undefined && fallbackWidth > 0) {
		src = `${image.url}?format=auto&w=${fallbackWidth}`

		let aspectRatio = image.width / image.height
		imgWidth = fallbackWidth
		imgHeight = Math.round(fallbackWidth / aspectRatio)

	}

	return (
		<picture>
			{sources?.map((source, index) => {
				let srcSet = image.url
				let w = Number(source.width) > 0 ? `&w=${source.width}` : ``
				let h = Number(source.height) > 0 ? `&h=${source.height}` : ``
				const key = `${srcSet}-${index}`

				if (h || w) {
					//if we have a width and NOT a height, do NOT allow the image to be sized larger than the original width
					if (w && !h) w = `&w=${Math.min(Number(source.width), image.width)}`

					//if we have a height and NOT a width, do NOT allow the image to be sized larger than the original height
					if (h && !w) h = `&h=${Math.min(Number(source.height), image.height)}`

					//if we have a width or a height, add the formatting query strings for quality and format, h and/or w
					srcSet = `${image.url}?format=auto${w}${h}`
				}

				return <source key={key} {...source} srcSet={srcSet} />
			})}

			<img loading={priority ? "eager" : "lazy"} src={src} alt={alt || image.label} className={className} width={imgWidth} height={imgWidth} />
		</picture>
	)
}
