"use client"
import { Mail, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common")
  return (
    <footer className="bg-[#1E242C] text-white px-[5%] pt-14">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14">

        <div className="md:col-span-4">
          <h1 className="text-3xl font-bold mb-3">
            RT Holdings
          </h1>
          <p className="text-xs text-gray-300 max-w-xs">
            {t("footer_desc")}
          </p>

        </div>

        <div className="md:col-span-3">
          <h3 className="text-gray-300 mb-5">{t("links")}</h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <ul className="space-y-3">
              <li><Link href="/">{t("home")}</Link></li>
              <li><Link href="/companies">{t("companies")}</Link></li>
              <li><Link href="/services">{t("services")}</Link></li>
              <li><Link href="/team">{t("team")}</Link></li>
              <li><Link href="/blogs">{t("blogs")}</Link></li>
            </ul>

          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-gray-300 mb-5">{t("contact")}</h3>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <PhoneCall size={16} />
              <span>+99894-563-9595</span>
            </li>


            <li className="flex items-center gap-3">
              <PhoneCall size={16} />
              <span>+8210-9687-9796</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-transparent mb-5">.</h3>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={16} />
              <span>rtholdingsgroup@gmail.com</span>
            </li>


            <li className="flex items-center gap-3">
              <MapPin size={16} />
              <span>Korea</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/30 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-4">
        <span>©2013-2025 RT Holdings. {t("arr")}</span>

        <div className="flex gap-6">
          <Link href="#" className="hover:underline">Telegram</Link>
          <Link href="#" className="hover:underline">Instagram</Link>
          <Link href="#" className="hover:underline">Whatsapp</Link>
        </div>
      </div>
    </footer>
  );
}
