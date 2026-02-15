import { useEffect } from "react";
import { useUserStore } from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginHook } from "./useLoginHook";
import { toast } from "react-toastify";

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

  const { mutate, isPending } = useLoginHook();

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

    isPending,
    isLoggedIn,
  };
};

export default useAuthPage;
