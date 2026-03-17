"use client";

import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

export const OurTeam = () => {
    const { t } = useTranslation("common");
    const [index, setIndex] = useState(0);

    const members = [
        {
            name: t("team-page.our-team.team.first.name"),
            role: t("team-page.our-team.team.first.role"),
            bio: t("team-page.our-team.team.first.description"),
            avatar: "/team/c1.jpg",
            social: [
                { image: "/social/instagram.png", url: "#" },
                { image: "/social/telegram.png", url: "#" },
                { image: "/social/whatsapp.png", url: "#" }
            ]
        },
        {
            name: t("team-page.our-team.team.second.name"),
            role: t("team-page.our-team.team.second.role"),
            bio: t("team-page.our-team.team.second.description"),
            avatar: "/team/o1.jpg",
            social: [
                { image: "/social/instagram.png", url: "#" },
                { image: "/social/telegram.png", url: "#" },
                { image: "/social/whatsapp.png", url: "#" }
            ]
        },
        {
            name: t("team-page.our-team.team.third.name"),
            role: t("team-page.our-team.team.third.role"),
            bio: t("team-page.our-team.team.third.description"),
            avatar: "/team/sa1.jpg",
            social: [
                { image: "/social/instagram.png", url: "#" },
                { image: "/social/telegram.png", url: "#" },
                { image: "/social/whatsapp.png", url: "#" }
            ]
        },
        {
            name: t("team-page.our-team.team.fourth.name"),
            role: t("team-page.our-team.team.fourth.role"),
            bio: t("team-page.our-team.team.fourth.description"),
            avatar: "/team/s2.jpg",
            social: [
                { image: "/social/instagram.png", url: "#" },
                { image: "/social/telegram.png", url: "#" },
                { image: "/social/whatsapp.png", url: "#" }
            ]
        }
    ];

    const next = () => {
        setIndex((prev) => (prev + 1) % members.length);
    };

    const prev = () => {
        setIndex((prev) => (prev - 1 + members.length) % members.length);
    };

    const getPosition = (i: number) => {
        const offset = (i - index + members.length) % members.length;

        if (offset === 0) return "z-20 scale-105";
        if (offset === 1) return "translate-x-40 md:translate-x-52 scale-90 opacity-70";
        if (offset === members.length - 1)
            return "-translate-x-40 md:-translate-x-52 scale-90 opacity-70";

        return "opacity-0 pointer-events-none";
    };

    return (
        <div className="px-[5%] md:px-[10%] bg-white py-16 overflow-hidden">

            <div className="text-center md:mb-12">
                <span className="bg-[#434343] text-white py-2 px-4 font-semibold rounded">
                    {t("team-page.our-team.badge")}
                </span>

                <h1 className="text-center text-3xl md:text-4xl mt-4 font-semibold">
                    {t("team-page.our-team.title")}
                </h1>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-2 max-w-4xl m-auto w-full gap-10 md:gap-16 items-center justify-center">

                <div className="relative w-[260px] h-[460px] flex items-center justify-center">

                    <div className="relative w-full h-full flex items-center justify-center">

                        {members.map((member, i) => (
                            <div
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`absolute w-60 h-80 rounded-2xl overflow-hidden shadow-xl transition-all duration-700 cursor-pointer ${getPosition(i)}`}
                            >
                                <img
                                    src={member.avatar}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}

                    </div>

                </div>

                <div className="flex flex-col items-center gap-8">

                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-blue-900">
                            {members[index].name}
                        </h2>

                        <p className="uppercase tracking-widest text-gray-500 mt-2">
                            {members[index].role}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            onClick={prev}
                            className="text-2xl text-gray-500 hover:text-[#234F72] transition"
                        >
                            <ArrowLeftCircle size={28} />
                        </button>

                        <div className="flex items-center gap-2">
                            {members.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${i === index
                                        ? "bg-[#234F72] scale-125"
                                        : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="text-2xl text-gray-500 hover:text-[#234F72] transition"
                        >
                            <ArrowRightCircle size={28} />
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};