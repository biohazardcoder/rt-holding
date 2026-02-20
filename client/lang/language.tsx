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

  return (
    <Select value={lang} onValueChange={changeLanguage}>
      <SelectTrigger className="w-25 text-black text-xs bg-white border border-border">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          English
        </SelectItem>
        <SelectItem value="uz">
          Uzbek
        </SelectItem>
        <SelectItem value="ru">
          Russian
        </SelectItem>
        <SelectItem value="kr">
          Korea
        </SelectItem>
      </SelectContent>
    </Select>
  )
}