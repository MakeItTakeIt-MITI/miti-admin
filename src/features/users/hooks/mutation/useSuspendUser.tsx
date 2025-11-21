import { useMutation } from "@tanstack/react-query";
import { suspendUser } from "../../api/suspend";

export const useSuspendUser = (userId: number, days: number) => {
  return useMutation({
    mutationFn: () => suspendUser(userId, days),
  });
};
