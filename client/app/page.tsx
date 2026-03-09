import { About } from "@/components/mods/about";
import { Comments } from "@/components/mods/comments";
import Footer from "@/components/mods/footer";
import { Main } from "@/components/mods/main";
import { Navbar } from "@/components/mods/navbar";
import { OurStory } from "@/components/mods/our-story";
import { OurTeam } from "@/components/mods/our-team";
import { Projects } from "@/components/mods/projects";
import { WhatSets } from "@/components/mods/what-sets";
import { WhyChooseUs } from "@/components/mods/why-choose-us";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Main />
      <WhatSets />
      <About />
      <Projects />
      <OurStory />
      <WhyChooseUs />
      <OurTeam />
      <Comments />
      <Footer />
    </div>
  );
}
