/** @format */

import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";

const isClient = typeof window !== "undefined";

if (isClient) {
  i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: Cookies.get("locale") || "en",
      supportedLngs: ["en", "kr", "ru", "uz"],
      ns: ["common"],
      defaultNS: "common",
      debug: false,
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      detection: {
        order: ["cookie", "localStorage", "navigator"],
        caches: ["cookie"],
      },
    });
} else {
  i18next.use(initReactI18next).init({
    fallbackLng: "en",
    supportedLngs: ["en", "kr", "ru", "uz"],
    ns: ["common"],
    defaultNS: "common",
    debug: false,
    resources: {},
  });
}

export const setLocale = (locale: string) => {
  Cookies.set("locale", locale, { expires: 365 });
  i18next.changeLanguage(locale);
};

export default i18next;
