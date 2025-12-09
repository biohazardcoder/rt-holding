import type {  CategoriesTypes } from "@/types/RootTypes";
import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface CategoriesState {
  data: CategoriesTypes[] | [];
  loading: boolean;
  error: string;
}

const initialState: CategoriesState = {
  data: [],
  loading: false,
  error: "",
};

const CategoriesSlacer = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    setCategories(state, { payload }: PayloadAction<CategoriesTypes[]>) {
      state.data = payload;
      state.loading = false;
      state.error = "";
    },
    setCategoriesLoading(state) {
      state.loading = true;
    },
    setCategoriesError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { setCategories,setCategoriesLoading, setCategoriesError } = CategoriesSlacer.actions;
export default CategoriesSlacer.reducer;