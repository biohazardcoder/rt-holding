import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import type { CommentTypes, ErrorTypes } from "@/types/RootTypes";
import { useDispatch } from "react-redux";
import { setComment, setCommentError, setCommentLoading } from "@/toolkit/commentSlicer";


interface EditCommentProps {
  comment: CommentTypes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditComment({ comment, open, onOpenChange }: EditCommentProps) {
   const dispatch = useDispatch()
    const GetComments = async () => {
        try {
          dispatch(setCommentLoading())
            const response = (await Fetch.get("comment")).data
            dispatch(setComment(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setCommentError(err.response.data.message|| "Error in get all comments"))
            console.log(error);
        }
    }

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const [formData, setFormData] = useState<CommentTypes>({
    name: comment.name,
    text: comment.text,
    job: comment.job,
    _id: comment._id,
  });
  useEffect(() => {
    setImages(null);
  }, [comment]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append("name", formData.name);
      body.append("text", formData.text);
      body.append("job", formData.job);
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }

    await Fetch.put(`comment/${comment._id}`, body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    onOpenChange(false);
    toast.success("Comment updated successfully");
    GetComments();
  } catch (error) {
    console.error(error);
    const err = error as { response: { data: { message: string } } };
    toast.error(err.response.data.message || "Failed to update comment");
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

        <h2 className="text-2xl mb-4">Edit comment</h2>

        <div className="flex flex-col gap-4">
          <div>
            <Label>Name</Label>
            <Input
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            <Label>Job</Label>
            <Input
              name="job"
              type="text"
              value={formData.job}
              onChange={(e) => setFormData({ ...formData, job: e.target.value })}
              className="bg-white text-black"
            />
          </div>
          <div>
            <Label>Image</Label>
            <Input
              name="image"
              type="file"
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
