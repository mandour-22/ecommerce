import { useAppDispatch } from "@store/Hooks";
import { clearCartPleaceOrder } from "@store/Cart/CartSlice";
import actPlaceOrder from "@store/order/act/actPlaceOrder";
import { TProducts } from "@customTypes/product";
import "./styles.modules.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";

type TCartSubTotal = { products: TProducts[]; useAccessToken: string | null };

const CartSubtotal = ({ products, useAccessToken }: TCartSubTotal) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subTotal = products.reduce((acc, product) => {
    const price = product.price;
    const quantity = product.quantity;

    if (quantity && typeof quantity === "number") {
      return acc + price * quantity;
    } else {
      return acc;
    }
  }, 0);

  const handlerOrderDispatch = () => {
    setloading(true);
    dispatch(actPlaceOrder(subTotal))
      .unwrap()
      .then(() => {
        dispatch(clearCartPleaceOrder());
        setShow(false);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setloading(false));
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Price{" "}
            <span className="border-bottom border-primary border-2">Order</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "15px" }}>
          Are You Sure You Want To Place Order With Subtotal:{" "}
          {!loading && error && <p className="text-danger">{error}</p>}
          <span
            className="fw-semibold bg-primary"
            style={{
              color: "white",
              borderRadius: "5%",
              paddingInline: "3px",
            }}>
            {subTotal.toFixed(2)} EGP
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="fw-semibold"
            onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            className="fw-semibold"
            onClick={handlerOrderDispatch}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="parent_subTotal">
        <div
          className="sub-total"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <span
            className="p-2 text-primary fw-bold text-capitalize"
            style={{ fontSize: "25px" }}>
            Subtotal
          </span>
          <span className="border rounded-1 p-2 border-primary-subtle fw-bold text-body-secondary">
            {subTotal.toFixed(2)} EGB
          </span>
        </div>
        {useAccessToken && (
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <span
              className="p-2 text-primary fw-bold text-capitalize"
              style={{ fontSize: "25px" }}></span>
            <span
              className="border rounded-1 p-2  fw-bold text-body-secondary"
              onClick={() => setShow(true)}>
              <Button className="fw-semibold">Place Order</Button>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSubtotal;
