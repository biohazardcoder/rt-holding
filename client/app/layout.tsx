import type { Metadata } from "next";
import { Lato, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { LangLayout } from "@/lang/lang-layout";

const geistSans = Lato({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "400"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RT Holdings",
  description:
    "O‘zbekiston va Markaziy Osiyo davlatlari qurilish, sanoat, logistika va xizmat ko’rsatish sohalarida ishonchli hamkordir.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <LangLayout>{children}</LangLayout>
      </body>
    </html>
  );
}
