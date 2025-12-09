import type { RootState } from "@/store/RootStore";
import type { ProductsTypes, CategoriesTypes } from "@/types/RootTypes";
import { Loader2, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { setProducts, setProductsError, setProductsLoading } from "@/toolkit/productsSlicer";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EditProduct from "@/modules/EditProdict";

export const Products = () => {
  const dispatch = useDispatch();

  const { data: products, meta, error, loading } = useSelector(
    (state: RootState) => state.products
  );
  const { data: categories } = useSelector(
    (state: RootState) => state.categories
  );

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);  
  
  const openEdit = (product: any) => {
    setSelectedProduct(product);
    setEditSheetOpen(true);
    setOpenMenuId(null);
  };


  const refreshProducts = async () => {
    try {
      dispatch(setProductsLoading());
      const response = (await Fetch.get("products")).data;
      dispatch(setProducts(response));
    } catch (err: any) {
      dispatch(setProductsError("Mahsulotlarni yuklashda xatolik"));
      console.error(err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await Fetch.delete(`products/${id}`);
      toast.success("Mahsulot o‘chirildi");
      refreshProducts();
    } catch (err) {
      toast.error("O‘chirishda xatolik");
      console.log(err);
    }
  };

  const getTitle = (p: ProductsTypes) =>
    p.translations.find((t) => t.language === "en")?.title ||
    p.translations[0]?.title ||
    "No title";

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(
      (c: CategoriesTypes & { id: string }) => c.id === categoryId
    );
    return category
      ? category.translations.find((t) => t.language === "en")?.title ||
        category.translations[0]?.title
      : "Kategoriya topilmadi";
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  if (error)
    return (
      <div className="min-h-[calc(100vh-70px)] p-4 bg-white rounded-md shadow-lg">
        <h1 className="text-center text-destructive">
          Mahsulotlarni olishda xatolik yuz berdi
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
      {Array.isArray(products) && products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative flex items-start gap-4 p-4 border rounded-md hover:shadow transition"
              >
                {product.image_urls?.length > 0 ? (
                  <Carousel className="w-24 h-24">
                    <CarouselContent>
                      {product.image_urls.map((url, index) => (
                        <CarouselItem key={index}>
                          <img
                            src={`http://161.97.182.110:4000${url}`}
                            alt={getTitle(product)}
                            className="w-24 h-24 rounded-md object-cover"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                      {
                      product.image_urls.length > 1 && (
                        <>
                          <CarouselPrevious variant={"secondary"} className="-left-3 bg-[#003939] text-white hover:bg-[#003939]/90 hover:cursor-pointer" />
                          <CarouselNext variant={"secondary"} className="-right-3 bg-[#003939] text-white hover:bg-[#003939]/90 hover:cursor-pointer" />
                        </>
                      )}

                    </Carousel>
                ) : (
                  <div className="w-24 h-24 rounded-md bg-slate-100 flex items-center justify-center text-slate-600">
                    {getTitle(product).slice(0, 2).toUpperCase()}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{getTitle(product)}</h3>

                    <div className="relative">
                  <button
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={() =>
                      setOpenMenuId(openMenuId === product.id ? null : product.id)
                    }
                  >
                    <MoreVertical size={20} />
                  </button>

                  {openMenuId === product.id && (
                    <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md p-2 border z-20">

                      <button
                        onClick={() => openEdit(product)}
                        className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 w-full px-2 py-1 rounded-md"
                      >
                        <Pencil size={16} /> Tahrirlash
                      </button>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="flex items-center gap-2 text-red-600 hover:bg-red-50 w-full px-2 py-1 rounded-md"
                      >
                        <Trash2 size={16} /> O‘chirish
                      </button>
                    </div>
                  )}
                </div>
                  </div>

                  <p className="mt-1 text-sm text-slate-700 font-semibold">
                    Narx: {product.price} so‘m
                  </p>
                  <p className="text-xs text-slate-500">Sklad: {product.stock} dona</p>
                  <p className="text-xs text-slate-500">
                    Kategoriya: {getCategoryName(product.category_id)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {meta && (
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 p-4">
              <div className="text-sm text-gray-700">
                <span className="font-semibold">Sahifa:</span> {meta.page} /{" "}
                {meta.totalPages}
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-semibold">Jami mahsulotlar:</span>{" "}
                {meta.total}
              </div>
            </div>
          )}

          {selectedProduct && (
            <EditProduct
              open={editSheetOpen}
              onOpenChange={setEditSheetOpen}
              product={selectedProduct}
              refreshProducts={refreshProducts}
            />
          )}
        </>
      ) : (
        <div className="p-8 text-center text-slate-600">
          Hech qanday mahsulot topilmadi
        </div>
      )}
    </div>
  );
};
