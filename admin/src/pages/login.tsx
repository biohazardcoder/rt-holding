import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Fetch } from "../middlewares/Fetch";
import type { AdminTypes, ErrorTypes } from "@/types/RootTypes";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface LoginResponse {
  token: string;
  user: AdminTypes;
}

export default function Login() {

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [globalError, setGlobalError] = useState("");
  const [loading, setLoading] = useState(false);


  const validateForm = (formData: FormData) => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    const emailValue = formData.get("email") as string;
    const password = formData.get("password") as string;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue || !emailRegex.test(emailValue)) {
      newErrors.email = "Please enter a valid email.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters long.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!validateForm(formData)) return;

    try {
      setLoading(true);

      const response = await Fetch.post<LoginResponse>("admin/login", {
        email: formData.get("email"),
        password: formData.get("password"),
      });


      localStorage.setItem("token", response.data.token);
      toast.success("Successfully logged in!");
      window.location.href = "/";
    } catch (error) {
      const err = error as ErrorTypes;
      setGlobalError("Error: " + (err.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="flex items-center justify-center min-h-screen bg-[#003838]">
      <Card className="w-full max-w-md shadow-md bg-[#fff] border-none">

        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            {loading ? (
              <h1 className="flex items-center text-blue-500 gap-2 justify-center">
                <Loader2 size={20} className="animate-spin" />
                <span className="pb-1">Logging in...</span>
              </h1>
            ) : (
              "Sign in"
            )}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleFormSubmit}>

            {globalError && (
              <Alert variant="default" className="bg-destructive text-white">
                <AlertDescription>{globalError}</AlertDescription>
              </Alert>
            )}

            {/* EMAIL FIELD */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>

              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD FIELD */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#003939] text-white hover:bg-[#003939]/80"
            >
              Login
            </Button>

          </form>
        </CardContent>

      </Card>
    </section>
  );
}
