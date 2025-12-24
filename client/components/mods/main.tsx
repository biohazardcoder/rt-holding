"use client";

import Image from "next/image";

const stats = [
  { year: 2020, value: 51 },
  { year: 2021, value: 80 },
  { year: 2022, value: 65 },
  { year: 2023, value: 56 },
  { year: 2024, value: 88 },
  { year: 2025, value: 99 },
];

export const Main = () => {
  return (
    <div
      className="relative min-h-[90vh] mt-[10vh] px-[6%] grid grid-cols-1 md:grid-cols-2 items-center
      bg-linear-to-br from-[#123f3d] via-[#0a2c2a] to-[#06201e] overflow-hidden"
      style={{backgroundImage: `url("/main-bg.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center'}}
    >
      {/* <div className="absolute inset-0 flex justify-between px-[6%] z-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-0.5 h-full bg-white/10 rounded-full animate-[moveDown_8s_linear_infinite]"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </div> */}
{/* 
      <div className="relative z-10 flex justify-center md:justify-start py-4">
        <div className="flex items-end gap-6 sm:gap-8 md:h-[260px]">
          {stats.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <span className="text-[#c9f9a9] md:text-xl text-sm font-semibold">
                {item.value}%
              </span>

                <div
                className="w-12 md:w-16 rounded-xl bg-[#c9f9a9]/70 relative overflow-hidden"
                style={{ height: `${item.value * 2.5}px` }}
                >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-size-[10px_10px]" />
                </div>

              <span className="text-white/80 text-sm sm:text-base">
                {item.year}
              </span>
            </div>
          ))}
        </div>
      </div> */}
{/* 
      <div className="relative z-10 flex flex-col justify-center items-center rounded-xl md:justify-end mt-12 md:mt-0">
        <div className="">
          <Image
            src="/ceo.jpg"
            alt="CEO"
            width={500}
            height={500}
            className="object-cover w-72 h-72 rounded-xl sm:w-96 sm:h-96 md:w-[480px] md:h-[480px]"
          />
        </div>
        <p className="main  text-white text-sm text-center">
          <span>
            Your choice is important for us
          </span>
           Lorem ipsum dolor sit.
        </p>
      </div> */}

      {/* <div className="absolute top-20 right-10 w-72 h-72 bg-[#c9f9a9]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-60 h-60 bg-white/10 rounded-full blur-2xl animate-pulse" /> */}
    </div>
  );
};
