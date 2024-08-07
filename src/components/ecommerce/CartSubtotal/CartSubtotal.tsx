import { TProducts } from "@customTypes/product";
import "./styles.modules.css";

type TCartSubTotal = { products: TProducts[] };

const CartSubtotal = ({ products }: TCartSubTotal) => {
  const subTotal = products.reduce((acc, product) => {
    const price = product.price;
    const quantity = product.quantity;

    if (quantity && typeof quantity === "number") {
      return acc + price * quantity;
    } else {
      return acc;
    }
  }, 0);

  return (
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
  );
};

export default CartSubtotal;
