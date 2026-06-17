import { useEffect } from "react";
// import { Input } from "../ui/input";

import { useUserStore } from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useLoginHook } from "../hooks/useLoginHook";

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
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div className="bg-white min-h-screen   w-[70rem]  flex flex-col gap-12 items-center justify-center px-[8rem]">
      <h1 className=" font-bold text-3xl ">관리자 로그인</h1>

      <form
        className="flex flex-col gap-6 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("email")}
          value={email}
          placeholder="이메일"
          type="email"
          autoComplete="email"
          className="bg-white px-3 py-2 text-sm rounded-lg border border-gray-200"
        />

        <input
          {...register("password")}
          value={password}
          placeholder="비밀번호"
          type="password"
          autoComplete="off"
          className="bg-white px-3 py-2 text-sm rounded-lg border border-gray-200"
        />
        <Button type="submit" variant="contained" className="w-full">
          로그인
        </Button>
        <div className="text-sm text-center text-[#999] font-[500]">
          <span>회원이 아니신가요? </span>{" "}
          <a
            href="https://www.makeittakeit.kr/inquiries/new"
            className="underline text-[#999]"
            target="_blank"
          >
            문의하기
          </a>
        </div>
        {statusCode === 403 && errorCode == 140 && (
          <p className="text-red-500 font-[400] text-center text-[13px]">
            해당 이메일은 관리자 권한이 없습니다.
          </p>
        )}
        {statusCode === 401 && errorCode == 140 && (
          <p className="text-red-500 font-[400] text-center text-[13px]">
            해당 이메일로 등록된 회원이 없습니다.
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
