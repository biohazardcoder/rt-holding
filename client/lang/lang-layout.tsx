"use client";

import { useEffect, useState } from "react";
import { LangProvider } from "./lang";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export const LangLayout = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
        <div className="flex items-center text-3xl font-semibold text-gray-700">
          <Image src="/image.png" alt="Logo" width={45} height={45} />
          <span>RT Holdings</span>
          {/* <Loader2 size={24} className="animate-spin ml-2 text-[#F69419]" /> */}
        </div>
      </div>
    );

  return (
    <LangProvider onLangChange={setLang}>
      <div lang={lang}>{children}</div>
    </LangProvider>
  );
};
