"use client"
import { useTranslation } from 'react-i18next'
import Slider from './slider'

export const OurCompanies = () => {
    const { t } = useTranslation("common", { keyPrefix: "companies-page" })
    return (
        <section className="px-[10%] py-10">
            <div className="text-center max-w-3xl mx-auto">
                <span className="bg-[#434343] text-white py-2.5 px-3 font-semibold">
                    {t("badge")}
                </span>

                <h1 className="text-center text-xl md:text-4xl mt-4 font-semibold">
                    {t("title")}
                </h1>
                <p className="text-gray-500 text-sm md:text-base mt-4">
                    {t("description")}
                </p>
            </div>

            <Slider />
        </section>
    )
}
