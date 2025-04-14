import { TextProps } from "@/app/interfaces/blocks";

const Text: React.FC<TextProps> = ({ title, text }) => {
    return (
        <section>
            <h2>{title}</h2>
            {text}
        </section>
    );
};

export default Text;
