import Footer from "@/components/mods/footer";
import { Navbar } from "@/components/mods/navbar";
import { Top } from "@/components/mods/team/top";
import type { Metadata } from 'next'
import { Ceo } from "../../components/mods/team/ceo";
import { OurTeam } from "@/components/mods/team/our-team";

export const metadata: Metadata = {
  title: 'Our Team - RT Holdings',
  description: 'Meet the dedicated professionals at RT Holding who are committed to driving your financial growth and success.',
}
export default function Team() {

  return (
    <div>
      <Navbar />
      {/* <div className="bg-[#1E242C] h-[10vh]" /> */}
      {/* <Top /> */}
      {/* <Ceo /> */}
      {/* <Accreditation /> */}
      <OurTeam />
      <Footer />
    </div>
  );
}
