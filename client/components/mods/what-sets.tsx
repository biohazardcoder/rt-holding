import { CircleCheckBig } from "lucide-react"

export const WhatSets = () => {
    return (
        <div className="h-auto md:h-[10vh] bg-[#dff7cc] px-[5%] md:px-[10%] py-6 md:py-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
                <h1 className="text-lg md:text-base">What Sets Us Apart</h1>
                <ul className="grid grid-cols-2 text-sm md md:flex md:flex-row items-start md:items-center gap-4 md:gap-12 w-full md:w-auto">
                        <li className="flex items-center gap-2">
                                <CircleCheckBig size={20} /> Slogan
                        </li>
                        <li className="flex items-center gap-2">
                                <CircleCheckBig size={20} /> Slogan
                        </li>
                        <li className="flex items-center gap-2">
                                <CircleCheckBig size={20} /> Slogan
                        </li>
                        <li className="flex items-center gap-2">
                                <CircleCheckBig size={20} /> Slogan
                        </li>
                </ul>
        </div>
    )
}
