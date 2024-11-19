import { Navigate } from "react-router-dom";
import { Input } from "@components/form/index";
import { Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { Heading } from "@components/common";
import useRegister from "@hooks/useRegister";

const Register = () => {
  const {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    errorForm,
    emailAvailabiltyStatus,
    submits,
    emailOnBlurHandler,
  } = useRegister();

  if (accessToken) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Heading title="User Register" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form className="mt-4" onSubmit={handleSubmit(submits)}>
            <Input
              type="text"
              register={register}
              name={"firstName"}
              label="Frist Name"
              error={errorForm.firstName?.message}
            />
            <Input
              type="text"
              register={register}
              name={"lastName"}
              label="last Name"
              error={errorForm.lastName?.message}
            />
            <Input
              type="text"
              register={register}
              name={"email"}
              label="Email Address"
              error={
                errorForm.email?.message
                  ? errorForm.email?.message
                  : emailAvailabiltyStatus === "notAvailable"
                  ? "This email is already in used"
                  : emailAvailabiltyStatus === "failed"
                  ? "Error from the server"
                  : ""
              }
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabiltyStatus === "checking"
                  ? "We are currently Checking the availability of this email address. please wait a moment."
                  : ""
              }
              success={
                emailAvailabiltyStatus === "available"
                  ? "This email is avaliable for use"
                  : ""
              }
            />
            <Input
              type="password"
              register={register}
              name={"password"}
              label="Password"
              error={errorForm.password?.message}
            />
            <Input
              type="password"
              register={register}
              name={"confirmPassword"}
              label="Confirm Password"
              error={errorForm.confirmPassword?.message}
            />

            <Button
              variant="primary"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabiltyStatus === "checking"
                  ? true
                  : false || loading === "pending"
              }>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}

            {error && <div className="mt-3 text-danger">{error}</div>}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
