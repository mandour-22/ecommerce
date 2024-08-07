import { Suspense } from "react";
import LottieHandler from "../LottieHandler/lottieHandler";

const PageSuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={<LottieHandler type="loading" message="Loading Please Wait" />}>
      {children}
    </Suspense>
  );
};

export default PageSuspenseFallback;
