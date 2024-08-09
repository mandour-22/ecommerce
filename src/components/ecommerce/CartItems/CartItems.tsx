import { Button, Form } from "react-bootstrap";
import "./styles.modules.css";
import { TProducts } from "@types";
import { ChangeEvent, memo } from "react";
import ProductInfo from "../ProductInfo/ProductInfo";

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
        <ProductInfo title={title} img={img} price={price}>
          <Button
            variant="primary"
            style={{ width: "100px" }}
            className="mt-auto text-light fw-semibold"
            onClick={() => removeItemsHandler(id)}>
            Remove
          </Button>
        </ProductInfo>
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
