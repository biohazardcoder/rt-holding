import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import type { StoryTypes, ErrorTypes} from "@/types/RootTypes";
import { useDispatch } from "react-redux";
import { setStory, setStoryError, setStoryLoading } from "@/toolkit/storySlicer";


interface EditStoryProps {
  story: StoryTypes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditStory({ story, open, onOpenChange }: EditStoryProps) {
   const dispatch = useDispatch()
    const GetStories = async () => {
        try {
          dispatch(setStoryLoading())
          const response = await Fetch.get("story");
          dispatch(setStory(response.data))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setStoryError(err.response.data.message|| "Error in get all stories"))
            console.log(error);
        }
    }

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const [formData, setFormData] = useState<StoryTypes>({
    title: story.title,
    text: story.text,
    year: story.year,
  });
  useEffect(() => {
    setImages(null);
  }, [story]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append("title", formData.title);
      body.append("text", formData.text);
      body.append("year", formData.year);
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }

      await Fetch.put(`story/${story._id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onOpenChange(false);
      toast.success("Story updated successfully");
      GetStories()
}   catch (error) {
      console.error(error);
      const err = error as { response: { data: { message: string } } };
      toast.error(err.response.data.message || "Failed to update story");
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
          className="absolute top-3 right-3 "
        >
          ✕
        </Button>

        <h2 className="text-2xl mb-4">Edit story</h2>

        <div className="flex flex-col gap-4">
          <div>
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-white text-black"
            />
          </div>
          <div>
            <Label>Text</Label>
            <Input
              name="text"
              type="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              className="bg-white text-black"
            />
          </div>
          <div>
            <Label>Year</Label>
            <Input
              name="year"
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="bg-white text-black"
            />
          </div>
          <div>
            <Label>Image</Label>
            <Input
              name="images"
              type="file"
              multiple
              className="file:cursor-pointer file:px-2 file:rounded file:border-0 file:bg-white file:text-sm file:text-black hover:file:bg-gray-200"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="destructive" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
