import { useEffect, useState } from "react";
import "./styles.modules.css";

import { useNavigate } from "react-router-dom";

type THeaderCounterProps = {
  totalQuantity: number;
  SVGLogo: React.ReactNode;
  to: string; // the path to navigate to when the basket is clicked
};

const HeaderBasket = ({ totalQuantity, SVGLogo, to }: THeaderCounterProps) => {
  const [isAnimate, setIsAnimate] = useState(false);

  const quantityStyle = `basketQuantity ${isAnimate ? "pumpCartQuantity" : ""}`;

  useEffect(() => {
    if (!totalQuantity) {
      return;
    }

    setIsAnimate(true);

    const time = setTimeout(() => setIsAnimate(false), 300);

    return () => clearTimeout(time); // clear the timeout when the component unmounts
  }, [totalQuantity]);

  // router

  const navigate = useNavigate();

  return (
    <div className="basketContainer" onClick={() => navigate(to)}>
      {SVGLogo}
      {totalQuantity > 0 && (
        <div className={quantityStyle}>{totalQuantity}</div>
      )}
    </div>
  );
};

export default HeaderBasket;
