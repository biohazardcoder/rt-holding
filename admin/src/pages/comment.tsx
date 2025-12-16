import { EllipsisVertical, Loader2, Pen, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { CommentTypes, ErrorTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/RootStore";
import { setComment, setCommentError, setCommentLoading } from "@/toolkit/commentSlicer";
import { EditComment } from "@/modules/EditComment";

export const Comment = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state: RootState) => state.comment);

    const GetComments = async () => {
        try {
            dispatch(setCommentLoading());
            const response = (await Fetch.get("comment")).data;
            dispatch(setComment(response));
        } catch (error) {
            const err = error as ErrorTypes;
            dispatch(setCommentError(err.response.data.message || "Error in get all comments"));
        }
    };

    useEffect(() => {
        GetComments();
    }, []);

    const comments = (data as CommentTypes[]) || [];
    const [editMenuOpen, setEditMenuOpen] = useState<boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<CommentTypes | null>(null);
                
    if (error) return (
        <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
            <h1 className="text-center text-destructive">Error loading comment data</h1>
        </div>
    );

    if (loading) return (
        <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-center h-[calc(100vh-150px)]">
                <Loader2 className="animate-spin text-blue-500" size={30} />
            </div>
        </div>
    );

    const handleDelete = async (id: string) => {
        try {
            await Fetch.delete(`/comment/${id}`);
            toast.success("Comment deleted successfully!");
            GetComments();
        } catch (error) {
            toast.error("Error deleting comment.");
            console.error(error);
        }
    };

    const handleEditMenu = (comment: CommentTypes) => {
        setSelectedMenu(comment);
        setEditMenuOpen(true);
    };

    return (
        <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {comments.map(({ _id, image, name, text, job }) => (
                    <div
                        key={_id}
                        className="bg-gray-50 border border-gray-200 rounded-lg shadow p-4 flex items-center gap-4 relative"
                    >
                        {
                            <img
                                src={image}
                                alt={name}
                                className="w-24 h-24 object-cover object-center rounded-full"
                            />
                        }

                        <div>
                            <h2 className="font-semibold text-lg mt-3">{name}</h2>
                            <p className="text-sm text-gray-600 mt-1">{job}</p>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-3">{text}</p>
                        </div>

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
                                                    name,
                                                    text,
                                                    job,
                                                } as CommentTypes)
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
                <EditComment
                    comment={selectedMenu!}
                    open={editMenuOpen}
                    onOpenChange={setEditMenuOpen}
                />
            )}
        </div>
    );
};
