import Image from "next/image";
import React from 'react';
import { ImageProps } from "@/app/interfaces/_image";
import Ukiyo from "ukiyojs";

interface ParallaxProps {
    image: ImageProps
    speed: number
}

const Parallax: React.FC<ParallaxProps> = (content: ParallaxProps) => {
    
    new Ukiyo('.prx_img', {
        speed: content.speed ?? 1.5
    });

    return(
        <>
        <figure className="prx h-[50vh] overflow-hidden relative">
            <Image
                className="prx_img"
                src={process.env.NEXT_PUBLIC_API_URL + content.image.data.attributes.url}
                alt={content.image.data.attributes.alternativeText}
                fill={true}/>
        </figure>
        </>
    )
}

export default Parallax;