"use client"

import { useEffect, useState } from "react"

type TextType = {
    en: string
    uz: string
    ru: string
    kr: string
}

export const Translate = ({ text }: { text: TextType }) => {
    const [lang, setLang] = useState<keyof TextType>("en")

    useEffect(() => {
        const savedLang = localStorage.getItem("lang") as keyof TextType
        if (savedLang && text[savedLang]) {
            setLang(savedLang)
        }
    }, [text])

    return <>{text[lang]}</>
}