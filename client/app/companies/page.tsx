import BusinessProcessSection from "@/components/mods/companies/business-process";
import { OurCompanies } from "@/components/mods/companies/our-companies";
import { Top } from "@/components/mods/companies/top";
import Footer from "@/components/mods/footer";
import { Navbar } from "@/components/mods/navbar";
import ServicesSection from "@/components/mods/companies/services-section";

import type { Metadata } from 'next'
import CompaniesMap from "@/components/mods/companies/companies";

export const metadata: Metadata = {
  title: 'Our Companies - RT Holdings',
  description: 'Discover the diverse range of companies under RT Holding, each dedicated to excellence and innovation in their respective industries.',
}

export default function Companies() {
  return (
    <div>
      <Navbar />
      {/* <div className="bg-[#1E242C] h-[10vh]" /> */}
      {/* <Top /> */}
      <div id="our-companies">
        <OurCompanies />
      </div>
      <CompaniesMap />
      {/* <BusinessProcessSection /> */}
      {/* <ServicesSection /> */}
      <Footer />
    </div>
  );
}
