'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { LanguageSelect } from "@/lang/language"
import { useTranslation } from "react-i18next"
import { usePathname } from "next/navigation"
export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation("common")
  const items = [
    { label: "home", href: "/" },
    { label: "companies", href: "/companies" },
    { label: "services", href: "/services" },
    { label: "team", href: "/team" },
    { label: "blogs", href: "/blogs" },
  ]

  return (
    <div
      className={cn(
        "w-full h-[10vh] z-40 absolute top-0 left-0",
        "bg-transparent ",
        "flex items-center justify-between px-[5%] md:px-[10%]"
      )}
    >
      <Link href={"/"}>
        <div className="flex items-center relative">
          <Image src="/image.png" alt="Logo" width={45} height={45} />
          <h1 className={`text-white font-semibold text-xl md:text-2xl`}>RT Holdings</h1>
          <div className="bg-white w-7 h-7 absolute top-[5px] left-2.5 -z-10 rounded-full" />
        </div>
      </Link>

      <ul className="hidden md:flex items-center gap-8 text-white font-semibold">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`hover:border-[#F69419] border-b-2 border-transparent pb-1 transition-colors text-white`}
            >
              {t(item.label)}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex items-center gap-2">
        <LanguageSelect />
        <Link href={"/services/#contact"} >
          <Button
            className="bg-[#F69419] text-white font-semibold hover:bg-[#F69419]/80"
          >
            {t("become")} <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      <button
        className="md:hidden text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <div className="absolute top-[10vh] left-0 w-full bg-[#1E242C] border-t border-[#ffffff26] md:hidden">
          <ul className="flex flex-col items-center gap-6 py-6 text-white font-semibold">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg"
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
            <LanguageSelect />
            <Link href={"/services/#contact"} >
              <Button
                className="bg-[#F69419] text-white font-semibold hover:bg-[#F69419]/80"
              >
                {t("become")} <ArrowRight size={16} />
              </Button>
            </Link>
          </ul>
        </div>
      )}


    </div>
  )
}
