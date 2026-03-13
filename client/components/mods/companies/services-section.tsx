"use client";
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { useTranslation } from "react-i18next";



export default function ServicesSection() {

    const { t } = useTranslation("common", { keyPrefix: "companies-page.services" })

    const services = [
        t("list.1"),
        t("list.2"),
        t("list.3"),
        t("list.4"),
        t("list.5"),
        t("list.6"),
    ]

    return (
        <section className="container mx-auto  py-8 md:py-16 px-4">
            <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                    <span className="bg-[#434343] text-white py-2.5 px-3 font-semibold ">
                        {t("badge")}
                    </span>

                    <h2 className="text-4xl  font-semibold leading-tight mt-2">
                        {t("title")}
                    </h2>
                </div>

                <p className="text-muted-foreground max-w-lg">
                    {t("description")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, i) => (
                    <Card key={i} className="relative bg-[#1E242C] text-white hover:scale-[1.03] duration-300 transition-transform hover:bg-[#1E242C]/93">
                        <CardContent className="p-6 flex items-center gap-4">
                            <span>
                                <CheckCircle2 size={32} className=" text-[#F69419]" />
                            </span>
                            <p className="font-medium leading-snug">{service}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
