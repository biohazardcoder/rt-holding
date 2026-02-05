import { EllipsisVertical, Loader2, Pen, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { ServiceTypes, ErrorTypes, BlogTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setService, setServiceError, setServiceLoading } from "@/toolkit/serviceSlicer";
import type { RootState } from "@/store/RootStore";
import { EditService } from "@/modules/EditService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Service = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.service);
  const services = (data as ServiceTypes[]) || [];

  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<ServiceTypes | null>(null);
  const [selectedLang, setSelectedLang] = useState<keyof BlogTypes["title"]>("en");

  const GetService = async () => {
    try {
      dispatch(setServiceLoading());
      const response = (await Fetch.get("service")).data;
      dispatch(setService(response));
    } catch (err) {
      const error = err as ErrorTypes;
      dispatch(setServiceError(error.response?.data?.message || "Error fetching services"));
      console.error(error);
    }
  };

  useEffect(() => {
    GetService();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await Fetch.delete(`/service/${id}`);
      toast.success("Service deleted successfully!");
      GetService();
    } catch (error) {
      toast.error("Error deleting service.");
      console.error(error);
    }
  };

  const handleEditMenu = (service: ServiceTypes) => {
    setSelectedMenu(service);
    setEditMenuOpen(true);
  };

  if (error)
    return (
      <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
        <h1 className="text-center text-destructive">Error loading service data</h1>
      </div>
    );

  if (loading)
    return (
      <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
        <div className="flex items-center justify-center h-[calc(100vh-150px)]">
          <Loader2 className="animate-spin text-blue-500" size={30} />
        </div>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <span className="font-semibold">Select Language:</span>
        <Select
          value={selectedLang}
          onValueChange={(value) => setSelectedLang(value as keyof BlogTypes["title"])}
        >
          <SelectTrigger className="max-w-50">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="uz">Uzbek</SelectItem>
            <SelectItem value="ru">Russian</SelectItem>
            <SelectItem value="kr">Korean</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map(({ _id, image, title, text }) => (
          <div
            key={_id}
            className="bg-gray-50 border border-gray-200 rounded-lg shadow p-4 flex flex-col relative"
          >
            {image && (
              <img
                src={image}
                alt={title[selectedLang] || ""}
                className="w-full h-40 object-cover object-center rounded-md mt-6"
              />
            )}

            <h2 className="font-semibold text-lg mt-3">
              {title[selectedLang] || "No title"}
            </h2>
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">
              {text[selectedLang] || "No text"}
            </p>

            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical size={24} className="text-black cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none">
                  <DropdownMenuItem className="flex items-center gap-2 text-blue-600 cursor-pointer">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 w-full"
                      onClick={() =>
                        handleEditMenu({
                          _id,
                          image,
                          title,
                          text,
                        } as ServiceTypes)
                      }
                    >
                      <Pen className="text-white" />
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 text-red-600 cursor-pointer">
                    <Button
                      onClick={() => handleDelete(_id || "")}
                      variant={"destructive"}
                      className="w-full"
                    >
                      <Trash2 className="text-white" />
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {editMenuOpen && selectedMenu && (
        <EditService
          service={selectedMenu}
          open={editMenuOpen}
          onOpenChange={setEditMenuOpen}
        />
      )}
    </div>
  );
};
