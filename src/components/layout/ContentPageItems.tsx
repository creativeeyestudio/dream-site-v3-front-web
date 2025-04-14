import Parallax from "../panels/Parallax";
import Heroscreen from "../panels/Heroscreen";
import TextDoubleImage from "../panels/TextDoubleImage";
import TextImage from "../panels/TextImage";
import TextIntro from "../panels/TextIntro";
import Text from "../panels/Text";
import { ContentPage } from "@/app/interfaces/page";

interface WebPageProps {
    blocks: ContentPage[]; // blocks est un tableau d'objets de type ContentPage.
  }

const ContentPageItems: React.FC<WebPageProps> = ({ blocks }) => {
    return <>
    {blocks.map((block, index) => {
      switch (block.__component) {
        case "page.text-intro":
          return (
            <TextIntro title={block.title} content={block.content} key={index} />
          );
        case "page.text":
          return (
            <Text title={block.title} content={block.content} key={index} />
          );
        case "page.text-image":
          return (
            <TextImage title={block.title} text={block.text} links={block.links} image={block.image} key={index} />
          );
        case "page.text-double-image":
          return (
            <TextDoubleImage title={block.title} text={block.text} links={block.links} image1={block.image1} image2={block.image2} key={index} />
          );
        case "page.parallax":
          return (
            <Parallax image={block.image} speed={block.speed} key={index} />
          );
        case "page.heroscreen":
          return (
            <Heroscreen images={block.images} key={index} />
          );
        default:
          return <></>;
      }
    })}
  </>;
}

export default ContentPageItems;