import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/Hooks";
import { resetUI } from "@store/auth/authSlice";
import actAuthLogin from "@store/auth/act/actAuthLogin";
import { useNavigate } from "react-router-dom";
import { signInSchema, Inputs } from "@validation/signInSchema";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";

const useLogin = () => {
  const [useSearch, setUseSearch] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, loading, accessToken } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors: errorForm },
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

  return {
    error,
    loading,
    accessToken,
    register,
    useSearch,
    handleSubmit,
    errorForm,
    submitHandler,
  };
};

export default useLogin;
