import Footer from "@/components/mods/footer";
import { Navbar } from "@/components/mods/navbar";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      title: "Specialized Equipment Delivery",
      description:
        "We deliver modern excavators, bulldozers and other equipment from brands like Hyundai, Volvo, Doosan and others.",
      status: "Service",
      image: "/service/dse.jpg",
    },
    {
      title: "Technical Service and Warranty",
      description:
        "Service support, original spare parts and warranty for trouble-free operation of each equipment.",
      status: "Service",
      image: "/service/ts.jpg",
    },
    {
      title: "Leasing and Rental",
      description:
        "Equipment leasing and rental on favorable financial terms.",
      status: "Service",
      image: "/service/ls.jpg",
    },
    {
      title: "Logistics and Delivery",
      description:
        "Reliable and fast cargo transportation through RT HS Group Logistics. Every process is fully tracked.",
      status: "Service",
      image: "/service/ld.webp",
    },
    {
      title: "Consulting and Training",
      description:
        "Training on equipment operation and maintenance, professional consultations.",
      status: "Service",
      image: "/service/tcs.webp",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-[#0f3d3a] h-[10vh]" />

      <div className="bg-[#f7f7f7] px-[10%] py-8 flex flex-col items-center">
        <span className="bg-[#434343] text-white py-2 px-3 font-semibold">
          Our Services
        </span>

        <h1 className="text-center text-4xl mt-4 font-semibold">
            We offer a full scale of services to meet your needs
        </h1>

        <p className="text-center mt-4 text-gray-500">
          Explore the range of services provided by RT Holding.
        </p>

        <div className="grid grid-cols-3 gap-8 mt-10 w-full">
          {services.map(({ title, description, image, status }, index) => (
            <div
              key={index}
              className="bg-white rounded-md overflow-hidden shadow-md relative"
            >
              <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-md" />

              <span className="bg-[#0f3d3a] text-white py-1 px-2 text-sm absolute top-2 left-2 rounded">
                {status}
              </span>

              <div className="p-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-gray-600">{description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer/>
    </div>
  );
}
