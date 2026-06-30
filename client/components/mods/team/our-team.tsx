"use client";

import { Star, } from "lucide-react";
import { useTranslation } from "react-i18next";

export const OurTeam = () => {
    const { t, i18n } = useTranslation("common");
    const label = {
        uz: "Jamoamiz\nbilan tanishing",
        en: "Meet Our Team",
        ru: "Познакомьтесь с\nнашей командой",
        kr: "우리 팀을\n만나보세요",
    };
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

    return (
        <div className="bg-[#F5F5F7] py-8 pt-40 px-[5%] min-h-screen flex items-center justify-center">
            <div className="grid lg:grid-cols-5 gap-14 items-center">
                <div className="md:col-span-2">
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight whitespace-pre">
                        {label[i18n.language as keyof typeof label]}
                    </h2>

                    <p className="text-gray-600 text-2xl mt-10 max-w-lg">
                        {t("team-page.our-team.title")}
                    </p>

                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-center gap-6 md:col-span-3">

                    {/* card 1 */}
                    <div className="flex flex-col items-center">
                        <img
                            src="/team/o1.jpg"
                            className=" md:w-[270px] h-[450px] md:h-[400px] rounded-[30px] object-cover"
                        />

                        <div className="bg-[#F9A11B] mt-6 w-full rounded-full py-6 text-center text-white font-bold text-xl">
                            {t("team-page.our-team.team.second.role")}
                        </div>
                    </div>

                    {/* center */}
                    <div className="flex flex-col items-center md:mb-16 relative">

                        <div className="absolute -top-6 right-0 w-16 h-16 rounded-full bg-[#244F74] flex items-center justify-center">
                            <Star color="white" size={36} />
                        </div>

                        <img
                            src="/team/c1.jpg"
                            className=" md:w-[270px] h-[450px] md:h-[400px] rounded-[30px] object-cover"
                        />

                        <div className="bg-[#F9A11B] mt-6 w-full rounded-full py-6 text-center text-white font-bold text-xl">
                            {t("team-page.our-team.team.first.role")}
                        </div>
                    </div>

                    {/* card3 */}
                    <div className="flex flex-col items-center">
                        <img
                            src="/team/sa1.jpg"
                            className=" md:w-[270px] h-[450px] md:h-[400px] rounded-[30px] object-cover"
                        />

                        <div className="bg-[#F9A11B] mt-6 w-full rounded-full py-6 text-center text-white font-bold text-xl">
                            {t("team-page.our-team.team.third.role")}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};