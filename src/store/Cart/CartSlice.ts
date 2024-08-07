import { createSlice } from "@reduxjs/toolkit";
import { TProducts, TLoading, isString } from "@types";
import GetCartTotalQuantitySelector from "./Selector/Selector";
import ActGetProductByItems from "./act/ActGetProductByItems";

interface ICartState {
  items: { [key: string]: number };
  productFullInfo: TProducts[];
  loading: TLoading;
  error: null | string;
}
const initialState: ICartState = {
  items: {},
  productFullInfo: [],
  loading: "idle",
  error: null,
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;

      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    CartItemsChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    removeItemsHandlers: (state, action) => {
      delete state.items[action.payload];
      state.productFullInfo = state.productFullInfo.filter(
        (items) => items.id !== action.payload
      );
    },
    CleanUpCartItems: (state) => {
      state.productFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ActGetProductByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(ActGetProductByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productFullInfo = action.payload;
    });
    builder.addCase(ActGetProductByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { GetCartTotalQuantitySelector };

export const {
  addToCart,
  CartItemsChangeQuantity,
  removeItemsHandlers,
  CleanUpCartItems,
} = CartSlice.actions;
export default CartSlice.reducer;
