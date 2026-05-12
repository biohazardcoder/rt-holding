"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export const About = () => {
        const { t } = useTranslation("common", { keyPrefix: "about" });

        return (
                <div className="bg-[#f7f7f7] py-16 px-[5%] md:px-[10%]">
                        <div className="grid md:grid-cols-2 gap-10 items-center">

                                <div className="relative">
                                        <Image
                                                src="/worker.jpg"
                                                alt="worker"
                                                width={300}
                                                height={300}
                                                className="rounded-2xl md:w-[80%] object-cover"
                                        />
                                </div>

                                <div>
                                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                                {t("title")}
                                        </h2>

                                        <p className="text-gray-700 mb-4">
                                                <span className="font-semibold">RT Holdings</span>{" "}
                                                {t("companyText1")}
                                        </p>

                                        <p className="text-gray-600 mb-6">
                                                {t("companyText2")}
                                        </p>

                                        <button className="bg-[#F69419] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#F69419]/80 transition">
                                                {t("button")}
                                        </button>

                                        <div className="mt-10 bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center gap-10 ">

                                                <div className="flex items-center gap-3">
                                                        <div className="w-16 h-16 rounded-full border-[6px] border-purple-500 flex items-center justify-center font-bold">
                                                                84%
                                                        </div>
                                                        <p className="font-medium text-xl md:text-base text-center">
                                                                {t("stats.growth").split(" ").map((word, i) => (
                                                                        <span key={i}>
                                                                                {word}{" "}
                                                                                {i === 0 && <br />}
                                                                        </span>
                                                                ))}
                                                        </p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                        <div className="w-16 h-16 rounded-full border-[6px] border-pink-500 flex items-center justify-center font-bold">
                                                                66%
                                                        </div>
                                                        <p className="font-medium text-xl md:text-base text-center">
                                                                {t("stats.market").split(" ").map((word, i) => (
                                                                        <span key={i}>
                                                                                {word}{" "}
                                                                                {i === 0 && <br />}
                                                                        </span>
                                                                ))}
                                                        </p>
                                                </div>

                                        </div>
                                </div>
                        </div>
                </div>
        );
};