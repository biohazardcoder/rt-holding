"use client";

import { useTranslation } from "react-i18next";

export const WhyChooseUs = () => {
  const { t } = useTranslation("common", { keyPrefix: "why-choose-us" });

  const cards = [
    {
      title: t("cards.history.title"),
      description: t("cards.history.description"),
    },
    {
      title: t("cards.mission.title"),
      description: t("cards.mission.description"),
    },
    {
      title: t("cards.values.title"),
      description: t("cards.values.description"),
    },
  ];

  return (
    <section className="bg-[#f7f7f7] px-6 sm:px-4 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-2xl max-w-4xl mx-auto font-semibold text-[#102a43] sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 whitespace-pre-line max-w-4xl text-base text-[#475569] sm:text-lg leading-7">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map(({ title, description }) => (
            <div key={title} className="rounded-[28px] border border-[#d1dfea] bg-white p-8 shadow-[0_18px_40px_rgba(35,79,114,0.08)]">
              <span className="bg-[#434343] text-white py-2 px-3 font-semibold rounded">
                {title}
              </span>
              <p className="mt-6 text-sm leading-7 text-[#475569] sm:text-base">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
