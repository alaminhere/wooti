'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import * as React from 'react';
import { CardContent } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import Image from 'next/image';

const image = [
  { src: '/images/home-hero.png' },
  { src: '/images/home-hero_3.png' },
  { src: '/images/home-hero_2.png' },
];

const HeroBannerSlider = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <Carousel
      // eslint-disable-next-line react-hooks/refs
      plugins={[plugin.current]}
      opts={{ align: 'start', loop: true }}
      className="w-full h-full"
    >
      <CarouselContent>
        {image.map((item, index) => (
          <CarouselItem key={index} className="">
            <CardContent className="">
              <Image
                src={item.src}
                alt="Home_Hero"
                width={1000}
                height={1000}
                loading="eager"
                style={{
                  width: 'auto',
                  height: 'auto',
                }}
              ></Image>
            </CardContent>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default HeroBannerSlider;
