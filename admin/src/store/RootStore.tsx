import { configureStore } from "@reduxjs/toolkit";
import UserSlicer from "../toolkit/UserSlicer";
import CategoriesSlacer from "../toolkit/categoriesSlicer";
import ProductsSlacer from "../toolkit/productsSlicer";
import AdminsSlacer from "../toolkit/adminsSlicer";

export const store = configureStore({
  reducer: {
    user: UserSlicer,
    categories:CategoriesSlacer,
    products:ProductsSlacer,
    admins:AdminsSlacer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
