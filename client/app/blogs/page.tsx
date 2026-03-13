import BlogsComponent from "@/components/mods/blogs/blogs";
import { TopBlog } from "@/components/mods/blogs/top";
import { Navbar } from "@/components/mods/navbar";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Blogs - RT Holdings',
  description: 'Stay updated with the latest news, insights, and articles from RT Holding.',
}

export default function Blogs() {
  return (
    <div>
      <Navbar />

      <div className="bg-[#1E242C] h-[10vh]" />
      <TopBlog />
      <BlogsComponent />
    </div>
  );
}
