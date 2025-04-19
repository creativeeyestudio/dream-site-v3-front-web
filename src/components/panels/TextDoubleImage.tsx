import Image from "next/image";
import React from "react";
import { TextDoubleImageProps } from "@/app/interfaces/blocks";

const TextDoubleImage: React.FC<TextDoubleImageProps> = ({ title, text, image1, image2, first_block }) => {
  return (
    <section className="">
      <div className="">
        { first_block ? <h1>{title}</h1> : <h2>{title}</h2> }
        <div className="text" dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>

      <figure className="">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + image1.url}
          width={image1.width}
          height={image1.height}
          alt={image1.alternativeText}
        />
      </figure>

      {image2 != null ? <figure className="">
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
