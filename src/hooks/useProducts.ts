import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { useEffect } from "react";
import {
  ActGetProducts,
  cleanUpProductsRecords,
} from "@store/Products/ProductsSlice";
const useProducts = () => {
  const dispatch = useAppDispatch();
  const param = useParams();
  const { error, loading, records } = useAppSelector((state) => state.Products);
  const cartItems = useAppSelector((state) => state.Cart.items);
  const wishListItemsId = useAppSelector((state) => state.wishlist.itemsId);
  const paramsPrefix = param.prefix;
  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishListItemsId.includes(el.id),
  }));

  useEffect(() => {
    const promise = dispatch(ActGetProducts(param.prefix as string));
    return () => {
      dispatch(cleanUpProductsRecords());
      promise.abort();
    };
  }, [dispatch, param]);

  return { error, loading, productsFullInfo, paramsPrefix };
};

export default useProducts;
