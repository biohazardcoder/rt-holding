"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

const images = [
  {
    src: "/rt-medline.png",
    alt: "RT Medline",
    width: 100,
    height: 60,
  },
  {
    src: "/aka-taxi.png",
    alt: "Aka Taxi",
    width: 160,
    height: 60,
  },
  {
    src: "/dream-express.png",
    alt: "Dream Express",
    width: 300,
    height: 80,
  },
  {
    src: "/rt-motors.png",
    alt: "RT Motors",
    width: 150,
    height: 60,
  },
  {
    src: "/rt-logistics.png",
    alt: "RT LOGISTICS",
    width: 130,
    height: 60,
  },
];

export const Projects = () => {

  const { t } = useTranslation("common")
  return (
    <div className="bg-[#f7f7f7] px-[5%] md:px-[10%] py-16">
      <h1 className="text-center text-2xl md:text-4xl">
        {t("our-comanies")}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-8">
        {images.map(({ alt, height, src, width }, index) => (
          <div key={index} className="w-full flex justify-center items-center">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="h-auto md:grayscale hover:grayscale-0 transition-all duration-300 md:opacity-60 hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
