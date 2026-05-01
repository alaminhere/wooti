'use client';

import { useRef } from 'react';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { CardContent } from '@/components/ui/card';
import RatingGenerator from '@/libs/RatingGenerator';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const TestimonialCard = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  return (
    <Carousel
      // eslint-disable-next-line react-hooks/refs
      plugins={[plugin.current]}
      opts={{ align: 'start', loop: true }}
      className="w-full"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/1 sm:basis-1/2 lg:basis-1/3 "
          >
            <CardContent className="p-5 border border-gray-100 rounded-md">
              <span className="flex gap-1">
                {RatingGenerator(4).map(item => item)}
              </span>
              <p className="text-[16px] text-deefBlack font-semibold capitalize mt-4 mb-0">
                jon druse
              </p>
              <p>
                Im blown away by the quality and style of the clothes I received
                from Shop.co. From casual wear to elegant dresses, every piece
                Ive bought has exceeded my expectations.”
              </p>
            </CardContent>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default TestimonialCard;
