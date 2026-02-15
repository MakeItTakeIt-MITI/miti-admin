import { useEffect } from "react";
import { useUserStore } from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginHook } from "./useLoginHook";
type Inputs = {
  email: string;
  password: string;
};

const useAuthPage = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm<Inputs>();
  const email = watch("email");
  const password = watch("password");

  const { mutate, data, isPending } = useLoginHook();
  const statusCode = data?.status_code;
  const errorCode = data?.error_code;

  const onSubmit = () => mutate({ email: email, password: password });

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
    return () => {};
  }, [isLoggedIn, navigate]);

  return {
    register,
    handleSubmit,
    onSubmit,
    statusCode,
    errorCode,
    isPending,
    isLoggedIn,
  };
};

export default useAuthPage;
