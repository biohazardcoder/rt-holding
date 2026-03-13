"use client"

import { useTranslation } from "react-i18next";

export const HowWeWork = () => {

    const { t } = useTranslation('common', { keyPrefix: 'services-page.how-we-work' });

    return (
        <div className="w-full bg-[#f7f7f7] px-[5%] md:px-[10%] py-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                <div className="flex flex-col gap-8">
                    <div>
                        <span className="bg-[#434343] text-white py-2 px-3 font-semibold">
                            {t('badge')}
                        </span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-5xl font-sans leading-tight text-[#234F72] whitespace-pre-line">
                        {t('title')}
                    </h2>

                    <p className="text-gray-600 leading-relaxed max-w-md">
                        {t('description')}
                    </p>
                </div>

                <div className="flex flex-col gap-6">

                    <div className="bg-white rounded-2xl p-8 flex gap-6">
                        <span className="text-4xl font-sans text-[#234F72]">01</span>
                        <div>
                            <h4 className="text-lg font-semibold text-[#234F72]">
                                {t("lines.first.title")}
                            </h4>
                            <p className="text-gray-600 mt-1">
                                {t("lines.first.description")}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl p-8 flex gap-6">
                        <span className="text-4xl font-sans text-[#234F72]">02</span>
                        <div>
                            <h4 className="text-lg font-semibold text-[#234F72]">
                                {t("lines.second.title")}
                            </h4>
                            <p className="text-gray-600 mt-1">
                                {t("lines.second.description")}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 flex gap-6">
                        <span className="text-4xl font-sans text-[#234F72]">03</span>
                        <div>
                            <h4 className="text-lg font-semibold text-[#234F72]">
                                {t("lines.third.title")}
                            </h4>
                            <p className="text-gray-600 mt-1">
                                {t("lines.third.description")}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl p-8 flex gap-6">
                        <span className="text-4xl font-sans text-[#234F72]">04</span>
                        <div>
                            <h4 className="text-lg font-semibold text-[#234F72]">
                                {t("lines.fourth.title")}
                            </h4>
                            <p className="text-gray-600 mt-1">
                                {t("lines.fourth.description")}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
