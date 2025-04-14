import Image from "next/image";
import React from "react";
import { ImageMultipleProps } from "@/app/interfaces/_image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export interface HeroscreenProps {
  images: ImageMultipleProps;
}

const Heroscreen: React.FC<HeroscreenProps> = (content: HeroscreenProps) => {
  
  return (
    <Swiper 
      effect="fade"
      centeredSlides={true}
      pagination={{ dynamicBullets: true }}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Pagination, Autoplay]}
      className="h-screen"
    >
      {content.images.data.map((image, index) => (
        <SwiperSlide key={index} className="relative">
          <Image
            src={process.env.NEXT_PUBLIC_API_URL + image.attributes.url}
            alt={image.attributes.alternativeText ?? "Pas de text alt"}
            fill={true}
            objectFit="cover"
            priority={true}
            className="hero_img" />
        </SwiperSlide>
      ))}    
    </Swiper>
  );
};

export default Heroscreen;
