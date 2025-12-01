import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

export const Navbar = () => {

  const items = [
    { label: "Bosh sahifa", href: "/" },
    { label: "Biz haqimizda", href: "/about" },
    { label: "Xizmatlar", href: "/services" },
    { label: "Loyihalar", href: "/projects" },
    { label: "Fikrlar", href: "/feedback" },
  ]

  return (
    <div className="w-full h-[10vh] bg-gray-300 flex items-center justify-between px-[10%] font-montserrat">
      <Image src={"/image.png"} alt="Logo" width={50} height={50}/>
      <ul className="flex items-center gap-8 font-montserrat">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <Button className="flex items-center gap-2" variant={"secondary"}>
          <Image src={"https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg"} alt="UZB Flag" width={30} height={20} className="rounded-xs"/>
          UZB
        </Button>
        <Button className="bg-[#0f5d8c] hover:bg-[#0f5d8c]/80 font-montserrat">
          Ariza qoldirish
        </Button>
      </div>
    </div>
  )
}
