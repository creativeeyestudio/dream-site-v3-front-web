import Image from "next/image";
import React from "react";
import { TextDoubleImageProps } from "@/app/interfaces/blocks";

const TextDoubleImage: React.FC<TextDoubleImageProps> = ({ content, image1, image2 }) => {
  return (
    <section className="text-double-img">
      <div className="text-double-img_content">
        <h2 className="text-double-img_content_title">{content.title}</h2>
      </div>

      <figure className="text-double-img_image text-double-img_image--first">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + image1.attributes.url}
          width={image1.attributes.width}
          height={image1.attributes.height}
          alt={image1.attributes.alternativeText}
        />
      </figure>

      {image2 != null ? <figure className="text-double-img_image text-double-img_image--second">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + image2?.attributes.url}
          width={image2?.attributes.width}
          height={image2?.attributes.height}
          alt={image2?.attributes.alternativeText}
        />
      </figure> : <></>}
    </section>
  );
};

export default TextDoubleImage;
