"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

export const LanguageSelect = () => {
  const { i18n } = useTranslation("common");
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    const storedLang = Cookies.get("locale") || "en";
    setLang(storedLang);
    i18n.changeLanguage(storedLang);
  }, [i18n]);

  const changeLanguage = (selectedLang: string) => {
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
    Cookies.set("locale", selectedLang, { expires: 365 });
  };
  const languages = {
    en: {
      en: "English",
      uz: "Uzbek",
      ru: "Russian",
      kr: "Korean",
    },
    uz: {
      en: "Inglizcha",
      uz: "O'zbekcha",
      ru: "Ruscha",
      kr: "Koreyscha",
    },
    ru: {
      en: "Английский",
      uz: "Узбекский",
      ru: "Русский",
      kr: "Корейский",
    },
    kr: {
      en: "영어",
      uz: "우즈베크어",
      ru: "러시아어",
      kr: "한국어",
    },
  };
  return (
    <Select value={lang} onValueChange={changeLanguage}>
      <SelectTrigger className="w-30 text-white text-xs bg-[#254E6F] border-none font-normal rounded-full">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          {languages[i18n.language as keyof typeof languages].en}
        </SelectItem>

        <SelectItem value="uz">
          {languages[i18n.language as keyof typeof languages].uz}
        </SelectItem>

        <SelectItem value="ru">
          {languages[i18n.language as keyof typeof languages].ru}
        </SelectItem>

        <SelectItem value="kr">
          {languages[i18n.language as keyof typeof languages].kr}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}