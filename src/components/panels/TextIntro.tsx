import { TextBlock } from "@/app/interfaces/page";
import { JSX } from "react";

interface TextIntroProps {
    title: string
    content: TextBlock[]
}

const TextIntro: React.FC<TextIntroProps> = ({ title, content }) => {
    return(
        <section>
            <h2>{title}</h2>
            {content.map((paragraph, index) => (
                <p key={index}>
                    {paragraph.children.map((child, childIndex) => {
                        if (child.type === "link" && child.url) {
                            // Si l'élément est un lien
                            let linkContent: JSX.Element[] = [];

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
        </section>
    )
}

export default TextIntro;