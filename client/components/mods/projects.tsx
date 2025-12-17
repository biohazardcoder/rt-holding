import Image from "next/image";

const images = [
  {
    src: "/rt-medline.png",
    alt: "RT Medline",
    width: 80,
    height: 60,
  },
  {
    src: "/aka-taxi.png",
    alt: "Aka Taxi",
    width: 150,
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
    width: 100,
    height: 60,
  },
  {
    src: "/rt-hs-group.png",
    alt: "RT HS Group",
    width: 220,
    height: 60,
  },
];

export const Projects = () => {
  return (
    <div className="bg-[#f7f7f7] px-[5%] md:px-[10%]">
      <h1 className="text-center text-2xl md:text-4xl">
        Our Companies
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-8">
        {images.map(({alt, height, src, width}, index) => (
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
