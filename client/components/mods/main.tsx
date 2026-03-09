"use client";

import { useTranslation } from "react-i18next";
import { Fog } from "./fog";

export const Main = () => {
  const { t } = useTranslation("common");
  const items = [
    {
      title: "Premium Car Service",
      desc: "Experience the best luxury transportation with our premium cars.",
      image: "/cars/car1.png",
      bg: "/bg/bg1.jpg",
    },
    {
      title: "Business Travel",
      desc: "Reliable and comfortable rides for your business meetings.",
      image: "/cars/car2.png",
      bg: "/bg/bg2.jpg",
    },
    {
      title: "Airport Transfer",
      desc: "Fast and safe airport transfers with professional drivers.",
      image: "/cars/car3.png",
      bg: "/bg/bg3.jpg",
    },
  ];
  return (
    <div className="relative h-screen flex items-center overflow-hidden">

      <img src="/main.png" alt="Main Image" className="z-50 h-[110%] absolute bottom-0 right-0" />
      <div className="absolute inset-0 bg-[#1E242C] clip-diagonal"></div>
      <div className="absolute -rotate-45 top-0 -left-92 z-10 inset-0 bg-[#1E242C] clip-diagonal"></div>

      <div className="absolute right-0 top-0 h-full w-[55%] bg-[#F7F7F7]"></div>
      <div className="relative z-10 px-[6%] max-w-3xl text-white space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          {t("main-title")}
        </h1>

        <p className="max-w-xl text-sm md:text-base">
          {t("main-description")}
        </p>

        {/* <button className="bg-white text-orange-500 font-semibold px-6 py-3 rounded-md">
          BOOK NOW
        </button> */}
      </div>
      <Fog />
    </div>
  );
};