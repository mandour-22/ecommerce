import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LottieHandler } from "@components/feadback";

const ErrorPage = () => {
  return (
    <Container className="notFound">
      <LottieHandler type="notFound" />
      <Link to={"/"} replace={true}>
        How about going to safety?
      </Link>
    </Container>
  );
};

export default ErrorPage;
