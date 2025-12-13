'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export const Navbar = () => {

  const items = [
    { label: "Home", href: "/" },
    { label: "Companies", href: "/companies" },
    { label: "Services", href: "/services" },
    { label: "Blogs", href: "/blogs" },
  ]

  return (
    <div className={cn(`w-full h-[10vh] z-40 absolute bg-[#0f3d3a] top-0 left-0 border-b border-[#ffffff26] flex items-center justify-between px-[10%]`)}>

      <div className="flex items-center gap-2">
        <Image src={"/image.png"} alt="Logo" width={50} height={50}/>
        <h1 className="text-white text-2xl">RT Holding</h1>
      </div>

      <ul className="flex items-center gap-8 text-white font-semibold">
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

      <div className="flex items-center gap-2">
        <Button className="bg-[#c9f9a9] text-black hover:bg-[#c9f9a9]/80">
          Contact Us <ArrowRight size={16}/>
        </Button>
      </div>

    </div>
  )
}
