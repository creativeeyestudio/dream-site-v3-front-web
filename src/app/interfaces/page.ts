import { CarouselProps, HeroscreenProps, ParallaxProps, TextDoubleImageProps, TextImageProps, TextIntroProps, TextProps } from "./blocks"
import { SeoProps } from "./seo"

export interface PageProps {
  id: number
  title: string
  slug: string
  homepage: boolean
  secondary_page: boolean
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  documentId: string
  locale: 'fr-FR' | 'en-EN'
  content_page: (TextProps | TextIntroProps | TextImageProps | TextDoubleImageProps | HeroscreenProps | CarouselProps | ParallaxProps)[]
  seo: SeoProps
}

export default PageProps;
