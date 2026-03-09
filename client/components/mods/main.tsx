"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Main = () => {
  const items = [
    {
      title: "Premium Car Service",
      desc: "Experience the best luxury transportation with our premium cars.",
      image: "/no-photo.jpg",
      bg: "/service/dse.jpg",
    },
    {
      title: "Business Travel",
      desc: "Reliable and comfortable rides for your business meetings.",
      image: "/no-photo.jpg",
      bg: "/main-bg.jpg",
    },
    {
      title: "Airport Transfer",
      desc: "Fast and safe airport transfers with professional drivers.",
      image: "/no-photo.jpg",
      bg: "/main1.jpg",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="relative h-screen flex items-center overflow-hidden px-[5%]  py-16">

      <img
        src={items[active].bg}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center px-[6%]">

        <div className="md:w-1/2 text-white space-y-4">
          <h1 className="text-3xl md:text-6xl font-bold">
            {items[active].title}
          </h1>

          <p className="max-w-xl text-sm">
            {items[active].desc}
          </p>
        </div>

        <div className="w-7/8 md:w-1/2 flex justify-end">

          <Carousel
            className="w-[520px]"
            opts={{
              align: "center",
              loop: true,
            }}
            setApi={(api: any) => {
              if (!api) return;

              api.on("select", () => {
                setActive(api.selectedScrollSnap());
              });
            }}
          >
            <CarouselContent className="items-center">

              {items.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[50%] flex justify-center"
                >
                  <img
                    src={item.image}
                    className="h-[420px] object-contain transition-all duration-300"
                  />
                </CarouselItem>
              ))}

            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />

          </Carousel>

        </div>
      </div>
    </div>
  );
};