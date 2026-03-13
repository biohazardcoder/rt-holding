"use client"
import { CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Accreditation = () => {
  const { t } = useTranslation("common", { keyPrefix: "team-page.accreditation" })
  const items = [
    t("cards.first"),
    t("cards.second"),
    t("cards.third"),
    t("cards.fourth"),
  ];

  return (
    <div className="bg-[#f7f7f7] px-[5%] md:px-[10%] py-16">
      <div className="mb-12 max-w-2xl">
        <span className="bg-[#434343] text-white py-2 px-3 font-semibold">
          {t("badge")}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif leading-tight mt-4">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((text, i) => (
          <div
            key={i}
            className="bg-[#1E242C] text-white rounded-xl p-6 shadow-sm hover:shadow-md duration-300 transition-transform hover:scale-[1.03]"
          >
            <CheckCircle className="text-[#F69419] mb-6" size={36} />
            <p className="leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
