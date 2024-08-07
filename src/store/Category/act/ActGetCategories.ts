import { createAsyncThunk } from "@reduxjs/toolkit";
import { TCategories } from "@types";
import axios from "axios";
import { AxiosError } from "@util";

type TResponse = TCategories[];

const ActGetCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkApi) => {
    const { rejectWithValue, signal } = thunkApi;

    try {
      const response = await axios.get<TResponse>("/categories", { signal });

      const data = response.data;

      return data;
    } catch (error) {
      rejectWithValue(AxiosError(error));
    }
  }
);

export default ActGetCategories;
