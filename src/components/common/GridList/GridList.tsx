import { Row, Col } from "react-bootstrap";
import { LottieHandler } from "@components/feadback";

type TGridList<T> = {
  records: T[];
  retrunItems: (record: T) => React.ReactNode;
  emptyMessage: string;
};

type hasId = { id?: number };

const GridList = <T extends hasId>({
  records,
  retrunItems,
  emptyMessage,
}: TGridList<T>) => {
  const categoriesList =
    records.length > 0 ? (
      records.map((record) => (
        <Col
          key={record.id}
          sm={12}
          md={3}
          className="d-flex justify-centent-center mb-5 mt-2">
          {retrunItems(record)}
        </Col>
      ))
    ) : (
      <LottieHandler type="empty" message={emptyMessage} />
    );

  return <Row>{categoriesList}</Row>;
};

export default GridList;
