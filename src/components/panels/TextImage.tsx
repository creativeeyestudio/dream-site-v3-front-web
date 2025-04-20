import { TextImageProps } from '@/app/interfaces/blocks';
import Image from 'next/image';

const TextImage: React.FC<TextImageProps> = ({ title, text, image, first_block }) => {
	const TitleTag = first_block ? 'h1' : 'h2';

	return (
        <section className='text-img'>
            <div className='text-img_content'>
                <TitleTag>{ title }</TitleTag>
                <div className="text" dangerouslySetInnerHTML={{ __html: text }}></div>
            </div>
            
            <figure className="text-img_image">
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