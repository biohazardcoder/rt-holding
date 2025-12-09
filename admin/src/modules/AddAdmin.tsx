import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useDispatch } from "react-redux";
import { setAdmins, setAdminsLoading, setAdminsError } from "@/toolkit/adminsSlicer";

import { IMaskInput } from "react-imask";

export function AddAdmin() {
  const dispatch = useDispatch();

  const getAdmins = async () => {
    try {
      dispatch(setAdminsLoading());
      const response = (await Fetch.get("users")).data;
      dispatch(setAdmins(response));
    } catch (err) {
      dispatch(setAdminsError("Adminlarni yuklashda xatolik"));
    }
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "+998 (",
    role: "BIGBOSS",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const rawPhone = formData.phone_number.replace(/\D/g, ""); 

    if (!formData.first_name.trim()) newErrors.first_name = "Ism majburiy";
    if (!formData.last_name.trim()) newErrors.last_name = "Familiya majburiy";

    if (rawPhone.length !== 12 || !rawPhone.startsWith("998")) {
      newErrors.phone_number = "To‘g‘ri telefon raqam kiriting";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const rawPhone = "+" + formData.phone_number.replace(/\D/g, "");

      await Fetch.post("admins", {
        ...formData,
        phone_number: rawPhone,
      });

      toast.success("Admin muvaffaqiyatli qo‘shildi!");
      getAdmins();
      setIsSheetOpen(false);
    } catch (err) {
      toast.error("Admin yaratishda xatolik yuz berdi");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button className="bg-[#003939] hover:bg-[#003939]/80">Admin qo‘shish</Button>
      </SheetTrigger>

      <SheetContent className="bg-[#202020] text-white border-none sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl text-white">Yangi Admin</SheetTitle>
          <SheetDescription>Barcha maydonlarni to‘ldiring</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4">

          <div>
            <Label>Ism *</Label>
            <Input
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className={errors.first_name ? "border-red-500" : ""}
            />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
          </div>

          <div>
            <Label>Familiya *</Label>
            <Input
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className={errors.last_name ? "border-red-500" : ""}
            />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
          </div>

          <div>
            <Label>Telefon raqam *</Label>

            <IMaskInput
              mask="+998 (00) 000-00-00"
              lazy={false}
              autofix={true}
              value={formData.phone_number}
              onAccept={(v) => setFormData({ ...formData, phone_number: v })}
              className={`w-full mt-2 h-10 rounded-md border px-3  ${
                errors.phone_number ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.phone_number && (
              <p className="text-red-500 text-sm">{errors.phone_number}</p>
            )}
          </div>

          <div>
            <Label>Rol *</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Rol tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BIGBOSS">BIGBOSS</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full bg-[#003939] hover:bg-[#003939]/80"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saqlanmoqda..." : "Admin yaratish"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
