"use client";
import { Headset } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { FaTelegram, FaInstagram, FaFacebook } from "react-icons/fa";

export default function CompaniesMap() {
    const { t } = useTranslation("common", { keyPrefix: "companies-page" })
    const items = [
        {
            title: "RT Medline",
            description: t("rt-medline"),
            image: "/rt-medline.png",

            images: [
                "/companies/med1.png",
                "/companies/med2.jpg",
                "/companies/med3.jpg",
                "/companies/med4.jpg",
                "/companies/med5.jpg",
            ],
        },
        {
            title: "Aka Taxi",
            description:
                t("aka-taxi"),
            image: "/aka-taxi.png",

            images: [
                "/companies/taxi3.jpg",
                "/companies/taxi4.jpg",
                "/companies/taxi2.png",
                "/companies/taxi5.jpg",
                "/companies/taxi1.png",
            ],
        },
        {
            title: "Dream Express",
            description: t("dream-express"),
            image: "/dream-express.png",

            images: [
                "/companies/de5.png",
                "/companies/de1.png",
                "/companies/de3.jpg",
                "/companies/de2.jpg",
                "/companies/de4.png",
            ],
        },
        {
            title: "RT Motors",
            description: t("rt-motors"),
            image: "/rt-motors.png",

            images: [
                "/companies/motors1.jpg",
                "/companies/motors2.jpg",
                "/companies/motors3.jpg",
                "/companies/motors4.jpg",
                "/companies/motors5.jpg",
            ],
        },
        {
            title: "RT Logistics",
            description: t("rt-hs-group"),
            image: "/rt-logistics.png",

            images: [
                "/companies/log5.png",
                "/companies/log1.png",
                "/companies/log4.png",
                "/companies/log2.png",
                "/companies/log3.png",
            ],
        },
    ];

    const positions = [
        "absolute top-0 left-4 md:left-10 w-28 h-28 md:w-40 md:h-40",
        "absolute top-6 right-0 w-40 h-40 md:w-64 md:h-64",
        "absolute top-40 md:top-52 left-0 w-32 h-32 md:w-48 md:h-48",
        "absolute bottom-0 right-4 md:right-10 w-40 h-40 md:w-56 md:h-56",
        "absolute bottom-10 left-16 md:left-24 w-24 h-24 md:w-36 md:h-36",
    ];

    return (
        <div className="w-full bg-gray-50 py-4">
            {items.map((item, index) => (
                <section
                    key={index}
                    className="py-4 min-h-[95vh] px-4 md:px-10"
                >
                    <div
                        className={`
                            max-w-7xl mx-auto
                            grid lg:grid-cols-2
                            gap-14 lg:gap-20
                            items-center
                        `}
                    >
                        <div
                            className={`
                                space-y-6
                                ${index % 2 !== 0 ? "lg:order-2" : ""}
                            `}
                        >
                            <div className="flex items-center flex-col justify-center">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={180}
                                    height={60}
                                    className="object-cover w-full h-[40vh] md:w-[300px] md:h-auto md:object-contain md:mx-auto"
                                />

                                <h1 className="text-3xl md:text-5xl font-bold leading-tight text-center w-full">
                                    {item.title}
                                </h1>
                            </div>

                            <p className="text-base md:text-xl text-gray-600 leading-relaxed text-center w-full">
                                {item.description}
                            </p>

                            {/* SOCIAL */}
                            <div className="flex gap-5 pt-2 text-gray-500 justify-center">
                                <a href="#" className="hover:text-blue-500 transition">
                                    <FaTelegram size={24} />
                                </a>

                                <a href="#" className="hover:text-pink-500 transition">
                                    <FaInstagram size={24} />
                                </a>

                                <a href="#" className="hover:text-blue-700 transition">
                                    <FaFacebook size={24} />
                                </a>

                                <a href="#" className="hover:text-yellow-500 transition">
                                    <Headset size={24} />
                                </a>
                            </div>
                        </div>

                        <div
                            className={`
                                relative
                                h-[420px] md:h-[600px]
                                w-full
                                ${index % 2 !== 0 ? "lg:order-1" : ""}
                            `}
                        >
                            {item.images.map((img, i) => (
                                <div
                                    key={i}
                                    className={`
                                        ${positions[i]}
                                        rounded-3xl
                                        overflow-hidden
                                        shadow-2xl
                                        border-4
                                        border-white
                                    `}
                                >
                                    <Image
                                        src={img}
                                        alt={`image-${i}`}
                                        fill
                                        className="object-cover hover:scale-105 transition duration-500 object-top"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}