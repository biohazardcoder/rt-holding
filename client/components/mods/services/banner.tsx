"use client"

import { useTranslation } from "react-i18next";

export const Banner = () => {
    const { t } = useTranslation('common', { keyPrefix: 'services-page.banner' });
    return (
        <section className="relative w-full min-h-[420px] overflow-hidden bg-[#1E242C] text-white">
            <div className="absolute inset-0">
                <div className="absolute -left-30 -top-18 h-full w-[60%] -rotate-40 bg-[#234F72] opacity-60" />
                <div className="absolute right-[-40%] -top-20 h-full w-[60%] -rotate-40 bg-[#234F72] opacity-70" />
            </div>

            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2">
                <div>
                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F69419] text-white text-xl font-bold">
                        ×
                    </span>
                    <h2 className="mt-4 text-4xl uppercase font-sans md:text-5xl">
                        RT Holdings
                    </h2>
                </div>

                <div className="max-w-xl">
                    <p className="mb-8 text-sm leading-relaxed text-gray-200 md:text-base">
                        {t('title')}
                    </p>

                    <button className="inline-flex items-center gap-3 rounded-lg px-6 py-3 text-sm text-white font-semibold transition bg-[#F69419]  hover:bg-[#F69419]/80">
                        {t('button')}
                        <span className="text-lg">→</span>
                    </button>
                </div>
            </div>
        </section>
    )
}
