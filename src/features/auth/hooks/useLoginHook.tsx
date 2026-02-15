import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../store/useUserStore";
import { authLogin } from "../../../api/auth";

export const useLoginHook = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();
  return useMutation({
    mutationFn: authLogin,
    onSuccess: (response) => {
      if (response.status_code === 200) {
        const { access, refresh } = response.data.token;

        sessionStorage.setItem("accessToken", access);
        sessionStorage.setItem("refreshToken", refresh);

        login(response?.data);
        navigate("/");
      } else {
        console.error("Login failed with status code:", response.status_code);
      }
    },
  });
};
