import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosError from "@util/axiosError";

type TFormData = {
  email: string;
  password: string;
};

type TResponse = {
  user: {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
  };
  accessToken: string;
};

const actAuthLogin = createAsyncThunk(
  "login/actAuthLogin",
  async (formData: TFormData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const response = await axios.post<TResponse>("/login", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(AxiosError(error));
    }
  }
);

export default actAuthLogin;
