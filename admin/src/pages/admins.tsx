import { useSelector, useDispatch } from "react-redux";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import {
  setAdmins,
  setAdminsError,
  setAdminsLoading,
} from "@/toolkit/adminsSlicer";

import type { RootState } from "@/store/RootStore";

import { Loader2, MoreVertical, Trash2 } from "lucide-react";
import type { AdminTypes } from "@/types/RootTypes";

export const Admins = () => {
  const dispatch = useDispatch();

  const { data: admins, loading, error } = useSelector(
    (state: RootState) => state.admins
  );
  console.log(admins);
  
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const refreshAdmins = async () => {
    try {
      dispatch(setAdminsLoading());
      const response = (await Fetch.get("admin")).data;
      dispatch(setAdmins(response));
    } catch (err) {
      dispatch(setAdminsError("Adminlarni yuklashda xatolik"));
      console.error(err);
    }
  };

  const deleteAdmin = async (id: string) => {
    try {
      await Fetch.delete(`admins/${id}`);
      toast.success("Admin o‘chirildi");
      refreshAdmins();
    } catch (err) {
      toast.error("O‘chirishda xatolik");
      console.log(err);
    }
  };

  useEffect(() => {
    refreshAdmins();
  }, []);

  if (error)
    return (
      <div className="p-6 text-center  text-destructive bg-white rounded-md shadow-lg min-h-[calc(100vh-70px)]">
        Adminlarni olishda xatolik yuz berdi
      </div>
    );

  if (loading)
    return (
      <div className="flex items-center bg-white justify-center  rounded-md shadow-lg h-[calc(100vh-70px)]">
        <Loader2 className="animate-spin text-blue-500" size={30} />
      </div>
    );

  return (
    <div className="p-4 bg-white rounded-md shadow-lg min-h-[calc(100vh-70px)]">
      {admins.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {admins.map(({email,firstName,createdAt,id}: AdminTypes) => (
            <div
              key={id}
              className="p-4 border rounded-md relative hover:shadow transition"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">{firstName} </h3>

                <div className="relative">
                  {id !== id && (
                    <>
                      <button
                        className="p-1 rounded hover:bg-gray-200"
                        onClick={() =>
                          setOpenMenuId(openMenuId === id ? null : id)
                        }
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openMenuId === id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md p-2 border z-20">
                          <button
                            onClick={() => deleteAdmin(id)}
                            className="flex items-center gap-2 text-red-600 hover:bg-red-50 w-full px-2 py-1 rounded-md"
                          >
                            <Trash2 size={16} /> O'chirish
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-2">
                Email: {email}
              </p>
              <p className="text-sm text-slate-600">
                Created At: {createdAt?.slice(0, 10) || "N/A"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-600 py-8">
          Hozircha adminlar mavjud emas
        </div>
      )}
    </div>
  );
};

