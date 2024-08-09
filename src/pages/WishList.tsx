import { Loading } from "@components/feadback";
import { Products } from "@components/ecommerce";
import { LottieHandler } from "@components/feadback";
import { TProducts } from "@types";
import { GridList, Heading } from "@components/common";
import useWishlist from "@hooks/useWishlist";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const WishLists = () => {
  const { error, loading, records, accessTokens } = useWishlist();
  return (
    <>
      <Heading title="Your Wishlist" />
      <Loading status={loading} error={error}>
        {accessTokens ? (
          <GridList<TProducts>
            emptyMessage="There are no categories"
            records={records}
            retrunItems={(record) => <Products {...record} />}
          />
        ) : (
          <>
            <LottieHandler
              type="cartEmptyLogin"
              message="You can add your favorite products here"
            />
            <div className="text-center">
              <p>You must register your account first</p>
              <Link to="/login">
                <Button className="fw-semibold" variant="primary">
                  Login
                </Button>
              </Link>
            </div>
          </>
        )}
      </Loading>
    </>
  );
};

export default WishLists;

// To add things you like, you must log in or create an account on our eCom
