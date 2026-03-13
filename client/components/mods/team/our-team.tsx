"use client"
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa6'

export const OurTeam = () => {
    const { t } = useTranslation("common", { keyPrefix: "team-page.our-team" })
    const members = [
        {
            name: t("team.first.name"),
            role: t("team.first.role"),
            bio: t("team.first.description"),
            avatar: "/team/c1.jpg",
            social: [
                { image: "/social/instagram.png", url: "#" },
                { image: "/social/telegram.png", url: "#" },
                { image: "/social/whatsapp.png", url: "#" }
            ]
        },
        {
            name: t("team.second.name"),
            role: t("team.second.role"),
            bio: t("team.second.description"),
            avatar: "/team/o1.jpg",
            social: [
                { image: "/social/instagram.png", url: "#" },
                { image: "/social/telegram.png", url: "#" },
                { image: "/social/whatsapp.png", url: "#" }
            ]
        },
        {
            name: t("team.third.name"),
            role: t("team.third.role"),
            bio: t("team.third.description"),
            avatar: "/team/sa1.jpg",
            social: [
                { image: "/social/instagram.png", url: "#" },
                { image: "/social/telegram.png", url: "#" },
                { image: "/social/whatsapp.png", url: "#" }
            ]
        },
        {
            name: t("team.fourth.name"),
            role: t("team.fourth.role"),
            bio: t("team.fourth.description"),
            avatar: "/team/s2.jpg",
            social: [
                { image: "/social/instagram.png", url: "#" },
                { image: "/social/telegram.png", url: "#" },
                { image: "/social/whatsapp.png", url: "#" }
            ]
        },
    ];

    return (
        <div className="bg-white px-[5%] md:px-[10%] py-12 flex flex-col items-center">
            <span className="bg-[#434343] text-white py-2 px-4 font-semibold rounded">
                {t("badge")}
            </span>

            <h1 className="text-center text-3xl md:text-4xl mt-4 font-semibold">
                {t("title")}
            </h1>

            <p className="text-center mt-4 text-gray-500 max-w-2xl">
                {t("description")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full">
                {members.map(({ name, role, avatar, bio }, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
                    >
                        <img
                            src={avatar}
                            alt={name}
                            className="w-40 h-50 object-cover rounded-sm mr-6"
                        />

                        <div>
                            <h2 className="text-lg font-bold">{name}</h2>

                            <p className="text-blue-600 text-sm font-medium mb-2">
                                {role}
                            </p>

                            <p className="text-gray-500 text-sm mb-3">
                                {bio}
                            </p>

                            <div className="flex gap-3 text-gray-400">
                                <FaTelegram className="cursor-pointer hover:text-blue-500" />
                                <FaInstagram className="cursor-pointer hover:text-pink-500" />
                                <FaLinkedin className="cursor-pointer hover:text-blue-600" />
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
