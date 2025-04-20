import Image from "next/image";
import React from 'react';
import Ukiyo from "ukiyojs";
import { ParallaxProps } from "@/app/interfaces/blocks";

const Parallax: React.FC<ParallaxProps> = ({ image, speed }) => {
    
    new Ukiyo('.parallax_img', {
        speed: speed
    });

    return(
        <>
            <figure className="parallax">
                <Image
                    className="parallax_image"
                    src={process.env.NEXT_PUBLIC_API_URL + image.url}
                    alt={image.alternativeText}
                    fill={true}/>
            </figure>
        </>
    )
}

export default Parallax;