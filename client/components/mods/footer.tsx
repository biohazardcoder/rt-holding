import { Mail, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f3d3a] text-white px-[5%] pt-14">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14">
        
        <div className="md:col-span-4">
          <h1 className="text-3xl font-bold mb-3">
            RT Holdings
          </h1>
          <p className="text-sm text-gray-300 max-w-xs">
            Your choice is important for us          
        </p>

        </div>

        <div className="md:col-span-3">
          <h3 className="text-gray-300 mb-5">Company</h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <ul className="space-y-3">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/companies">Companies</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/blogs">Blogs</Link></li>
            </ul>

          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-gray-300 mb-5">Contact</h3>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <PhoneCall size={16} />
              <span>+1 800 356 8933</span>
            </li>

            <li className="flex items-center gap-3">
              <Mail size={16} />
              <span>info@rtholding.com</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-gray-300 mb-5">Address</h3>

          <div className="flex items-start gap-3 text-sm">
            <MapPin size={16} className="mt-1" />
            <p>
              Seventh Ave, 20th Floor,<br />
              New York, NY 10018
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/30 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 gap-4">
        <span>©2013-2025 RT Holding. All rights reserved.</span>

        <div className="flex gap-6">
          <Link href="#" className="hover:underline">Telegram</Link>
          <Link href="#" className="hover:underline">Instagram</Link>
          <Link href="#" className="hover:underline">Whatsapp</Link>
        </div>
      </div>
    </footer>
  );
}
