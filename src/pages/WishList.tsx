import { Loading } from "@components/feadback";
import { Products } from "@components/ecommerce";
import { TProducts } from "@types";
import { GridList, Heading } from "@components/common";
import useWishlist from "@hooks/useWishlist";

const WishLists = () => {
  const { error, loading, records } = useWishlist();
  return (
    <>
      <Heading title="Your Wishlist" />
      <Loading status={loading} error={error}>
        <GridList<TProducts>
          emptyMessage="There are no categories"
          records={records}
          retrunItems={(record) => <Products {...record} />}
        />
      </Loading>
    </>
  );
};

export default WishLists;
