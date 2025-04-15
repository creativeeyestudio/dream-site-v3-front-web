import { TextIntroProps } from "@/app/interfaces/blocks";

const TextIntro: React.FC<TextIntroProps> = ({ title, text }) => {
    return(
        <section>
            <h2>{ title }</h2>
            <div className="text">
                { text }
            </div>
        </section>
    )
}

export default TextIntro;