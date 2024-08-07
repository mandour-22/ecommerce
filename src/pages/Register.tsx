import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { actAuthRegister, resetUI } from "@store/auth/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import useCheckEmailAvailabilty from "@hooks/useCheckEmailAvailabilty";
import { schema, Inputs } from "@validation/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@components/form/index";
import { Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { Heading } from "@components/common";
import { useNavigate, Navigate } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const {
    emailAvailabiltyStatus,
    enterEmail,
    checkEmailAvailability,
    restEmailAvailabilaty,
  } = useCheckEmailAvailabilty();

  // handler submit
  const submits: SubmitHandler<Inputs> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });

    console.log(data);
  };

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && enterEmail !== value) {
      checkEmailAvailability(value);
    }
    if (isDirty && invalid && enterEmail && value.length === 0) {
      restEmailAvailabilaty();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

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
              error={errors.firstName?.message}
            />
            <Input
              type="text"
              register={register}
              name={"lastName"}
              label="last Name"
              error={errors.lastName?.message}
            />
            <Input
              type="text"
              register={register}
              name={"email"}
              label="Email Address"
              error={
                errors.email?.message
                  ? errors.email?.message
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
              error={errors.password?.message}
            />
            <Input
              type="password"
              register={register}
              name={"confirmPassword"}
              label="Confirm Password"
              error={errors.confirmPassword?.message}
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabiltyStatus === "checking"
                  ? true
                  : false || loading === "pending"
              }>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading...
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
