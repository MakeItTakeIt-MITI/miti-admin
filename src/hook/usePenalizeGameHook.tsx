import { useMutation } from "@tanstack/react-query";
import { penalizeGame } from "../api/reports";

export const usePenalizeGameHook = () => {
  return useMutation({
    mutationFn: ({
      gameId,
      data,
    }: {
      gameId: number | null;
      data: { penalty: string; duration: number | null };
    }) => penalizeGame(gameId, data),
  });
};
