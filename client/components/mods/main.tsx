"use client";

import { useTranslation } from "react-i18next";


export const Main = () => {

  const { t } = useTranslation("common")

  return (
    <div
      className="relative h-screen px-[6%] flex flex-col justify-center gap-14 items-center overflow-hidden"
      style={{ backgroundImage: `url("/main-bg.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="bg-black/50 w-full h-full absolute top-0 left-0" />
      <div className="text-white z-10 space-y-2">
        {/* <div className="flex items-center justify-center">
          <h1 className="text-sm font-semibold  text-center bg-[#DFF7CC] text-black p-1 px-2">
            Your choice is important to us!
          </h1>
        </div> */}
        <h1 className="text-lg md:text-4xl max-w-4xl text-center font-bold">
          {t("main-title")}
        </h1>
        <p className="max-w-xl text-center text-sm mx-auto">{t("main-description")}</p>
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-linear-to-t from-[#000000d9] to-transparent z-5" />
      </div>
    </div>
  );
};
