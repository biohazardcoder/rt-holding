"use client";

import { Fetch } from "@/middlewares/Fetch";
import { useEffect, useState } from "react";

interface ServiceType {
  _id: string;
  title: string;
}

export const Contact = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.service.trim()) newErrors.service = "Service is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      setSuccess(true);
      setForm({ firstName: "", lastName: "", phone: "", email: "", service: "" });
      setErrors({});
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        
        <div>
          <span className="bg-[#434343] text-white py-2 px-3 font-semibold">
            Contact Us
          </span>

          <h2 className="text-4xl font-serif leading-tight my-4">
            Our Experts Always <br /> Ready to Work With You
          </h2>

          <p className="text-gray-600 mb-10">
            Ask about general information. Please send us a message.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 rounded-xl bg-gray-50">
              <div>
                <p className="font-medium">For career inquiries</p>
                <p className="text-sm text-gray-600">
                 example@gmail.com
                </p>
              </div>
              <span>→</span>
            </div>

            <div className="flex items-center justify-between p-5 rounded-xl bg-gray-50">
              <div>
                <p className="font-medium">For any other inquiries</p>
                <p className="text-sm text-gray-600">
                  example@gmail.com
                </p>
              </div>
              <span>→</span>
            </div>

            <div className="flex items-center justify-between p-5 rounded-xl bg-gray-50">
              <div>
                <p className="font-medium">
                  Connect with a specific team member
                </p>
                <p className="text-sm text-gray-600">
                  Please see our team page
                </p>
              </div>
              <span>→</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#0f3d3a] text-white px-6 py-4 font-medium">
            Contact Form
          </div>

          <div className="p-6 space-y-4">
            {success && (
              <p className="bg-green-500 p-2 text-white font-bold text-sm">
                Message sent successfully!
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  placeholder="First name"
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
                  placeholder="Last name"
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
                placeholder="Email"
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
                placeholder="Phone"
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
                <option value="">Select service</option>
                {services.map((s) => (
                  <option key={s._id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
            </div>

            <button
              onClick={submit}
              disabled={loading}
              className="bg-[#c9f9a9] hover:bg-[#c9f9a9]/80 transition px-6 py-3 rounded font-medium flex items-center gap-2"
            >
              {loading ? "Sending..." : "Submit"} →
            </button>

            <p className="text-xs text-gray-500 pt-4">
              By submitting this form you agree to our{" "}
              <span className="underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
