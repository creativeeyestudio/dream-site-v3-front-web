import Layout from "@/components/layout/Layout"
import Heroscreen from "@/components/panels/Heroscreen"
import Parallax from "@/components/panels/Parallax"
import ButtonLink from "@/components/ui/ButtonLink"
import { ImageDataProps } from "@/interfaces/image"

interface RoomPageProps {
    heroscreen: ImageDataProps[]
    title: string
    desc: string
    price: string
    link: string
    details: string[]
    parallax: ImageDataProps
}

const RoomPage: React.FC<RoomPageProps> = ({ heroscreen, title, desc, price, link, details, parallax }) => {
    return(
        <Layout noIntro={false}>
            <Heroscreen images={heroscreen} />

            <section className="room">
                <div className="room__desc">
                    <h1 className="room__title">{title}</h1>
                    <div className="room__text">{desc}</div>
                    <span className="room__price">{price}</span>  
                    <ButtonLink label={"Réserver une chambre"} link={link} isBlank={true}></ButtonLink>
                </div>
                <div className="room__services">
                    <h2>Détails</h2>
                    <ul>
                        {details.map((detail: string, key: number) => (
                            <li key={key}>{detail}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section>
                <Parallax image={parallax} speed={0}></Parallax>
            </section>
        </Layout>
    )
}

export default RoomPage