"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import Image from "next/image"

export const About = () => {
        const { t } = useTranslation("common", { keyPrefix: "about" })
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
                setMounted(true);
        }, []);

        if (!mounted) return null;



        return (
                <div className="bg-[#f7f7f7] grid grid-cols-1 md:grid-cols-4 px-4 md:px-[10%] gap-8 py-8 md:py-16">
                        <div>
                                <span className="bg-[#434343] text-white py-2 px-3 font-semibold block w-fit">
                                        {t("title")}
                                </span>

                                <p className="mt-4 text-lg">
                                        {t("description")}
                                </p>
                        </div>

                        <div className="col-span-1 md:col-span-3">
                                <div className="text-sm md:text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-normal">
                                        <p className="mb-4">
                                                <span className="font-semibold text-slate-900 dark:text-white">
                                                        RT HOLDINGS
                                                </span>{" "}
                                                {t("companyText1")}
                                        </p>

                                        <p className="mb-4">
                                                {t("companyText2")}
                                        </p>

                                        <ul className="space-y-1 list-none grid grid-cols-1 md:grid-cols-2">
                                                <li >
                                                        <span className="font-semibold">RT MOTORS</span>: {t("subsidiaries.rtMotors")}
                                                </li>
                                                <li >
                                                        <span className="font-semibold">Kortex Oil</span>: {t("subsidiaries.kortexOil")}
                                                </li>
                                                <li >
                                                        <span className="font-semibold">Dream Express</span>: {t("subsidiaries.dreamExpress")}
                                                </li>
                                                <li >
                                                        <span className="font-semibold">Aka Taxi</span>: {t("subsidiaries.akaTaxi")}
                                                </li>
                                                <li >
                                                        <span className="font-semibold">RT Medline</span>: {t("subsidiaries.rtMedline")}
                                                </li>
                                                <li >
                                                        <span className="font-semibold">RT Logistics</span>: {t("subsidiaries.rtHsLogistics")}
                                                </li>
                                        </ul>
                                </div>

                                <div className="mt-4 grid grid-cols-2 md:flex md:items-center gap-4">
                                        <Link href="/services">
                                                <Button className="text-white font-semibold border-2 bg-[#F69419] hover:bg-white rounded-[3px] hover:text-[#F69419] w-full md:w-auto">
                                                        {t("buttons.services")}
                                                </Button>
                                        </Link>

                                        <Link href="/team">
                                                <Button className="text-white font-semibold border-2 bg-[#F69419] hover:bg-white rounded-[3px] hover:text-[#F69419] w-full md:w-auto">
                                                        {t("buttons.team")}
                                                </Button>
                                        </Link>
                                </div>
                        </div>
                </div>
        )
}