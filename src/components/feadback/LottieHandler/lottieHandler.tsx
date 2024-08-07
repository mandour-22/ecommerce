import Lottie from "lottie-react";
import notFound from "@assets/LottieFiles/notFound.json";
import loading from "@assets/LottieFiles/cart_loading.json";
import empty from "@assets/LottieFiles/empty_cart.json";
import error from "@assets/LottieFiles/error.json";

const lottieFileMap = {
  notFound: notFound,
  loading: loading,
  empty: empty,
  error1: error,
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
        style={{ width: "400px", marginInline: "auto" }}
      />
      {message && <h3 className="text-center">{message}</h3>}
    </>
  );
};

export default lottieHandler;
