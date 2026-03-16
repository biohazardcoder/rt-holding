"use client";
import { useState } from "react";

const teamMembers = [
    {
        name: "Akhliddin Teshaboev",
        role: "CEO",
        avatar: "/team/c1.jpg",
    },
    {
        name: "Rakhmatilla Akhmedov",
        role: "Operation Manager",
        avatar: "/team/o1.jpg",
    },
    {
        name: "Bekmurod Abdullaev",
        role: "Marketing Manager",
        avatar: "/team/sa1.jpg",
    },
    {
        name: "Fakhriddin Teshaboev",
        role: "Sales Manager",
        avatar: "/team/s2.jpg",
    },
];

export default function TeamCarousel() {
    const [index, setIndex] = useState(0);

    const prev = () => {
        setIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    };

    const next = () => {
        setIndex((prev) => (prev + 1) % teamMembers.length);
    };

    const getPosition = (i: number) => {
        const offset = (i - index + teamMembers.length) % teamMembers.length;

        if (offset === 0)
            return "z-10 scale-110 translate-y-0 opacity-100";
        if (offset === 1)
            return "z-5 translate-y-[150px] scale-90 opacity-90 grayscale";
        if (offset === 2)
            return "z-0 translate-y-[300px] scale-80 opacity-70 grayscale";
        if (offset === teamMembers.length - 1)
            return "z-5 -translate-y-[150px] scale-90 opacity-90 grayscale";
        if (offset === teamMembers.length - 2)
            return "z-0 -translate-y-[300px] scale-80 opacity-70 grayscale";

        return "opacity-0 pointer-events-none";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex max-w-6xl w-full gap-16 items-center justify-center">

                <div className="relative w-[450px] h-[70vh] flex flex-col items-center justify-center">

                    <button
                        onClick={prev}
                        className="absolute top-0 text-3xl z-20"
                    >
                        ↑
                    </button>

                    <div className="relative w-[400px] h-[225px] flex items-center justify-center">
                        {teamMembers.map((member, i) => (
                            <div
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`absolute w-[400px] h-[225px] rounded-2xl overflow-hidden shadow-xl transition-all duration-700 cursor-pointer ${getPosition(i)}`}
                            >
                                <img
                                    src={member.avatar}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="absolute bottom-0 text-3xl z-20"
                    >
                        ↓
                    </button>
                </div>

                <div className="flex flex-col items-center gap-8">

                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-blue-900">
                            {teamMembers[index].name}
                        </h2>

                        <p className="uppercase tracking-widest text-gray-500 mt-2">
                            {teamMembers[index].role}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        {teamMembers.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`w-3 h-3 rounded-full cursor-pointer transition ${i === index
                                    ? "bg-blue-900 scale-125"
                                    : "bg-blue-200"
                                    }`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}