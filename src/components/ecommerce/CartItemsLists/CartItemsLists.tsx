import { TProducts } from "@types";
import CartItems from "../CartItems/CartItems";
import "./styles.modules.css";

type CartItemsListProps = {
  product: TProducts[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemsHandler: (id: number) => void;
};

const CartItemsLists = ({
  product,
  changeQuantityHandler,
  removeItemsHandler,
}: CartItemsListProps) => {
  const renderList = product.map((el) => (
    <CartItems
      key={el.id}
      {...el}
      changeQuantityHandler={changeQuantityHandler}
      removeItemsHandler={removeItemsHandler}
    />
  ));
  return <div className="cart_items">{renderList}</div>;
};

export default CartItemsLists;
