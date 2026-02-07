import { Accreditation } from "@/components/mods/accreditation";
import Footer from "@/components/mods/footer";
import { Navbar } from "@/components/mods/navbar";
import type { Metadata } from 'next'
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Our Team - RT Holdings',
  description: 'Meet the dedicated professionals at RT Holding who are committed to driving your financial growth and success.',
}
export default function Team() {


  const members = [
    {
      name: "Akhliddin Teshaboev",
      role: "CEO",
      avatar: "/team/c1.jpg",
      social: [
        { image: "/social/instagram.png", url: "#" },
        { image: "/social/telegram.png", url: "#" },
        { image: "/social/whatsapp.png", url: "#" }
      ]
    },
    {
      name: "Rakhmatilla Akhmedov",
      role: "Operation Manager",
      avatar: "/team/o1.jpg",
      social: [
        { image: "/social/instagram.png", url: "#" },
        { image: "/social/telegram.png", url: "#" },
        { image: "/social/whatsapp.png", url: "#" }
      ]
    },
    {
      name: "Bekmurod Abdullaev",
      role: "Marketing Manager",
      avatar: "/team/sa1.jpg",
      social: [
        { image: "/social/instagram.png", url: "#" },
        { image: "/social/telegram.png", url: "#" },
        { image: "/social/whatsapp.png", url: "#" }
      ]
    },
    {
      name: "Fakhriddin Teshaboev",
      role: "Sales Manager",
      avatar: "/team/s2.jpg",
      social: [
        { image: "/social/instagram.png", url: "#" },
        { image: "/social/telegram.png", url: "#" },
        { image: "/social/whatsapp.png", url: "#" }
      ]
    },
  ];


  return (
    <div>
      <Navbar />

      <div className="bg-[#1E242C] h-[10vh]" />
      <div className="w-full bg-[#f7f7f7] px-[5%] md:px-[10%] py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">

          <div className="text-sm text-gray-500">
            <Link href="/">
              <span className="hover:text-[#1E242C] cursor-pointer">
                Home
              </span>
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700 font-medium">Team</span>
          </div>

          <div className="w-full h-px bg-gray-200" />

          <h1 className="text-3xl sm:text-4xl md:text-5xl  lg:text-6xl font-sans text-[#234F72] leading-tight max-w-4xl">
            Meet our leaders
          </h1>

          <p className="text-gray-600 max-w-2xl leading-relaxed">
            A skilled blend of management and a team of experts,
            we deliver strategic insights and innovative solutions to drive business success.
          </p>

        </div>
      </div>

      <div className="bg-white px-[5%] md:px-[10%] py-20 flex flex-col items-center">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative w-full h-80 sm:h-[420px] lg:h-[520px] rounded-xl overflow-hidden">
            <img
              src="/ceo.jpg"
              alt="Consulting"
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 right-0 flex items-end gap-2 pr-4 pb-4">
              <span className="w-3 h-12 bg-white/40 rounded" />
              <span className="w-3 h-20 bg-white/60 rounded" />
              <span className="w-3 h-28 bg-white/80 rounded" />
              <span className="w-3 h-36 bg-white rounded" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <span className="bg-[#434343] text-white py-2 px-3 font-semibold">
                Our Leader
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight text-[#1E242C]">
              Akhliddin Teshaboev
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Business consultants guide and advise businesses on overcoming
              challenges and capitalizing on opportunities. We take the time
              to research and deeply understand our clients’ businesses,
              asking the right questions and actively listening.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Considering factors such as capacity, budget, industry
              competition, and business goals, our plan of action is
              customized for maximum impact. We guide you through execution,
              ensuring real results.
            </p>
          </div>
        </div>
      </div>

      <Accreditation />

      <div className="bg-white px-[5%] md:px-[10%] py-8 flex flex-col items-center">
        <span className="bg-[#434343] text-white py-2 px-3 font-semibold">
          Our Team
        </span>

        <h1 className="text-center text-3xl md:text-4xl mt-4 font-semibold">
          The Team Behind Your <br /> Financial Success
        </h1>

        <p className="text-center mt-4 text-gray-500 max-w-2xl">
          Meet the dedicated professionals at RT Holding who are committed to driving your financial growth and success.
        </p>




        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10 w-full">
          {members.map(({ name, role, avatar, social }, index) => (
            <div
              key={index}
              className="bg-white rounded-md overflow-hidden shadow-md relative"
            >
              <img
                src={avatar}
                alt={name}
                className="w-full h-96 object-cover"
              />

              {/* <span className="absolute top-3 left-0 flex items-center flex-col gap-2">
                  {
                  social.map((s, idx) => {
                    const dimensions:any = {
                    instagram: "w-10 h-10 ",
                    telegram: "w-16 h-16 mt-2",
                    whatsapp: "w-16 h-16 "
                    };
                    const key = s.image.split('/')[2].split('.')[0];
                    return (
                    <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer">
                      <img src={s.image} alt="social" className={dimensions[key] || "w-6 h-6"}/>
                    </a>
                    );
                  })
                  }
                </span> */}

              <div className="p-4">
                <h2 className="text-xl font-semibold mt-2 line-clamp-2">
                  {name}
                </h2>

                <p className="mt-2 text-gray-600 line-clamp-3">
                  {role}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
