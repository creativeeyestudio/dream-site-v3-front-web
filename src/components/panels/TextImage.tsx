import { TextImageProps } from '@/app/interfaces/blocks';
import Image from 'next/image';

const TextImage: React.FC<TextImageProps> = ({ title, text, image }) => {
    return (
        <section>
            <h2>{ title }</h2>

            {text}
            
            <figure className="text-img_img">
                <Image
                    src={process.env.NEXT_PUBLIC_API_URL + image.url}
                    width={image.width}
                    height={image.height}
                    alt={image.alternativeText ?? "Missing Alt"} />
            </figure>
        </section>
    );
}

export default TextImage;