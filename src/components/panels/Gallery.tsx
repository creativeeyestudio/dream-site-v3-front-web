import { GalleryProps } from '@/app/interfaces/blocks';
import Image from 'next/image';

const thumbSize: number = 100;

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    return(
        <>
            {images.map((image, index: number) => (
                <figure key={index}>
                    <Image 
                        src={process.env.NEXT_PUBLIC_API_TOKEN + image.url} 
                        alt={image.alternativeText ?? `Galerie Image ${index + 1}`}
                        width={thumbSize}
                        height={thumbSize}
                        style={{objectFit: 'cover', objectPosition: 'center'}}
                    />
                </figure>
            ))}
        </>
    )
}

export default Gallery