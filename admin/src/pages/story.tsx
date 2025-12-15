import {  EllipsisVertical, Loader2, Pen, Trash2} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { StoryTypes, ErrorTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/RootStore";
import { setStory, setStoryError, setStoryLoading } from "@/toolkit/storySlicer";
import { EditStory } from "@/modules/EditStory";

export const Story = () => {
   const dispatch = useDispatch()
    const {data, loading,error } = useSelector((state:RootState)=>state.story)
    const GetStories = async () => {
        try {
            dispatch(setStoryLoading())
            const response = (await Fetch.get("story")).data
            dispatch(setStory(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setStoryError(err.response.data.message|| "Error in get all stories"))
            console.log(error);
        }
    }

  const stories = (data as StoryTypes[]) || [];
  const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<StoryTypes | null>(null);
        console.log(stories);
        
   if (error) return <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
            <h1 className="text-center text-destructive">Error loading blog data</h1>
        </div>;

        if (loading) return <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-center h-[calc(100vh-150px)]">
                <Loader2 className="animate-spin text-blue-500" size={30}/>
            </div>
        </div>;

  const handleDelete = async (id: string) => {
    try {
      await Fetch.delete(`/story/${id}`);
      toast.success("Story deleted successfully!");
      GetStories();
    } catch (error) {
      toast.error("Error deleting story.");
      console.error(error);
    }
  };

  const handleEditMenu = (story: StoryTypes) => {
    setSelectedMenu(story);
    setEditMenuOpen(true);
  };

  return (
         <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {stories.map(({ _id, image,  title, text, year }) => (
          <div
            key={_id}
            className="bg-gray-50 border border-gray-200 rounded-lg shadow p-4 flex flex-col relative"
          >
            {
                <img
                  src={image}
                  alt={title}
                  className="w-full h-40 object-cover object-center rounded-md mt-6"
                />
            }

            <h2 className="font-semibold text-lg mt-3">{title}</h2>
            <p className="text-sm text-gray-600 mt-1 line-clamp-3">{text}</p>
            <p className="mt-1 font-semibold ">Year: {year}</p>

            <div className="absolute top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical
                    size={24}
                    className="text-black cursor-pointer"
                  />
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
                          year,
                        } as StoryTypes)
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
        <EditStory
          story={selectedMenu!}
          open={editMenuOpen}
          onOpenChange={setEditMenuOpen}
        />
      )}
    </div>
  );
};
