import { useState, useEffect, memo } from "react";
import ProductInfo from "../ProductInfo/ProductInfo";
import { useAppDispatch } from "@store/Hooks";
import Like from "@assets/svg/like.svg?react";
import { ActWishList } from "@store/wishlist/wishlistSlice";
import LikeFullFill from "@assets/svg/like_fill.svg?react";
import { TProducts } from "@types";
import { addToCart } from "@store/Cart/CartSlice";
import { Link } from "react-router-dom";
import { Button, Spinner, Modal } from "react-bootstrap";
import "./styles.modules.css";

const Products = memo(
  ({
    id,
    title,
    price,
    img,
    quantity,
    max,
    isLiked,
    isAuthenticated,
  }: TProducts) => {
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const addToCartHandler = () => {
      dispatch(addToCart(id));
      setIsDisabled(true);
    };

    useEffect(() => {
      if (!isDisabled) {
        return;
      }

      const disable = setTimeout(() => setIsDisabled(false), 300);

      return () => clearTimeout(disable);
    }, [isDisabled]);

    const currentReminingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = currentReminingQuantity <= 0 ? true : false;

    const likeToggleHandler = () => {
      if (isAuthenticated) {
        if (loading) return;
        setLoading(true);
        dispatch(ActWishList(id))
          .unwrap()
          .then(() => setLoading(false))
          .catch(() => setLoading(false));
      } else {
        setShow(true);
      }
    };

    return (
      <>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to first to add this item to your wishlist.
          </Modal.Body>
          <Modal.Footer>
            <Link to={"/login"}>Login</Link>
          </Modal.Footer>
        </Modal>

        <ProductInfo title={title} img={img} price={price}>
          <div className="productLike" onClick={likeToggleHandler}>
            {loading ? (
              <Spinner size="sm" animation="border" variant="danger" />
            ) : isLiked ? (
              <LikeFullFill />
            ) : (
              <Like />
            )}
          </div>

          <p>
            {quantityReachedToMax
              ? "You Reach to the Limit"
              : `You Can Add ${currentReminingQuantity} Items`}
          </p>
          <Button
            className="btns w-100"
            variant="primary"
            style={{ color: "white", fontWeight: "bold" }}
            onClick={addToCartHandler}
            disabled={isDisabled || quantityReachedToMax}>
            {isDisabled ? (
              <>
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  style={{ marginInline: "5px" }}
                />
                <span>Looding...</span>
              </>
            ) : (
              "Add To Cart"
            )}
          </Button>
        </ProductInfo>
      </>
    );
  }
);

export default Products;
