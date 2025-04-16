import Text from "../panels/Text";
import TextIntro from "../panels/TextIntro";
import TextImage from "../panels/TextImage";
import TextDoubleImage from "../panels/TextDoubleImage";
import Parallax from "../panels/Parallax";
import Heroscreen from "../panels/Heroscreen";
import { BlockProps } from "@/app/interfaces/page";

interface ContentPageItemsProps {
  blocks: BlockProps[];
}

const ContentPageItems: React.FC<ContentPageItemsProps> = ({ blocks }) => {
    return <>
      {blocks.map((block, index) => {
        switch (block.__component) {
          case "page.text":
            return (
              <Text title={block.title} text={block.text} first_block={index === 0 ? true : false} key={index}  />
            );
          case "page.text-intro":
            return (
              <TextIntro title={block.title} text={block.text} first_block={index === 0 ? true : false} key={index} />
            );
          case "page.text-image":
            return (
              <TextImage title={block.title} text={block.text} image={block.image} first_block={index === 0 ? true : false} key={index} />
            );
          case "page.text-double-image":
            return (
              <TextDoubleImage title={block.title} text={block.text} image1={block.image1} image2={block.image2} first_block={index === 0 ? true : false} key={index} />
            );
          case "page.parallax":
            return (
              <Parallax image={block.image} speed={block.speed} key={index} />
            );
          case "page.heroscreen":
            return (
              <Heroscreen images={block.images} key={index}></Heroscreen>
            )
          default:
            return <></>;
        }
      })}
    </>;
}

export default ContentPageItems;