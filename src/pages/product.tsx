import useProducts from "@hooks/useProducts";
import { Container } from "react-bootstrap";
import { Products } from "@components/ecommerce";
import { Loading } from "@components/feadback";
import { GridList, Heading } from "@components/common";

const Product = () => {
  const { loading, error, productsFullInfo, paramsPrefix } = useProducts();
  return (
    <Container>
      <Heading title={`${paramsPrefix} Products`} />
      <Loading status={loading} error={error} type="product">
        <GridList
          emptyMessage="There are no Products"
          records={productsFullInfo}
          retrunItems={(record) => <Products {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Product;
