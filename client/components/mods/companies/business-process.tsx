"use client"

import Image from "next/image"
import { useTranslation } from "react-i18next"


export default function BusinessProcessSection() {

    const { t } = useTranslation("common", { keyPrefix: "companies-page.process" })

    const steps = [
        {
            title: t("steps.first.title"),
            description: t("steps.first.description"),
        },
        {
            title: t("steps.second.title"),
            description: t("steps.second.description"),
        },
        {
            title: t("steps.third.title"),
            description: t("steps.third.description"),
        },
        {
            title: t("steps.fourth.title"),
            description: t("steps.fourth.description"),
        },
    ]


    return (
        <section className="bg-[#F7F7F7] py-8 md:py-16 px-4">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                    <span className="bg-[#434343] text-white py-2.5 px-3 font-semibold ">
                        {t("badge")}
                    </span>

                    <p className="text-muted-foreground max-w-xl mb-10 mt-4">
                        {t("title")}
                    </p>

                    <div className="space-y-8">
                        {steps.map((step, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="relative">
                                    <span className="block w-px h-full bg-muted" />
                                </div>

                                <div>
                                    <h4 className="font-medium text-lg mb-1">
                                        {step.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="relative overflow-hidden rounded-xl">
                        <Image
                            src="/business.jpg"
                            alt="Business consulting"
                            width={600}
                            height={200}
                            className="object-cover h-124"
                        />
                    </div>

                    <div className="absolute bottom-6 right-6 flex items-end gap-2">
                        <span className="h-20 w-3 bg-white/40 rounded-sm" />
                        <span className="h-28 w-3 bg-white/60 rounded-sm" />
                        <span className="h-36 w-3 bg-white/80 rounded-sm" />
                    </div>
                </div>
            </div>
        </section>
    )
}
