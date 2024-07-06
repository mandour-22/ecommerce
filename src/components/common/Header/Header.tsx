import { HeaderBasket } from "../../ecommerce";
import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./styles.modules.css";

const Header = () => {
  return (
    <header>
      <div className="headerContainer">
        <h1 className="headerLogo">
          <span>our </span>
          <Badge>Ecom</Badge>
        </h1>
        <HeaderBasket />
      </div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/categories"}>
              Category
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/about-us"}>
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to={"/login"}>
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/register"}>
              Register
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
