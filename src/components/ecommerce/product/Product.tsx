import "./styles.modules.css";
import { Button } from "react-bootstrap";
import Imgs from "../../../../mandour-3-modified.png";

const Products = () => {
  return (
    <div className="product w-100">
      <div className="productImg">
        <img src={Imgs} alt="" />
      </div>
      <h2>Title</h2>
      <h3>10 EGP</h3>
      <Button variant="primary" style={{ color: "white", fontWeight: "bold" }}>
        Add To Cart
      </Button>
    </div>
  );
};

export default Products;
