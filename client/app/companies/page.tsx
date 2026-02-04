import BusinessProcessSection from "@/components/mods/business-process";
import Footer from "@/components/mods/footer";
import { Navbar } from "@/components/mods/navbar";
import ServicesSection from "@/components/mods/services-section";
import Slider from "@/components/mods/slider";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Companies - RT Holdings',
  description: 'Discover the diverse range of companies under RT Holding, each dedicated to excellence and innovation in their respective industries.',
}

export default function Companies() {

  return (
    <div>
      <Navbar />
      <div className="bg-[#0f3d3a] h-[10vh]" />

      <div className="w-full bg-[#f7f7f7] px-[5%] md:px-[10%] py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">

          <div className="text-sm text-gray-500">
            <span className="hover:text-[#0f3d3a] cursor-pointer">Home</span>
            <span className="mx-2">›</span>
            <span className="text-gray-700 font-medium">Companies</span>
          </div>

          <div className="w-full h-px bg-gray-200" />

          <h1 className="text-3xl sm:text-4xl md:text-5xl  lg:text-6xl font-serif text-[#0f3d3a] leading-tight max-w-4xl">
            Discover Our Companies
          </h1>

          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Discover the diverse range of companies under RT Holding,
            each dedicated to excellence and innovation in their respective industries.
          </p>

        </div>
      </div>


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

        <Slider />
      </section>
      <ServicesSection />
      <BusinessProcessSection />
      <Footer />
    </div>
  );
}
