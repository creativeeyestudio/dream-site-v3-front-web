import {
  HeroscreenProps,
  HTMLContentProps,
  ParallaxProps,
  TextDoubleImageProps,
  TextImageProps,
  TextIntroProps,
  TextProps,
} from "./blocks";
import { WebsiteProps } from "./website"

export type BlockProps =
  | TextProps
  | TextIntroProps
  | TextImageProps
  | TextDoubleImageProps
  | ParallaxProps
  | HeroscreenProps
  | HTMLContentProps

export interface PageProps {
  docs: PageDoc[]
}

export interface PageDoc {
  createdAt: string
  updatedAt: string
  title: string
  slug: string
  content: {
    layout: BlockProps[]
  }
  config: {
    site: WebsiteProps
  }
  meta: {
    title: string;
    description: string;
  };
}
