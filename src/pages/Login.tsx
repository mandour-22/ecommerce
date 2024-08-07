import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { resetUI } from "@store/auth/authSlice";
import actAuthLogin from "@store/auth/act/actAuthLogin";
import { useNavigate } from "react-router-dom";
import { signInSchema, Inputs } from "@validation/signInSchema";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@components/form";
import { Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Heading } from "@components/common";
import { useSearchParams, Navigate } from "react-router-dom";

const Login = () => {
  const [useSearch, setUseSearch] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, loading, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const submitHandler: SubmitHandler<Inputs> = async (data) => {
    // Handle form submission
    if (useSearch.get("message")) {
      setUseSearch("");
    }
    // console.log(data);
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate("/"));
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
              error={errors.email?.message}
            />
            <Input
              type="password"
              name="password"
              register={register}
              label="Password"
              error={errors.password?.message}
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
