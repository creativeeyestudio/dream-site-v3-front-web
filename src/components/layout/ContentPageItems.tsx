import Text from "../panels/Text";
import PageProps from "@/app/interfaces/page";
import TextIntro from "../panels/TextIntro";
import TextImage from "../panels/TextImage";
import TextDoubleImage from "../panels/TextDoubleImage";
import Parallax from "../panels/Parallax";

const ContentPageItems: React.FC<PageProps> = ({ content_page }) => {
    return <>
      {content_page.map((block, index) => {
        switch (block.__component) {
          case "page.text":
            return (
              <Text title={block.title} text={block.text} key={index} />
            );
          case "page.text-intro":
            return (
              <TextIntro title={block.title} text={block.text} key={index} />
            );
          case "page.text-image":
            return (
              <TextImage title={block.title} text={block.text} image={block.image} key={index} />
            );
          case "page.text-double-image":
            return (
              <TextDoubleImage title={block.title} text={block.text} image1={block.image1} image2={block.image2} key={index} />
            );
          case "page.parallax":
            return (
              <Parallax image={block.image} speed={block.speed} key={index} />
            );
          default:
            return <></>;
        }
      })}
    </>;
}

export default ContentPageItems;