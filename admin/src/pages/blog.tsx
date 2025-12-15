import {  EllipsisVertical, Loader2, Pen, Trash2} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { BlogTypes, ErrorTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import {  useState } from "react";
import { EditBlog } from "@/modules/EditBlog";
import { useDispatch, useSelector } from "react-redux";
import { setBlog, setBlogError, setBlogLoading } from "@/toolkit/blogSlicer";
import type { RootState } from "@/store/RootStore";

export const Blog = () => {
   const dispatch = useDispatch()
    const {data, loading,error } = useSelector((state:RootState)=>state.blog)
    const GetBlogs = async () => {
        try {
            dispatch(setBlogLoading())
            const response = (await Fetch.get("blog")).data
            dispatch(setBlog(response))
        } catch (error) {
            const err = error as ErrorTypes
            dispatch(setBlogError(err.response.data.message|| "Error in get all blogs"))
            console.log(error);
        }
    }

  const blogs = (data as BlogTypes[]) || [];
  const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<BlogTypes | null>(null);
        console.log(blogs);
        
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
      await Fetch.delete(`/blog/${id}`);
      toast.success("Blog deleted successfully!");
      GetBlogs();
    } catch (error) {
      toast.error("Error deleting blog.");
      console.error(error);
    }
  };

  const handleEditMenu = (blog: BlogTypes) => {
    setSelectedMenu(blog);
    setEditMenuOpen(true);
  };

  return (
         <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {blogs.map(({ _id, image,  title, text }) => (
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
                        } as BlogTypes)
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
        <EditBlog
          blog={selectedMenu!}
          open={editMenuOpen}
          onOpenChange={setEditMenuOpen}
        />
      )}
    </div>
  );
};
