import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import type { ServiceTypes, ErrorTypes } from "@/types/RootTypes";
import { useDispatch } from "react-redux";
import { setService, setServiceError, setServiceLoading } from "@/toolkit/serviceSlicer";


interface EditServiceProps {
  service: ServiceTypes;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditService({ service, open, onOpenChange }: EditServiceProps) {
   const dispatch = useDispatch()
    const GetServices = async () => {
        try {
          dispatch(setServiceLoading())
            const response = (await Fetch.get("service")).data
            dispatch(setService(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setServiceError(err.response.data.message|| "Error in get all services"))
            console.log(error);
        }
    }

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<FileList | null>(null);
  const [formData, setFormData] = useState<ServiceTypes>({
    title: service.title,
    text: service.text,
  });
  useEffect(() => {
    setImages(null);
  }, [service]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const body = new FormData();
      body.append("title", formData.title);
      body.append("text", formData.text);
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }

      await Fetch.put(`service/${service._id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onOpenChange(false);
      toast.success("Service updated successfully");
      GetServices()
}   catch (error) {
      console.error(error);
      const err = error as { response: { data: { message: string } } };
      toast.error(err.response.data.message || "Failed to update service");
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

        <h2 className="text-2xl mb-4">Edit service</h2>

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
