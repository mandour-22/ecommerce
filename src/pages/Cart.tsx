import useCart from "@hooks/useCart";
import { Heading } from "@components/common";
import { CartItemsLists, CartSubtotal } from "@components/ecommerce";
import { Loading, LottieHandler } from "@components/feadback";
import "../styles/global.css";

const Cart = () => {
  const { error, loading, product, changeQuantityHandler, removeItemsHandler } =
    useCart();
  return (
    <>
      <Heading title="Cart" />
      <Loading status={loading} error={error} type="cart">
        {product.length ? (
          <div className="items">
            <CartItemsLists
              product={product}
              changeQuantityHandler={changeQuantityHandler}
              removeItemsHandler={removeItemsHandler}
            />
            <CartSubtotal products={product} />
          </div>
        ) : (
          <LottieHandler type="empty" message="Your Cart Is Empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
