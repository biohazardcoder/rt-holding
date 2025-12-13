import Footer from "@/components/mods/footer";
import { Navbar } from "@/components/mods/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Companies() {
     const items = [
  {
    title:"RT Medline",
    image:{
        src: "/rt-medline.png",
        alt: "RT Medline",
        width: 200,
        height: 60,
    },
    description: "RT Medline is a leading healthcare provider, offering comprehensive medical services and innovative health solutions.",
     team:[
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        }
    ]
  },
  {
    title:"Aka Taxi",
    image:{
        src: "/aka-taxi.png",
        alt: "Aka Taxi",
        width: 205,
        height: 60,
    },
    description: "Aka Taxi is a premier transportation service, providing safe, reliable, and efficient taxi services across the city.",
     team:[
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        }
    ]
  },
  {
    title:"Dream Express",
    image:{
        src: "/dream-express.png",
        alt: "Dream Express",
        width: 200,
        height: 80,
    },
    description: "Dream Express is a leading logistics and delivery company, offering fast and reliable shipping solutions.",
     team:[
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        }
    ]
  },
  {
    title:"RT Motors",
    image:{
        src: "/rt-motors.png",
        alt: "RT Motors",
        width: 200,
        height: 60,
    },
    description: "RT Motors is a leading automotive manufacturer, producing high-quality vehicles and innovative transportation solutions.",
    team:[
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        }
    ]
  },
  {
    title:"RT HS Group",
    image:{
        src: "/rt-hs-group.png",
        alt: "RT HS Group",
        width: 200,
        height: 60,
    },
    description: "RT HS Group is a leading real estate and development company, offering innovative property solutions.",
     team:[
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        },
        {
            image:"/team/c1.jpg",
            name:"Mr. James Wilson",
            role:"CEO"
        }
    ]
  },
];

  return (
    <div className="bg-[#f7f7f7]">
      <Navbar />
        <div className="bg-[#0f3d3a] h-[10vh]" />

      <section className="px-[10%] py-10">
        <div className="text-center max-w-3xl mx-auto">
         <span className="bg-[#434343] text-white py-2.5 px-3 font-semibold">
         Our Companies
        </span>

        <h1 className="text-center text-4xl mt-4 font-semibold">
            We offer a full scale of services to meet your needs
        </h1>
          <p className="text-gray-500 mt-4">
            Stay informed with RT Holding’s latest updates, innovations, and
            strategic insights across all industries.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 py-8">
          {items.map(({ title, image, description, team }, index) => (
            <div
              key={index}
              className="relative bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="absolute left-0 top-0 h-full w-3 bg-[#0f3d3a]" />

              <div className="p-10 flex flex-col gap-10">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="object-contain"
                  />
                  <div>
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-gray-600 mt-3 leading-relaxed max-w-[50%]">
                      {description}
                    </p>
                  </div>
                     <Button className="bg-[#0f3d3a] text-white font-semibold border-[#0f3d3a] border  hover:bg-transparent rounded-[3px] hover:text-[#0f3d3a] cursor-pointer">
                        Read More
                    </Button>
                </div>

                <div>
                  <p className="text-xl font-semibold mb-4 uppercase">
                    Team
                  </p>
                  <div className="grid grid-cols-4 gap-6">
                    {team.map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 border bg-[#f7f7f7] rounded-xl px-5 py-3"
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
