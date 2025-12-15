"use client"

import Image from "next/image";

export const Main = () => {
  return (
    <div className="relative h-[90vh] mt-[10vh] px-[10%] grid grid-cols-1 md:grid-cols-2 items-center 
      bg-linear-to-br from-[#123f3d] via-[#0a2c2a] to-[#06201e] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full flex justify-between px-[10%] z-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`w-0.5 h-full bg-white/10 rounded-full animate-[moveDown_8s_linear_infinite]`}
            style={{ animationDelay: `${i * 0.4}s` }}
          ></div>
        ))}
      </div>
      <div>
        <p className="main text-white">
          <span>
            Your choice is important for us
          </span>
          &mdash; no JavaScript required &mdash;
        </p>
      </div>
      <div className="relative z-10 h-full  flex justify-end items-center">
        <div className="rounded-xl flex items-center justify-center overflow-hidden ">
          <Image
            src="/ceo.jpg"
            alt="CEO"
            width={500}
            height={500}
            className="object-cover object-center w-96 h-96 md:w-[480px] md:h-[480px]"
          />
        </div>
      </div>

      <div className="absolute top-20 right-10 w-72 h-72 bg-[#c9f9a9]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-[#ffffff]/10 rounded-full blur-2xl animate-pulse"></div>

    </div>
  );
};
