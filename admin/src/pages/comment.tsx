import { EllipsisVertical, Loader2, Pen, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { CommentTypes, ErrorTypes, BlogTypes } from "@/types/RootTypes";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/RootStore";
import {
    setComment,
    setCommentError,
    setCommentLoading,
} from "@/toolkit/commentSlicer";
import { EditComment } from "@/modules/EditComment";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const Comment = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(
        (state: RootState) => state.comment
    );

    const comments = (data as CommentTypes[]) || [];
    const [editMenuOpen, setEditMenuOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<CommentTypes | null>(null);
    const [selectedLang, setSelectedLang] =
        useState<keyof BlogTypes["title"]>("en");

    const GetComments = async () => {
        try {
            dispatch(setCommentLoading());
            const response = (await Fetch.get("comment")).data;
            dispatch(setComment(response));
        } catch (error) {
            const err = error as ErrorTypes;
            dispatch(
                setCommentError(
                    err.response?.data?.message || "Error getting comments"
                )
            );
        }
    };

    useEffect(() => {
        GetComments();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await Fetch.delete(`/comment/${id}`);
            toast.success("Comment deleted successfully!");
            GetComments();
        } catch (error) {
            toast.error("Error deleting comment.");
        }
    };

    const handleEditMenu = (comment: CommentTypes) => {
        setSelectedMenu(comment);
        setEditMenuOpen(true);
    };

    if (error)
        return (
            <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
                <h1 className="text-center text-destructive">
                    Error loading comment data
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

            {/* COMMENTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {comments.map(({ _id, image, name, text, job }) => (
                    <div
                        key={_id}
                        className="bg-gray-50 border border-gray-200 rounded-lg shadow p-4 flex gap-4 relative"
                    >
                        {image && (
                            <img
                                src={image}
                                alt={name[selectedLang]}
                                className="w-20 h-20 object-cover rounded-full"
                            />
                        )}

                        <div>
                            <h2 className="font-semibold text-lg">
                                {name[selectedLang] || "No name"}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {job?.[selectedLang] || ""}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-3">
                                {text?.[selectedLang] || ""}
                            </p>
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
                                    <DropdownMenuItem>
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
                <EditComment
                    comment={selectedMenu}
                    open={editMenuOpen}
                    onOpenChange={setEditMenuOpen}
                />
            )}
        </div>
    );
};
