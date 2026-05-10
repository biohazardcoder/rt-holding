import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import type { StoryTypes, ErrorTypes } from "@/types/RootTypes";
import { useDispatch } from "react-redux";
import {
  setStory,
  setStoryError,
  setStoryLoading,
} from "@/toolkit/storySlicer";

interface EditStoryProps {
  story: StoryTypes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const languages = ["en", "uz", "ru", "kr"] as const;
type Lang = (typeof languages)[number];

export function EditStory({ story, open, onOpenChange }: EditStoryProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const [step, setStep] = useState(0);
  const currentLang = languages[step];

  const [formData, setFormData] = useState<{
    title: Record<Lang, string>;
    text: Record<Lang, string>;
    year: string;
  }>({
    title: story.title,
    text: story.text,
    year: story.year,
  });

  useEffect(() => {
    setFormData({
      title: story.title,
      text: story.text,
      year: story.year,
    });
    setImages(null);
    setStep(0);
  }, [story]);

  const GetStories = async () => {
    try {
      dispatch(setStoryLoading());
      const response = (await Fetch.get("story")).data;
      dispatch(setStory(response));
    } catch (error) {
      const err = error as ErrorTypes;
      dispatch(
        setStoryError(err.response?.data?.message || "Error getting achievements")
      );
    }
  };

  const handleLangChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: {
        ...prev[name as "title" | "text"],
        [currentLang]: value,
      },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const body = new FormData();
      body.append("title", JSON.stringify(formData.title));
      body.append("text", JSON.stringify(formData.text));
      body.append("year", formData.year);

      if (images) {
        Array.from(images).forEach(img => body.append("images", img));
      }

      await Fetch.put(`/story/${story._id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Achievement updated successfully");
      GetStories();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to update achievement");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-[#202020] text-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <Button
          variant="ghost"
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3"
        >
          ✕
        </Button>

        <h2 className="text-2xl mb-1">Edit Achievement</h2>
        <p className="text-sm text-gray-400 mb-2">
          Language: <b className="uppercase">{currentLang}</b>
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <Label>Title ({currentLang})</Label>
            <Input
              name="title"
              value={formData.title[currentLang]}
              onChange={handleLangChange}
              className="bg-white text-black"
            />
          </div>

          <div>
            <Label>Text ({currentLang})</Label>
            <Textarea
              name="text"
              value={formData.text[currentLang]}
              onChange={handleLangChange}
              className="bg-white text-black"
              rows={4}
            />
          </div>

          {step === 0 && (
            <>
              <div>
                <Label>Year</Label>
                <Input
                  value={formData.year}
                  onChange={e =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="bg-white text-black"
                />
              </div>

              <div>
                <Label>Image (optional)</Label>
                <Input
                  type="file"
                  multiple
                  className="file:cursor-pointer file:px-2 file:rounded file:border-0 file:bg-white file:text-black"
                  onChange={handleImageChange}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between gap-2 mt-6">
          <Button
            variant="secondary"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            Prev
          </Button>

          {step < languages.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          ) : (
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
