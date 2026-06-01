"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, CircleX, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSelect } from "@/lang/language";
import { Fetch } from "@/middlewares/Fetch";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface ServiceType {
  _id: string;
  title: Lang
}
interface Lang {
  en: string;
  kr: string;
  ru: string;
  uz: string;
}
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const { t, i18n } = useTranslation("common");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
  });

  useEffect(() => {
    Fetch.get("service").then((res) => {
      setServices(res.data || []);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim())
      newErrors.firstName = t("services-page.contact-us.required.firstName");

    if (!form.lastName.trim())
      newErrors.lastName = t("services-page.contact-us.required.lastName");

    if (!form.email.trim())
      newErrors.email = t("services-page.contact-us.required.email");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = t("services-page.contact-us.required.emailInvalid");

    if (!form.phone.trim())
      newErrors.phone = t("services-page.contact-us.required.phone");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const sendToTelegram = async () => {
    const text = `
    New Request

    Name: ${form.firstName} ${form.lastName}
    Email: ${form.email}
    Phone: ${form.phone}
    Service: ${form.service || "unselected"}
    `;

    try {
      await fetch(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TG_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: process.env.NEXT_PUBLIC_TG_CHAT_ID,
            text,
          }),
        }
      );
    } catch (err) {
      console.log("Telegram error:", err);
    }
  };

  const submit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await Fetch.post("contact", {
        name: `${form.firstName} ${form.lastName}`,
        phone: form.phone,
        email: form.email,
        service: form.service || "unselected",
      });

      await sendToTelegram();

      setSuccess(true);
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        service: "",
      });
      setErrors({});
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };


  const items = [
    { label: "about.title", href: "/" },
    { label: "companies", href: "/companies" },
    { label: "services", href: "/services" },
    { label: "team", href: "/team" },
    { label: "feedback", href: "/feedback" },
  ];

  return (
    <>
      <div
        className={cn(
          "w-full h-[10vh] z-40 absolute top-0 left-0 shadow-[0_4px_6px_rgba(255,255,255,0.04)]",
          "bg-transparent",
          "flex items-center justify-between px-[5%] md:px-[10%]",
          "transition-transform duration-300",
          showNavbar ? "fixed bg-[#1E242C]" : "-translate-y-full"
        )}
      >
        <Link href={"/"}>
          <div className="flex items-center relative">
            <Image src="/image.png" alt="Logo" width={45} height={45} />
            <h1 className="text-white font-semibold text-xl md:text-2xl">
              RT Holdings
            </h1>
            <div className="bg-white w-7 h-7 absolute top-[5px] left-2.5 -z-10 rounded-full" />
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-white font-semibold">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:border-[#F69419] border-b-2 border-transparent pb-1 transition-colors"
              >
                {t(item.label)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSelect />

          <Button
            onClick={() => setShowModal(true)}
            className="bg-[#F69419] text-white font-semibold hover:bg-[#F69419]/80"
          >
            {t("become")} <ArrowRight size={16} />
          </Button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MOBILE MENU */}
        {open && (
          <div className="absolute top-[10vh] left-0 w-full bg-[#1E242C] border-t border-[#ffffff26] md:hidden">
            <ul className="flex flex-col items-center gap-6 py-6 text-white font-semibold">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-lg"
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}

              <LanguageSelect />

              {/* MOBILE BUTTON */}
              <Button
                onClick={() => {
                  setShowModal(true);
                  setOpen(false);
                }}
                className="bg-[#F69419] text-white font-semibold hover:bg-[#F69419]/80"
              >
                {t("become")} <ArrowRight size={16} />
              </Button>
            </ul>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-90 flex items-center justify-center bg-black/60">

          {/* modal box */}
          <div className="w-full max-w-2xl mx-auto">

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

              {/* header */}
              <div className="bg-[#1E242C] text-white px-6 py-4 font-medium flex items-center justify-between">
                <p>{t("services-page.contact-us.form.title")}</p>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white cursor-pointer"
                >
                  <CircleX />
                </button>
              </div>

              {/* body */}
              <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {success && (
                  <p className="bg-green-500 p-2 text-white font-bold text-sm">
                    {t("services-page.contact-us.form.successfully")}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      placeholder={t("services-page.contact-us.form.name")}
                      className={`border rounded p-3 w-full ${errors.firstName ? "border-red-500" : ""}`}
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <input
                      placeholder={t("services-page.contact-us.form.last-name")}
                      className={`border rounded p-3 w-full ${errors.lastName ? "border-red-500" : ""}`}
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <input
                  placeholder={t("services-page.contact-us.form.email")}
                  className={`border rounded p-3 w-full ${errors.email ? "border-red-500" : ""}`}
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}

                <input
                  placeholder={t("services-page.contact-us.form.phone")}
                  className={`border rounded p-3 w-full ${errors.phone ? "border-red-500" : ""}`}
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}

                <select
                  className={`border rounded p-3 w-full ${errors.service ? "border-red-500" : ""}`}
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                >
                  <option value="">
                    {t("services-page.contact-us.form.select")}
                  </option>
                  {services.map((s) => (
                    <option
                      key={s._id}
                      value={s.title[i18n.language as keyof Lang]}
                    >
                      {s.title[i18n.language as keyof Lang]}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-500 text-xs mt-1">{errors.service}</p>
                )}

                <button
                  onClick={submit}
                  disabled={loading}
                  className="bg-[#F69419] hover:bg-[#F69419]/80 transition px-6 py-3 rounded font-semibold flex items-center gap-2 text-white"
                >
                  {loading
                    ? t("services-page.contact-us.form.sending")
                    : t("services-page.contact-us.form.button")} →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};