import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { actAuthRegister, resetUI } from "@store/auth/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import useCheckEmailAvailabilty from "@hooks/useCheckEmailAvailabilty";
import { schema, Inputs } from "@validation/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const dispatch = useAppDispatch();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors: errorForm },
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

  return {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    errorForm,
    emailAvailabiltyStatus,
    submits,
    emailOnBlurHandler,
  };
};

export default useRegister;
