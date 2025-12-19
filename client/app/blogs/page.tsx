import BlogsComponent from "@/components/mods/blogs";

import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Our Blogs - RT Holdings',
  description: 'Stay updated with the latest news, insights, and articles from RT Holding.',
}

export default function Blogs() {
  return (
    <div>
      <BlogsComponent/>
    </div>
  );
}
