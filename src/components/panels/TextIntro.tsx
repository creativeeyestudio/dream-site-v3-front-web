import { TextIntroProps } from "@/app/interfaces/blocks";

const TextIntro: React.FC<TextIntroProps> = ({ title, text }) => {
    return(
        <section>
            <h1>{ title }</h1>
            <div className="text">
                { text }
            </div>
        </section>
    )
}

export default TextIntro;