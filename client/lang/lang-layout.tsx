"use client";

import { useState } from "react";
import { LangProvider } from "./lang";

export const LangLayout = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState("en");

  return (
    <LangProvider onLangChange={setLang}>
      <div lang={lang}>{children}</div>
    </LangProvider>
  );
};
