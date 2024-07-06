import LOGO from "@assets/svg/card.svg?react";
import "./styles.modules.css";

const HeaderBasket = () => {
  return (
    <div className="basketContainer">
      <LOGO width={"33px"} height={"33px"} />
      <div className="basketQuantity">0</div>
    </div>
  );
};

export default HeaderBasket;
