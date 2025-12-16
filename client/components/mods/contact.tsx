"use client";

import { Fetch } from "@/middlewares/Fetch";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface ServiceType {
  _id: string;
  title: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ContactModal = ({ open, onClose }: Props) => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
  });


  useEffect(() => {
    if (!open) return;

    const getServices = async () => {
      try {
        setLoading(true);
        setError("");
        const res = (await Fetch.get("service")).data;
        setServices(res || []);
      } catch {
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, [open]);


  const validate = () => {
    if (!form.name.trim()) {
      return "Name is required.";
    }

    if (!form.phone.trim()) {
      return "Phone number is required.";
    }

    if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone)) {
      return "Please enter a valid phone number.";
    }

    if (!form.email.trim()) {
      return "Email address is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Please enter a valid email address.";
    }

    if (!form.service) {
      return "Please select a service.";
    }

    return "";
  };


  const submit = async () => {
    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      setLoading(true);
      setFormError("");
      setError("");
      await Fetch.post("contact", form);
      onClose();
      setForm({ name: "", phone: "", email: "", service: "" });
    } catch {
      setError("Failed to send contact request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold text-[#0f3d3a] mb-4">
          Contact Us
        </h2>

        {formError && (
          <p className="text-red-500 text-sm mb-3">
            {formError}
          </p>
        )}

        {!loading && error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}
        {loading && (
          <div className="animate-pulse space-y-4">
            <div className="h-11 bg-gray-200 rounded" />
            <div className="h-11 bg-gray-200 rounded" />
            <div className="h-11 bg-gray-200 rounded" />
            <div className="h-11 bg-gray-200 rounded" />
            <div className="h-11 bg-gray-300 rounded" />
          </div>
        )}

        {!loading && (
          <div className="space-y-4">

            <input
              placeholder="Your name"
              className="w-full border p-3 rounded"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Phone number"
              className="w-full border p-3 rounded"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              placeholder="Email address"
              className="w-full border p-3 rounded"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <select
              className="w-full border p-3 rounded"
              value={form.service}
              onChange={(e) =>
                setForm({ ...form, service: e.target.value })
              }
            >
              <option value="">Select service</option>
              {services.map((s) => (
                <option key={s._id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>

            <button
              disabled={loading}
              onClick={submit}
              className="w-full bg-[#0f3d3a] text-white py-3 rounded font-semibold disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
