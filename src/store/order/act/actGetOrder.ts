import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosError from "@util/axiosError";
import { RootState } from "@store/index";
import { TOrders } from "@types";

type TResponse = TOrders[];

const actGetOrder = createAsyncThunk(
  "orders/actGetOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const res = await axios.get<TResponse>(
        `/orders?userId=${auth.user?.id}`,
        { signal }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(AxiosError(error));
    }
  }
);

export default actGetOrder;
