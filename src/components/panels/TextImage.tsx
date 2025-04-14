import { TextImageProps } from '@/app/interfaces/blocks';
import Image from 'next/image';

const TextImage: React.FC<TextImageProps> = ({ content, image }) => {
    return (
        <section>
            <h2>{ content.title }</h2>
            
            <figure className="text-img_img">
                <Image
                    src={process.env.NEXT_PUBLIC_API_URL + image.attributes.url}
                    width={image.attributes.width}
                    height={image.attributes.height}
                    alt={image.attributes.alternativeText ?? "Missing Alt"} />
            </figure>
        </section>
    );
}

export default TextImage;