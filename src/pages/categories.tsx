import { GridList, Heading } from "@components/common";
import { Container } from "react-bootstrap";
import { Category } from "@components/ecommerce";
import { Loading } from "@components/feadback";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const { error, loading, records } = useCategories();
  return (
    <Container>
      <Heading title="Category" />
      <Loading status={loading} error={error} type="category">
        <GridList
          emptyMessage="There are to Categories"
          records={records}
          retrunItems={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
