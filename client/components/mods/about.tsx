import Link from "next/link"
import { Button } from "../ui/button"

export const About = () => {
        return (
                <div className="bg-[#f7f7f7] grid grid-cols-1 md:grid-cols-4 px-4 md:px-[10%] gap-8 py-8 md:py-16">
                        <div>
                                <span className="bg-[#434343] text-white py-2 px-3 font-semibold block w-fit">About Us</span>
                                <p className="mt-4 text-lg">Get to know our company's <br /> <span className="font-semibold">activities</span>, <span className="font-semibold">values</span>, and <span className="font-semibold">goals</span>.</p>
                        </div>
                        <div className="col-span-1 md:col-span-3">
                                <div className="text-sm md:text-lg leading-relaxed text-slate-700 dark:text-slate-300 font-normal">
                                        <p className="mb-4">
                                                <span className="font-semibold text-slate-900 dark:text-white">RT HOLDINGS</span>,
                                                located in Uzbekistan and South Korea, was founded in 2013 and has since been engaged in the export of construction machinery.
                                                Its main activity is the sale of excavators and special equipment from South Korea to Central Asian countries,
                                                as well as to Russia, Belarus, Ukraine, and Arab countries.
                                        </p>

                                        <p className="mb-4">
                                                Today, this company is a large holding that includes several subsidiary branches.
                                        </p>

                                        <ul className="space-y-1 list-none  grid grid-cols-2">
                                                <li><span className="font-semibold not-italic">RT MOTORS</span>: Specializing in car sales</li>
                                                <li><span className="font-semibold not-italic">Kortex Oil</span>: Motor oils</li>
                                                <li><span className="font-semibold not-italic">Dream Express</span>: Cargo services</li>
                                                <li><span className="font-semibold not-italic">Aka Taxi</span>: Taxi services across Uzbekistan</li>
                                                <li><span className="font-semibold not-italic">RT Medline</span>: Wellness center</li>
                                                <li><span className="font-semibold not-italic">RT HS Logistics</span>: Global equipment delivery</li>
                                        </ul>
                                </div>
                                <div className="mt-4 grid grid-cols-2 md:flex md:items-center gap-4">
                                        <Link href={"/services"}>
                                                <Button className="text-white font-semibold border-2 bg-[#F69419] border-border hover:bg-white rounded-[3px] hover:text-[#F69419] cursor-pointer w-full md:w-auto">
                                                        Our Services
                                                </Button>
                                        </Link>
                                        <Link href={"/team"}>
                                                <Button className="text-white font-semibold border-2 bg-[#F69419] border-border hover:bg-white rounded-[3px] hover:text-[#F69419] cursor-pointer w-full md:w-auto">
                                                        Our Team
                                                </Button>
                                        </Link>
                                </div>
                        </div>
                </div>
        )
}
