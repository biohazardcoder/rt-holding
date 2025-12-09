import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { setCategories, setCategoriesLoading, setCategoriesError } from "@/toolkit/categoriesSlicer";

export function AddCategory() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    is_active: true,
    translations: [
      { language: "uz", title: "", description: "" },
      { language: "ru", title: "", description: "" },
      { language: "en", title: "", description: "" },
    ],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const GetCategories = async () => {
    try {
      dispatch(setCategoriesLoading());
      const response = (await Fetch.get("categories")).data;
      dispatch(setCategories(response));
    } catch (error: any) {
      dispatch(setCategoriesError("Kategoriyalarni yuklashda xatolik"));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    formData.translations.forEach((t) => {
      if (!t.title.trim()) {
        newErrors[`title_${t.language}`] =
          `${t.language.toUpperCase()} Nomi majburiy`;
      }
    });


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTranslationChange = (lang: string, field: "title" | "description", value: string) => {
    const updated = formData.translations.map((t) =>
      t.language === lang ? { ...t, [field]: value } : t
    );
    setFormData({ ...formData, translations: updated });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await Fetch.post("/categories", formData);

      toast.success("Kategoriya muvaffaqiyatli yaratildi!");
      setIsSheetOpen(false);
      GetCategories();
    } catch (err) {
      toast.error("Kategoriya yaratishda xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button className="bg-[#003939] hover:bg-[#003939]/80 hover:cursor-pointer">Kategoriya qo‘shish</Button>
      </SheetTrigger>

      <SheetContent className="bg-[#202020] text-white border-none sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl text-white">Yangi Kategoriya</SheetTitle>
          <SheetDescription>Iltimos, barcha tillar bo‘yicha maydonlarni to‘ldiring</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-5 px-2 ">

          {formData.translations.map((t) => (
            <div key={t.language} className="p-3 rounded-lg">
              <div className="mt-2">
                <Label>Nomi({t.language}) *</Label>
                <Input
                  value={t.title}
                  onChange={(e) =>
                    handleTranslationChange(t.language, "title", e.target.value)
                  }
                  className={errors[`title_${t.language}`] ? "border-red-500" : ""}
                />
                {errors[`title_${t.language}`] && (
                  <p className="text-red-500 text-sm">{errors[`title_${t.language}`]}</p>
                )}
              </div>

              <div className="mt-2">
                <Label>Tavsifi({t.language})</Label>
                <Input
                  value={t.description}
                  onChange={(e) =>
                    handleTranslationChange(t.language, "description", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

         <div className="px-2">
             <Button className="w-full bg-[#003939] hover:bg-[#003939]/80 hover:cursor-pointer" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saqlanmoqda..." : "Kategoriya yaratish"}
          </Button>
         </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
