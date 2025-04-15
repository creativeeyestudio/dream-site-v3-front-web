import { ParallaxProps, SeoProps, TextDoubleImageProps, TextImageProps, TextIntroProps, TextProps } from "./blocks"

export type BlockProps =
  TextProps
  | TextIntroProps
  | TextImageProps
  | TextDoubleImageProps
  | ParallaxProps

export default interface PageProps {
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