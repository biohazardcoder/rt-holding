import { TopBlog } from "@/components/mods/blogs/top";
import { Comments } from "@/components/mods/comments";
import Footer from "@/components/mods/footer";
import { Navbar } from "@/components/mods/navbar";

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Client Feedback - RT Holdings',
    description: 'Read what our clients have to say about our services. Discover how RT Holdings has helped businesses achieve their goals through our innovative solutions and exceptional customer service.',
}

export default function Feedback() {
    return (
        <div>
            <Navbar />

            <div className="bg-[#1E242C] h-[10vh]" />
            <TopBlog />
            <Comments />
            <Footer />
        </div>
    );
}
