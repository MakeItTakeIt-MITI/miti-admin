import { useQuery } from "@tanstack/react-query";
import { gameDetailsData } from "../../../api/games";

export const useGameDetailsDataHook = (gameId: number | null) => {
  return useQuery({
    queryKey: ["Game Details", gameId],
    queryFn: () => gameDetailsData(gameId),
  });
};
