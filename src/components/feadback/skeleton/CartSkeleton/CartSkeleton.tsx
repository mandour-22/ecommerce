import ContentLoader from "react-content-loader";
import { Row, Col } from "react-bootstrap";

const CartSkeleton = () => {
  return (
    <Row>
      <Col>
        <ContentLoader
          speed={1}
          width={500}
          height={300}
          viewBox="0 0 500 300"
          backgroundColor="#e3e3e3"
          foregroundColor="#ecebeb">
          <rect x="10" y="204" rx="3" ry="3" width="180" height="10" />
          <rect x="12" y="243" rx="3" ry="3" width="150" height="30" />
          <rect x="8" y="8" rx="4" ry="4" width="180" height="180" />
          <rect x="10" y="222" rx="3" ry="3" width="140" height="8" />
        </ContentLoader>
      </Col>
    </Row>
  );
};

export default CartSkeleton;
