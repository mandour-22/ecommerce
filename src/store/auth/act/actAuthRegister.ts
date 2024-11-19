import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosError from "@util/axiosError";

type TFromData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (formData: TFromData, thunk) => {
    const { rejectWithValue } = thunk;

    try {
      const response = await axios.post("/register", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosError(error));
    }
  }
);

export default actAuthRegister;
