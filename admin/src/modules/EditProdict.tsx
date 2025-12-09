import { useState, useEffect, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/RootStore";

export default function EditProduct({
  open,
  onOpenChange,
  product,
  refreshProducts
}: { open: boolean; onOpenChange: (open: boolean) => void; product: any; refreshProducts: () => void }) {
  const { data: categories } = useSelector((state: RootState) => state.categories);

  const [formData, setFormData] = useState({
    price: "",
    stock: "",
    category_id: "",
    translations: [
      { language: "uz", title: "" },
      { language: "ru", title: "" },
      { language: "en", title: "" },
    ],
    image_urls: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [images, setImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      const langs = ["uz", "ru", "en"];
      const mergedTranslations = langs.map((lang) => {
        const existing = product.translations.find((t: any) => t.language === lang);
        return existing || { language: lang, title: "" };
      });

      setFormData({
        price: product.price.toString(),
        stock: product.stock.toString(),
        category_id: product.category_id,
        translations: mergedTranslations,
        image_urls: product.image_urls,
      });

      setImagePreviews(product.image_urls.map((url: string) => `http://161.97.182.110:4000${url}`));
    }
  }, [product]);

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
      const previews = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const uploadImages = async () => {
    if (!images) return null;
    const form = new FormData();
    Array.from(images).forEach((img) => form.append("images", img));
    const response = await Fetch.postForm("/products/upload-multiple", form);
    return response.data.map((img: { url: string }) => img.url);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Narx to‘g‘ri kiritilishi kerak";
    }
    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Sklad to‘g‘ri kiritilishi kerak";
    }
    if (!formData.category_id) {
      newErrors.category_id = "Kategoriya tanlanishi shart";
    }
    formData.translations.forEach((t) => {
      if (!t.title.trim()) {
        newErrors[`title_${t.language}`] = `${t.language.toUpperCase()} nomi majburiy`;
      }
    });
    if (!formData.image_urls.length && !images?.length) {
      newErrors.images = "Rasm tanlanishi shart";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const loadingToast = toast.loading("O‘zgartirishlar saqlanmoqda...");

    try {
      let uploaded = null;
      if (images) uploaded = await uploadImages();

      const sendData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image_urls: uploaded || formData.image_urls,
      };

      await Fetch.patch(`/products/${product.id}`, sendData);

      toast.success("Mahsulot yangilandi!", { id: loadingToast });
      refreshProducts();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Xatolik yuz berdi", { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranslationChange = (lang: string, value: string) => {
    setFormData({
      ...formData,
      translations: formData.translations.map((t) =>
        t.language === lang ? { ...t, title: value } : t
      ),
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-[#202020] text-white border-none sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl text-white">Mahsulotni tahrirlash</SheetTitle>
          <SheetDescription>Ma’lumotlarni yangilang</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4">
          <div>
            <Label>Narx *</Label>
            <Input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          <div>
            <Label>Sklad *</Label>
            <Input
              type="text"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
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
              {errors[`title_${t.language}`] && <p className="text-red-500 text-sm">{errors[`title_${t.language}`]}</p>}
            </div>
          ))}

          <div>
            <Label>Kategoriya *</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
              
            >
              <SelectTrigger className={`mt-2 ${errors.category_id ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Kategoriya tanlang" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.translations[0].title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
          </div>

          <div>
            <Label>Rasmlar *</Label>
            <Input type="file" multiple accept="image/*" onChange={handleImagesChange} className={errors.images ? "border-red-500" : ""} />
            {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((src, idx) => (
                  <img key={idx} src={src} className="w-20 h-20 rounded object-cover" />
                ))}
              </div>
            )}
          </div>

          <Button
            className="w-full bg-[#003939] hover:bg-[#003939]/80"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saqlanmoqda..." : "O‘zgartirishlarni saqlash"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
