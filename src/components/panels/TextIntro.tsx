import { TextIntroProps } from "@/app/interfaces/blocks";

const TextIntro: React.FC<TextIntroProps> = ({ content }) => {
    return(
        <section>
            <h2>{ content.title }</h2>
        </section>
    )
}

export default TextIntro;