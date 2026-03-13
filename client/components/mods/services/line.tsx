"use client"
import { CircleCheckBig } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Line = () => {
    const { t } = useTranslation("common", { keyPrefix: "services-page.line" })
    return (
        <div className="h-auto md:h-[10vh] bg-[#1E242C] px-[5%] text-white font-semibold md:px-[10%] py-6 md:py-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
            <h1 className="text-lg md:text-base">{t("title")}</h1>
            <ul className="grid grid-cols-2 text-sm md md:flex md:flex-row items-start md:items-center gap-4 md:gap-12 w-full md:w-auto">
                <li className="flex items-center gap-2">
                    <CircleCheckBig size={20} /> {t("lines.first")}
                </li>
                <li className="flex items-center gap-2">
                    <CircleCheckBig size={20} /> {t("lines.second")}
                </li>
            </ul>
        </div>
    )
}
