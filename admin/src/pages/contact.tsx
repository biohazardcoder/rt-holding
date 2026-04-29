import { useSelector, useDispatch } from "react-redux";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import { useEffect, useState } from "react";


import type { RootState } from "@/store/RootStore";

import { Loader2, MoreVertical, Trash2 } from "lucide-react";
import type { ContactTypes } from "@/types/RootTypes";
import { setContact, setContactError, setContactLoading } from "@/toolkit/contactsSlicer";

export const Contacts = () => {
  const dispatch = useDispatch();

  const { data: contacts, loading, error } = useSelector(
    (state: RootState) => state.contact
  );

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const refreshContacts = async () => {
    try {
      dispatch(setContactLoading());
      const response = (await Fetch.get("contact")).data;
      dispatch(setContact(response));
    } catch (err) {
      dispatch(setContactError("Kontaktlarni yuklashda xatolik"));
      console.error(err);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await Fetch.delete(`contacts/${id}`);
      toast.success("Kontakt o'chirildi");
      refreshContacts();
    } catch (err) {
      toast.error("O'chirishda xatolik");
      console.log(err);
    }
  };

  useEffect(() => {
    refreshContacts();
  }, []);

  if (error)
    return (
      <div className="p-6 text-center  text-destructive bg-white rounded-md shadow-lg min-h-[calc(100vh-70px)]">
        Kontaktlarni olishda xatolik yuz berdi
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
      {contacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map(({ email, name, phone, service, _id }: ContactTypes) => (
            <div
              key={_id}
              className="p-4 border rounded-md relative hover:shadow transition"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">{name}</h3>

                <div className="relative">
                  {openMenuId === _id && (
                    <>
                      <button
                        className="p-1 rounded hover:bg-gray-200"
                        onClick={() =>
                          setOpenMenuId(openMenuId === _id ? null : _id)
                        }
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openMenuId === _id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md p-2 border z-20">
                          <button
                            onClick={() => deleteContact(_id)}
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
                Phone: {phone}
              </p>
              <p className="text-sm text-slate-600">
                Service: {service}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-600 py-8">
          Hozircha kontaktlar mavjud emas
        </div>
      )}
    </div>
  );
};
