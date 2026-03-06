"use client";

import { useTranslation } from "react-i18next";

export const WhyChooseUs = () => {

  const { t } = useTranslation("common", { keyPrefix: "why-choose-us" });

  const items = [
    {
      title: t("expertise"),
      count: "10+",
    },
    {
      title: t("clients"),
      count: "500+",
    },
    {
      title: t("projects"),
      count: "100+",
    },
    {
      title: t("support"),
      count: "24/7",
    },
  ]



  return (
    <div className="bg-[#f7f7f7] flex flex-col items-center px-[10%] py-10 md:px-[5%] sm:px-4">
      <span className="bg-[#434343] text-white m-auto py-2 px-3 font-semibold">Why Choose Us</span>
      <h1 className="text-center text-2xl md:text-3xl sm:text-2xl mt-4 font-semibold text-[#234F72]">
        {t("title")}
      </h1>
      <p className="text-center mt-4 max-w-5xl text-gray-500 text-sm md:text-base">
        {t("description")}
      </p>
      <div className="grid  lg:grid-cols-4 grid-cols-2 gap-12 md:gap-6 mt-8">
        {items.map(({ title, count }, index) => (
          <div key={index} className="w-full flex flex-col bg-white border justify-center items-center p-8 md:p-6 sm:p-4 rounded-md">
            <h1 className="text-3xl md:text-4xl sm:text-3xl font-bold text-black">
              {count}
            </h1>
            <p className="mt-2 text-xs md:text-lg sm:text-base text-gray-500 font-semibold">
              {title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
