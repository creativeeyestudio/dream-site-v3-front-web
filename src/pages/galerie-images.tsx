import Layout from "@/components/layout/Layout"
import Gallery from "@/components/panels/Gallery"
import { ImageDataProps } from "@/interfaces/image"

interface GalleryImagesProps {
    images: ImageDataProps[]
}

const GalleryImages: React.FC<GalleryImagesProps> = ({ images }) => {
    return (
        <Layout noIntro={true}>
            <section>
                <h1>Galerie d'image</h1>
                <Gallery images={images} />
            </section>
        </Layout>
    )
}

export default GalleryImages;