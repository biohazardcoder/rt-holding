"use client";

import { Fetch } from "@/middlewares/Fetch";
import { useEffect, useState } from "react";
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
export const Contact = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t, i18n } = useTranslation("common", { keyPrefix: "services-page.contact-us" });
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = t("required.firstName");
    if (!form.lastName.trim()) newErrors.lastName = t("required.lastName");
    if (!form.email.trim()) newErrors.email = t("required.email");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = t("required.emailInvalid");
    if (!form.phone.trim()) newErrors.phone = t("required.phone");
    if (!form.service.trim()) newErrors.service = t("required.service");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const sendToTelegram = async () => {
    const text = `
        New Request

        Name: ${form.firstName} ${form.lastName}
        Email: ${form.email}
        Phone: ${form.phone}
        Service: ${form.service}
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
        service: form.service,
      });

      // telegramga yuborish
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

  return (
    <div className="min-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-start">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#1E242C] text-white px-6 py-4 font-medium">
          {t("form.title")}
        </div>

        <div className="p-6 space-y-4">
          {success && (
            <p className="bg-green-500 p-2 text-white font-bold text-sm">
              {t("form.successfully")}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                placeholder={t("form.name")}
                className={`border rounded p-3 w-full ${errors.firstName ? "border-red-500" : ""}`}
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <input
                placeholder={t("form.last-name")}
                className={`border rounded p-3 w-full ${errors.lastName ? "border-red-500" : ""}`}
                value={form.lastName}
                onChange={(e) =>
                  setForm({ ...form, lastName: e.target.value })
                }
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <input
              placeholder={t("form.email")}
              className={`border rounded p-3 w-full ${errors.email ? "border-red-500" : ""}`}
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              placeholder={t("form.phone")}
              className={`border rounded p-3 w-full ${errors.phone ? "border-red-500" : ""}`}
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <select
              className={`border rounded p-3 w-full ${errors.service ? "border-red-500" : ""}`}
              value={form.service}
              onChange={(e) =>
                setForm({ ...form, service: e.target.value })
              }
            >
              <option value="">{t("form.select")}</option>
              {services.map((s) => (
                <option key={s._id} value={s.title[i18n.language as keyof Lang]}>
                  {s.title[i18n.language as keyof Lang]}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className="bg-[#F69419]  hover:bg-[#F69419]/80 transition px-6 py-3 rounded font-semibold flex items-center gap-2 text-white "
          >
            {loading ? t("form.sending") : t("form.button")} →
          </button>
        </div>
      </div>
    </div>
  );
};

