"use client"
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";



export default function Slider() {
  const { t } = useTranslation("common", { keyPrefix: "companies-page" })

  const items = [
    {
      title: "RT Medline",
      image: {
        src: "/rt-medline.png",
        alt: "RT Medline",
        width: 200,
        height: 60,
      },
      description: t("rt-medline"),
    },
    {
      title: "Aka Taxi",
      image: {
        src: "/aka-taxi.png",
        alt: "Aka Taxi",
        width: 300,
        height: 60,
      },
      description: t("aka-taxi"),
    },
    {
      title: "Dream Express",
      image: {
        src: "/dream-express.png",
        alt: "Dream Express",
        width: 300,
        height: 80,
      },
      description: t("dream-express"),
    },
    {
      title: "RT Motors",
      image: {
        src: "/rt-motors.png",
        alt: "RT Motors",
        width: 270,
        height: 60,
      },
      description: t("rt-motors"),
    },
    {
      title: "RT Logistics",
      image: {
        src: "/rt-logistics.png",
        alt: "RT Logistics",
        width: 250,
        height: 60,
      },
      description: t("rt-hs-group"),
    },
  ];

  const sliderRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!sliderRef.current) return;

    gsap.fromTo(
      sliderRef.current.querySelectorAll(".animate"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
    );
  }, [index]);

  const next = () => setIndex((p) => (p + 1) % items.length);
  const prev = () => setIndex((p) => (p - 1 + items.length) % items.length);

  return (
    <div className="relative overflow-hidden pb-12 rounded-[3rem]  text-white">
      <div
        ref={sliderRef}
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((s, i) => (
          <div
            key={i}
            className={`min-w-full  md:h-[40vh] p-4 md:px-20 grid md:grid-cols-2 md:items-center `}
          >
            <div className="flex justify-center items-center md:hidden">
              <img src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} />
            </div>
            <div className="px-4 md:px-8 animate">
              <h1 className="md:text-4xl text-2xl font-medium text-black mb-2">{s.title}</h1>
              <p className="text-gray-600 mb-6 max-w-md text-xs md:text-base">{s.description}</p>
              {/* <button
                className={`px-8 py-3 rounded-full text-white transition hover:opacity-80 bg-[#1E242C]`}
              >
                Check Now
              </button> */}
            </div>

            <div className="hidden md:flex justify-center items-center">
              <img src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-0 top-50 md:left-8 md:top-1/2 -translate-y-1/2  hover:opacity-100 text-white bg-[#1E242C] p-1 flex items-center justify-center rounded-full"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-50 md:right-8 md:top-1/2 -translate-y-1/2  hover:opacity-100 text-white bg-[#1E242C] p-1 flex items-center justify-center rounded-full"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-0 md:bottom-14 left-1/2 -translate-x-1/2 flex gap-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`px-4 py-2 border-t-2 border-[#1E242C] transition text-[#1E242C] ${index === i ? "opacity-100" : "opacity-40"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
