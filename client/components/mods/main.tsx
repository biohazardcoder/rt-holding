"use client";

import { useTranslation } from "react-i18next";

const text = {
  en: "Your trusted\npartner\nworldwide!",
  kr: "전 세계에서\n신뢰할 수\n있는 파트너!",
  ru: "Ваш надежный\nпартнер по\nвсему миру!",
  uz: "Dunyo bo‘ylab\nishonchli\nhamkoringiz!",
};
export const Main = () => {
  const { i18n, t } = useTranslation("common");
  return (
    <div style={{ backgroundImage: "url('/canvas.png')", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} className=" relative md:h-screen pb-10 pt-40 md:pt-20 flex flex-col bg-white md:flex-row md:items-center overflow-hidden">

      <div className="relative z-10 px-[6%] max-w-5xl text-[#254E6F] space-y-2">
        <h1 className="text-4xl md:text-[80px] font-bold leading-[1.1] whitespace-pre-wrap">
          {text[i18n.language as keyof typeof text]}
        </h1>
        <button className="bg-[#F69419] text-white mt-4 px-4 py-2 md:px-8 md:py-4 rounded-full font-semibold md:text-3xl hover:bg-[#F69419]/80 transition">
          {t("about.button")}
        </button>
        {/* <p className="max-w-xl text-xs md:text-sm">
          {t("main-description")}
        </p> */}

        {/* <button className="bg-white text-orange-500 font-semibold px-6 py-3 rounded-md">
          BOOK NOW
          </button> */}
      </div>
    </div>
  );
};