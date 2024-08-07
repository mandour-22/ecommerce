import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TProducts } from "@types";
import { AxiosError } from "@util";
import axios from "axios";

type TResponse = TProducts;

const ActGetProductByItems = createAsyncThunk(
  "cart/actgetproductbyitems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { Cart } = getState() as RootState;
    // Simulate fetching data from an API
    const itemsID = Object.keys(Cart.items);
    if (!itemsID.length) {
      return fulfillWithValue([]);
    }
    try {
      const conncatenateCartItems = itemsID.map((el) => `id=${el}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${conncatenateCartItems}`,
        { signal }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(AxiosError(error));
    }
  }
);

export default ActGetProductByItems;
