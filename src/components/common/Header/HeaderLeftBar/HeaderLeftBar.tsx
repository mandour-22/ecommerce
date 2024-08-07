import HeaderCounter from "../HeaderCounter/HeaderCounter";
import { useAppSelector } from "@store/Hooks";
import { GetCartTotalQuantitySelector } from "@store/Cart/CartSlice";
import CartIcon from "@assets/svg/card.svg?react";
import WishListIcon from "@assets/svg/wishList.svg?react";
const HeaderLeftBar = () => {
  const CartTotalQuantity = useAppSelector(GetCartTotalQuantitySelector);
  const WishListTotalQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );
  return (
    <>
      <HeaderCounter
        SVGLogo={<WishListIcon title="WishList" />}
        totalQuantity={WishListTotalQuantity}
        to={"/wishlist"}
      />
      <HeaderCounter
        SVGLogo={<CartIcon title="cart" />}
        totalQuantity={CartTotalQuantity}
        to={"/cart"}
      />
    </>
  );
};

export default HeaderLeftBar;
