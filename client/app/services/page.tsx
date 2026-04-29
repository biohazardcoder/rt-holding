import type { Metadata } from 'next'
import { ServicesComponent } from "@/components/mods/services/services";
import { Navbar } from '@/components/mods/navbar';
import Footer from '@/components/mods/footer';
import { Contact } from '@/components/mods/services/contact';
import { Top } from '@/components/mods/services/top';
import { Line } from '@/components/mods/services/line';
import { WhatWeDo } from '@/components/mods/services/wwd';
import { HowWeWork } from '@/components/mods/services/hww';
import { Banner } from '@/components/mods/services/banner';

export const metadata: Metadata = {
  title: 'Our Services - RT Holdings',
  description: 'Explore the range of services provided by RT Holding.',
}

export default function Services() {

  return (
    <div>
      <Navbar />
      <div className="bg-[#1E242C] h-[10vh]" />
      <Top />
      {/* <Line /> */}
      <WhatWeDo />
      <HowWeWork />
      <Banner />
      <ServicesComponent />
      <Footer />
    </div>
  );
}
