"use client"

import Image from "next/image";
import { Navbar } from "./navbar";

export const Main = () => {
  return (
    <div className="relative h-screen px-[10%] grid grid-cols-1 md:grid-cols-2 items-center 
      bg-linear-to-br from-[#0f3d3a] via-[#0a2c2a] to-[#06201e] overflow-hidden">
      <Navbar />

      <div className="absolute top-0 left-0 w-full h-full flex justify-between px-[10%] z-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`w-0.5 h-full bg-white/10 rounded-full animate-[moveDown_8s_linear_infinite]`}
            style={{ animationDelay: `${i * 0.4}s` }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight drop-shadow-xl">
          Your Trusted <br /> Financial Partner
        </h1>

        <p className="text-[#e7e7e7] text-lg md:text-xl max-w-md">
          Financial success, guaranteed. We provide expert financial solutions for individuals and businesses.
        </p>
      </div>

      <div className="relative z-10 flex justify-end">
        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <Image
            src="/ceo.jpg"
            alt="CEO"
            width={500}
            height={500}
            className="object-cover object-center w-96 h-96 md:w-[500px] md:h-[500px]"
          />
        </div>
      </div>

      <div className="absolute top-20 right-10 w-72 h-72 bg-[#c9f9a9]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-[#ffffff]/10 rounded-full blur-2xl animate-pulse"></div>

    </div>
  );
};
