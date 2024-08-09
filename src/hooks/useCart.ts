import { useCallback, useEffect } from "react";
import ActGetProductByItems from "@store/Cart/act/ActGetProductByItems";
import {
  CartItemsChangeQuantity,
  removeItemsHandlers,
  CleanUpCartItems,
} from "@store/Cart/CartSlice";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { placeOrdersStatus } from "@store/order/orderSlice";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productFullInfo, loading, error } = useAppSelector(
    (state) => state.Cart
  );
  const useAccessToken = useAppSelector((state) => state.auth.accessToken);
  const placeOrderStatus = useAppSelector((state) => state.orders.loading);

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

  useEffect(() => {
    const promise = dispatch(ActGetProductByItems());
    return () => {
      promise.abort();
      dispatch(CleanUpCartItems());
      dispatch(placeOrdersStatus());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    product,
    changeQuantityHandler,
    removeItemsHandler,
    useAccessToken,
    placeOrderStatus,
  };
};

export default useCart;
