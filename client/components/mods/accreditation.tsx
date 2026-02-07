import { CheckCircle } from "lucide-react";

export const Accreditation = () => {
  const items = [
    "A+ Rated & Accredited with the BBB + Top-Rated Consultancy",
    "Accredited Small Business Consultant and Financial Services Certified",
    "Fayetteville’s Businessperson of the Year",
    "Rated Top Social Media Agency by Expertise and UpCity",
  ];

  return (
    <div className="bg-[#f7f7f7] px-[5%] md:px-[10%] py-16">
      <div className="mb-12 max-w-2xl">
        <span className="bg-[#434343] text-white py-2 px-3 font-semibold">
          Accreditation
        </span>
        <h2 className="text-3xl md:text-5xl font-serif leading-tight mt-4">
          Why Hire Execor Consulting Solutions?
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((text, i) => (
          <div
            key={i}
            className="bg-[#1E242C] text-white rounded-xl p-6 shadow-sm hover:shadow-md duration-300 transition-transform hover:scale-[1.03]"
          >
            <CheckCircle className="text-[#F69419] mb-6" size={36} />
            <p className="leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
