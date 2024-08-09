import { TProducts } from "./product.types";

export type TOrders = {
  id: number;
  userId: number;
  items: TProducts[];
  subTotal: number;
};
