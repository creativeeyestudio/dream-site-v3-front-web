import { GalleryProps } from '@/app/interfaces/_image';
import Image from 'next/image';

export interface GalleryImageProps {
    data: GalleryProps[];
}

const thumbSize: number = 100;

const Gallery: React.FC<GalleryImageProps> = (content: GalleryImageProps) => {
    return(
        <>
            {content.data.map((image, index) => (
                <figure key={index}>
                    <Image 
                        src={process.env. NEXT_PUBLIC_API_TOKEN + image.attributes.url} 
                        alt={image.attributes.alternativeText ?? `Galerie Image ${index + 1}`}
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