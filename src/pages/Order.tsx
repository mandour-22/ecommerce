import { Heading } from "@components/common";
import { Loading } from "@components/feadback";
import useOrder from "@hooks/useOrder";
import { ProductInfo } from "@components/ecommerce";
import { Table, Modal } from "react-bootstrap";

const Orders = () => {
  const {
    selectedOrder,
    loading,
    error,
    detailsHandler,
    handleClose,
    show,
    orderList,
  } = useOrder();
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Product{" "}
            <span className="border-2 border-bottom border-primary">
              Details
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder.map((el) => (
            <ProductInfo
              title={el.title}
              key={el.id}
              img={el.img}
              price={el.price}
              direction="row"
              style={{ borderBottom: "1px solid #00000033" }}
              quantity={el.quantity}
            />
          ))}
        </Modal.Body>
      </Modal>

      <Heading title="My Orders" />
      <Loading status={loading} error={error} type="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td className="text-capitalize">
                  {el.items.length} item(s) /{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => detailsHandler(el.id)}>
                    Product Details
                  </span>
                </td>
                <td>
                  <span className="text-bg-primary px-2 pt-1 pb-1 rounded-1 fw-medium">
                    {el.subTotal.toFixed(2)} EGP
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
