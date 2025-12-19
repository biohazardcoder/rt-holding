import Footer from "@/components/mods/footer";
import { Navbar } from "@/components/mods/navbar";
import Slider from "@/components/mods/slider";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Our Companies - RT Holdings',
  description: 'Discover the diverse range of companies under RT Holding, each dedicated to excellence and innovation in their respective industries.',
}

export default function Companies() {

  return (
    <div className="bg-[#f7f7f7]">
      <Navbar />
        <div className="bg-[#0f3d3a] h-[10vh]" />

      <section className="px-[10%] py-10">
        <div className="text-center max-w-3xl mx-auto">
         <span className="bg-[#434343] text-white py-2.5 px-3 font-semibold">
         Our Companies
        </span>

        <h1 className="text-center text-xl md:text-4xl mt-4 font-semibold">
            We offer a full scale of services to meet your needs
        </h1>
          <p className="text-gray-500 text-sm md:text-base mt-4">
            Stay informed with RT Holding’s latest updates, innovations, and
            strategic insights across all industries.
          </p>
        </div>

        <Slider/>
      </section>

      <Footer />
    </div>
  );
}
