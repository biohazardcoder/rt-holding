"use client"
import Link from 'next/link'
import { useTranslation } from "react-i18next";

export const Top = () => {
    const { t } = useTranslation("common")

    return (
        <div className="w-full bg-[#f7f7f7] px-[5%] md:px-[10%] py-16">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">

                <div className="text-sm text-gray-500">
                    <span className="hover:text-[#1E242C] cursor-pointer">
                        <Link href={"/"}>{t("home")}</Link>
                    </span>
                    <span className="mx-2">›</span>
                    <span className="text-gray-700 font-medium">{t("companies")}</span>
                </div>

                <div className="w-full h-px bg-gray-200" />

                <h1 className="text-3xl sm:text-4xl md:text-5xl  font-sans text-[#234F72] leading-tight max-w-4xl">
                    {t("companies-page.top-title")}
                </h1>

                <p className="text-gray-600 max-w-xl leading-relaxed">
                    {t("companies-page.top-description")}
                </p>

            </div>
        </div>
    )
}
