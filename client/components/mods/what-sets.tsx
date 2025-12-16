import {  CircleCheckBig } from "lucide-react"

export const WhatSets = () => {
  return (
    <div className="h-[10vh] bg-[#dff7cc] px-[10%] flex items-center justify-between">
        <h1>What Sets Us Apart</h1>
        <ul className="flex items-center gap-12">
            <li className="flex items-center gap-2">
                <CircleCheckBig/>  Slogan
            </li>
             <li className="flex items-center gap-2">
                <CircleCheckBig/>  Slogan
            </li>
             <li className="flex items-center gap-2">
                <CircleCheckBig/> Slogan
            </li>
             <li className="flex items-center gap-2">
                <CircleCheckBig/>  Slogan
            </li>
        </ul>
    </div>
  )
}
