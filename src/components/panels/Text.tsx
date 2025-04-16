import { TextProps } from "@/app/interfaces/blocks";

const Text: React.FC<TextProps> = ({ title, text, first_block }) => {
    return (
        <section>
            {first_block ? <h1>{title}</h1> : <h2>{title}</h2>}
            {text}
        </section>
    );
};

export default Text;
