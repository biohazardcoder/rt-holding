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
import type { ErrorTypes } from "@/types/RootTypes";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { setStory, setStoryError, setStoryLoading } from "@/toolkit/storySlicer";

const languages = ["en", "uz", "ru", "kr"] as const;
type Lang = (typeof languages)[number];

export function AddStory() {
  const [images, setImages] = useState<FileList | null>(null);
  const [step, setStep] = useState(0);
  const currentLang = languages[step];

  const [formData, setFormData] = useState<{
    title: Record<Lang, string>;
    text: Record<Lang, string>;
    year: string;
  }>({
    title: { en: "", uz: "", ru: "", kr: "" },
    text: { en: "", uz: "", ru: "", kr: "" },
    year: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const dispatch = useDispatch();

  const GetStories = async () => {
    try {
      dispatch(setStoryLoading());
      const response = (await Fetch.get("story")).data;
      dispatch(setStory(response));
    } catch (error) {
      const err = error as ErrorTypes;
      dispatch(setStoryError(err.response?.data?.message || "Error getting stories"));
    }
  };

  const handleLangChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: { ...prev[name as "title" | "text"], [currentLang]: value },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title[currentLang]) newErrors.title = "Title is required.";
    if (!formData.text[currentLang]) newErrors.text = "Text is required.";
    if (!formData.year) newErrors.year = "Year is required.";
    if (!images || images.length === 0) newErrors.media = "You must select an image.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const body = new FormData();
      body.append("title", JSON.stringify(formData.title));
      body.append("text", JSON.stringify(formData.text));
      body.append("year", formData.year);

      if (images) {
        Array.from(images).forEach(img => body.append("images", img));
      }

      await Fetch.post("/story", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      GetStories();
      toast.success("Story added successfully!");
      setIsSheetOpen(false);
      setFormData({
        title: { en: "", uz: "", ru: "", kr: "" },
        text: { en: "", uz: "", ru: "", kr: "" },
        year: "",
      });
      setImages(null);
      setStep(0);
    } catch (error) {
      toast.error("Error adding story.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button className="bg-[#003939] hover:bg-[#005555]">
          Add Story
        </Button>
      </SheetTrigger>

      <SheetContent className="h-full w-full sm:max-w-md bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">New Story</SheetTitle>
          <SheetDescription>
            Fill story info and choose <b>image</b>
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4">
          <p className="text-sm text-gray-400">
            Language: <b className="uppercase">{currentLang}</b>
          </p>

          <div>
            <Label>Title ({currentLang}) *</Label>
            <Input
              name="title"
              value={formData.title[currentLang]}
              onChange={handleLangChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
          </div>

          <div>
            <Label>Text ({currentLang}) *</Label>
            <Textarea
              name="text"
              value={formData.text[currentLang]}
              onChange={handleLangChange}
              className={errors.text ? "border-red-500" : ""}
              rows={4}
            />
            {errors.text && <span className="text-red-500 text-sm">{errors.text}</span>}
          </div>

          {step === 0 && (
            <>
              <div>
                <Label>Year *</Label>
                <Input
                  value={formData.year}
                  onChange={e => setFormData({ ...formData, year: e.target.value })}
                  className={errors.year ? "border-red-500" : ""}
                />
                {errors.year && <span className="text-red-500 text-sm">{errors.year}</span>}
              </div>

              <div>
                <Label>Image</Label>
                <Input type="file" multiple onChange={handleImageChange} />
                {errors.media && <span className="text-red-500 text-sm">{errors.media}</span>}
              </div>
            </>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>
              Prev
            </Button>

            {step < languages.length - 1 ? (
              <Button onClick={() => setStep(step + 1)}>Next</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
