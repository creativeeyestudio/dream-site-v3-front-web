import { ImageDataProps } from "./_image";
import PageProps from "./page";
import PostProps from "./post";

export interface LinkProps {
    page?: PageProps
    post?: PostProps
    external_link?: string
    medias?: ImageDataProps[]
    label?: string
}

export interface TextProps {
    title: string
    text: string
    links?: LinkProps[]
}

export interface TextIntroProps {
    content: TextProps
}

export interface TextImageProps {
    content: TextProps
    image: ImageDataProps
}

export interface TextDoubleImageProps {
    content: TextProps
    image1: ImageDataProps
    image2?: ImageDataProps
}

export interface HeroscreenProps {
    images: ImageDataProps[]
}

export interface CarouselProps {
    images: ImageDataProps[]
}

export interface ParallaxProps {
    image: ImageDataProps
    speed: number
}