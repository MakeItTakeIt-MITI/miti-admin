import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore";
import { authLogin } from "../../../api/auth";

export const useLoginHook = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await authLogin(credentials);

      if (response?.status_code !== 200) {
        throw new Error(
          response?.message || "로그인에 실패했습니다. 이메일/비밀번호를 확인해주세요.",
        );
      }

      return response;
    },
    onSuccess: (response) => {
      const { access, refresh } = response.data.token;

      sessionStorage.setItem("accessToken", access);
      sessionStorage.setItem("refreshToken", refresh);

      login(response?.data);
      navigate("/");
    },
  });
};
