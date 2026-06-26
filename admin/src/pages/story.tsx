import { EllipsisVertical, Loader2, Pen, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { StoryTypes, ErrorTypes, BlogTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/RootStore";
import { setStory, setStoryError, setStoryLoading } from "@/toolkit/storySlicer";
import { EditStory } from "@/modules/EditStory";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Story = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.story
  );

  const stories = (data as StoryTypes[]) || [];
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<StoryTypes | null>(null);
  const [selectedLang, setSelectedLang] =
    useState<keyof BlogTypes["title"]>("en");

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

  useEffect(() => {
    GetStories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await Fetch.delete(`/story/${id}`);
      toast.success("Achievement deleted successfully!");
      GetStories();
    } catch (error) {
      toast.error("Error deleting achievement.");
    }
  };

  const handleEditMenu = (story: StoryTypes) => {
    setSelectedMenu(story);
    setEditMenuOpen(true);
  };

  if (error)
    return (
      <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
        <h1 className="text-center text-destructive">
          Error loading achievement data
        </h1>
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
      {/* LANGUAGE SELECT */}
      <div className="mb-4 flex items-center gap-2">
        <span className="font-semibold">Select Language:</span>
        <Select
          value={selectedLang}
          onValueChange={(value) =>
            setSelectedLang(value as keyof BlogTypes["title"])
          }
        >
          <SelectTrigger className="max-w-52">
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

      {/* STORY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stories.map(({ _id, image, title, text, year }) => (
          <div
            key={_id}
            className="bg-gray-50 border border-gray-200 rounded-lg shadow p-4 flex flex-col relative"
          >
            {image && (
              <img
                src={image}
                alt={title[selectedLang]}
                className="w-full h-40 object-cover rounded-md mt-6"
              />
            )}

            <h2 className="font-semibold text-lg mt-3">
              {title[selectedLang] || "No title"}
            </h2>
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">
              {text[selectedLang] || "No text"}
            </p>
            {/* <p className="mt-1 font-semibold">Year: {year}</p> */}

            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical
                    size={24}
                    className="text-black cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none">
                  <DropdownMenuItem>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 w-full"
                      onClick={() =>
                        handleEditMenu({
                          _id,
                          image,
                          title,
                          text,
                          year,
                        } as StoryTypes)
                      }
                    >
                      <Pen className="text-white" />
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => handleDelete(_id!)}
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
        <EditStory
          story={selectedMenu}
          open={editMenuOpen}
          onOpenChange={setEditMenuOpen}
        />
      )}
    </div>
  );
};
