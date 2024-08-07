import ContentLoader from "react-content-loader";
import { Col, Row } from "react-bootstrap";

const CategorySkeleton = (props) => {
  const render = Array(4)
    .fill(0)
    .map((_, index) => (
      <Col key={index} sm={3} md={3} className="">
        <ContentLoader
          speed={1}
          width={400}
          height={300}
          viewBox="0 0 400 300"
          backgroundColor="#e3e3e3"
          foregroundColor="#ecebeb"
          {...props}>
          <rect x="17" y="5" rx="20" ry="20" width="200" height="200" />
          <rect x="43" y="218" rx="4" ry="4" width="150" height="6" />
        </ContentLoader>
      </Col>
    ));
  return <Row className="w-100">{render}</Row>;
};

export default CategorySkeleton;
