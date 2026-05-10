import { Headset } from "lucide-react";
import Image from "next/image";
import { FaTelegram, FaInstagram, FaFacebook } from "react-icons/fa";

export default function CompaniesMap() {
    const items = [
        {
            title: "RT Medline",
            description: "Tibbiy xizmatlar platformasi",
            image: "/rt-medline.png",
        },
        {
            title: "Aka Taxi",
            description:
                "Viloyatlararo yo‘nalishlarda tezkor, ishonchli va qulay taksi xizmati",
            image: "/aka-taxi.png",
        },
        {
            title: "Dream Express",
            description: "Yuk va yetkazib berish xizmati",
            image: "/dream-express.png",
        },
        {
            title: "RT Motors",
            description: "Avto savdo va xizmatlar",
            image: "/rt-motors.png",
        },
        {
            title: "RT Logistics",
            description: "Logistika va transport yechimlari",
            image: "/rt-logistics.png",
        },
    ];

    return (
        <div className="w-full">
            {items.map((item, index) => (
                <section
                    key={index}
                    className="h-screen w-full flex items-center justify-center px-10 bg-gray-50"
                >
                    <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-10 items-center">

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={200}
                                    height={60}
                                />

                                <h1 className="text-4xl font-bold leading-tight">
                                    {item.title}
                                </h1>
                            </div>

                            <p className="text-xl text-gray-600 max-w-lg">
                                {item.description}
                            </p>

                            {/* SOCIAL */}
                            <div className="flex gap-6 pt-4 text-gray-500">
                                <a href="#" className="hover:text-blue-500">
                                    <FaTelegram size={26} />
                                </a>
                                <a href="#" className="hover:text-pink-500">
                                    <FaInstagram size={26} />
                                </a>
                                <a href="#" className="hover:text-blue-700">
                                    <FaFacebook size={26} />
                                </a>
                                <a href="#" className="hover:text-yellow-500">
                                    <Headset size={26} />
                                </a>
                            </div>
                        </div>

                        {/* RIGHT SIDE - CUSTOM GRID */}
                        {/* RIGHT SIDE - SCATTERED IMAGES */}
                        <div className="relative h-[600px] w-full">

                            {/* 1 */}
                            <div className="absolute top-0 left-10 w-40 h-40 bg-green-200 rounded-3xl" />

                            {/* 2 */}
                            <div className="absolute top-10 right-0 w-64 h-64 bg-green-300 rounded-3xl" />

                            {/* 3 */}
                            <div className="absolute top-52 left-0 w-48 h-48 bg-green-400 rounded-3xl" />

                            {/* 4 */}
                            <div className="absolute bottom-0 right-10 w-56 h-56 bg-green-300 rounded-3xl" />

                            {/* 5 */}
                            <div className="absolute bottom-10 left-24 w-36 h-36 bg-green-200 rounded-3xl" />

                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}