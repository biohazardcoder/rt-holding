"use client"

import { useTranslation } from "react-i18next"

import Image from "next/image";
import { ChevronRight } from "lucide-react";

const Hexagon = ({ children, color }: { children: React.ReactNode; color: string }) => (
    <div
        className={`${color} w-[200px] h-[200px] clip-hexagon flex items-center justify-center text-white`}
    >
        {children}
    </div>
)

const texts = {
    title: {
        uz: "Xizmatlarimiz",
        en: "Our Services",
        ru: "Наши услуги",
        kr: "서비스"
    },
    delivery: {
        title: {
            uz: "Maxsus texnikalarni yetkazib berish",
            en: "Delivery of special equipment",
            ru: "Доставка специального оборудования",
            kr: "특수 장비 배송",
        },
        description: {
            uz: "Zamonaviy va ishonchli maxsus texnikalarni tezkor hamda xavfsiz yetkazib beramiz.",
            en: "We provide fast and secure delivery of modern and reliable special equipment.",
            ru: "Мы обеспечиваем быструю и безопасную доставку современного и надежного специального оборудования.",
            kr: "최신의 신뢰할 수 있는 특수 장비를 신속하고 안전하게 배송합니다.",
        }
    },
    logistics: {
        title: {
            uz: "Logistika va yetkazib berish xizmati",
            en: "Logistics and delivery service",
            ru: "Логистика и служба доставки",
            kr: "물류 및 배송 서비스",
        },
        description: {
            uz: "Yuklarni to’g’ri rejalashtirish va o‘z vaqtida manzilga yetkazishni ta’minlaymiz.",
            en: "We ensure proper planning of cargo and timely delivery to the destination.",
            ru: "Мы обеспечиваем правильное планирование грузов и своевременную доставку до места назначения.",
            kr: "화물의 효율적인 계획과 목적지까지의 적시 배송을 보장합니다.",
        }
    },
    service: {
        title: {
            uz: "Texnik xizmat va kafolat",
            en: "Technical service and warranty",
            ru: "Техническое обслуживание и гарантия",
            kr: "기술 지원 및 보증",
        },
        description: {
            uz: "Texnikangizning uzluksiz ishlashi uchun professional servis va kafolat xizmatlarini taqdim etamiz",
            en: "We provide professional technical service and warranty to ensure the uninterrupted operation of your equipment.",
            ru: "Мы предоставляем профессиональное техническое обслуживание и гарантию, чтобы обеспечить бесперебойную работу вашего оборудования.",
            kr: "장비의 안정적인 운영을 위해 전문적인 기술 지원과 보증 서비스를 제공합니다.",
        }
    },
    consulting: {
        title: {
            uz: "Konsultatsiya va treninglar",
            en: "Consulting and training",
            ru: "Консультации и обучение",
            kr: "컨설팅 및 교육",
        },
        description: {
            uz: "Mutaxassislarimiz tomonidan texnika tanlash, foydalanish va boshqarish bo‘yicha amaliy maslahatlar va treninglar beriladi",
            en: "Our experts provide practical advice and training on equipment selection, usage, and management.",
            ru: "Наши эксперты предоставляют практические советы и обучение по выбору, использованию и управлению оборудованием.",
            kr: "전문가들이 장비 선택, 사용 및 관리에 관한 실질적인 상담과 교육을 제공합니다.",
        }
    }
};


export const WhatWeDo = () => {
    const { i18n } = useTranslation("common")

    return (
        <section className="bg-white px-[5%] pt-40 md:py-40">
            <div className="max-w-7xl mx-auto">

                <h2 className="text-4xl md:text-5xl font-bold mb-20">
                    {texts.title[i18n.language as keyof typeof texts.title]}
                </h2>

                <div className="grid lg:grid-cols-3 gap-10 items-center">

                    <div className="space-y-24 hidden md:block">

                        <div>
                            <h3 className="text-3xl font-bold mb-5 leading-tight">
                                <ChevronRight className="inline-block mr-2 bg-[#ec4899] rounded-full text-white  p-0.5 mt-2 align-top" />
                                {texts.delivery.title[i18n.language as keyof typeof texts.delivery.title]}
                            </h3>

                            <p className="text-gray-600 text-xl leading-relaxed">
                                {texts.delivery.description[i18n.language as keyof typeof texts.delivery.description]}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold mb-5 leading-tight">
                                <ChevronRight className="inline-block mr-2 bg-[#ec4899] rounded-full  text-white p-0.5 mt-2 align-top" />
                                {texts.service.title[i18n.language as keyof typeof texts.service.title]}
                            </h3>

                            <p className="text-gray-600 text-xl leading-relaxed">
                                {texts.service.description[i18n.language as keyof typeof texts.service.description]}
                            </p>
                        </div>

                    </div>

                    <div className="relative w-[400px] h-[500px] mx-auto hidden lg:block">

                        {/* 1 */}
                        <div className="absolute top-0 right-4">
                            <Hexagon color="bg-[#2B567A]">
                                <Image src="/service/1.png" alt="Delivery" width={120} height={120} />
                            </Hexagon>
                        </div>

                        {/* 2 */}
                        <div className="absolute top-[104px] left-4">
                            <Hexagon color="bg-[#F3A31C]">
                                <Image src="/service/2.png" alt="Truck" width={150} height={150} className="mr-4" />
                            </Hexagon>
                        </div>

                        {/* 3 */}
                        <div className="absolute top-[200px] right-4">
                            <Hexagon color="bg-[#F3A31C]">
                                <Image src="/service/3.png" alt="Package" width={120} height={120} />
                            </Hexagon>
                        </div>

                        {/* 4 */}
                        <div className="absolute top-[300px] left-4">
                            <Hexagon color="bg-[#2B567A]">
                                <Image src="/service/4.png" alt="Wrench" width={140} height={140} />
                            </Hexagon>
                        </div>

                    </div>

                    {/* Right Text */}
                    <div className="space-y-24 text-right hidden md:block">

                        <div>
                            <h3 className="text-3xl font-bold mb-5 leading-tight">
                                <ChevronRight className="inline-block mr-2 bg-[#ec4899] rounded-full  text-white p-0.5 mt-2 align-top" />
                                {texts.logistics.title[i18n.language as keyof typeof texts.logistics.title]}
                            </h3>

                            <p className="text-gray-600 text-xl leading-relaxed">
                                {texts.logistics.description[i18n.language as keyof typeof texts.logistics.description]}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold mb-5 leading-tight">
                                <ChevronRight className="inline-block mr-2 bg-[#ec4899] rounded-full  text-white p-0.5 mt-2 align-top" />
                                {texts.consulting.title[i18n.language as keyof typeof texts.consulting.title]}
                            </h3>

                            <p className="text-gray-600 text-xl leading-relaxed">
                                {texts.consulting.description[i18n.language as keyof typeof texts.consulting.description]}
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}