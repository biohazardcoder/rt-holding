import BlogsComponent from "@/components/mods/blogs";
import { Navbar } from "@/components/mods/navbar";

import type { Metadata } from 'next'
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Our Blogs - RT Holdings',
  description: 'Stay updated with the latest news, insights, and articles from RT Holding.',
}

export default function Blogs() {
  return (
    <div>
      <Navbar />

      <div className="bg-[#1E242C] h-[10vh]" />
      <div className="w-full bg-[#f7f7f7] px-[5%] md:px-[10%] py-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">

          <div className="text-sm text-gray-500">
            <Link href="/">
              <span className="hover:text-[#1E242C] cursor-pointer">
                Home
              </span>
            </Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700 font-medium">Blogs</span>
          </div>

          <div className="w-full h-px bg-gray-200" />

          <h1 className="text-3xl sm:text-4xl md:text-5xl  lg:text-6xl font-sans text-[#234F72] leading-tight max-w-4xl">
            Insights and success stories
          </h1>

          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Explore expert advice, real-world case studies,
            and actionable strategies to drive growth and innovation in your business.
          </p>

        </div>
      </div>
      <BlogsComponent />
    </div>
  );
}
