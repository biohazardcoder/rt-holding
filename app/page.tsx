import { About } from "@/components/mods/about";
import Footer from "@/components/mods/footer";
import { Main } from "@/components/mods/main";
import { Navbar } from "@/components/mods/navbar";
import { OurServices } from "@/components/mods/our-services";
import { OurTeam } from "@/components/mods/our-team";
import { Projects } from "@/components/mods/projects";
import { WhyChooseUs } from "@/components/mods/why-choose-us";

export default function Home() {
  return (
   <div>
    <Navbar />
    <Main/>
    <About/>
    <Projects/>
    <OurServices/>
    <WhyChooseUs/>
    <OurTeam/>
    <Footer/>
   </div>
  );
}
