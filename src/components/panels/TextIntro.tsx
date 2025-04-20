import { TextIntroProps } from "@/app/interfaces/blocks";

const TextIntro: React.FC<TextIntroProps> = ({ title, text, first_block }) => {
    return(
        <section className="text-intro">
            { first_block ? <h1>{title}</h1> : <h2>{title}</h2> }
            <div className="text-intro_content" dangerouslySetInnerHTML={{ __html: text }}></div>
        </section>
    )
}

export default TextIntro;