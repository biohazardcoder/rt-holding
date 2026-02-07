import type { Metadata } from 'next'
import { ServicesComponent } from "@/components/mods/services";
import { Navbar } from '@/components/mods/navbar';
import { CircleCheckBig } from 'lucide-react';
import Footer from '@/components/mods/footer';
import { Contact } from '@/components/mods/contact';

export const metadata: Metadata = {
  title: 'Our Services - RT Holdings',
  description: 'Explore the range of services provided by RT Holding.',
}

export default function Services() {

  return (
    <div>
      <Navbar />
      <div className="bg-[#1E242C] h-[10vh]" />
      <div className="w-full bg-[#f7f7f7] px-[5%] md:px-[10%] py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">

          <div className="text-sm text-gray-500">
            <span className="hover:text-[#234F72] cursor-pointer">Home</span>
            <span className="mx-2">›</span>
            <span className="text-gray-700 font-medium">Services</span>
          </div>

          <div className="w-full h-px bg-gray-200" />

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans  text-[#234F72] leading-tight max-w-4xl">
            Comprehensive business consulting
          </h1>

          <p className="text-gray-600 max-w-2xl leading-relaxed">
            We help organizations redefine their direction, and improve performance.
            Our consultants bring deep industry knowledge and a results-oriented mindset.
          </p>

        </div>
      </div>
      <div className="h-auto md:h-[10vh] bg-[#1E242C] px-[5%] text-white font-semibold md:px-[10%] py-6 md:py-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        <h1 className="text-lg md:text-base">We are a proud member, of the:</h1>
        <ul className="grid grid-cols-2 text-sm md md:flex md:flex-row items-start md:items-center gap-4 md:gap-12 w-full md:w-auto">
          <li className="flex items-center gap-2">
            <CircleCheckBig size={20} /> Slogan
          </li>
          <li className="flex items-center gap-2">
            <CircleCheckBig size={20} /> Slogan
          </li>
        </ul>
      </div>
      <div className="bg-white px-[5%] md:px-[10%] py-20 flex flex-col items-center">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative w-full h-80 sm:h-[420px] lg:h-[520px] rounded-xl overflow-hidden">
            <img
              src="/story/bussiness.png"
              alt="Consulting"
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 right-0 flex items-end gap-2 pr-4 pb-4">
              <span className="w-3 h-12 bg-white/40 rounded" />
              <span className="w-3 h-20 bg-white/60 rounded" />
              <span className="w-3 h-28 bg-white/80 rounded" />
              <span className="w-3 h-36 bg-white rounded" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <span className="bg-[#434343] text-white py-2 px-3 font-semibold">
                What We Do
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans leading-tight text-[#234F72]">
              Transforming Insight <br /> into Impact
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Business consultants guide and advise businesses on overcoming
              challenges and capitalizing on opportunities. We take the time
              to research and deeply understand our clients’ businesses,
              asking the right questions and actively listening.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Considering factors such as capacity, budget, industry
              competition, and business goals, our plan of action is
              customized for maximum impact. We guide you through execution,
              ensuring real results.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#f7f7f7] px-[5%] md:px-[10%] py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div className="flex flex-col gap-8">
            <div>
              <span className="bg-[#434343] text-white py-2 px-3 font-semibold">
                How We Work
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans leading-tight text-[#234F72]">
              Transparent. <br />
              Collaborative. <br />
              Results-Driven.
            </h2>

            <p className="text-gray-600 leading-relaxed max-w-md">
              At our company, every project begins with a deep understanding
              of your unique needs. We believe that a successful partnership
              is built on transparent communication, collaborative innovation,
              and a methodical approach that transforms challenges into
              measurable results.
            </p>
          </div>

          <div className="flex flex-col gap-6">

            <div className="bg-white rounded-2xl p-8 flex gap-6">
              <span className="text-4xl font-sans text-[#234F72]">01</span>
              <div>
                <h4 className="text-lg font-semibold text-[#234F72]">
                  Discovery & Strategy
                </h4>
                <p className="text-gray-600 mt-1">
                  We dive into your business to pinpoint clear objectives.
                </p>
              </div>
            </div>

            <div className="rounded-2xl p-8 flex gap-6">
              <span className="text-4xl font-sans text-[#234F72]">02</span>
              <div>
                <h4 className="text-lg font-semibold text-[#234F72]">
                  Planning
                </h4>
                <p className="text-gray-600 mt-1">
                  We create tailored strategies that align with your vision.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 flex gap-6">
              <span className="text-4xl font-sans text-[#234F72]">03</span>
              <div>
                <h4 className="text-lg font-semibold text-[#234F72]">
                  Execution & Implementation
                </h4>
                <p className="text-gray-600 mt-1">
                  We turn plans into action with agility and precision.
                </p>
              </div>
            </div>

            <div className="rounded-2xl p-8 flex gap-6">
              <span className="text-4xl font-sans text-[#234F72]">04</span>
              <div>
                <h4 className="text-lg font-semibold text-[#234F72]">
                  Monitoring & Optimization
                </h4>
                <p className="text-gray-600 mt-1">
                  We measure, refine, and enhance for sustained success.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <section className="relative w-full min-h-[420px] overflow-hidden bg-[#1E242C] text-white">
        <div className="absolute inset-0">
          <div className="absolute -left-30 -top-18 h-full w-[60%] -rotate-40 bg-[#234F72] opacity-60" />
          <div className="absolute right-[-40%] -top-20 h-full w-[60%] -rotate-40 bg-[#234F72] opacity-70" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F69419] text-white text-xl font-bold">
              ×
            </span>
            <h2 className="mt-4 text-4xl uppercase font-sans md:text-5xl">
              RT Holdings
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="mb-8 text-sm leading-relaxed text-gray-200 md:text-base">
              Our team consists of experienced marketing professionals with a
              proven track record across various industries. With deep expertise
              in the latest marketing trends, best practices, and social platform
              technologies, we provide valuable insights and strategic
              recommendations to help businesses thrive.
            </p>

            <button className="inline-flex items-center gap-3 rounded-lg px-6 py-3 text-sm text-white font-semibold transition bg-[#F69419]  hover:bg-[#F69419]/80">
              Meet the Team
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </section>
      <ServicesComponent />
      <div>
        <Contact />
      </div>

      <Footer />
    </div>
  );
}
