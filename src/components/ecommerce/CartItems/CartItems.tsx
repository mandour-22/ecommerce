import { Button, Form } from "react-bootstrap";
import "./styles.modules.css";
import { TProducts } from "@types";
import { ChangeEvent, memo } from "react";

type TCartItemsProps = TProducts & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemsHandler: (id: number) => void;
};

const CartItem = memo(
  ({
    id,
    title,
    img,
    price,
    max,
    quantity,
    changeQuantityHandler,
    removeItemsHandler,
  }: TCartItemsProps) => {
    console.log("render");
    // render option list
    const renderOptions = Array(max)
      .fill(0)
      .map((_, idx) => {
        const quantity = ++idx;
        return (
          <option value={quantity} key={quantity}>
            {quantity}
          </option>
        );
      });

    const changeQuantity = (event: ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandler(id, quantity);
    };

    return (
      <div className="cartItem">
        <div className="product">
          <div className="productImg">
            <img src={img} alt={title} />
          </div>
          <div className="productInfo">
            <h2>{title}</h2>
            <h3>{price.toFixed(2)} EGP</h3>
            <Button
              variant="secondary"
              style={{ color: "white", width: "100px" }}
              className="mt-auto"
              onClick={() => removeItemsHandler(id)}>
              Remove
            </Button>
          </div>
        </div>

        <div className="cartItemSelection">
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
