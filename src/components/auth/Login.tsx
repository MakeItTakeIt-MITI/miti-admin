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

  const { mutate, data } = useLoginHook();
  const statusCode = data?.status_code;
  const errorCode = data?.error_code;

  const onSubmit = () => mutate({ email: email, password: password });
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard/main");
    }
  }, [isLoggedIn, navigate]);
  return (
    <section className="w-[40%] h-full flex flex-col gap-4 items-center justify-center px-[8rem]">
      <h1 className=" font-bold text-2xl text-white">관리자 로그인</h1>

      <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          value={email}
          placeholder="이메일"
          type="email"
          autoComplete="false"
          className="bg-white"
        />

        <Input
          {...register("password")}
          value={password}
          placeholder="비밀번호"
          type="password"
          autoComplete="false"
          className="bg-white"
        />
        <Button className="w-full">로그인</Button>
      </form>
      {statusCode === 403 && errorCode == 140 && (
        <p className="text-red-500 font-[400] text-[13px]">
          해당 이메일은 관리자 권한이 없습니다.
        </p>
      )}
      {statusCode === 401 && errorCode == 140 && (
        <p className="text-red-500 font-[400] text-[13px]">
          해당 이메일로 등록된 회원이 없습니다.
        </p>
      )}
    </section>
  );
};

export default Login;
