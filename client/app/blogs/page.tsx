import Footer from "@/components/mods/footer";
import { Navbar } from "@/components/mods/navbar";
import Link from "next/link";

export default function Blogs() {

  const blogs =[
    {
      title: "Understanding Financial Markets",
      describtion: "An in-depth look at how financial markets operate and their impact on the global",
      image: "/story/bman.jpg",
      status: "News"
    },
    {
      title: "Investment Strategies for 2024",
      describtion: "Explore the top investment strategies to consider in the coming year.",
      image: "/story/bussiness.png",
      status: "Article"
    },
    {
      title: "The Future of Cryptocurrency",
      describtion: "Analyzing the trends and future prospects of digital currencies in the financial world.",
      image: "/story/office.avif",
      status: "Insight"
    },
    {
      title: "Investment Strategies for 2024",
      describtion: "Explore the top investment strategies to consider in the coming year.",
      image: "/story/bussiness.png",
      status: "Article"
    },
    {
      title: "The Future of Cryptocurrency",
      describtion: "Analyzing the trends and future prospects of digital currencies in the financial world.",
      image: "/story/office.avif",
      status: "Insight"
    },
    {
      title: "Understanding Financial Markets",
      describtion: "An in-depth look at how financial markets operate and their impact on the global economy.",
      image: "/story/bman.jpg",
      status: "News"
    },
  ]

  return (
    <div>
      <Navbar/>
      <div className="bg-[#0f3d3a] h-[10vh]"/>
      <div className="bg-[#f9f9f9] px-[10%] py-8 flex justify-center items-center flex-col">
        <span className="bg-[#434343]  text-white py-2 px-3 font-semibold">Latest Blogs</span>
         <h1 className="text-center text-4xl mt-4 font-semibold">
          Do'nt miss our latest updates and insights
        </h1>
        <p className="text-center mt-4 text-gray-500">
          Stay informed with RT Holding's latest news, articles, and <br /> expert insights on financial trends and strategies.
        </p>
        <div className="grid grid-cols-3 gap-8 mt-8">
          {blogs.map(({title, describtion, image, status}, index) => (
            <div key={index} className="bg-white rounded-md overflow-hidden shadow-md  relative">
              <img src={image} alt={title} className="w-full h-48 object-cover"/>
                <span className="bg-[#0f3d3a] text-white py-1 px-2 font-semibold text-sm absolute top-2 left-2">{status}</span>
              <div className="p-4">
                <h2 className="text-xl font-semibold mt-2">{title}</h2>
                <p className="mt-2 text-gray-600">{describtion}</p>
                <div className="mt-4">
                   <Link href="#" className="text-[#0f3d3a] text-center  pt-2 pb-1 font-semibold underline">
                      Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
    <Footer/>
    </div>
  )
}
