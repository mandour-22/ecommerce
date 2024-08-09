import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosError from "@util/axiosError";
import { RootState } from "@store/index";

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (subTotal: number, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;

    const { Cart, auth } = getState() as RootState;

    const orderItems = Cart.productFullInfo.map((e) => ({
      title: e.title,
      price: e.price,
      img: e.img,
      id: e.id,
      quantity: Cart.items[e.id],
    }));

    try {
      const res = await axios.post("/orders", {
        userId: auth.user?.id,
        items: orderItems,
        subTotal,
      });
      console.log(res.data);
    } catch (error) {
      return rejectWithValue(AxiosError(error));
    }
  }
);

export default actPlaceOrder;
