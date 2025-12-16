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
import type { CommentTypes, ErrorTypes } from "@/types/RootTypes";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { setComment, setCommentError, setCommentLoading } from "@/toolkit/commentSlicer";

export function AddComment() {
  const [images, setImages] = useState<FileList | null>(null);
  const [formData, setFormData] = useState<Partial<CommentTypes>>({
    name: "",
    text: "",
    job: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const dispatch = useDispatch();

  const GetComments = async () => {
    try {
      dispatch(setCommentLoading());
      const response = (await Fetch.get("comment")).data;
      dispatch(setComment(response));
      console.log(response);
    } catch (error) {
      const err = error as ErrorTypes;
      dispatch(setCommentError(err.response.data.message || "Error in get all comments"));
      console.log(error);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.text) newErrors.text = "Text is required.";
    if (!formData.job) newErrors.job = "Job is required.";
    if (!images || images.length === 0) {
      newErrors.image = "You must select an image.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const body = new FormData();
      body.append("name", formData.name || "");
      body.append("text", formData.text || "");
      body.append("job", formData.job || "");

      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }

      await Fetch.post("/comment", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      GetComments();
      toast.success("Comment added successfully!");
      setIsSheetOpen(false);
      setFormData({ name: "", text: "", job: "" });
      setImages(null);
    } catch (error) {
      toast.error("Error adding comment.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button className="bg-[#003939] hover:bg-[#005555] cursor-pointer">
          Add Comment
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">New Comment</SheetTitle>
          <SheetDescription>
            Fill in comment info and choose an image
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="job">Job *</Label>
            <Input
              id="job"
              name="job"
              type="text"
              value={formData.job}
              onChange={handleInputChange}
              className={errors.job ? "border-red-500" : ""}
            />
            {errors.job && (
              <span className="text-red-500 text-sm">{errors.job}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="text">Text *</Label>
            <Textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              className={`w-full ${errors.text ? "border-red-500" : ""}`}
              rows={4}
            />
            {errors.text && (
              <span className="text-red-500 text-sm">{errors.text}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="image">Choose Image</Label>
            <Input id="image" type="file" className="file:cursor-pointer file:px-2 file:rounded file:border-0 file:bg-white file:text-sm file:text-black hover:file:bg-gray-200" onChange={handleImageChange} />
            {images && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.from(images).map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image}</span>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
