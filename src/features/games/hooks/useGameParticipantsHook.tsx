import { useQuery } from "@tanstack/react-query";
import { fetchGameParticipants } from "../api/games";

export const useGameParticipantsHook = (game_id: number) => {
  return useQuery({
    queryKey: ["Game participants list", game_id],
    queryFn: () => fetchGameParticipants(game_id),
  });
};
