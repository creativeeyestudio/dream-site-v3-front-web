import Image from "next/image";
import React from "react";
import { ImageProps } from "@/app/interfaces/_image";
import { LinkItem, TextBlock } from "@/app/interfaces/page";
import ButtonLink from "../../app/_components/buttonLink";

export interface TextDoubleImageProps {
  title: string
  text: TextBlock[]
  links: LinkItem[]
  image1: ImageProps
  image2: ImageProps
}

const TextDoubleImage: React.FC<TextDoubleImageProps> = ({ title, text, links, image1, image2 }) => {
  return (
    <section className="text-double-img">
      <div className="text-double-img_content">
        <h2 className="text-double-img_title">{title}</h2>
        {text.map((paragraph, index) => (
            <p key={index}>
                {paragraph.children.map((child, childIndex) => {
                    if (child.type === "link" && child.url) {
                        // Si l'élément est un lien
                        const linkContent: JSX.Element[] = [];

                        child.children?.forEach((linkChild, linkChildIndex) => {
                            let linkText: JSX.Element | string = linkChild.text;

                            // Appliquer les styles bold et italic sur le texte du lien
                            if (linkChild.bold && linkChild.italic) {
                                linkText = <strong key={linkChildIndex}><em>{linkChild.text}</em></strong>;
                            } else if (linkChild.bold) {
                                linkText = <strong key={linkChildIndex}>{linkChild.text}</strong>;
                            } else if (linkChild.italic) {
                                linkText = <em key={linkChildIndex}>{linkChild.text}</em>;
                            }

                            linkContent.push(linkText);
                        });

                        return (
                            <a key={childIndex} href={child.url} target="_blank" rel="noopener noreferrer">
                                {linkContent}
                            </a>
                        );
                    }

                    // Gérer les autres types de texte (normal, avec bold et italic)
                    let textElement: JSX.Element = <>{child.text}</>;

                    if (child.bold && child.italic) {
                        textElement = <strong key={childIndex}><em>{child.text}</em></strong>;
                    } else if (child.bold) {
                        textElement = <strong key={childIndex}>{child.text}</strong>;
                    } else if (child.italic) {
                        textElement = <em key={childIndex}>{child.text}</em>;
                    }

                    return <span key={childIndex}>{textElement}</span>;
                })}
            </p>
        ))}
        <div className='btnLinks'>
            {links?.map((link) => (
                <>
                    <ButtonLink 
                        primary={true} 
                        label={link.label}
                        href={
                            link.external_link ? link.external_link : 
                            link.pages.data[0] ? link.pages.data[0].attributes.slug : 
                            link.posts.data[0] ? 'blog/' + link.posts.data[0]?.attributes.slug : ""
                        }
                        external={link.external_link ? true : false}
                    />
                </>
            ))}
        </div>
      </div>

      <figure className="text-double-img_image text-double-img_image--first">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + image1.data.attributes.url}
          width={image1.data.attributes.width}
          height={image1.data.attributes.height}
          alt={image1.data.attributes.alternativeText}
        />
      </figure>

      {image2.data != null ? <figure className="text-double-img_image text-double-img_image--second">
        <Image
          src={process.env.NEXT_PUBLIC_API_URL + image2.data?.attributes.url}
          width={image2.data?.attributes.width}
          height={image2.data?.attributes.height}
          alt={image2.data?.attributes.alternativeText}
        />
      </figure> : <></>}
    </section>
  );
};

export default TextDoubleImage;
