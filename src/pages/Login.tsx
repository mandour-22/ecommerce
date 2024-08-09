import { Link, Navigate } from "react-router-dom";
import useLogin from "@hooks/useLogin";
import { Input } from "@components/form";
import { Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Heading } from "@components/common";

const Login = () => {
  const {
    error,
    loading,
    accessToken,
    register,
    useSearch,
    handleSubmit,
    errorForm,
    submitHandler,
  } = useLogin();

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Heading title="Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {useSearch.get("message") === "login_required" && (
            <Alert variant="success">
              You need to login to view this content
            </Alert>
          )}
          {useSearch.get("message") === "account_created" && (
            <Alert variant="success" className="fw-medium">
              Your account successfully created, please login
            </Alert>
          )}
          <Form className="mt-4" onSubmit={handleSubmit(submitHandler)}>
            <Input
              type="text"
              name="email"
              register={register}
              label="Email Address"
              error={errorForm.email?.message}
            />
            <Input
              type="password"
              name="password"
              register={register}
              label="Password"
              error={errorForm.password?.message}
            />

            <Button
              variant="primary"
              type="submit"
              style={{ color: "white" }}
              className="fw-bold">
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>

            <p className="mt-3  text-capitalize">
              create account <Link to={"/register"}>signUp</Link>
            </p>

            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
