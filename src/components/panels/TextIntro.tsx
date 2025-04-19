import { TextIntroProps } from "@/app/interfaces/blocks";

const TextIntro: React.FC<TextIntroProps> = ({ title, text, first_block }) => {
    return(
        <section>
            { first_block ? <h1>{title}</h1> : <h2>{title}</h2> }
            <div className="text" dangerouslySetInnerHTML={{ __html: text }}></div>
        </section>
    )
}

export default TextIntro;