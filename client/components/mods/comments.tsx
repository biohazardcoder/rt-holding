"use client";

import { HandCoins, Icon } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Comments = () => {
  const { i18n } = useTranslation();

  const title = {
    uz: "Mijozlarimiz\nfikrlari",
    en: "What our\nclients say",
    ru: "Отзывы\nнаших клиентов",
    kr: "고객의\n소리",
  };

  return (
    <section className="bg-[#F7F7F7] py-24 pt-40 px-[5%] relative overflow-hidden">
      <div className="max-w-[1650px] mx-auto px-10">

        <div className="grid grid-cols-[1.05fr_0.8fr_0.9fr] gap-16">

          {/* LEFT */}

          <div className="flex flex-col gap-20">

            <h2 className="text-7xl font-bold whitespace-pre-line">
              {title[i18n.language as keyof typeof title]}
            </h2>
            <InfoCard
              icon="/icons/delivery.svg"
              title="Ishonchli yetkazib beruvchi"
              text="RT Holdings har doim va'da qilingan muddatda va sifatda xizmat ko'rsatadigan ishonchli hamkor."
            />
            <div>
            </div>

          </div>

          {/* CENTER */}

          <div className="flex flex-col gap-10">

            <img
              src="/business.jpg"
              className="aspect-square w-80 rounded-[34px] object-cover"
            />

            <InfoCard
              icon="/icons/chart.svg"
              title="Bir necha yillik hamkor"
              text="Ko'p yillik hamkorlik davomida kompaniya o'zini barqaror va mas'uliyatli sherik sifatida ko'rsatib kelmoqda."
            />

          </div>

          {/* RIGHT */}

          <div className="flex flex-col gap-10">

            <InfoCard
              icon="/icons/target.svg"
              title="Maqsadlari katta kompaniya"
              text="RT Holdings katta maqsadlar sari intilayotgan va doimiy rivojlanishda bo'lgan kompaniya."
            />

            <img
              src="/business.jpg"
              className="aspect-square w-80 mt-12 rounded-[34px] object-cover"
            />
          </div>

        </div>

      </div>
      <div className="bg-[#4A76B2] rounded-[34px] absolute w-60 h-80 bottom-24 -right-20" />
    </section>
  );
};

type Props = {
  icon: string;
  title: string;
  text: string;
};

const InfoCard = ({ icon, title, text }: Props) => {
  return (
    <div className="flex flex-col items-start gap-8">

      <div className="flex items-center gap-8">
        <div className="w-24 h-24 rounded-[26px] bg-white shadow-xl flex items-center justify-center shrink-0">
          <HandCoins size={40} color="#F19A1C" />
        </div>
        <h3 className="text-3xl font-bold">
          {title}
        </h3>
      </div>

      <p className="mt-4 text-2xl text-[#2E2E2E]">
        {text}
      </p>

    </div>
  );
};