import useCart from "@hooks/useCart";
import { Heading } from "@components/common";
import { CartItemsLists, CartSubtotal } from "@components/ecommerce";
import { Loading, LottieHandler } from "@components/feadback";
import "../styles/global.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    error,
    loading,
    product,
    changeQuantityHandler,
    removeItemsHandler,
    useAccessToken,
    placeOrderStatus,
  } = useCart();
  return (
    <>
      <Heading title="Cart" />
      <Loading status={loading} error={error} type="cart">
        {!useAccessToken ? (
          <>
            <div className="text-center">
              <LottieHandler type="cartEmptyLogin" />

              <h1>Your cart is empty</h1>
              <p>You can login to fill your market cart</p>
              <Link to={"/login"}>
                <Button variant="primary" className="fw-semibold">
                  Login
                </Button>
              </Link>
            </div>
          </>
        ) : product.length ? (
          <div className="items">
            <CartItemsLists
              product={product}
              changeQuantityHandler={changeQuantityHandler}
              removeItemsHandler={removeItemsHandler}
            />
            <CartSubtotal products={product} useAccessToken={useAccessToken} />
          </div>
        ) : placeOrderStatus === "succeeded" ? (
          <>
            <LottieHandler type="success" message="Your Cart Is Empty" />
            <Link to="/" className=" d-block text-center text-capitalize">
              home back
            </Link>
          </>
        ) : (
          <LottieHandler type="empty" message="Your Cart Is Empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
