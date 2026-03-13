"use client";

import { useTranslation } from "react-i18next";

export const Main = () => {
  const { t } = useTranslation("common");

  return (
    <div className="relative h-[90vh] flex items-center overflow-hidden">

      <img src="/main.png" alt="Main Image" className="z-50 h-[102%] absolute -bottom-20 right-0" />
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
    </div>
  );
};