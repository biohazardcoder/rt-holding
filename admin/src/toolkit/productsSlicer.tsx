import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductsTypes } from "@/types/RootTypes";

interface ProductsState {
  data: ProductsTypes[];
  meta: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  data: [],
  meta: null,
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProductsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setProducts: (state, action: PayloadAction<{ data: ProductsTypes[]; meta: ProductsState["meta"] }>) => {
      state.data = action.payload.data;
      state.meta = action.payload.meta;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setProductsLoading, setProductsError, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
