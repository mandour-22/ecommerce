import { useEffect } from "react";

import {
  ActGetWishList,
  cleanUpWishlistProductFullInfo,
} from "@store/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@store/Hooks";

const useWishlist = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(ActGetWishList("productFullInfo"));
    return () => {
      dispatch(cleanUpWishlistProductFullInfo());
      promise.abort();
    };
  }, [dispatch]);

  const { loading, productFullInfo, error } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.Cart.items);

  const records = productFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: true,
    isAuthenticated: true,
  }));
  return { loading, error, records };
};

export default useWishlist;
