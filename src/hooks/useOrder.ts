import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { actGetOrder, placeOrdersStatus } from "@store/order/orderSlice";
import { TProducts } from "@types";

type TResponse = TProducts[];

const useOrder = () => {
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<TResponse>([]);
  // console.log(selectedOrder);
  const { loading, error, orderList } = useAppSelector((state) => state.orders);

  // get details of order
  const detailsHandler = (orderId: number) => {
    const productDetails = orderList.find((el) => el.id === orderId);
    const nextItems = productDetails?.items ?? [];

    setShow(true);
    setSelectedOrder((prev) => [...prev, ...nextItems]);
  };

  const handleClose = () => {
    setShow(!show);
    setSelectedOrder([]);
  };

  useEffect(() => {
    const promis = dispatch(actGetOrder());
    return () => {
      promis.abort();
      dispatch(placeOrdersStatus());
    };
  }, [dispatch]);
  return {
    selectedOrder,
    loading,
    error,
    detailsHandler,
    handleClose,
    show,
    orderList,
  };
};

export default useOrder;
