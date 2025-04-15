import Image from "next/image";
import React from 'react';
import Ukiyo from "ukiyojs";
import { ParallaxProps } from "@/app/interfaces/blocks";

const Parallax: React.FC<ParallaxProps> = ({ image, speed }) => {
    
    new Ukiyo('.prx_img', {
        speed: speed ?? 1.5
    });

    return(
        <>
        <figure className="prx h-[50vh] overflow-hidden relative">
            <Image
                className="prx_img"
                src={process.env.NEXT_PUBLIC_API_URL + image.url}
                alt={image.alternativeText}
                fill={true}/>
        </figure>
        </>
    )
}

export default Parallax;