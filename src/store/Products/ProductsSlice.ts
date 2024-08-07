import { createSlice } from "@reduxjs/toolkit";
import ActGetProducts from "./act/ActGetProducts";
import { TProducts, TLoading, isString } from "@types";
export interface IProductsState {
  records: TProducts[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProductsState = {
  loading: "idle",
  records: [], // Add your initial state here. For example, an array of categories.
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanUpProductsRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ActGetProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(ActGetProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(ActGetProducts.rejected, (state, action) => {
      state.loading = "failed";

      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export { ActGetProducts };
export const { cleanUpProductsRecords } = productsSlice.actions;
export default productsSlice.reducer;
