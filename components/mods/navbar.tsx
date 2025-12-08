import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export const Navbar = () => {

  const items = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Story", href: "/our-story" },
    { label: "Blogs", href: "/blogs" },
  ]

  return (
    <div className="w-full h-[10vh] absolute top-0 left-0 border-b border-[#ffffff26]  flex items-center justify-between px-[10%] ">
      <div className="flex items-center gap-2">
      <Image src={"/image.png"} alt="Logo" width={50} height={50}/>
      <h1 className="text-white text-2xl">RT Holding</h1>
      </div>
      <ul className="flex items-center gap-8  text-white font-semibold">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        {/* <Button className="flex items-center gap-2" variant={"secondary"}>
          <Image src={"https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg"} alt="UZB Flag" width={30} height={20} className="rounded-xs"/>
          UZB
        </Button> */}
        <Button className="bg-[#c9f9a9] text-black hover:bg-[#c9f9a9]/80 ">
          Contact Us <ArrowRight size={16}/>
        </Button>
      </div>
    </div>
  )
}
