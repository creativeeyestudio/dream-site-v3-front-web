import Gallery from "@/components/panels/Gallery"
import { ImageDataProps } from "@/interfaces/image"

interface GalleryImagesProps {
    images: ImageDataProps[]
}

const GalleryImages: React.FC<GalleryImagesProps> = ({ images }) => {
    return (
        <section>
            <h1>Galerie d'image</h1>
            <Gallery images={images} />
        </section>
    )
}

export default GalleryImages;