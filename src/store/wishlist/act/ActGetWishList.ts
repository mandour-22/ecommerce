import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProducts } from "@customTypes/product";
import { RootState } from "@store/index";
import { AxiosError } from "@util";

type TDataState = "productFullInfo" | "productsIds";
type TResponse = TProducts[];

const ActGetWishList = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataState, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, signal, getState } = thunkAPI;

    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`
      );

      if (!userWishlist.data.length) return { data: [], dataType: "empty" };

      if (dataType === "productsIds") {
        const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
        return { data: concatenatedItemsId, dataType: "productsIds" };
      } else {
        const concatenatedItemsId = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join("&");

        const response = await axios.get<TResponse>(
          `/products?${concatenatedItemsId}`,
          { signal }
        );
        return { data: response.data, dataType: "productFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(AxiosError(error));
    }
  }
);

export default ActGetWishList;
