"use client";

import { HandCoins, Goal, ChartNoAxesCombined } from "lucide-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export const Comments = () => {
  const { i18n } = useTranslation("common", {
    keyPrefix: "comments",
  });

  const title = {
    uz: "Mijozlarimiz\nfikrlari",
    en: "What our\nclients say",
    ru: "Отзывы\nнаших клиентов",
    kr: "고객의\n소리",
  };

  return (
    <section className="bg-[#F7F7F7] pt-40 pb-8 lg:py-24 lg:pt-40 px-5 lg:px-[5%] relative overflow-hidden">
      <div className="max-w-[1650px] mx-auto lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.8fr_0.9fr] gap-12 lg:gap-16">
          {/* LEFT */}
          <div className="flex flex-col gap-10 lg:gap-20">
            <h2 className="text-4xl lg:text-7xl font-bold whitespace-pre-line">
              {title[i18n.language as keyof typeof title]}
            </h2>

            <InfoCard
              icon={<HandCoins size={48} color="#F19A1C" />}
              titleKey="card1.title"
              textKey="card1.text"
            />
          </div>

          {/* CENTER */}
          <div className="flex flex-col gap-8 lg:gap-10">
            <img
              src="/feedback/1.jpg"
              alt=""
              className="aspect-square w-full md:max-w-80 mx-auto rounded-[34px] object-cover"
            />

            <InfoCard
              icon={<ChartNoAxesCombined size={48} color="#F19A1C" />}
              titleKey="card2.title"
              textKey="card2.text"
            />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-8 lg:gap-10">
            <InfoCard
              icon={<Goal size={48} color="#F19A1C" />}
              titleKey="card3.title"
              textKey="card3.text"
            />

            <img
              src="/feedback/2.jpg"
              alt=""
              className="aspect-square w-full md:max-w-80 mx-auto lg:mt-12 rounded-[34px] object-cover"
            />
          </div>
        </div>
      </div>

      <div className="hidden lg:block bg-[#4A76B2] rounded-[34px] absolute w-60 h-80 bottom-24 -right-30" />
    </section>
  );
};

type Props = {
  icon: ReactNode;
  titleKey: string;
  textKey: string;
};

const InfoCard = ({ icon, titleKey, textKey }: Props) => {
  const { t } = useTranslation("common", {
    keyPrefix: "comments",
  });

  return (
    <div className="flex flex-col items-start gap-5 lg:gap-8">
      <div className="flex items-center gap-4 lg:gap-8">
        <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-[20px] lg:rounded-[26px] bg-white shadow-xl flex items-center justify-center shrink-0">
          {icon}
        </div>

        <h3 className="text-xl lg:text-3xl font-bold">
          {t(titleKey)}
        </h3>
      </div>

      <p className="text-base lg:text-2xl text-[#2E2E2E]">
        {t(textKey)}
      </p>
    </div>
  );
};