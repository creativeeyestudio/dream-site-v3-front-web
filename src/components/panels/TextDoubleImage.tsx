import Image from "next/image";
import React from "react";
import { TextDoubleImageProps } from "@/app/interfaces/blocks";

const TextDoubleImage: React.FC<TextDoubleImageProps> = ({ title, text, image1, image2, first_block }) => {
	const TitleTag = first_block ? 'h1' : 'h2';

	return (
		<section className="text-double-img">
			<div className="text-double-img_content">
				<TitleTag>{ title }</TitleTag>
				<div className="text-double-img_content_text" dangerouslySetInnerHTML={{ __html: text }}></div>
			</div>

			<figure className="text-double-img_image--1">
				<Image
					src={process.env.NEXT_PUBLIC_API_URL + image1.url}
					width={image1.width}
					height={image1.height}
					alt={image1.alternativeText}
				/>
			</figure>

			{image2 != undefined ? <figure className="text-double-img_image--2">
				<Image
					src={process.env.NEXT_PUBLIC_API_URL + image2.url}
					width={image2.width}
					height={image2.height}
					alt={image2.alternativeText}
				/>
			</figure> : <></>}
		</section>
	);
};

export default TextDoubleImage;
