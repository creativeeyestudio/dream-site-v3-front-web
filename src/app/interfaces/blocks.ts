import { ImageDataProps } from "./_image";
import PageProps from "./page";
import PostProps from "./post";


// CONTENT
// --------------------------------
export interface LinkProps {
    page?: PageProps
    post?: PostProps
    external_link?: string
    medias?: ImageDataProps[]
    label?: string
}

// COMMON
// --------------------------------
export interface SeoProps {
    id: number
    meta_title: string
    meta_desc: string
    og_title: string
    og_desc: string
    twitter_title: string
    twitter_desc: string
}

export interface HTMLContentProps {
    __component?: 'page.text'
    content: string
}

export interface GalleryProps {
    images: ImageDataProps[]
}

// PAGES
// --------------------------------
export interface TextProps {
    __component?: 'page.text'
    title: string
    text: string
}

export interface TextIntroProps {
    __component?: 'page.text-intro'
    title: string
    text: string
}

export interface TextImageProps {
    __component?: 'page.text-image'
    title: string
    text: string
    image: ImageDataProps
}

export interface TextDoubleImageProps {
    __component?: 'page.text-double-image'
    title: string
    text: string
    image1: ImageDataProps
    image2?: ImageDataProps
}

export interface HeroscreenProps {
    __component: string
    images: ImageDataProps[]
}

export interface CarouselProps {
    __component?: 'page.carousel'
    images: ImageDataProps[]
}

export interface ParallaxProps {
    __component?: 'page.parallax'
    image: ImageDataProps
    speed: number
}