import { useState, useEffect, type ChangeEvent } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setCategoriesLoading, setCategoriesError } from "@/toolkit/categoriesSlicer";
import { setProducts, setProductsError, setProductsLoading } from "@/toolkit/productsSlicer";
import type { RootState } from "@/store/RootStore";

interface Translation {
  language: string;
  title: string;
}

interface UploadResponseItem {
  filename: string;
  url: string;
}

export function AddProduct() {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state: RootState) => state.categories);

  const [formData, setFormData] = useState({
    price: 0,
    category_id: "",
    stock: 0,
    image_urls: [] as string[],
    translations: [
      { language: "uz", title: "" },
      { language: "ru", title: "" },
      { language: "en", title: "" },
    ] as Translation[],
  });

  const [images, setImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const getCategories = async () => {
    try {
      dispatch(setCategoriesLoading());
      const response = (await Fetch.get("categories")).data;
      dispatch(setCategories(response));
    } catch {
      dispatch(setCategoriesError("Kategoriyalarni yuklashda xatolik"));
    }
  };

  const getProducts = async () => {
    try {
      dispatch(setProductsLoading());
      const response = (await Fetch.get("products")).data;
      dispatch(setProducts(response));
    } catch {
      dispatch(setProductsError("Mahsulotlarni yuklashda xatolik"));
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    formData.translations.forEach((t) => {
      if (!t.title.trim()) {
        newErrors[`title_${t.language}`] = `${t.language.toUpperCase()} nomi majburiy`;
      }
    });

    if (!formData.category_id) newErrors.category_id = "Kategoriya tanlanishi majburiy";
    if (formData.price <= 0) newErrors.price = "Narx 0 dan katta bo‘lishi kerak";
    if (formData.stock < 0) newErrors.stock = "Sklad musbat son bo‘lishi kerak";
    if (!images || images.length === 0) newErrors.images = "Rasm yuklash majburiy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTranslationChange = (lang: string, value: string) => {
    const updated = formData.translations.map((t) =>
      t.language === lang ? { ...t, title: value } : t
    );
    setFormData({ ...formData, translations: updated });
  };

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
      const previews = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const uploadImages = async (): Promise<string[]> => {
    if (!images) return [];

    const form = new FormData();
    Array.from(images).forEach((img) => form.append("images", img));


    try {
      const response = await Fetch.postForm<UploadResponseItem[]>("/products/upload-multiple", form);
      return response.data.map((img) => img.url);
    } catch (err) {
      toast.error("Rasmlar yuklashda xatolik");
      throw err;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const savingToast = toast.loading("Mahsulot yaratilmoqda...");
    try {
      const uploadedUrls = await uploadImages();

      const sendData = {
        ...formData,
        image_urls: uploadedUrls,
      };

      const response = await Fetch.post("/products", sendData);
      console.log("Product created:", response.data);

      toast.success("Mahsulot muvaffaqiyatli yaratildi!", { id: savingToast });
      getProducts();
      setIsSheetOpen(false);

      setFormData({
        price: 0,
        category_id: "",
        stock: 0,
        image_urls: [],
        translations: [
          { language: "uz", title: "" },
          { language: "ru", title: "" },
          { language: "en", title: "" },
        ],
      });
      setImages(null);
      setImagePreviews([]);

    } catch (err) {
      console.error(err);
      toast.error("Mahsulot yaratishda xatolik yuz berdi", { id: savingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button className="bg-[#003939] hover:bg-[#003939]/80">
          Mahsulot qo‘shish
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-[#202020] text-white border-none sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl text-white">Yangi Mahsulot</SheetTitle>
          <SheetDescription>Iltimos, barcha maydonlarni to‘ldiring</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4">
          <div>
          <Label>Narx *</Label>
          <Input
            type="text"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) || 0 })}
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          <div>
            <Label>Sklad *</Label>
            <Input
              type="text"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) || 0 })}
              className={errors.stock ? "border-red-500" : ""}
            />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
          </div>


          {formData.translations.map((t) => (
            <div key={t.language}>
              <Label>Nomi ({t.language}) *</Label>
              <Input
                value={t.title}
                onChange={(e) => handleTranslationChange(t.language, e.target.value)}
                className={errors[`title_${t.language}`] ? "border-red-500" : ""}
              />
              {errors[`title_${t.language}`] && (
                <p className="text-red-500 text-sm">{errors[`title_${t.language}`]}</p>
              )}
            </div>
          ))}

          <div>
            <Label className="mb-2">Kategoriya *</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
            >
              <SelectTrigger className={errors.category_id ? "border-red-500" : ""}>
                <SelectValue placeholder="Kategoriya tanlang" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.translations.find(t => t.language === "en")?.title || c.translations[0]?.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
          </div>

          <div>
            <Label>Rasmlar *</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImagesChange}
              className={errors.images ? "border-red-500" : ""}
            />
            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((src, idx) => (
                  <img key={idx} src={src} alt={`preview-${idx}`} className="w-20 h-20 object-cover rounded" />
                ))}
              </div>
            )}
          </div>

          <Button
            className="w-full bg-[#003939] hover:bg-[#003939]/80"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saqlanmoqda..." : "Mahsulot yaratish"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
