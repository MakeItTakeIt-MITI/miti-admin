import { useMutation } from "@tanstack/react-query";
import { authLogin } from "../api/auth";

export const useLoginHook = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return useMutation({
    mutationFn: () => authLogin(email, password),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
