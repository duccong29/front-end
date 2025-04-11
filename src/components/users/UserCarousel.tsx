"use client"

import * as React from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { Card } from "../ui/card"


const Carousel = (emblaApi: any, interval: number = 5000) => {
  React.useEffect(() => {
    if (!emblaApi) return

    const autoRotate = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollTo(0)
      }
    }, interval)

    return () => clearInterval(autoRotate)
  }, [emblaApi, interval])
}

const UserCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  })

  Carousel(emblaApi)

  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return

    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])
  const [activeIndex, setActiveIndex] = React.useState(0)

  const testimonials = [
    {
      id: 1,
      title: "Best! I Got The House I Wanted Through Hounter",
      text: "Through this website I can get a house with the type and specifications I want very easily, without a complicated process to be able to find information on the house we want.",
      image: "/images/apartment1.jpg?height=400&width=600",
    },
    {
      id: 2,
      title: "Through The Hounter, I Can Get A House",
      text: "By looking for information about what kind of house we want, we managed to get the house we wanted to buy and it was still within our budget range.",
      image: "/images/apartment1.jpg?height=400&width=600",

    },
    {
      id: 3,
      title: "My Dream House Became Reality",
      text: "I was finally able to get my dream house through this website. The process was very easy and the staff were very helpful throughout the journey.",
      image: "/images/apartment1.jpg?height=400&width=600",
    },
  ]

  return (
    <div className="relative pt-14 pb-24 overflow-hidden mb-4">
    <div className="text-center mb-12">
      <p className="text-primary font-medium mb-2">Khám Phá Các Nhà Trọ</p>
      <h2 className="text-2xl md:text-3xl font-bold">Những Nhà Trọ Nổi Bật</h2>
    </div>
    <div ref={emblaRef} className="overflow-visible">
      <div className="flex">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="relative flex-[0_0_100%] min-w-0 sm:flex-[0_0_60%] px-8 transition-opacity duration-300 ease-in-out"
          >
            <Card className="relative h-[200px]  md:h-[350px] overflow-hidden">
              <div className="relative h-full">
                <Image
                  src={testimonial.image}
                  alt="Testimonial background"
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority={activeIndex === index}
                />
              </div>
            </Card>
            <div className="absolute bottom-0 left-14 right-14 transform translate-y-2/3 z-10">
              <div className="bg-white p-4 text-black rounded-lg border-2">
                <h3 className="text-lg font-bold mb-1">{testimonial.title}</h3>
                <p className="text-sm mb-2">{testimonial.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}
export default UserCarousel;