import { createSlice } from "@reduxjs/toolkit";
import ActWishList from "./act/actListToggle";
import ActGetWishList from "./act/ActGetWishList";
import { TProducts, TLoading, isString } from "@types";
import { authLogout } from "@store/auth/authSlice";

// interface wishlist
interface WishlistState {
  itemsId: number[];
  error: null | string;
  loading: TLoading;
  productFullInfo: TProducts[];
}

const initialState: WishlistState = {
  itemsId: [],
  error: null,
  productFullInfo: [],
  loading: "idle",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanUpWishlistProductFullInfo: (state) => {
      state.productFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ActWishList.pending, (state) => {
      state.error = null;
    });
    builder.addCase(ActWishList.fulfilled, (state, action) => {
      if (action.payload) {
        if (action.payload.type === "add") {
          state.itemsId.push(action.payload.id);
        } else {
          state.itemsId = state.itemsId.filter(
            (el) => el !== action.payload?.id
          );
          state.productFullInfo = state.productFullInfo.filter(
            (el) => el.id !== action.payload?.id
          );
        }
      }
    });
    builder.addCase(ActWishList.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // get wishlist items

    builder.addCase(ActGetWishList.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(ActGetWishList.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.dataType === "productFullInfo") {
        state.productFullInfo = action.payload.data as TProducts[];
      } else if (action.payload.dataType === "productsIds") {
        state.itemsId = action.payload.data as number[];
      } else {
        state.productFullInfo = [];
        state.itemsId = [];
      }
    });
    builder.addCase(ActGetWishList.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // When you log out of the account

    builder.addCase(authLogout, (state) => {
      state.itemsId = [];
      state.productFullInfo = [];
    });
  },
});

export { ActWishList, ActGetWishList };
export const { cleanUpWishlistProductFullInfo } = wishlistSlice.actions;
export default wishlistSlice.reducer;
