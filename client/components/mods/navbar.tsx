'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ContactModal } from "./contact"

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false);

  const items = [
    { label: "Home", href: "/" },
    { label: "Companies", href: "/companies" },
    { label: "Services", href: "/services" },
    { label: "Blogs", href: "/blogs" },
  ]

  return (
    <div
      className={cn(
        "w-full h-[10vh] z-40 absolute top-0 left-0",
        "bg-[#0f3d3a] border-b border-[#ffffff26]",
        "flex items-center justify-between px-[5%] md:px-[10%]"
      )}
    >
      <div className="flex items-center gap-2 relative">
        <Image src="/image.png" alt="Logo" width={45} height={45} />
        <h1 className="text-white text-xl md:text-2xl">RT Holding</h1>
        <div className="bg-white w-7 h-7 absolute top-[5px] left-2.5 -z-10 rounded-full" />
      </div>

      <ul className="hidden md:flex items-center gap-8 text-white font-semibold">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="hover:border-[#c9f9a9] border-b-2 border-transparent pb-1 transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex items-center gap-2">
        <Button
          onClick={() => setContactOpen(true)}
          className="bg-[#c9f9a9] text-black hover:bg-[#c9f9a9]/80"
        >
          Contact Us <ArrowRight size={16} />
        </Button>
      </div>

      <button
        className="md:hidden text-white"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <div className="absolute top-[10vh] left-0 w-full bg-[#0f3d3a] border-t border-[#ffffff26] md:hidden">
          <ul className="flex flex-col items-center gap-6 py-6 text-white font-semibold">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
           <Button
            onClick={() => setContactOpen(true)}
            className="bg-[#c9f9a9] text-black hover:bg-[#c9f9a9]/80"
          >
            Contact Us <ArrowRight size={16} />
          </Button>
          </ul>
        </div>
      )}
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />

    </div>
  )
}
