import { RootState } from "../../index";
import { createSelector } from "reselect";

const GetCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.Cart.items,
  (items) => {
    const totalQuantity = Object.values(items).reduce(
      (accumulator, current) => {
        return accumulator + current;
      },
      0
    );
    return totalQuantity;
  }
);

export default GetCartTotalQuantitySelector;
