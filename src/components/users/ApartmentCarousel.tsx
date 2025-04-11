import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface ApartmentCarouselProps {
  images: { url: string }[];
}

export const ApartmentCarousel: React.FC<ApartmentCarouselProps> = ({
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <div className="relative">
        <Carousel>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className={`${currentIndex === index ? "block" : "hidden"}`}
              >
              <Image
                src={image.url}
                alt={`Apartment Image ${index + 1}`}
                width={800} 
                height={600} 
                className="w-full h-80 object-cover rounded-lg"
                priority
              />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <button
          onClick={goToPreviousImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition"
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>
        <button
          onClick={goToNextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition"
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      </div>
      <div className="flex space-x-2 mt-4 overflow-x-auto">
        {images.map((image, index) => (
           <Image
           key={index}
           src={image.url}
           alt={`Thumbnail ${index + 1}`}
           width={80} 
           height={80} 
           className={`h-20 w-20 object-cover rounded-lg cursor-pointer ${
             currentIndex === index ? "border-2 border-blue-500" : ""
           }`}
           onClick={() => handleThumbnailClick(index)}
         />
        ))}
      </div>
    </div>
  );
};
