import { useMutation, useQueryClient } from "@tanstack/react-query";
import { penalizeGame } from "../api/reports";

export const usePenalizeGameHook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      gameId,
      data,
    }: {
      gameId: number | null;
      data: {
        penalty: string;
        duration: number | null;
        refund_participation_payment: boolean | undefined;
      };
    }) => penalizeGame(gameId, data),
    onSuccess: () => {
      //   queryClient.invalidateQueries("Users");
      queryClient.invalidateQueries({ queryKey: ["Reports list"] });
      queryClient.invalidateQueries({ queryKey: ["Reporters List"] });
    },
  });
};
