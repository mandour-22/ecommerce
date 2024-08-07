import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProducts } from "@types";
import axios from "axios";
import { AxiosError } from "@util";

type TResponse = TProducts[];

const ActGetProducts = createAsyncThunk(
  "products/getProducts",
  async (prefix: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`
      );

      return response.data;
    } catch (error) {
      rejectWithValue(AxiosError(error));
    }
  }
);

export default ActGetProducts;
