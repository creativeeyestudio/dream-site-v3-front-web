import { TextProps } from "@/interfaces/blocks";

const Text: React.FC<TextProps> = ({ title, text, first_block }) => {
    const TitleTag = first_block ? 'h1' : 'h2';
    
    return (
        <section>
            <TitleTag>{ title }</TitleTag>
            <div className="text" dangerouslySetInnerHTML={{ __html: text }}></div>
        </section>
    );
};

export default Text;
