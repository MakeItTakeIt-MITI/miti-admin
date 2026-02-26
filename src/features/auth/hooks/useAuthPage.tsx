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

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const { mutate, isPending, isError, error } = useLoginHook();

  const onSubmit = (values: Inputs) => mutate(values);

  const loginError = isError
    ? error instanceof Error
      ? error.message
      : "로그인에 실패했습니다. 다시 시도해주세요."
    : null;

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
    isValid,

    isPending,
    isLoggedIn,
    loginError,
  };
};

export default useAuthPage;
