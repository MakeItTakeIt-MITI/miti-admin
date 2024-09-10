import { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLoginHook } from "../../hook/useLoginHook";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm<Inputs>();

  const email = watch("email");
  const password = watch("password");

  const { mutate } = useLoginHook();
  const onSubmit = () => mutate({ email: email, password: password });
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard/main");
    }
  }, [isLoggedIn, navigate]);
  return (
    <section className="w-[40%] h-full flex flex-col gap-4 items-center justify-center px-[8rem]">
      <h1 className=" font-bold text-2xl">관리자 로그인</h1>
      <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          value={email}
          placeholder="이메일"
          type="email"
          autoComplete="false"
        />
        <Input
          {...register("password")}
          value={password}
          placeholder="비밀번호"
          type="password"
          autoComplete="false"
        />
        <Button className="w-full">로그인</Button>
      </form>
    </section>
  );
};

export default Login;
