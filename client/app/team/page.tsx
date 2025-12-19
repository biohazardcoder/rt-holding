"use client"

import Footer from "@/components/mods/footer";
import { Navbar } from "@/components/mods/navbar";

export default function Team() {


      const members = [
  {
    name: "Akhliddin Teshaboev",
    role: "CEO",
    avatar: "/team/c1.jpg",
    social:[
      { image: "/social/instagram.png", url: "#" },
      { image: "/social/telegram.png", url: "#" },
      { image: "/social/whatsapp.png", url: "#" }
    ]
  },
  {
    name: "Rakhmatilla Akhmedov",
    role: "Operation Manager",
    avatar: "/team/o1.jpg",
      social:[
      { image: "/social/instagram.png", url: "#" },
      { image: "/social/telegram.png", url: "#" },
      { image: "/social/whatsapp.png", url: "#" }
    ]
  },
  {
    name: "Bekmurod Abdullaev",
    role: "Marketing Manager",
    avatar: "/team/sa1.jpg",
      social:[
      { image: "/social/instagram.png", url: "#" },
      { image: "/social/telegram.png", url: "#" },
      { image: "/social/whatsapp.png", url: "#" }
    ]
  },
  {
    name: "Fakhriddin Teshaboev",
    role: "Sales Manager",
    avatar: "/team/s2.jpg",
      social:[
      { image: "/social/instagram.png", url: "#" },
      { image: "/social/telegram.png", url: "#" },
      { image: "/social/whatsapp.png", url: "#" }
    ]
  },
];


  return (
    <div>
      <Navbar />

      <div className="bg-[#0f3d3a] h-[10vh]" />

      <div className="bg-[#f7f7f7] px-[5%] md:px-[10%] py-8 flex flex-col items-center">
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
            {members.map(({ name, role, avatar,social }, index) => (
              <div
                key={index}
                className="bg-white rounded-md overflow-hidden shadow-md relative"
              >
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-96 object-cover"
                />

                <span className="absolute top-3 left-0 flex items-center flex-col gap-2">
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
                </span>

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
