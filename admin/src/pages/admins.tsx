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

  const {data: currentAdmin} = useSelector((state: RootState) => state.user);
  const {id} = currentAdmin as AdminTypes || {};
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const refreshAdmins = async () => {
    try {
      dispatch(setAdminsLoading());
      const response = (await Fetch.get("users")).data;
      const admins = response.filter((user: { role: string }) => user.role === "BIGBOSS");
      dispatch(setAdmins(admins));
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
      <div className="p-6 text-center text-destructive">
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
          {admins.map((admin: AdminTypes) => (
            <div
              key={admin.id}
              className="p-4 border rounded-md relative hover:shadow transition"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">{admin.first_name} {admin.last_name}</h3>

                <div className="relative">
                  {admin.id !== id && (
                    <>
                      <button
                        className="p-1 rounded hover:bg-gray-200"
                        onClick={() =>
                          setOpenMenuId(openMenuId === admin?.id ? null : admin?.id)
                        }
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openMenuId === admin.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md p-2 border z-20">
                          <button
                            onClick={() => deleteAdmin(admin?.id)}
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
                Telefon raqami: {admin.phone_number}
              </p>
              <p className="text-sm text-slate-600">
                Yaratilgan: {admin.created_at?.slice(0, 10) || "N/A"}
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

