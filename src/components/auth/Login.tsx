import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { authLogin } from "../../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    authLogin(email, password);
  };
  return (
    <section className="w-[40%] h-full flex flex-col gap-4 items-center justify-center px-[10rem]">
      <h1 className=" font-bold text-2xl">관리자 로그인</h1>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="이메일"
        type="email"
        autoComplete="false"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="비밀번호"
        type="password"
        autoComplete="false"
      />
      <Button onClick={handleLogin} type="submit" className="w-full">
        로그인
      </Button>
    </section>
  );
};

export default Login;
