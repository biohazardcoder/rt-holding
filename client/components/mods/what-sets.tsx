"use client"

import { CircleCheckBig } from "lucide-react"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const WhatSets = () => {
        const { t } = useTranslation("common")
        const [mounted, setMounted] = useState(false);

        useEffect(() => {
                setMounted(true);
        }, []);

        if (!mounted) return null;
        return (
                <div className="h-auto md:h-[10vh] bg-[#1E242C] px-[5%] md:pl-[10%] md:pr-[5%] py-6 md:py-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-10">
                        <h1 className="text-lg md:text-sm text-white">{t("why-sets")}</h1>
                        <ul className="grid grid-cols-2 text-xs text-white md md:flex md:flex-row items-start md:items-center gap-4 md:gap-6 w-full md:w-auto">
                                <li className="flex items-center gap-2">
                                        <CircleCheckBig size={12} /> {t("why-sets-1")}
                                </li>
                                <li className="flex items-center gap-2">
                                        <CircleCheckBig size={12} /> {t("why-sets-2")}
                                </li>
                                <li className="flex items-center gap-2">
                                        <CircleCheckBig size={12} /> {t("why-sets-3")}
                                </li>
                                <li className="flex items-center gap-2">
                                        <CircleCheckBig size={12} /> {t("why-sets-4")}
                                </li>
                        </ul>
                </div>
        )
}
