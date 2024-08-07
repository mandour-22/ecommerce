import CategorySkeleton from "../skeleton/CategorySkeleton/CategorySkeleton";
import CartSkeleton from "../skeleton/CartSkeleton/CartSkeleton";
import ProductSkeleton from "../skeleton/ProductsSkeleton/ProductSkeleton";
import { TLoading } from "@types";
import LottieHandler from "../LottieHandler/lottieHandler";

const skeletonTypes = {
  category: CategorySkeleton,
  product: ProductSkeleton,
  cart: CartSkeleton,
};

interface LoadingProps {
  status: TLoading;
  error: null | string;
  children: React.ReactNode;
  type?: keyof typeof skeletonTypes;
}

const Loading = ({
  status,
  error,
  children,
  type = "category",
}: LoadingProps) => {
  const Component = skeletonTypes[type];
  if (status === "pending") {
    return <Component />;
  }
  if (status === "failed") {
    return <p>{<LottieHandler type="error1" message={error as string} />}</p>;
  }

  return <div>{children}</div>;
};

export default Loading;
