import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { authLogout } from "@store/auth/authSlice";
import { Container, Navbar, Nav, Badge, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./styles.modules.css";
import HeaderLeftBar from "./HeaderLeftBar/HeaderLeftBar";
import { useEffect } from "react";
import { ActGetWishList } from "@store/wishlist/wishlistSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) dispatch(ActGetWishList("productsIds"));
  }, [dispatch, accessToken]);

  return (
    <header>
      <div className="headerContainer">
        <h1 className="headerLogo">
          <span>our </span>
          <Badge>eCom</Badge>
        </h1>
        <div className="d-flex align-items-center gap-4">
          <HeaderLeftBar />
        </div>
      </div>
      <Navbar bg="dark" data-bs-theme="dark" style={{ borderRadius: "5px" }}>
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
            {!accessToken ? (
              <>
                <Nav.Link as={NavLink} to={"/login"}>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to={"/register"}>
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={`Welcome: ${user?.firstName} ${user?.lastName}`}
                  menuVariant="dark">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  <NavDropdown.Item>Order</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="fw-semibold"
                    as={NavLink}
                    to="/"
                    onClick={() => dispatch(authLogout())}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
