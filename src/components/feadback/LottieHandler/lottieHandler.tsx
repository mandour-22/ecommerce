import Lottie from "lottie-react";
import notFound from "@assets/LottieFiles/notFound.json";
import loading from "@assets/LottieFiles/cart_loading.json";
import empty from "@assets/LottieFiles/empty_cart.json";
import error from "@assets/LottieFiles/error.json";
import success from "@assets/LottieFiles/success.json";
import cartEmtyLogin from "@assets/LottieFiles/cartEmptyLogin.json";

const lottieFileMap = {
  notFound: notFound,
  loading: loading,
  empty: empty,
  error1: error,
  success: success,
  cartEmptyLogin: cartEmtyLogin,
};

type TLottie = {
  type: keyof typeof lottieFileMap;
  message?: string;
};

const lottieHandler = ({ type, message }: TLottie) => {
  const lottie = lottieFileMap[type];
  return (
    <>
      <Lottie
        animationData={lottie}
        loop={true}
        style={{ width: "300px", marginInline: "auto" }}
      />
      {message && <h3 className="text-center">{message}</h3>}
    </>
  );
};

export default lottieHandler;
