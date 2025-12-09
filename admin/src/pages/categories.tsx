import type { RootState } from "@/store/RootStore";
import type { CategoriesTypes } from "@/types/RootTypes";
import { Loader2, MoreVertical, Pencil, Trash2, X,  Package } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Fetch } from "@/middlewares/Fetch";
import { setCategories, setCategoriesLoading, setCategoriesError } from "@/toolkit/categoriesSlicer";
import { useState } from "react";
import { toast } from "sonner";
import { EditCategory } from "@/modules/EditCategory";

export const Categories = () => {
  const dispatch = useDispatch();
  const { data: categories, error, loading } = useSelector((state: RootState) => state.categories);
  const { data: products } = useSelector((state: RootState) => state.products);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [modalCategoryId, setModalCategoryId] = useState<string | null>(null);

  const [editCategory, setEditCategory] = useState<any | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const refreshCategories = async () => {
    try {
      dispatch(setCategoriesLoading());
      const response = (await Fetch.get("categories")).data;
      dispatch(setCategories(response));
    } catch (error) {
      dispatch(setCategoriesError("Kategoriyalarni yuklashda xatolik"));
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await Fetch.delete(`categories/${id}`);
      toast.success("Kategoriya o‘chirildi");
      refreshCategories();
    } catch (err) {
      toast.error("O‘chirishda xatolik");
      console.log(err);
    }
  };

  const getTitle = (c: CategoriesTypes) =>
    c.translations.find((t) => t.language === "en")?.title ||
    c.translations[0]?.title ||
    "No title";

  const filteredProducts = (categoryId: string) =>
    products.filter((p) => p.category_id === categoryId);

  if (error)
    return (
      <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
        <h1 className="text-center text-destructive">
          Kategoriyalar olishda xatolik yuz berdi
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

      {editCategory && (
        <EditCategory
          open={editOpen}
          onOpenChange={setEditOpen}
          category={editCategory}
        />
      )}

      {Array.isArray(categories) && categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category: CategoriesTypes) => (
            <div
              key={category.id}
              className="relative flex flex-col gap-2 p-4 border rounded-md hover:shadow transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{getTitle(category)}</h3>

                <div className="relative">
                  <button
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === category.id ? null : category.id);
                    }}
                  >
                    <MoreVertical size={20} />
                  </button>

                  {openMenuId === category.id && (
                    <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md p-2 border z-20">

                      <button
                        onClick={() => {
                          setModalCategoryId(category.id);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 text-green-600 hover:bg-green-50 w-full px-2 py-1 rounded-md"
                      >
                        <Package size={16} /> Mahsulotlar
                      </button>

                      <button
                        onClick={() => {
                          setEditCategory(category);
                          setEditOpen(true);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 w-full px-2 py-1 rounded-md"
                      >
                        <Pencil size={16} /> Tahrirlash
                      </button>

                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="flex items-center gap-2 text-red-600 hover:bg-red-50 w-full px-2 py-1 rounded-md"
                      >
                        <Trash2 size={16} /> O'chirish
                      </button>

                    </div>
                  )}
                </div>
              </div>

              <p className="mt-1 text-sm text-slate-600">
                {category.translations[0]?.description ?? "Tavsif mavjud emas"}
              </p>

              <div className="mt-3 text-xs text-slate-500">
                Yaratilgan:{" "}
                {new Date(category.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-slate-600">
          Hech qanday kategoriya topilmadi
        </div>
      )}

      {modalCategoryId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-lg rounded-md p-4 relative">
            <button
              className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded"
              onClick={() => setModalCategoryId(null)}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Mahsulotlarni ko‘rish – {getTitle(categories.find(c => c.id === modalCategoryId)!)}
            </h2>

            <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
              {filteredProducts(modalCategoryId).length > 0 ? (
                filteredProducts(modalCategoryId).map((p) => (
                  <div key={p.id} className="p-2 border rounded hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      {p.image_urls?.[0] && (
                        <img
                          src={`http://161.97.182.110:4000${p.image_urls[0]}`}
                          alt={p.translations[0]?.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{p.translations[0]?.title}</p>
                        <p className="text-sm text-gray-500">
                          Narx: {p.price} | Sklad: {p.stock}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Bu kategoriya uchun mahsulot mavjud emas</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
