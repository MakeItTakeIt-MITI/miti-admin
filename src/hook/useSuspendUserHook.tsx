import { useMutation, useQueryClient } from "@tanstack/react-query";
import { suspendUserDays } from "../api/users";

export const useSuspendUserHook = (userId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (days: { days: number | null }) =>
      suspendUserDays(userId, days),
    onSuccess: () => {
      queryClient.invalidateQueries("Users");
    },
  });
};
