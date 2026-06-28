"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const About = () => {
        const { t } = useTranslation("common", { keyPrefix: "about" });
        const percent = 84;
        const second = 66;
        return (
                <div className="bg-[#f7f7f7] py-16 px-[5%] md:px-[10%] relative overflow-hidden">
                        <div className="bg-[#4A76B2] hidden md:block rounded-[34px] absolute w-140 h-120 bottom-0 -left-20" />

                        <div className="md:flex items-center gap-8">

                                <Image
                                        src="/worker.jpg"
                                        alt="worker"
                                        width={600}
                                        height={300}
                                        className="rounded-2xl z-10 aspect-square object-cover"
                                />

                                <div className="z-50">
                                        <h2 className="text-6xl mt-4 md:text-7xl font-bold mb-4">
                                                {t("title")}
                                        </h2>

                                        <p className="text-gray-700 text-lg mb-4">
                                                <span className="font-semibold">RT Holdings</span>{" "}
                                                {t("companyText1")}
                                        </p>

                                        <p className="text-gray-600 mb-6">
                                                {t("companyText2")}
                                        </p>

                                        <Link href={"/companies/#our-companies"}>
                                                <button className="bg-[#F69419] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#F69419]/80 transition">
                                                        {t("button")}
                                                </button>
                                        </Link>

                                        <span className="mt-10 bg-white max-w-96 rounded-2xl shadow-md p-6 z-50 flex flex-col md:flex-row md:items-center gap-10 md:-ml-32">

                                                <span className="flex items-center gap-3">


                                                        <span
                                                                className="relative w-20 h-20 rounded-full"
                                                                style={{
                                                                        background: `conic-gradient(#a855f7 ${percent}%, #ec4899 0)`,
                                                                }}
                                                        >
                                                                <span className="absolute inset-[10px] rounded-full bg-white flex items-center justify-center font-bold">
                                                                        {percent}%
                                                                </span>
                                                        </span>
                                                        <p className="hidden md:block text-2xl md:text-lg font-semibold text-center">
                                                                {t("stats.growth").split(" ").map((word, i) => (
                                                                        <span key={i}>
                                                                                {word}{" "}
                                                                                {i === 0 && <br />}
                                                                        </span>
                                                                ))}
                                                        </p>
                                                        <p className="block md:hidden text-2xl md:text-lg font-semibold text-center">
                                                                {t("stats.growth")}
                                                        </p>
                                                </span>

                                                <span className="flex items-center gap-3 ">
                                                        <span
                                                                className="relative w-20 h-20 rounded-full"
                                                                style={{
                                                                        background: `conic-gradient(#a855f7 ${second}%, #ec4899 0)`,
                                                                }}
                                                        >
                                                                <span className="absolute inset-[10px] rounded-full bg-white flex items-center justify-center font-bold">
                                                                        {second}%
                                                                </span>
                                                        </span>
                                                        <p className="hidden md:block text-2xl md:text-lg font-semibold text-center">
                                                                {t("stats.market").split(" ").map((word, i) => (
                                                                        <span key={i}>
                                                                                {word}{" "}
                                                                                {i === 0 && <br />}
                                                                        </span>
                                                                ))}
                                                        </p>
                                                        <p className=" block md:hidden text-2xl md:text-lg font-semibold text-center">
                                                                {t("stats.market")}
                                                        </p>
                                                </span>

                                        </span>
                                </div>
                        </div>
                </div>
        );
};