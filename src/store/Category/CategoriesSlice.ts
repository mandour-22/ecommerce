import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  records: [], // Add your initial state here. For example, an array of categories.
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
