import { createSlice } from "@reduxjs/toolkit";
import ActGetCategories from "./act/ActGetCategories";
import { TCategories, TLoading, isString } from "@types";
export interface ICategoriesState {
  records: TCategories[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  loading: "idle",
  records: [], // Add your initial state here. For example, an array of categories.
  error: null,
};

const categoriesSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanUpCategregoriesRecords: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ActGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(ActGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(ActGetCategories.rejected, (state, action) => {
      state.loading = "failed";

      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export { ActGetCategories };
export const { cleanUpCategregoriesRecords } = categoriesSlice.actions;
export default categoriesSlice.reducer;
