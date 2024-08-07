import { useCallback, useEffect } from "react";
import ActGetProductByItems from "@store/Cart/act/ActGetProductByItems";
import {
  CartItemsChangeQuantity,
  removeItemsHandlers,
  CleanUpCartItems,
} from "@store/Cart/CartSlice";
import { useAppDispatch, useAppSelector } from "@store/Hooks";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productFullInfo, loading, error } = useAppSelector(
    (state) => state.Cart
  );

  useEffect(() => {
    const promise = dispatch(ActGetProductByItems());
    return () => {
      dispatch(CleanUpCartItems());
      promise.abort();
    };
  }, [dispatch]);

  const product = productFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(CartItemsChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  // remove item from cart

  const removeItemsHandler = useCallback(
    (id: number) => {
      dispatch(removeItemsHandlers(id));
    },
    [dispatch]
  );

  return { loading, error, product, changeQuantityHandler, removeItemsHandler };
};

export default useCart;
