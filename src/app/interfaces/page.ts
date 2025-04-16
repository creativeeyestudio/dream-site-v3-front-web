import { HeroscreenProps, ParallaxProps, SeoProps, TextDoubleImageProps, TextImageProps, TextIntroProps, TextProps } from "./blocks"

export type BlockProps =
  TextProps
  | TextIntroProps
  | TextImageProps
  | TextDoubleImageProps
  | ParallaxProps
  | HeroscreenProps

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
  content_page: BlockProps[]
  seo: SeoProps
}

export default interface PageWebProps {
  page: PageProps;
  error: string;
}