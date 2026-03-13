"use client"

import { useTranslation } from "react-i18next"

export const WhatWeDo = () => {

    const { t } = useTranslation("common", { keyPrefix: "services-page.what-we-do" })

    return (
        <div className="bg-white px-[5%] md:px-[10%] py-20 flex flex-col items-center">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="relative w-full h-80 sm:h-[420px] lg:h-[520px] rounded-xl overflow-hidden">
                    <img
                        src="/story/bussiness.png"
                        alt="Consulting"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-0 right-0 flex items-end gap-2 pr-4 pb-4">
                        <span className="w-3 h-12 bg-white/40 rounded" />
                        <span className="w-3 h-20 bg-white/60 rounded" />
                        <span className="w-3 h-28 bg-white/80 rounded" />
                        <span className="w-3 h-36 bg-white rounded" />
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div>
                        <span className="bg-[#434343] text-white py-2 px-3 font-semibold">
                            {t("badge")}
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans leading-tight text-[#234F72]">
                        {t("title")}
                    </h2>

                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {t("description")}
                    </p>

                </div>
            </div>
        </div>
    )
}
